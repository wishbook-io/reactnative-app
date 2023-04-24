import React, { Component } from 'react';
import { 
  ImageBackground, 
  View, 
  Platform,
  TouchableOpacity, 
  ScrollView, 
  Linking, 
} from 'react-native';
import { 
  Container, 
  Icon, 
  Text,
  Card, 
  Label, 
  Button, 
  Footer,
  FooterTab,
  Content,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SendIntentAndroid from 'react-native-send-intent';
import CodeInput from 'react-native-confirmation-code-field';
import { colorresource } from '../../resources/colorresource';
import _ from 'lodash';

// local imports
import LoginFlow from './LoginFlow';
import styles from './styles';
import { strings } from '../../utils/i18n';
import consts from '../../utils/const'
import LocalStorage from '../../db/LocalStorage';
import {registerApnsAction} from '../../actions/user-actions'

//actions
import { loginWithOTPPassword, getLoginOTPAuthAction } from '../../actions/verifyotp-actions';
import { showToastAction } from 'app/actions/toast-actions'
import { errorActionSet, clearErrorForErrorKey } from 'app/actions/error-actions'
import { formatErrorFromServer } from 'app/utils/formatHelper';

import { TestIdGenerator } from '../../utils/TestingHelper';
import LoginWithPassword from './LoginWithPassword';
const buttonTestId = TestIdGenerator("VerifyOtpScreen", '', "Button");

const countDown = 30;
const INCORRECT_PASSWORD_ERROR_KEY = 'INCORRECT_PASSWORD_ERROR_KEY' 

class VerifyotpScreen extends Component {
  
  constructor(props) {
    super(props);
    /* For debugging purposes
    let params = {
      'mobile_number': '8412806235', 
      'is_password_set': true, 
      'countryId': 1,
    };
    _.forOwn(params, (value, key) => {
      params[key] = props.navigation.getParam(key, value);
    } );
    // */
    const params = props.navigation.state.params;
    this.state = {
      mobile_number: params['mobile_number'],
      is_password_set: params['is_password_set'],
      countryId: params['countryId'],
      timer: null,
      counter: countDown,
      disabled: true,
      password: undefined,
      passwordError: undefined,
      existingUser: false,
      token: params['token'],
    }
  }
  
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    error: PropTypes.object,
    responseKey: PropTypes.object,
    authenticationModel: PropTypes.object,
  };
  
  componentDidMount() {
    this.startCountDown();
    this.checkExistingUser();
  }
  
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  registerLoginFlowRef = (r) => {
    this.loginFlowRef = r && r.getWrappedInstance();
  }
  
  checkExistingUser = async () => {
    const keyExistingUser = consts.existingUser(this.state.mobile_number);
    const existing = await LocalStorage.getItem(keyExistingUser);
    if(existing) {
      console.log("user " + this.state.mobile_number + " is existing");
      this.setState({existingUser: true});
    } else {
      console.log("user " + this.state.mobile_number + " is new");
      await LocalStorage.setItem(keyExistingUser, true);
    }
  }
  
  startCountDown = () => {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer, counter: countDown, disabled: true });
  }
  
  tick = () => {
    const { counter } = this.state
    if (counter > 0) {
      this.setState({
        counter: this.state.counter - 1
      });
    } else {
      clearInterval(this.state.timer);
      this.setState({
        disabled: false
      });
    }
  }
  
  handlePasswordError = () => {
    const { errorKey, ...error } = this.props[INCORRECT_PASSWORD_ERROR_KEY]
    console.log('handlePasswordError', error)
    const [{title, message}] = formatErrorFromServer(error.errorResponse)
    if(title === 'Password') {
      this.setState({passwordError: message})
    } else {
      this.props.dispatch(errorActionSet(error))
    }
  }
  
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps 0', nextProps.error);
    if (nextProps.error !== undefined && nextProps.error) {// && nextProps.verifyotpError !== this.props.verifyotpError
      // console.log('componentWillReceiveProps 0 error', nextProps.error);
      //alert(`${nextProps.error}`);
    }
    
    if (nextProps.responseKey != undefined && nextProps.responseKey && nextProps.responseKey !== this.props.responseKey) {
      // console.log('componentWillReceiveProps 1', nextProps.responseKey);
      this.onOTPPasswordSuccess(nextProps.responseKey);
    }
    
    if (nextProps.authenticationModel != undefined && nextProps.authenticationModel && nextProps.authenticationModel !== this.props.authenticationModel) {
      // console.log('componentWillReceiveProps 1 authenticationModel', nextProps.authenticationModel)
    }
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('componentDidUpdate 0', prevProps.error, this.props.error, this.props.userInfo);
    if (this.props.error !== prevProps.error) {
      alert(`${this.props.error.statusText}`);
    }
    
    if(prevProps[INCORRECT_PASSWORD_ERROR_KEY] !== this.props[INCORRECT_PASSWORD_ERROR_KEY] && this.props[INCORRECT_PASSWORD_ERROR_KEY]) {
      this.handlePasswordError();
      this.props.dispatch(clearErrorForErrorKey(INCORRECT_PASSWORD_ERROR_KEY))
    }
  }
  
  onOTPPasswordSuccess = (responseKey) => {
    console.log('response key --------------------------', responseKey.key);
    Platform.OS === 'ios'?
    this.props.dispatch(registerApnsAction())
    :null
    // TODO: optimize this by adding a multiSetItem method in local storage
    LocalStorage.setItem(consts.AUTHKEY, responseKey.key);
    LocalStorage.setItem(consts.logoutCalled, false);
    LocalStorage.setItem(consts.isAskLocation, true);
    LocalStorage.setItem(consts.MOBILE_NO, this.state.mobile_number);
    LocalStorage.setItem(consts.COUNTRYID,this.state.countryId)

    this.loginFlowRef.startLoginFlow();
  }
  
  _onFulfill = (code) => {
    this.props.dispatch(loginWithOTPPassword(consts.LOGIN_OTP, this.state.mobile_number, this.state.countryId, code, '', this.state.token));
  }
  
  onChangeTextPassword = (text) => {
    let updatedState = {
      password: text.trim()
    }
    if(this.state.passwordError) {
      updatedState.passwordError = null
    }
    this.setState(updatedState);
  }
  
  registerOtpRef = (r) => {
    this.codeInputRef = r;
  }
  
  resendOtp = () => {
    console.log("resendOtp -------------------------------------------", this.state.mobile_number, this.state.countryId);
    this.props.dispatch(getLoginOTPAuthAction(this.state.mobile_number, this.state.countryId));
    this.startCountDown();
    this.codeInputRef.clear();
  }
  
  openWithWhatsapp = () => {
    SendIntentAndroid.isAppInstalled('com.whatsapp').then((isInstalled) => {
      if (isInstalled) {
        Linking.openURL('whatsapp://send?text=Send this to get OTP&phone=918469218980@s.whatsapp.net')
      } else {
        alert('WhatsApp not Installed');
      }
    });
  }
  
  onProceedButtonPress = () => {
    const isPassword = this.state.is_password_set
    if(!isPassword) {
      this.props.dispatch(showToastAction("Please enter OTP to proceed"))
      return;
    }
    this.loginWithPassword()
  }

  onForgotPasswordPress = () => {
    this.props.navigation.navigate('ForgotOtpScreen')
  }
  
  loginWithPassword = () => {
    if (this.state.password != undefined && this.state.password != '') {
      this.props.dispatch(loginWithOTPPassword(
        consts.LOGIN_PASSWORD, 
        this.state.mobile_number, 
        this.state.countryId, 
        '', 
        this.state.password, 
        this.state.token, 
        INCORRECT_PASSWORD_ERROR_KEY
      ));
    } else {
      this.props.dispatch(showToastAction("Please enter OTP/password to proceed"))
    }
  }
  
  getInputStyle = () => {
    return { borderBottomWidth: 1.5, color: colorresource.grey900, fontSize: 18 };
  }
  
  getInputProps = () => {
    return {
      keyboardType: 'numeric',
      selectionColor: colorresource.liteblue,
    }
  }
  
  render() {
    return (
      <Container>
        <ImageBackground style={styles.backgroundImage} source={require('../../images/intro_bg.png')}>
          <Content padder>
            
            <TouchableOpacity 
            style={{paddingLeft:15,paddingTop:15}} 
            onPress={()=>{this.props.navigation.goBack()}} 
            {...buttonTestId('Back')}
            >
              <Icon name='arrow-back' style={{color: colorresource.darkblue}}/>
            </TouchableOpacity>

            <View style={{paddingTop:10,paddingBottom:20}}>
              
              <View style={styles.VerifyScreenHeader}>
                <Label 
                style={styles.VerifyScreenItalicsLabel} 
                bordered 
                adjustsFontSizeToFit={true}>
                  {strings('login.otp_pin_header_text')}
                  <Text style={styles.VerifyScreenHeaderMobileNo}>{this.state.mobile_number}</Text>
                </Label>
              </View>

              <Card style={styles.LoginScreenCard}>
                {this.state.counter !== 0?
                  <Label 
                  style={styles.VerifyScreenTimer} 
                  bordered 
                  adjustsFontSizeToFit={true}
                  >
                  {'00:'+(this.state.counter+1000).toString().slice(-2)}
                  </Label>
                  : null
                }
      
                <Label 
                style={styles.VerifyScreenItalicsLabel} 
                bordered 
                adjustsFontSizeToFit={true}
                >{strings('login.otp_pin_subtext')}</Label>

                <View style={{marginTop: 10,}}>
                  <CodeInput
                  ref={this.registerOtpRef}
                  activeColor={colorresource.grey900}
                  inactiveColor={colorresource.grey900}
                  autoFocus={false}
                  ignoreCaseWhenCompareCode={true}
                  inputPosition='full-width'
                  variant='border-b'
                  size={35}
                  // space={5}
                  codeLength={6}
                  // containerProps={{style: { marginTop: 10 }}}
                  inputProps={{keyboardType: 'number-pad'}}
                  cellProps={{
                    // keyboardType: 'default', 
                    style: {
                      marginTop: 0, 
                      paddingTop: 0, 
                      color: colorresource.grey900
                    }
                  }}
                  // getInputStyle={this.getInputStyle}
                  onFulfill={this._onFulfill}
                  {...buttonTestId("Otp","CodeInput")}
                  />
                </View>

                <View style={styles.VerifyScreenOtpButtonsRow}>
                  
                  <Button 
                  style={{height:'auto', /*borderWidth: 1, borderColor: 'red',*/ }} 
                  transparent 
                  disabled={this.state.disabled} 
                  onPress={this.resendOtp} 
                  {...buttonTestId("Resend")}>
                    <Text style={this.state.disabled? styles.VerifyScreenResendTextDisabled : styles.VerifyScreenResendText}>{strings('login.otp_resend').toUpperCase()}</Text>
                  </Button>
                  
                  <Button 
                  style={{height:'auto', /*borderWidth: 1, borderColor: 'red',*/}} 
                  transparent 
                  disabled={this.state.disabled} 
                  onPress={this.openWithWhatsapp} 
                  {...buttonTestId("Whatsapp")}>
                    <Text style={this.state.disabled? styles.VerifyScreenWhatsappTextDisabled : styles.VerifyScreenWhatsappText}>{strings('login.get_otp_on_whatsapp').toUpperCase()}</Text>
                  </Button>

                </View>

              </Card>

              <LoginWithPassword
              visible={this.state.is_password_set}
              passwordError={this.state.passwordError}
              password={this.state.password}
              onChangeText={this.onChangeTextPassword}
              onSubmitEditing={this.onProceedButtonPress}
              onForgotPasswordPress={this.onForgotPasswordPress}
              />

            </View>
          </Content>
          <Footer style={{backgroundColor: 'transparent', height: 53}}>
            <FooterTab style={{}}>
              <Button 
              full 
              style={{backgroundColor: colorresource.darkblue}} 
              onPress={this.onProceedButtonPress} 
              {...buttonTestId("Proceed")}
              >
                <Text style={{marginTop: 5, color: 'white', fontSize: 17, lineHeight: 17}}>Proceed</Text>
              </Button>
            </FooterTab>
          </Footer>
        </ImageBackground>
        <LoginFlow
        ref={this.registerLoginFlowRef}
        showLoading={true}
        skipKeyCheck={true}
        />
      </Container>
    );
  }
}
      
      const mapStateToProps = (state) => {
        return {
          error: state.verifyotpR.error,
          responseKey: state.verifyotpR.responseKey,
          authenticationModel: state.verifyotpR.authenticationModel,
          [INCORRECT_PASSWORD_ERROR_KEY]: state.errorHandlerR[INCORRECT_PASSWORD_ERROR_KEY],
        };
      };
      
      export default connect(mapStateToProps)(VerifyotpScreen);
      