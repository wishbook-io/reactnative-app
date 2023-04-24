import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux';
import { View, Image, Keyboard } from 'react-native';
import { 
  Icon,
  Text,
  Button,
  Container,
  Content,
  Footer,
  FooterTab
}from 'native-base'
import { Button as PButton } from 'react-native-paper';
import FloatingLabel from 'react-native-floating-labels';
import _ from 'lodash'

import CheckBox from 'app/components/CheckBox/CheckBox';
import WButton from 'app/components/Button/WButton';
import ProfileAddress from './ProfileAddress';
import assets from '../../utils/assetsObject';
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';
import { NBRoot } from 'app/components/Root/NBRoot';

import { colorresource } from '../../resources/colorresource';

// server, store
import { showToastAction } from 'app/actions/toast-actions'
import * as serverHelper from './serverHelper';
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';
import { goToAddressEditor, goToAddressSelection } from 'app/actions/navigation-actions';

import { TestIdGenerator, SuffixedTestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'ProfileScreen';
const checkBoxTestId = TestIdGenerator(screenName, '', 'CheckBox')

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';
import userHelper from '../../config/userHelper';

const FORM_FIELD_KEYS = {
  WA_NOTIFICATIONS: 'WhatsAppNotifications',
  WA_PROMOTIONS: 'WhatsAppPromotions',
}

const testIds = {
  notifs: checkBoxTestId('Notifications'),
  promotions: checkBoxTestId('Promotions'),
}

class ProfileScreen extends Component {

  onDeliveryAddressPress = () => {
    goToAddressSelection();
  }

  onProfileAddressUpdated = async () => {
    const result = await this.postNotificationPreferencesIfChanged()
    if(result.response) {
      this.showToast("Profile updated successfully");
      this.goBack();
    }
  }

  registerProfileAddressRef = (r) => {
    this.profileAddressRef = r && r.getWrappedInstance();
  }

  postNotificationPreferencesIfChanged = async () => {
    const originalNotif = _.get(this.props.responseNotificationPreferences, '[0].whatsapp_notifications', false)
    const newNotif = this.state[FORM_FIELD_KEYS.WA_NOTIFICATIONS]

    const originalPromotion = _.get(this.props.responseNotificationPreferences, '[0].whatsapp_notifications', false)
    const newPromotion = this.state[FORM_FIELD_KEYS.WA_PROMOTIONS]

    if(originalNotif == newNotif && originalPromotion == newPromotion) {
      return {response: {}}
    }
    
    const notificationPreferencesParams = {
      whatsapp_notifications: this.state[FORM_FIELD_KEYS.WA_NOTIFICATIONS],
      whatsapp_promotions: this.state[FORM_FIELD_KEYS.WA_PROMOTIONS],
    }

    const result = await serverHelper.postNotificationPreferences(notificationPreferencesParams)
    return result;

  }

  onPromotionPrefChange = () => {
    const key = FORM_FIELD_KEYS.WA_PROMOTIONS
    this.setState({[key]: !this.state[key]})
  }

  onNotificationPrefChange = () => {
    const key = FORM_FIELD_KEYS.WA_NOTIFICATIONS
    this.setState({[key]: !this.state[key]})
  }

  patchProfile = async () => {
    // console.log("[patchProfile]"

    const notificationPreferencesParams = {
      whatsapp_notifications: this.state[FORM_FIELD_KEYS.WA_NOTIFICATIONS],
      whatsapp_promotions: this.state[FORM_FIELD_KEYS.WA_PROMOTIONS],
    }

    const { response, error } = serverHelper.postNotificationPreferences(notificationPreferencesParams)
    this.props.dispatch(requestHideLoaderAction(screenName))
    if(error) {
      this.showToast("Error while updating Profile");
    } else {
      this.showToast("Profile updated successfully");
      this.goBack();
    }
  }

  
  onSaveChangesPress = () => {
    Keyboard.dismiss();
    console.log("[onSaveChangesPress]");

    const isValid = this.profileAddressRef.onSaveChangesPress()
    if(!isValid) {
      return;
    }

    // we are valid, time to wait, so that we can then post
    // notification preferences if they have changed
  }
  
  goBack = () => {
    this.props.navigation.goBack()
  }

  showToast = (message, duration=1500) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  onScreenFocussed = () => {
    const initialRender = this.initialRender;
    if(initialRender) {
      this.initialRender = false
      return;
    }
    
    this.initialize();
    if(this.profileAddressRef) {
      this.profileAddressRef.initialize()
    }

  }

  initialize = async () => {
    const result = await serverHelper.getNotificationPreferences()
    if(result.error) {
      return;
    }
    // console.log("initialize: result", result)
    const response = _.get(result, 'response[0]', {})
    const updatedState = {
      [FORM_FIELD_KEYS.WA_NOTIFICATIONS]: response.whatsapp_notifications,
      [FORM_FIELD_KEYS.WA_PROMOTIONS]: response.whatsapp_promotions,
    }

    this.setState(updatedState)
  }
  
  constructor(props) {
    super(props)
    this.state = {
      [FORM_FIELD_KEYS.WA_NOTIFICATIONS]: false,
      [FORM_FIELD_KEYS.WA_PROMOTIONS]: false,
    }
    this.initialRender = true;
  }
  
  componentDidMount() {
    //console.log("[ProfileScreen:CDM")
    // waitTillUserInfoIsFetched().then(() => {
    this.initialize();
    // })
  }

  componentDidUpdate(prevProps) {
    //console.log("[ProfileScreen:CDU")
  }

  render() {
    return (
      <NBRoot style={{flex: 1}}>
      
      <NavigationEvents
      onDidFocus={this.onScreenFocussed}
      />
      
      <Container>
      
        <HeaderBackNativeBase title={strings('profile.profile')} onPress={this.goBack} />
        <Content contentContainerStyle={{paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
          
          <ProfileAddress
          ref={this.registerProfileAddressRef}
          onProfileAddressUpdated={this.onProfileAddressUpdated}
          userInfo={userHelper.userInfo}
          />

          <PButton
          mode={'text'}
          style={{alignSelf: 'flex-end'}}
          onPress={this.onDeliveryAddressPress}
          >{'DELIVERY ADDRESSES'}</PButton>

          <WButton onPress={this.onNotificationPrefChange} style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
              <CheckBox selected={this.state[FORM_FIELD_KEYS.WA_NOTIFICATIONS]}/>
              <Text style={{flex: 1, flexWrap: 'wrap', fontSize: 14}}>{'Update me regarding Enquiry, Order Details etc. on WhatsApp'}</Text>
            </View>
          </WButton>

          <WButton onPress={this.onPromotionPrefChange} style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
              <CheckBox selected={this.state[FORM_FIELD_KEYS.WA_PROMOTIONS]}/>
              <Text style={{flex: 1, flexWrap: 'wrap', fontSize: 14}}>{'Share the latest and trending catalogs on WhatsApp'}</Text>
            </View>
          </WButton>

        </Content>
        <Footer>
          <FooterTab>
            <Button style={{ backgroundColor: colorresource.liteblue }} onPress={this.onSaveChangesPress} {...testIds.save}>
              <Text style={{ color: colorresource.white, fontSize: 14 }}>{strings('profile.save_changes')}</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
      </NBRoot>
    );
  }
}
  
const mapStateToProps = (state) => {
  return ({
    responseNotificationPreferences: state.userR.responseGetNotificationPreferences,
  })
}

export default connect(mapStateToProps)(ProfileScreen)

const labelStyle = {
  focussed: {
    color: colorresource.liteblue,
    // fontSize: 12,
  },
  blurred: {
    color: 'black',
    // fontSize: 17,
  },
  blurredFloating: {
    color: 'black',
    // fontSize:12,
  },
  errored: {
    color: colorresource.darkred,
  }
}

const underlineStyleCommon = {
  width: '100%',
}
const underlineStyle = {
  focussed: {
    ...underlineStyleCommon,
    backgroundColor: colorresource.liteblue,
    height: 2,
  },
  blurred: {
    ...underlineStyleCommon,
    backgroundColor: 'black',
    height: 0.5,
  },
  errored: {
    ...underlineStyleCommon,
    backgroundColor: colorresource.darkred,
    height: 2,
  }
}

export class ProfileTextInput extends Component {

  onChangeText = (text) => {
    this.props.onChange({key: this.props.inputKey, text})
  }
  
  onFocus = () => {
    this.setState({isFocussed: true})
  }
  
  onBlur = () => {
    this.setState({isFocussed: false})
  }
  
  
  constructor(props) {
    super(props);
    this.state = {
      isFocussed: false,
    }
  }
  
  render() {
    return (
      <View>
        <View style={{flexDirection: 'row',}}>
          
          {this.props.hideLeadingIcon? null : 
            <View style={{alignSelf: 'flex-end'}}>
              <Image resizeMode='stretch' source={assets[this.props.icon]} style={[{ marginBottom: 7, width: 25, height: 25}]} />
            </View>
          }
          
          <View style={{flex: 1, alignSelf: 'flex-end', marginLeft: -10}}>
            <FloatingLabel
            // label={strings('profile.first_name')}
            // error={"there was some error"}
            labelStyle={[this.state.isFocussed? this.props.labelStyle.focussed : (this.props.value.length? this.props.labelStyle.blurredFloating : this.props.labelStyle.blurred), this.props.error? {color: colorresource.darkred} : {}]}
            inputStyle={{borderWidth: 0, paddingTop: 0, paddingBottom: 0, ...this.props.textInputStyle}}
            underlineColorAndroid={'transparent'}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChangeText}
            selectionColor={colorresource.liteblue}
            value={this.props.value}
            keyboardShouldPersistTaps='handled'
            {...this.props.textInputProps}
            {...this.props.testId}
            >{this.props.label}</FloatingLabel>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            {this.props.error
              ? <Icon name="exclamation-circle" type='FontAwesome' style={{marginBottom: 5, marginRight: 5, fontSize: 20, color: colorresource.darkred,}}/>
              : this.props.required
                ? <Icon name='star' type={'MaterialCommunityIcons'} style={{marginBottom: 10, marginRight: 5, fontSize: 15, color: colorresource.darkred}}/>
                : null
            }
          </View>
        </View>
        <View style={this.props.error? this.props.underlineStyle.errored : this.state.isFocussed? this.props.underlineStyle.focussed : this.props.underlineStyle.blurred}/>
        {this.props.error? <Text style={{color: colorresource.darkred, textAlign: 'right', fontSize: 14}}>{this.props.error}</Text> : null}
      </View>
    )
  }
}

ProfileTextInput.defaultProps = {
  labelStyle,
  underlineStyle,
  hideLeadingIcon: false,
  icon: 'ic_person',
  textInputProps: {},
  textInputStyle: {},
  testId: {},
  required: true,
  value: '',
}