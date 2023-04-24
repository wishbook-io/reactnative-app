import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Keyboard } from 'react-native';
import { 
  Text,
  Picker,
}from 'native-base'
import _ from 'lodash'

import TextInputKeyed from 'app/components/MaterialTextInput/TextInputKeyed'
import { showAlert } from 'app/utils/notifier'
import DropdownMaterial from 'app/components/Dropdown/DropdownMaterial';
import { strings } from '../../utils/i18n';
import { NBRoot } from 'app/components/Root/NBRoot';
import Modal from 'app/components/Modal/Modal';

import UserHelper from 'app/config/userHelper'
import { colorresource } from '../../resources/colorresource';
import { fontresource } from 'app/resources/fontresource';
import consts from 'app/utils/const';
import { isIos } from 'app/utils/PlatformHelper';

// server, store
import { getStatesAction, getCititesAction } from '../../actions/state-actions';
import { showToastAction } from 'app/actions/toast-actions'
import { getPincodesAction } from 'app/actions/shipay-actions'
import * as serverHelper from './serverHelper';
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';

import { TestIdGenerator, SuffixedTestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'ProfileAddress';
const buttonTestId = TestIdGenerator(screenName,'','Button');
const radioTestId = TestIdGenerator(screenName,'','Radio');
const checkBoxTestId = TestIdGenerator(screenName, '', 'CheckBox')
const inputTestId = TestIdGenerator(screenName,'','Input');
const spinnerTestId = TestIdGenerator(screenName, '', 'Spinner')

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';

const FORM_FIELD_KEYS = {
  FULL_NAME: 'FirstName',
  COMPANY_NAME: 'CompanyName',
  MOBILE_NO: 'MobileNo',
  EMAIL_ID: 'EmailId',
  ADDRESS: 'Address',
  STATE_ID: 'StateId',
  CITY_ID: 'CityId',
  PINCODE: 'Pincode',
  GST: 'Gst',
}

const testIds = {
  first: inputTestId('FirstName'),
  company: inputTestId('CompanyName'),
  state: spinnerTestId('State'),
  city: spinnerTestId('City'),
  email: inputTestId('Email'),
  address: inputTestId('Address'),
  mobile: inputTestId('Mobile'),
  save: buttonTestId('SaveChanges'),
}

const emailRegex = new RegExp(consts.EMAIL_REGEX)

const CITY_LOADING_KEY = isIos || true? 'isLoadingCity' : 'isLoading'

class ProfileAddress extends Component {

  onCheckPincodeDone = () => {
    const serverResult = _.get(this.props.responsePincodes, '[0]')
    // console.log("[onCheckPincodeDone] serverResult", serverResult);
    // const serverCity = serverResult.city;
    // const reactCity = this.state[FORM_FIELD_KEYS.CITY_ID];
    // console.log("serverCity, type", serverCity, typeof serverCity);
    // console.log("reactCity, type", reactCity, typeof reactCity);
    if(!serverResult || serverResult.city === parseInt(this.state[FORM_FIELD_KEYS.CITY_ID])) {
      // all ok
      this.patchProfile()
    } else {
      this.showCityChangePopup({stateId: serverResult.state, cityId: serverResult.city})
    }
  }

  showCityChangePopup = ({stateId, cityId}) => {
    showAlert(
      screenName,
      'City Changed', 
      'We have updated the city since the pincode you entered is of a different city',
      this.patchProfile,
      {stateId, cityId}
    )
  }

  getFirstAndLastNamesFromName = (name) => {
    const split = name.split(" ")
    const firstName = split[0];
    const lastName = split.slice(1).join(" ")
    return {firstName, lastName}
  }

  patchProfile = async (defaultParams = {stateId: 0, cityId: 0}) => {
    // console.log("[patchProfile]")

    const { firstName, lastName } = this.getFirstAndLastNamesFromName(this.state[FORM_FIELD_KEYS.FULL_NAME].text)
    const patchUserParams = {
      first_name: firstName,
      last_name: lastName,
      email: this.state[FORM_FIELD_KEYS.EMAIL_ID].text,
    }
    
    const patchCompanyParams = {
      name: this.state[FORM_FIELD_KEYS.COMPANY_NAME].text,
      state: defaultParams.stateId || this.state[FORM_FIELD_KEYS.STATE_ID].id,
      city: defaultParams.cityId || this.state[FORM_FIELD_KEYS.CITY_ID],
    }

    const updateAddressParams = {
      name: this.state[FORM_FIELD_KEYS.FULL_NAME].text,
      street_address: this.state[FORM_FIELD_KEYS.ADDRESS].text,
      pincode: this.state[FORM_FIELD_KEYS.PINCODE].text,
    }

    const updateGstParams = {
      gstin: this.state[FORM_FIELD_KEYS.GST].text,
    }

    this.props.dispatch(requestShowLoaderAction(screenName))
    // const [resultUserPatch, resultCompanyPatch, resultAddressPatch, resultGstUpdate] = 
    // console.log("[patchProfile] before promise.all")
    const addressPatchPromise = async () => {
      const resultAddress = await serverHelper.updateAddress({id: this.billingAddressId, params: updateAddressParams})
      if(resultAddress.error) {
        return { error: resultAddress.error }
      }

      const resultCompany = await serverHelper.patchCompanyProfile(patchCompanyParams)
      if(resultCompany.error) {
        return { error: resultCompany.error}
      }

      return { response: resultCompany.response}
    }
    const result = await Promise.all([
      serverHelper.patchUserProfile(patchUserParams),
      addressPatchPromise(),
      serverHelper.updateKyc({id: this.kycId, params: updateGstParams}),
    ])
    this.props.dispatch(requestHideLoaderAction(screenName))
    const firstError = result.find(r => r.error);
    if(firstError) {
      this.showToast("Error while updating Profile");
    } else {
      this.props.onProfileAddressUpdated()
    }
  }

  getCities = (stateId) => {
    return this.props.citiesByStateId[stateId]
  }

  onCompanyCityChange = (cityId, index) => {
    // console.log("[onCompanyCityChange] cityId", cityId);
    this.setState({[FORM_FIELD_KEYS.CITY_ID]: cityId})
  }

  onCompanyStateChange = (stateId, index) => {
    this.setState({[FORM_FIELD_KEYS.STATE_ID]: {id: stateId},})
    let updatedState = {
      [FORM_FIELD_KEYS.STATE_ID]: {id: stateId} 
    }
    const cities = this.getCities(stateId);
    if(!cities) {
      updatedState[FORM_FIELD_KEYS.CITY_ID] = undefined
      this.setState(updatedState)
      this.props.dispatch(getCititesAction(stateId, CITY_LOADING_KEY));
    } else {
      updatedState[FORM_FIELD_KEYS.CITY_ID] = cities[0].id
      this.setState(updatedState)
    }
  }

  onTextInputChange = ({key, text}) => {
    // console.log("[onTextInputChange] key, text", key, text)
    this.setState({[key]: {text}})
  }

  validateForm = () => {
    let result = {};
    let errorMessage = '';

    const firstName = this.state[FORM_FIELD_KEYS.FULL_NAME].text;
    if(!firstName) {
      result = {...result, [FORM_FIELD_KEYS.FULL_NAME]: {error: "Name cannot be empty"}}
    }

    const companyName = this.state[FORM_FIELD_KEYS.COMPANY_NAME].text;
    if(!companyName || companyName.trim() === '-') {
      result = {...result, [FORM_FIELD_KEYS.COMPANY_NAME]: {error: "Company Name cannot be empty"}}
    }

    const emailId = this.state[FORM_FIELD_KEYS.EMAIL_ID].text;
    errorMessage = '';
    if(!emailId) {
      errorMessage = 'Email Id cannot be empty'
    } else if(!emailRegex.test(emailId)) {
      errorMessage = 'Email Id must be valid'
    }
    if(errorMessage) {
      result = {...result, [FORM_FIELD_KEYS.EMAIL_ID]: {text: emailId, error: errorMessage}}
    }

    const address = this.state[FORM_FIELD_KEYS.ADDRESS].text;
    errorMessage = '';
    if(!address) {
      errorMessage = 'Address cannot be empty'
    } else if(address.length < 15) {
      errorMessage = 'Hmmm... How is your address this small? Please enter a valid address.'
    }
    if(errorMessage) {
      result = {...result, [FORM_FIELD_KEYS.ADDRESS]: {text: address, error: errorMessage}}
    }    

    const stateId = this.state[FORM_FIELD_KEYS.STATE_ID].id;
    const stateName = this.props.stateList.find((item) => item.id == stateId).state_name;
    if(stateName === '-') {
      this.showToast("Please select a state");
      const currentState = this.state[FORM_FIELD_KEYS.STATE_ID]
      result = {...result, [FORM_FIELD_KEYS.STATE_ID]: {id: currentState.id, error: true}}
    }

    const pincode = this.state[FORM_FIELD_KEYS.PINCODE].text;
    errorMessage = '';
    if(!pincode) {
      errorMessage = 'Pincode cannot be empty'
    } else if(pincode.length !== 6) {
      errorMessage = 'Pincode must be valid'
    }
    
    if(errorMessage) {
      result = {...result, [FORM_FIELD_KEYS.PINCODE]: {text: pincode, error: errorMessage}}
    }

    return result;
  }
  
  onSaveChangesPress = () => {
    Keyboard.dismiss();
    console.log("[onSaveChangesPress]");

    const validateResult = this.validateForm()
    console.log("[onSaveChangesPress] validateResult: ", validateResult);
    if(Object.keys(validateResult).length) {
      this.setState({...validateResult})
      return;
    }

    this.props.dispatch(getPincodesAction({pincode: this.state[FORM_FIELD_KEYS.PINCODE].text}))
  }

  showToast = (message, duration=1500) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  initialize = async () => {
    if(this.props.stateList.length === 0) {
      this.props.dispatch(getStatesAction())
    }
    const [ resultKyc, resultAddresses ] = await Promise.all([
      serverHelper.getKycDetails(),
      serverHelper.fetchAddresses(),
    ])
    //disable loading here
    if(resultKyc.error || resultAddresses.error) {
      console.log("ProfileScreen::initialize() error")
      return;
    }

    const responseKyc = resultKyc.response;
    const responseAddresses = resultAddresses.response;

    const firstName = UserHelper.getUserFirstName();
    const lastName = UserHelper.getUserLastName();
    const companyName = UserHelper.getCompanyname();
    const stateId = UserHelper.getUserCompanyStateId();
    const cityId = UserHelper.getUserCompanyCityId();
    const emailId = UserHelper.getUserEmail();
    const mobileNo = UserHelper.getUserMobile();
    const gst = _.get(responseKyc, '[0].gstin', '')
    this.kycId = _.get(responseKyc, '[0].id')
    
    const billingAddress = responseAddresses.find(a => a.is_default)
    this.billingAddressId = _.get(billingAddress, 'id')
    const address = _.get(billingAddress, 'street_address', '')
    const pincode = billingAddress.pincode || '';

    const updatedState = {
      [FORM_FIELD_KEYS.FULL_NAME]: {text: firstName + (lastName? " " + lastName : "")},
      [FORM_FIELD_KEYS.COMPANY_NAME]: {text: companyName},
      [FORM_FIELD_KEYS.EMAIL_ID]: {text: emailId},
      [FORM_FIELD_KEYS.MOBILE_NO]: {text: mobileNo},
      [FORM_FIELD_KEYS.STATE_ID]: {id: stateId},
      [FORM_FIELD_KEYS.CITY_ID]: cityId,
      [FORM_FIELD_KEYS.GST]: {text: gst},
      [FORM_FIELD_KEYS.ADDRESS]: {text: address},
      [FORM_FIELD_KEYS.PINCODE]: {text: pincode + ''},
    }
    // console.log("[populateFormData] updatedState: ", updatedState)
    this.onCompanyStateChange(stateId);
    this.setState({...updatedState})

  }
  
  constructor(props) {
    super(props)
    this.state = {

      isErrorModalVisible: false,
      errorModalContent: {
        title: 'Error',
        message: 'Oops! Something went wrong',
      },

      [FORM_FIELD_KEYS.FULL_NAME] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.COMPANY_NAME] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.EMAIL_ID] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.ADDRESS] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.MOBILE_NO] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.PINCODE] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.GST] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.STATE_ID]: {id: 0, error: null},
      [FORM_FIELD_KEYS.CITY_ID]: 0,

    }
  }
  
  componentDidMount() {
    waitTillUserInfoIsFetched().then(() => {
      this.initialize();
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.citiesByStateId !== this.props.citiesByStateId && this.state[FORM_FIELD_KEYS.CITY_ID] == undefined) {
      const cities = this.props.citiesByStateId[this.state[FORM_FIELD_KEYS.STATE_ID].id]
      const cityId = cities && cities[0].id
      if(cityId) {
        this.setState({[FORM_FIELD_KEYS.CITY_ID]: cityId})
      }
    }

    if(prevProps.responsePincodes !== this.props.responsePincodes) {
      this.onCheckPincodeDone()
    }
  }

  render() {
    
    const cities = this.props.citiesByStateId[this.state[FORM_FIELD_KEYS.STATE_ID].id]
    const currentState = this.state[FORM_FIELD_KEYS.STATE_ID]
    const cityId = this.state[FORM_FIELD_KEYS.CITY_ID]
    // console.log("cityId", cityId);

    return (
      <NBRoot style={{flex: 1}}>
          <TextInputKeyed
          label={'Enter Name'}
          error={this.state[FORM_FIELD_KEYS.FULL_NAME].error}
          inputKey={FORM_FIELD_KEYS.FULL_NAME}
          onChange={this.onTextInputChange}
          value={this.state[FORM_FIELD_KEYS.FULL_NAME].text}
          leadingIcon={'person'}
          testId={testIds.first}
          />

          <TextInputKeyed
          label={strings('profile.company_name')}
          error={this.state[FORM_FIELD_KEYS.COMPANY_NAME].error}
          inputKey={FORM_FIELD_KEYS.COMPANY_NAME}
          onChange={this.onTextInputChange}
          value={this.state[FORM_FIELD_KEYS.COMPANY_NAME].text}
          info={'Write your own name if you are a home-based reseller'}
          leadingIcon={'business-center'}
          testId={testIds.company}
          />

          <TextInputKeyed
          label={"Mobile number"}
          error={this.state[FORM_FIELD_KEYS.MOBILE_NO].error}
          inputKey={FORM_FIELD_KEYS.MOBILE_NO}
          disabled={true}
          onChange={this.onTextInputChange}
          value={this.state[FORM_FIELD_KEYS.MOBILE_NO].text}
          leadingIcon={'phone'}
          testId={testIds.mobile}
          />

          <TextInputKeyed
          label={strings('profile.email_id')}
          error={this.state[FORM_FIELD_KEYS.EMAIL_ID].error}
          inputKey={FORM_FIELD_KEYS.EMAIL_ID}
          onChange={this.onTextInputChange}
          value={this.state[FORM_FIELD_KEYS.EMAIL_ID].text}
          leadingIcon={'email'}
          testId={testIds.email}
          />

          <TextInputKeyed
          label={'Address'}
          error={this.state[FORM_FIELD_KEYS.ADDRESS].error}
          inputKey={FORM_FIELD_KEYS.ADDRESS}
          onChange={this.onTextInputChange}
          value={this.state[FORM_FIELD_KEYS.ADDRESS].text}
          // leadingIcon={'contact-mail'}
          textInputProps={{
            multiline: true,
            numberOfLines: 2,
          }}
          testId={testIds.address}
          />
            
          <DropdownMaterial
          error={currentState.error}
          label = {'Select state'}
          selectedValue={currentState.id}
          onValueChange={this.onCompanyStateChange}
          testId = {testIds.state}
          >
            {
              this.props.stateList.map((item, key) => {
              return (<Picker.Item label={item.state_name} value={item.id} key={item.id}/>);
              })
            }
          </DropdownMaterial>

          <DropdownMaterial
          error={currentState.error}
          label = {'Select city'}
          enabled = {!!cities}
          onValueChange={this.onCompanyCityChange}
          selectedValue={this.state[FORM_FIELD_KEYS.CITY_ID]}
          loading={this.props[CITY_LOADING_KEY]}
          testId = {testIds.city}
          >
            {cities && cities.map((item, index) => <Picker.Item label={item.city_name} value={item.id} key={item.id}/>)}
          </DropdownMaterial>

          <TextInputKeyed
          parentStyle={{marginTop: 10}}
          label={'Enter Pincode'}
          error={this.state[FORM_FIELD_KEYS.PINCODE].error}
          inputKey={FORM_FIELD_KEYS.PINCODE}
          onChange={this.onTextInputChange}
          value={this.state[FORM_FIELD_KEYS.PINCODE].text}
          // leadingIcon={'gps-fixed'}
          textInputProps={{
            keyboardType: 'numeric',
          }}
          testId={testIds.first}
          />

          <TextInputKeyed
          label={'Enter GST Number'}
          error={this.state[FORM_FIELD_KEYS.GST].error}
          inputKey={FORM_FIELD_KEYS.GST}
          onChange={this.onTextInputChange}
          value={this.state[FORM_FIELD_KEYS.GST].text}
          info={'Optional'}
          testId={testIds.first}
          />

        <Modal
        // onBackdropPress={this.setHideErrorModal}
        visible={this.state.isErrorModalVisible}
        // backdropColor={'black'}
        // backdropOpacity={0.7}
        // animationIn={'fadeIn'}
        // animationOut={'fadeOut'}
        >
          <View style={{
            backgroundColor: 'white',
            borderRadius: 3,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            marginLeft: 10,
            marginRight: 10,
            elevation: 5,
          }}>
            <Text style={{color: colorresource.grey900, fontSize: 20, fontFamily: fontresource.medium}}>{this.state.errorModalContent.title}</Text>
            <Text style={{color: colorresource.grey46, marginTop: 20, fontSize: 16}}>{this.state.errorModalContent.message}</Text>
            <Text style={{
              textAlign: 'right',
              color: colorresource.liteblue,
              marginTop: 30,
              marginRight: 20,
              padding: 5}} 
            onPress={this.setHideErrorModal}>OK</Text>
          </View>
        </Modal>
        
      </NBRoot>
    );
  }
}
  
const mapStateToProps = (state) => {
  return ({
    stateList: state.stateR.states,
    citiesByStateId: state.stateR.citiesByStateId,
    responsePincodes: state.shipayR.responseGetPincodes,
    responseKycDetails: state.userR.responseGetKyc,
    [CITY_LOADING_KEY]: state.stateR[CITY_LOADING_KEY],
  })
}

export default connect(mapStateToProps, null, null, {withRef: true})(ProfileAddress)
