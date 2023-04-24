import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Platform, ImageBackground,TouchableOpacity } from 'react-native';
import { Container, Content, View, Card, CardItem, Text, Button, Label, Input, Form, Item, Icon, ActionSheet } from 'native-base';
import { Button as PButton } from 'react-native-paper'
import _ from 'lodash';

// local imports
import Modal from '../../components/Modal/Modal';
import { HeaderBackNativeBase } from '../../components/Header';
import GenericHeader from 'app/components/Header/GenericHeader';
import CountrySelection from '../../components/CountrySelection/CountrySelection';
import TextInputLegacy from 'app/components/MaterialTextInput/TextInputLegacy';
import {NBRoot} from '../../components/Root/NBRoot';
import styles from './styles';
import { strings } from '../../utils/i18n';
import LocalStorage from '../../db/LocalStorage';
import consts from '../../utils/const';
import { colorresource } from '../../resources/colorresource';
import { isWeb } from '../../utils/PlatformHelper';

//actions
import { getCountriesAction, changeCountryLabel } from '../../actions/login-actions';
import { loginWithOTPPassword, loginWithOTPForgotPassword, getUserDetailsForgotAction, getResetPasswordOTPAction, getResetPasswordAction } from '../../actions/verifyotp-actions';
import { showToastAction } from 'app/actions/toast-actions'

import { TestIdGenerator } from '../../utils/TestingHelper';
import ErrorBoundary from '../ErrorBoundary';
const screenName = 'ForgotScreen';
const inputTestId = TestIdGenerator(screenName, '', 'Input');
const buttonTestId = TestIdGenerator(screenName,'','Button');

class ForgotOtpScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            otp:"",
            password:"",
            confirmpassword:"",
            tokenCopyFeedback: "",
            mobileNumber: '',
            buttonEnable: true,
            enabled: false,
            validation: false,
            countryId: 1,
            visibleModal: null,
            error:"",
            inputFocussed: false,
        };
    }

    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        countries: PropTypes.array,
        countryLabel: PropTypes.string,
        error: PropTypes.object,
        primaryColor: PropTypes.string,
        countryIndex: PropTypes.number,
        authenticationModel: PropTypes.object
    };

    componentWillMount() {
        if(!this.props.countries || this.props.countries.length === 0) {
            this.props.dispatch(getCountriesAction());
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps.authenticationModel)
        if (nextProps.error && nextProps.error !== this.props.error) {
            alert(`${nextProps.error.statusText}`);
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.responseForgetaction !== this.props.responseForgetaction){
            this.setState({ visibleModal: 1 });
        }

        if(prevProps.responseForgetpassword !== this.props.responseForgetpassword){
            this.setState({ visibleModal: null });
            //this.onUserAuthentication();
            this.props.dispatch(showToastAction("Password updated successfully"))
        }

        if(prevProps.forgotresponseKey !== this.props.forgotresponseKey){
            this.onOTPPasswordSuccess(this.props.forgotresponseKey);
        }
       
        if (this.props.forgotpassworduserInfo !== prevProps.forgotpassworduserInfo ) {
            this.proceedToHome();
        }
    }

    onChangeText = (text) => {
        
                let value = text.trim();
                this.setState({ 
                    error: '', 
                    validation:false, 
                    mobileError: 'mobile', 
                    buttonEnable: false, 
                    mobileNumber: value 
                });
            }

    onUserAuthentication = () => {
        const { password, countryId, mobileNumber } = this.state;
        this.props.dispatch(loginWithOTPForgotPassword(consts.LOGIN_PASSWORD, mobileNumber, countryId, '', password));
    }

    onOTPPasswordSuccess = (responseKey) => {
        console.log('response key --------------------------', responseKey.key);
        LocalStorage.setItem(consts.AUTHKEY, responseKey.key);
        LocalStorage.setItem(consts.logoutCalled, false);
        LocalStorage.setItem(consts.isAskLocation, true);
        this.props.dispatch(getUserDetailsForgotAction());
    }

    generateOtp = () => {
        // this.setState({visibleModal: 1})
        // return;
        var IndNum = /^[0]?[6789]\d{9}$/;
        if (!IndNum.test(this.state.mobileNumber)) {
            this.setState({ 
                error: _.isEmpty(this.state.mobileNumber) ? 'Please enter mobile number' : 'Invalid Mobile Number',
                mobileError: 'exclamation-circle', 
                buttonEnable: true, 
                validation: true,
            })
        }else{
            const { countryId, mobileNumber } = this.state;
            this.props.dispatch(getResetPasswordOTPAction(countryId, mobileNumber));
        }
    }

    onSubmitReset = () => {
        const { otp, password, confirmpassword, countryId, mobileNumber } = this.state;
        
        if(_.isEmpty(otp)){
            alert("OTP Field is Required");
        }else if( _.isEmpty(password)){
            alert("Password Field is Required");
        }else if(_.isEmpty(confirmpassword)){
            alert("ConfirmPassword Field is Required");
        }else if(password !== confirmpassword){
            alert("Confirm Password didn't Match");
        }else{
            this.setState({enabled : true})
            this.props.dispatch(getResetPasswordAction(otp, password, countryId, mobileNumber));
        }
    }


    proceedToHome = () => {
        this.setState({ visibleModal: null });
            this.props.navigation.navigate('drawerStack');
    }

    onCountryChanged = (buttonIndex) => {
        this.setState({ countryId: this.props.countries[buttonIndex].id })
        this.props.dispatch(changeCountryLabel(buttonIndex));
    }

    _renderModalContent = () => (
        <View style={styles.modalContent}>
            
                <Text style={{fontSize:20, color: colorresource.liteblack}}>Reset Password</Text>
                <View style={{marginTop:40}}>
                    <View style={{paddingBottom: 10}}>
                        <TextInputLegacy
                        label={'OTP Received'}
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({ otp: value })}
                        inputTestId={inputTestId("Otp")}
                        />
                    </View>

                    <View style={{paddingBottom: 10}}>
                        <TextInputLegacy
                        label={'Password'}
                        onChangeText={(value) => this.setState({ password: value })}
                        secureTextEntry={true}
                        inputTestId={inputTestId("Password")}
                        />
                    </View>

                    <View>
                        <TextInputLegacy
                        label={'Confirm Password'}
                        onChangeText={(value) => this.setState({ confirmpassword: value })}
                        secureTextEntry={true}
                        inputTestId={inputTestId("ConfirmPassword")}
                        />
                    </View>

                    <View style={{padding:10,justifyContent: 'center'}}>
                        <Text style={{color:'red'}}>{this.state.error}</Text>
                    </View>

                    <View style={{marginTop:40, flexDirection:'row',justifyContent: 'space-between',}}>

                        <PButton
                        mode="outlined"
                        onPress={this.generateOtp} 
                        icon={'refresh'}
                        {...buttonTestId("Resend")}
                        >
                            {'RESEND'}
                        </PButton>

                        <PButton
                        mode="contained"
                        onPress={this.onSubmitReset} 
                        icon={'done'}
                        disabled={this.state.enabled}
                        {...buttonTestId("Submit")}
                        >
                            {'SUBMIT'}
                        </PButton>
                    </View>
                    <View style={{alignSelf: 'flex-end', marginTop: 10}}>
                        <PButton
                        mode="text"
                        onPress={ () => this.setState({ visibleModal: null, enabled: false })} 
                        {...buttonTestId("Cancel")}
                        >
                            {'CANCEL'}
                        </PButton>
                    </View>
                </View>
        </View>
      );


    render() {
        let countryIndex = this.props.countryIndex;
        let countryName = '';
        if (this.props.countries.length > 0) {
            countryName = this.props.countries[countryIndex].name
        }
        const { buttonEnable } = this.state
        return (
            <NBRoot style={{flex: 1}}>
                <Container>
                    <GenericHeader title="Forgot password"/>
                    <ImageBackground style={styles.backgroundImage} source={require('../../images/intro_bg.png')}>
                        <Content padder style={styles.contentView}>
                            <View style={styles.ForgotScreenMobileParent}>
                                <View style={styles.ForgotScreenMobileInputParentRow}>
                                    <View>
                                        <Icon type="FontAwesome" name="mobile" style={styles.ForgotScreenMobileIcon}/>
                                    </View>
                                    <View>
                                        <CountrySelection countries={this.props.countries} countryIndex={this.props.countryIndex} onPress={this.onCountryChanged}/>
                                    </View>
                                    <View style={styles.ForgotScreenMobileInputParent}>
                                            <TextInputLegacy
                                            parentStyle={{flex: 1}}
                                            label={strings('login.enter_mobile_number')} 
                                            tintColor={this.state.validation? colorresource.darkred : colorresource.liteblue}
                                            baseColor={this.state.validation? colorresource.darkred : undefined}
                                            keyboardType="numeric"
                                            maxLength={10}
                                            selectionColor={colorresource.liteblue}
                                            onChangeText={this.onChangeText}
                                            underlineColorAndroid={'transparent'}
                                            trailingProps={this.state.validation? {
                                                type: "FontAwesome",
                                                name: "exclamation-circle"
                                            } : undefined}
                                            trailingStyle={styles.ForgotScreenIconError}
                                            {...inputTestId("Mobile")}
                                            />
                                    </View>
                                </View>
                                { this.state.validation
                                    ? <View style={styles.ForgotScreenMobileInputValidationParent}>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{flex: 1}}/>
                                            <View style={styles.ForgotScreenMobileInputValidationArrow}/>
                                        </View>
                                        <View style={styles.ForgotScreenMobileInputValidationTextParent}>
                                            <Text style={styles.ForgotScreenMobileInputValidationText}>{this.state.error}</Text>
                                        </View>
                                    </View>
                                    : null
                                }
                                <View style={styles.ForgotScreenRequestOtpParent}>
                                    <PButton
                                    mode={'contained'}
                                    style={styles.ForgotScreenRequestOtpButton}
                                    onPress={this.generateOtp}
                                    >
                                        {'REQUEST OTP'}
                                    </PButton>
                                </View>
                            </View>
                            <View style={styles.bottomModal}>
            <ErrorBoundary>
                                <Modal 
                                isVisible={this.state.visibleModal === 1}>
                                    {this._renderModalContent()}
                                </Modal>
            </ErrorBoundary>
                            </View>
                        </Content>
                    </ImageBackground>
                </Container>
            </NBRoot>
        );
    }
}

const mapStateToProps = (state) => {
    let countryIndex = state.loginR.countryIndex;
    let countryLabel = '';
    if (state.loginR.countries.length > 0) {
        countryLabel = state.loginR.countries[countryIndex].name;
    }
    return {
        countryLabel,
        countryIndex,
        countries: state.loginR.countries,
        error: state.loginR.error,
        authenticationModel: state.loginR.authenticationModel,
        responseForgetaction: state.verifyotpR.responseForgetaction,
        responseForgetpassword: state.verifyotpR.responseForgetpassword,
        forgotresponseKey: state.verifyotpR.forgotresponseKey,
        userInfo: state.verifyotpR.userInfo,
        forgotpassworduserInfo: state.verifyforgotR.forgotpassworduserInfo
    };
};

export default connect(mapStateToProps)(ForgotOtpScreen);