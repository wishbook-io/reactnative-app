import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Image, Keyboard, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
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
}from 'native-base'
import { FAB } from 'react-native-paper';
import FloatingLabel from 'react-native-floating-labels';
import Dialog from 'react-native-dialog';
import _ from 'lodash';

import { ProfileTextInput } from '../profile/ProfileScreen';
import GenericHeader from 'app/components/Header/GenericHeader';
import { NBRoot } from 'app/components/Root/NBRoot';
import Radio from 'app/components/Radio/Radio'
import Modal from 'app/components/Modal/Modal';

import UserHelper from 'app/config/userHelper'
import { colorresource } from 'app/resources/colorresource';
import { fontresource } from 'app/resources/fontresource';
import { goBack } from 'app/actions/navigation-actions';
import consts from 'app/utils/const';

// server
import { getStatesAction, getCititesAction } from 'app/actions/state-actions';
import { getListOfCities } from 'app/saga/state-saga';
import { showToastAction } from 'app/actions/toast-actions'
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';
import * as serverHelper from 'app/screens/shipay/serverHelper';
import * as formatHelper from 'app/utils/formatHelper';
import * as userActions from 'app/actions/user-actions';
import { execute } from 'app/config/saga';

import { TestIdGenerator, SuffixedTestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'ResellAddresses';
const buttonTestId = TestIdGenerator(screenName,'','Button');
const radioTestId = TestIdGenerator(screenName,'','Radio');
const inputTestId = TestIdGenerator(screenName,'','Input');
const spinnerTestId = TestIdGenerator(screenName, '', 'Spinner')

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';

const FORM_FIELD_KEYS = {
  NAME: 'Name',
  PHONE: 'PhoneNumber',
  ADDRESS: 'Address',
  STATE_ID: 'StateId',
  CITY_ID: 'CityId',
  PINCODE: 'Pincode',
}

const testIds = {
  first: inputTestId('FirstName'),
  last: inputTestId('LastName'),
  username: inputTestId('UserName'),
  company: inputTestId('CompanyName'),
  state: spinnerTestId('State'),
  city: spinnerTestId('City'),
  email: inputTestId('Email'),
  country: spinnerTestId('Country'),
  mobile: inputTestId('Mobile'),
  noShare: radioTestId('NoShare'),
  yesShare: radioTestId('YesShare'),
  otp: inputTestId('Otp'),
  save: buttonTestId('Save'),
}

const { width, height } = Dimensions.get('window')

class ResellAddresses extends Component {

  onDeleteModalDeletePress = async () => {
    if(!this.indexToBeDeleted) {
      return;
    }
    const idToBeDeleted = this.state.addresses[this.indexToBeDeleted].id
    this.indexToBeDeleted = null;
    this.setState({deleteModalVisible: false})
    this.props.dispatch(requestShowLoaderAction(screenName))
    const { response, error } = await serverHelper.deleteAddress({id: idToBeDeleted})
    if(response) {
      this.initialize();
    } else {
      this.props.dispatch(requestHideLoaderAction(screenName))
    }
  }

  onDeleteModalCancelPress = () => {
    this.setState({deleteModalVisible: false})
    this.indexToBeDeleted = null;
  }

  onTrashPress = (index) => {
    this.indexToBeDeleted = index;
    this.setState({deleteModalVisible: true})
  }

  onContentSizeChange = (w, h) => {
    console.log("onContentSizeChange: w, h", w, h);
    if(h < height) {
      this.setState({kavStyles: {height: h}})
    } else {
      this.setState({kavStyles: {flex: 1}})
    }
  }

  getCities = (stateId) => {
    return this.props.citiesByStateId[stateId]
  }

  onAddressCityChange = (cityId, index) => {
    this.setState({[FORM_FIELD_KEYS.CITY_ID]: cityId})
  }

  onAddressStateChange = async (stateId, index) => {
    const cities = this.getCities(stateId);
    if(!cities) {
      this.props.dispatch(requestShowLoaderAction(screenName))
      const { response: citiesResponse, error: citiesError } = await execute(getListOfCities, getCititesAction(stateId))
      this.setState({[FORM_FIELD_KEYS.STATE_ID]: {id: stateId}, [FORM_FIELD_KEYS.CITY_ID]: citiesResponse[0].id})
      this.props.dispatch(requestHideLoaderAction(screenName))

    } else {
      this.setState({[FORM_FIELD_KEYS.STATE_ID]: {id: stateId}, [FORM_FIELD_KEYS.CITY_ID]: cities[0].id})
    }
  }

  onAddAddressPress = () => {
    console.log("[onAddAddressPress]");
    this.setState({addModalVisible: true,})
  }

  setErrorModalVisibility = (visible, content) => {
    let newState = {isErrorModalVisible: visible}
    if(content) {
      newState['errorModalContent'] = content;
    }
    this.setState(newState);
  }

  setShowErrorModal = (text) => {
    this.setErrorModalVisibility(true, text);
  }

  setHideErrorModal = () => {
    this.setErrorModalVisibility(false);
  }

  onTextInputChange = ({key, text}) => {
    console.log("[onTextInputChange] key, text", key, text)
    this.setState({[key]: {text}})
  }

  validateForm = () => {
    let result = {};

    const name = this.state[FORM_FIELD_KEYS.NAME].text
    if(!name) {
      result = {...result, [FORM_FIELD_KEYS.NAME]: {text: '', error: "Please enter a name"}}
    }

    const phone = this.state[FORM_FIELD_KEYS.PHONE].text
    const numberRegex = new RegExp('([6789][\\d]{9})')
    const phoneMatch = phone.match(numberRegex)
    if(!phoneMatch) {
      result = {...result, [FORM_FIELD_KEYS.PHONE]:{text: phone, error: "Please enter a valid phone number"}};
    }

    const address = this.state[FORM_FIELD_KEYS.ADDRESS].text;
    if(!address) {
      result = {...result, [FORM_FIELD_KEYS.ADDRESS]: {text: address, error: "Please enter an address"}}
    }

    const pincode = this.state[FORM_FIELD_KEYS.PINCODE].text;
    if(!pincode || pincode.length !== 6) {
      result = {...result, [FORM_FIELD_KEYS.PINCODE]: {text: pincode, error: "Please enter a valid pincode"}}
    }

    const stateId = this.state[FORM_FIELD_KEYS.STATE_ID].id
    const addressState = this.props.stateList.find(state => state.id === stateId)
    if(!addressState || addressState.state_name === '-') {
      this.showToast("Please select a state");
      return {...result, [FORM_FIELD_KEYS.STATE_ID]: {id: 0}}
    }

    return result;
  }

  onSaveAddress = ({ response, error}) => {
    if(error) {
      this.props.dispatch(requestHideLoaderAction(screenName))
    } else {
      this.setState({...this.getInitialFormState, addModalVisible: false,});
      this.initialize();
    }
  }

  onCancelPress = () => {
    this.setState({...this.getInitialFormState, addModalVisible: false,});
  }
  
  onOkPress = async () => {
    Keyboard.dismiss();
    console.log("[onOkPress]");

    const validateResult = this.validateForm()
    console.log("[onOkPress] validateResult: ", validateResult);
    if(Object.keys(validateResult).length) {
      this.setState({...validateResult})
      return;
    }
    this.props.dispatch(requestShowLoaderAction(screenName))
    const params = {
      name: this.state[FORM_FIELD_KEYS.NAME].text,
      phone_number: this.state[FORM_FIELD_KEYS.PHONE].text,
      street_address: this.state[FORM_FIELD_KEYS.ADDRESS].text,
      state: this.state[FORM_FIELD_KEYS.STATE_ID].id,
      city: this.state[FORM_FIELD_KEYS.CITY_ID],
      pincode: this.state[FORM_FIELD_KEYS.PINCODE].text,
    }
    serverHelper.saveAddress(params).then(this.onSaveAddress);
  }

  showToast = (message, duration=1500) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  getDisplayedAddress = ({street_address: address = '', state = {}, city = {}, pincode = ''}) => {
    let displayedAddress = address || '';

    let prefix = address? ', ' : ''
    displayedAddress += state.state_name? prefix + state.state_name : '';
    
    prefix = displayedAddress? ', ' : ''
    displayedAddress += city.city_name? prefix + city.city_name : '';

    prefix = displayedAddress? ' - ' : '';
    displayedAddress += pincode? prefix + pincode : '';

    return displayedAddress.trim();
  }

  initialize = async () => {
    // responsibility of caller
    // to set loading

    if(this.props.stateList.length === 0) {
      this.props.dispatch(getStatesAction())
    }
    const { response, error } = await serverHelper.fetchAddresses()
    if(error) {
      console.log("[ResellAddresses:initialize] FATAL: fetch addresses failed")
      return;
    }
    const addresses = response.map((address) => {
      
      return ({
        name: address.name,
        phone: address.phone_number,
        displayedAddress: this.getDisplayedAddress(address),
        id: address.id,
      })
    })
    let updatedState = {
      addresses,
    }
    this.setState(updatedState)
    this.props.dispatch(requestHideLoaderAction(screenName))
  }

  getInitialFormState = () => {
    return ({
      [FORM_FIELD_KEYS.NAME] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.PHONE] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.ADDRESS] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.STATE_ID] : {id: 0},

      [FORM_FIELD_KEYS.CITY_ID] : 0,

      [FORM_FIELD_KEYS.PINCODE] : {
        text: '',
        error: null,
      },
    })
  }
  
  constructor(props) {
    super(props)
    this.state = {

      addresses: [],
      addModalVisible: false,
      deleteModalVisible: false,

      kavStyles: {
        flex: 1
      },

      indexToBeDeleted: null,

      isErrorModalVisible: false,
      errorModalContent: {
        title: 'Error',
        message: 'Oops! Something went wrong',
      },

      ...this.getInitialFormState()
    }
  }
  
  componentDidMount() {
    waitTillUserInfoIsFetched().then(() => {
      this.props.dispatch(requestShowLoaderAction(screenName))
      this.initialize();
    })
  }
  
  render() {
    const cities = this.props.citiesByStateId[this.state[FORM_FIELD_KEYS.STATE_ID].id]
    const currentState = this.state[FORM_FIELD_KEYS.STATE_ID]
    return (
      <NBRoot>
      <Container style={{backgroundColor: 'white'}}>
        <Content style={{backgroundColor: colorresource.materialbg,}}>
          <FlatList
          data={this.state.addresses}
          contentContainerStyle={{backgroundColor: 'white', paddingLeft: 10, paddingRight: 10, paddingBottom: 8}}
          renderItem={({item, index}) => {
            return(
              <View style={{marginTop: 5}}>
                <View style={{
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  // borderWidth: 1, 
                  // borderColor: 'black'
                }}>
                  <View style={{marginRight: 10}}>
                    {item.name? <Text style={localStyles.addressName}>{item.name}</Text> : null}
                    {item.phone? <Text style={localStyles.addressPhone}>{item.phone}</Text> : null}
                  </View>
                  <TouchableOpacity 
                  onPress={() =>  this.onTrashPress(index)}
                  style={{
                    alignSelf: 'center',
                    paddingRight: 10,
                    // borderWidth: 1, 
                    // borderColor: 'black'
                  }}>
                    <Icon name='trash' style={{color: colorresource.gray, fontSize: 24}}/>
                  </TouchableOpacity>
                </View>
                <Text style={{
                  fontSize: 12,
                  color: colorresource.liteblack,
                }}>{item.displayedAddress}</Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{marginTop: 8, backgroundColor: colorresource.divider, height: 1,}}/>}
          keyExtractor={(item, index) => item.id.toString()}
          />
        </Content>

        <FAB
        style={{bottom: 0, right: 0, margin: 16, position: 'absolute', backgroundColor: colorresource.liteblue}}
        icon={'add'}
        onPress={this.onAddAddressPress}
        />

        <Modal
        // style={{margin: 0}} 
        onBackdropPress={this.onCancelPress}
        isVisible={this.state.addModalVisible}
        >
          <KeyboardAvoidingView style={{...this.state.kavStyles}}>
            <Content style={{backgroundColor: 'white', paddingLeft: 20, paddingRight: 20, borderRadius: 3}} onContentSizeChange={this.onContentSizeChange}>
              <Text style={{fontSize: 16, color: colorresource.liteblue, marginTop: 20}}>Add new customer address</Text>
              <ProfileTextInput
              label={'Name'}
              error={this.state[FORM_FIELD_KEYS.NAME].error}
              inputKey={FORM_FIELD_KEYS.NAME}
              onChange={this.onTextInputChange}
              value={this.state[FORM_FIELD_KEYS.NAME].text}
              required={false}
              hideLeadingIcon={true}
              labelStyle={labelStyle}
              textInputStyle={textInputStyle}
              testId={testIds.first}
              />

              <ProfileTextInput
              label={'Phone number'}
              error={this.state[FORM_FIELD_KEYS.PHONE].error}
              inputKey={FORM_FIELD_KEYS.PHONE}
              onChange={this.onTextInputChange}
              value={this.state[FORM_FIELD_KEYS.PHONE].text}
              required={false}
              hideLeadingIcon={true}
              labelStyle={labelStyle}
              textInputStyle={textInputStyle}
              textInputProps={{
                keyboardType: 'number-pad',
              }}
              testId={testIds.first}
              />

              <ProfileTextInput
              label={'Address'}
              error={this.state[FORM_FIELD_KEYS.ADDRESS].error}
              inputKey={FORM_FIELD_KEYS.ADDRESS}
              onChange={this.onTextInputChange}
              value={this.state[FORM_FIELD_KEYS.ADDRESS].text}
              required={false}
              hideLeadingIcon={true}
              labelStyle={labelStyle}
              textInputStyle={textInputStyle}
              textInputProps={{
                multiline: true,
              }}
              testId={testIds.first}
              />
              <View>
                <Picker
                mode="dropdown"
                selectedValue={currentState.id}
                onValueChange={this.onAddressStateChange}
                {...testIds.state}
                >
                  {
                    this.props.stateList.map((item, key) => {
                    return (<Picker.Item label={item.state_name} value={item.id} key={item.id}/>);
                    })
                  }
                </Picker>
              </View>

              <View>
                <Picker
                mode="dropdown"
                selectedValue={this.state[FORM_FIELD_KEYS.CITY_ID]}
                onValueChange={this.onAddressCityChange}
                {...testIds.city}
                >
                  {cities && cities.map((item, index) => <Picker.Item label={item.city_name} value={item.id} key={item.id}/>)}
                </Picker>
              </View>

              <ProfileTextInput
              label={'Pincode'}
              error={this.state[FORM_FIELD_KEYS.PINCODE].error}
              inputKey={FORM_FIELD_KEYS.PINCODE}
              onChange={this.onTextInputChange}
              value={this.state[FORM_FIELD_KEYS.PINCODE].text}
              required={false}
              hideLeadingIcon={true}
              labelStyle={labelStyle}
              textInputStyle={textInputStyle}
              textInputProps={{
                keyboardType: 'number-pad',
              }}
              testId={testIds.first}
              />

              <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginBottom: 20}}> 
                <Button style={{backgroundColor: 'white', elevation: 0,}} onPress={this.onCancelPress}>
                  <Text style={{color: colorresource.liteblack}}>cancel</Text>
                </Button>
                <Button style={{backgroundColor: 'white', elevation: 0,}} onPress={this.onOkPress}>
                  <Text style={{color: colorresource.liteblue}}>ok</Text>
                </Button>
              </View>
            </Content>
          </KeyboardAvoidingView>
        </Modal>
        

        <Modal
        // onBackdropPress={this.setHideErrorModal}
        isVisible={this.state.isErrorModalVisible}
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
        
        <Dialog.Container visible={this.state.deleteModalVisible}>
          <Dialog.Title>{'Delete Address'}</Dialog.Title>
          <Dialog.Description>{'Are you sure you want to delete this address?'}</Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.onDeleteModalCancelPress}/>
          <Dialog.Button label="Delete" onPress={this.onDeleteModalDeletePress}/>
        </Dialog.Container>
        
      </Container>
      </NBRoot>
    );
  }
}
  
const mapStateToProps = (state) => {
  return ({
    stateList: state.stateR.states,
    citiesByStateId: state.stateR.citiesByStateId,
  })
}

export default connect(mapStateToProps)(ResellAddresses)

const localStyles = EStyleSheet.create({
  addressName: {
    fontFamily: fontresource.medium,
    fontSize: 14,
    color: colorresource.liteblack,
  },
  addressPhone: {
    // fontFamily: fontresource.medium,
    fontSize: 14,
    color: colorresource.liteblack,
  }
})

const textInputStyle= {
  fontSize: 15,
}

const labelStyle = {
  focussed: {
    color: colorresource.liteblue,
    fontSize: 12,
  },
  blurred: {
    color: colorresource.gray,
    fontSize: 14,
  },
  blurredFloating: {
    color: colorresource.gray,
    fontSize: 12,
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

/*
(10:20:23  IST) Akash:
http://b2b.wishbook.io/api/admin/api/resellerpayment/add/
(10:20:32  IST) Akash:
http://b2b.wishbook.io/api/admin/api/resellersettlementitem/
*/