import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, Image, Keyboard } from 'react-native';
import { 
  Form,
  Item,
  Icon,
  Label,
  Input,
  Text,
  ListItem,
  Left,
  Button,
  Picker,
  Container,
  Content,
  Footer,
  FooterTab
}from 'native-base'
import { TextInput as PTextInput, HelperText, Button as PButton } from 'react-native-paper';
import FloatingLabel from 'react-native-floating-labels';
import _ from 'lodash'

import TextInputKeyed from 'app/components/MaterialTextInput/TextInputKeyed'
import CheckBox from 'app/components/CheckBox/CheckBox';
import WButton from 'app/components/Button/WButton';
import ProfileAddress from 'app/screens/profile/ProfileAddress';
import { showAlert } from 'app/utils/notifier'
import assets from '../../utils/assetsObject';
import DropdownMaterial from 'app/components/Dropdown/DropdownMaterial';
import { HeaderBackNativeBase } from '../../components/Header';
import GenericHeader from 'app/components/Header/GenericHeader';
import { strings } from '../../utils/i18n';
import FloatingTextInput from 'app/components/Inputtextbutton/FloatingTextInput';
import { NBRoot } from 'app/components/Root/NBRoot';
import Radio from 'app/components/Radio/Radio'
import Modal from 'app/components/Modal/Modal';

import UserHelper from 'app/config/userHelper'
import { colorresource } from '../../resources/colorresource';
import { fontresource } from 'app/resources/fontresource';
import consts from 'app/utils/const';
import styles from './styles'

// server, store
import { getStatesAction, getCititesAction } from '../../actions/state-actions';
import { showToastAction } from 'app/actions/toast-actions'
import * as kycBankServerHelper from 'app/screens/kycbank/serverHelper';
import * as shipayServerHelper from 'app/screens/shipay/serverHelper';
import * as serverHelper from './serverHelper';
import * as formatHelper from 'app/utils/formatHelper';
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';
import * as shipayActions from 'app/actions/shipay-actions';

import { TestIdGenerator, SuffixedTestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'AddressEditor';
const buttonTestId = TestIdGenerator(screenName,'','Button');
const radioTestId = TestIdGenerator(screenName,'','Radio');
const checkBoxTestId = TestIdGenerator(screenName, '', 'CheckBox')
const inputTestId = TestIdGenerator(screenName,'','Input');
const spinnerTestId = TestIdGenerator(screenName, '', 'Spinner')

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';

const FORM_FIELD_KEYS = {
  FULL_NAME: 'FullName',
  MOBILE_NO: 'MobileNo',
  ADDRESS: 'Address',
  STATE_ID: 'StateId',
  CITY_ID: 'CityId',
  PINCODE: 'Pincode',
}

const testIds = {
  name: inputTestId('Name'),
  first: inputTestId('FirstName'),
  state: spinnerTestId('State'),
  city: spinnerTestId('City'),
  address: inputTestId('Address'),
  mobile: inputTestId('Mobile'),
  save: buttonTestId('SaveChanges'),
}

class AddressEditor extends Component {

  onCheckPincodeDone = () => {
    const serverResult = _.get(this.props.responsePincodes, '[0]')
    if(!serverResult || serverResult.city === parseInt(this.state[FORM_FIELD_KEYS.CITY_ID])) {
      // all ok
      this.updateAddress()
    } else {
      this.showCityChangePopup({stateId: serverResult.state, cityId: serverResult.city})
    }
  }

  onProfileAddressUpdated = async () => {
    this.showToast("Billing Address updated successfully");
    this.goBack();
  }

  showCityChangePopup = ({stateId, cityId}) => {
    showAlert(
      screenName,
      'City Changed', 
      'We have updated the city since the pincode you entered is of a different city',
      (payload) => {
        this.changeAddressStateAndCity(stateId, cityId);
        this.updateAddress(stateId, cityId)
      },
      {stateId, cityId}
    )
  }

  onUpdateAddressDone = () => {
    this.goBack()
    const onUpdateAddress = this.props.navigation.getParam('onUpdateAddress')
    if(onUpdateAddress) {
      onUpdateAddress({address: this.props.responseUpdateAddress})
    }
  }

  updateAddress = (stateId, cityId) => {
    const params = {
      name: this.state[FORM_FIELD_KEYS.FULL_NAME].text,
      phone_number: this.state[FORM_FIELD_KEYS.MOBILE_NO].text,
      street_address: this.state[FORM_FIELD_KEYS.ADDRESS].text,
      state: stateId || this.state[FORM_FIELD_KEYS.STATE_ID].id,
      city: cityId || this.state[FORM_FIELD_KEYS.CITY_ID],
      pincode: this.state[FORM_FIELD_KEYS.PINCODE].text,
    }
    const address = this.getNavParam()
    let addressId
    if(address) {
      addressId = address.id
    }
    this.props.dispatch(shipayActions.updateAddressAction(addressId, params, true))
  }

  getCities = (stateId) => {
    return this.props.citiesByStateId[stateId]
  }

  onCompanyCityChange = (cityId, index) => {
    // console.log("[onCompanyCityChange] cityId", cityId);
    this.setState({[FORM_FIELD_KEYS.CITY_ID]: cityId})
  }

  onCompanyStateChange = (stateId, index) => {
    this.changeAddressStateAndCity(stateId)
  }

  changeAddressStateAndCity = (stateId, cityId) => {
    this.setState({[FORM_FIELD_KEYS.STATE_ID]: {id: stateId},})
    let updatedState = {
      [FORM_FIELD_KEYS.STATE_ID]: {id: stateId} 
    }
    const cities = this.getCities(stateId);
    if(!cities) {
      updatedState[FORM_FIELD_KEYS.CITY_ID] = undefined
      this.setState(updatedState)
      this.props.dispatch(getCititesAction(stateId));
      this.cityIdToBeSet = cityId
    } else {
      cityId = cityId || cities[0].id
      updatedState[FORM_FIELD_KEYS.CITY_ID] = cityId
      this.setState(updatedState)
    }
  }

  onCityListFetched = () => {
    const cities = this.getCities(this.state[FORM_FIELD_KEYS.STATE_ID].id)
    if(!cities) {
      return;
    }

    let cityId = cities[0].id
    if(this.cityIdToBeSet) {
      cityId = this.cityIdToBeSet
      this.cityIdToBeSet = undefined
    }
    this.setState({[FORM_FIELD_KEYS.CITY_ID]: cityId})
  }

  onTextInputChange = ({key, text}) => {
    // console.log("[onTextInputChange] key, text", key, text)
    this.setState({[key]: {text}})
  }
  
  validateForm = () => {
    let result = {};
    let errorMessage = '';

    const name = this.state[FORM_FIELD_KEYS.FULL_NAME].text;
    if(!name) {
      result = {...result, [FORM_FIELD_KEYS.FULL_NAME]: {error: "Name cannot be empty"}}
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
    const stateItem = this.props.stateList.find((item) => item.id == stateId)
    if(!stateItem || stateItem.state_name === '-') {
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
    // console.log("[onSaveChangesPress]");

    const validateResult = this.validateForm()
    // console.log("[onSaveChangesPress] validateResult: ", validateResult);
    if(Object.keys(validateResult).length) {
      this.setState({...validateResult})
      return;
    }

    this.props.dispatch(shipayActions.getPincodesAction({pincode: this.state[FORM_FIELD_KEYS.PINCODE].text}))
  }
  
  goBack = () => {
    this.props.navigation.goBack()
  }

  showToast = (message, duration=1500) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  onStateListFetched = () => {
    const address = this.getNavParam()
    if(address) {
      this.changeAddressStateAndCity(address.state.id, address.city.id)
    } else {
      // nothing to do here, disable loading?
    }
  }

  getNavParam = () => {
    return this.props.navigation.getParam('data')
  }

  initialize = () => {
    // get list of states?
    // get list of cities corresponding to the state?

    let updatedState = {}
    const address = this.getNavParam();

    if(this.props.stateList.length === 0) {
      this.props.dispatch(getStatesAction())
    } else if(address) {
      this.changeAddressStateAndCity(address.state.id, address.city.id)
    }

    if(!address) {
      // we are adding a new address. Set the phone number
      updatedState[FORM_FIELD_KEYS.MOBILE_NO] = { text: UserHelper.getUserMobile() }
    } else {
      // populate the UI
      updatedState = {
        [FORM_FIELD_KEYS.FULL_NAME]: { text: address.name },
        [FORM_FIELD_KEYS.MOBILE_NO]: { text: address.phone_number },
        [FORM_FIELD_KEYS.ADDRESS]: { text: address.street_address },
        [FORM_FIELD_KEYS.PINCODE]: { text: address.pincode + '' }
      }
    }
    this.setState(updatedState)
  }
  
  constructor(props) {
    super(props)
    this.state = {

      [FORM_FIELD_KEYS.FULL_NAME] : {
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
      this.onCityListFetched()
    }

    if(prevProps.stateList !== this.props.stateList && prevProps.stateList.length === 0) {
      // we have fetched the state list from server
      this.onStateListFetched()
    }

    if(prevProps.responseUpdateAddress !== this.props.responseUpdateAddress) {
      this.onUpdateAddressDone()
    }

    if(prevProps.responsePincodes !== this.props.responsePincodes) {
      this.onCheckPincodeDone()
    }
  }

  render() {
    const cities = this.props.citiesByStateId[this.state[FORM_FIELD_KEYS.STATE_ID].id]
    const currentState = this.state[FORM_FIELD_KEYS.STATE_ID]
    const cityId = this.state[FORM_FIELD_KEYS.CITY_ID]

    return (
      <NBRoot style={{flex: 1}}>
      <Container>
      
        <GenericHeader title={this.getNavParam()? 'Update Address' : 'Add New Address'} onPress={this.goBack} />
        <Content contentContainerStyle={{padding: 20}}>
          
          <TextInputKeyed
          label={'Enter Name'}
          error={this.state[FORM_FIELD_KEYS.FULL_NAME].error}
          inputKey={FORM_FIELD_KEYS.FULL_NAME}
          onChange={this.onTextInputChange}
          value={this.state[FORM_FIELD_KEYS.FULL_NAME].text}
          leadingIcon={'person'}
          autofocus={true}
          testId={testIds.first}
          />
          
          <TextInputKeyed
          label={"Mobile number"}
          error={this.state[FORM_FIELD_KEYS.MOBILE_NO].error}
          inputKey={FORM_FIELD_KEYS.MOBILE_NO}
          onChange={this.onTextInputChange}
          value={this.state[FORM_FIELD_KEYS.MOBILE_NO].text}
          leadingIcon={'phone'}
          testId={testIds.mobile}
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
    stateList: state.stateR.states,
    citiesByStateId: state.stateR.citiesByStateId,
    responsePincodes: state.shipayR.responseGetPincodes,
    responseUpdateAddress: state.shipayR.responseUpdateAddress,
  })
}

export default connect(mapStateToProps)(AddressEditor)