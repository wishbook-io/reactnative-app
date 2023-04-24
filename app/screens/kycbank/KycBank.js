import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, Image, Keyboard } from 'react-native';
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
  FooterTab
}from 'native-base'
import _ from 'lodash';

import TextInputKeyed from 'app/components/MaterialTextInput/TextInputKeyed';
import DropdownMaterial from 'app/components/Dropdown/DropdownMaterial';
import GenericHeader from 'app/components/Header/GenericHeader';
import { NBRoot } from 'app/components/Root/NBRoot';
import Radio from 'app/components/Radio/Radio'
import Modal from 'app/components/Modal/Modal';

import UserHelper from 'app/config/userHelper'
import { colorresource } from '../../resources/colorresource';
import { fontresource } from 'app/resources/fontresource';
import { goBack } from 'app/actions/navigation-actions';
import consts from 'app/utils/const';
import { showToastAction } from 'app/actions/toast-actions'
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';

// server
import * as serverHelper from './serverHelper';
import * as formatHelper from 'app/utils/formatHelper';
import * as userActions from 'app/actions/user-actions';

import { TestIdGenerator, SuffixedTestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'KycBankScreen';
const buttonTestId = TestIdGenerator(screenName,'','Button');
const radioTestId = TestIdGenerator(screenName,'','Radio');
const inputTestId = TestIdGenerator(screenName,'','Input');
const spinnerTestId = TestIdGenerator(screenName, '', 'Spinner')

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';

const paddingHorizontal = 20;

const FORM_FIELD_KEYS = {
  PAN: 'Pan',
  GST_NUMBER: 'GstNumber',
  PAYTM_NUMBER: 'PaytmNumber',
  BANK_NAME: 'BankName',
  ACCOUNT_NUMBER: 'AccountNumber',
  IFSC_CODE: 'IfscCode',
  ACCOUNT_TYPE: 'AccountType',
  ACCOUNT_HOLDER_NAME: 'AccountHolderName',
}

const ACCOUNT_TYPE = {
  NONE: 'Account type',
  SAVINGS: 'Savings',
  CURRENT: 'Current',
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

class KycBank extends Component {

  onAccountTypeChange = (value, index) => {
    this.setState({[FORM_FIELD_KEYS.ACCOUNT_TYPE]: value})
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

  onProfilePatched = ({response, error}) => {
    this.props.dispatch(requestHideLoaderAction(screenName))
    if(error.length > 0) {
      const [{title, message}, ...rest] = formatHelper.formatErrorFromServer(error[0])
      this.setState({isErrorModalVisible: true, errorModalContent: {title, message}})
    } else {
      this.showToast("Profile updated successfully");
    }
  }

  onTextInputChange = ({key, text}) => {
    // console.log("[onTextInputChange] key, text", key, text)
    this.setState({[key]: {text}})
  }

  validateForm = () => {
    let result = {};
    let errorMessage = '';

    const pan = this.state[FORM_FIELD_KEYS.PAN].text;
    if(pan.length > 0 && pan.length != 10) {
      result = {...result, [FORM_FIELD_KEYS.PAN]: {text: pan, error: "Enter a valid PAN"}}
    }

    const gstNo = this.state[FORM_FIELD_KEYS.GST_NUMBER].text;
    if(gstNo.length > 0 && gstNo.length != 15) {
      result = {...result, [FORM_FIELD_KEYS.GST_NUMBER]: {text: gstNo, error: "Enter a valid GST no."}}
    }

    const paytmNo = this.state[FORM_FIELD_KEYS.PAYTM_NUMBER].text;
    if(paytmNo.length > 0 && paytmNo.length != 10) {
      result = {...result, [FORM_FIELD_KEYS.PAYTM_NUMBER]: {text: paytmNo, error: "Enter a valid Paytm no."}}
    }

    const bankName = this.state[FORM_FIELD_KEYS.BANK_NAME].text;
    if(bankName.length > 0 && bankName.length < 2) {
      result = {...result, [FORM_FIELD_KEYS.BANK_NAME]: {text: bankName, error: "Enter a valid Bank name"}}
    }

    const accountNo = this.state[FORM_FIELD_KEYS.ACCOUNT_NUMBER].text;
    if((accountNo.length > 0 && accountNo.length < 2) || !accountNo.match(/^\d+$/)) {
      result = {...result, [FORM_FIELD_KEYS.ACCOUNT_NUMBER]: {text: accountNo, error: "Enter a valid Account no."}}
    }

    const ifscCode = this.state[FORM_FIELD_KEYS.IFSC_CODE].text;
    if(ifscCode.length > 20) {
      result = {...result, [FORM_FIELD_KEYS.IFSC_CODE]: {text: ifscCode, error: "Enter a valid IFSC code"}}
    }

    const holder = this.state[FORM_FIELD_KEYS.ACCOUNT_HOLDER_NAME].text;
    if(holder.length > 0 && holder.length < 2) {
      result = {...result, [FORM_FIELD_KEYS.ACCOUNT_HOLDER_NAME]: {text: holder, error: "Enter a valid name"}}
    }

    return result;
  }

  updateKycBankDetails = async () => {
    const accountType = this.state[FORM_FIELD_KEYS.ACCOUNT_TYPE]
    const bankDetailsParams = {
      bank_name: this.state[FORM_FIELD_KEYS.BANK_NAME].text,
      account_number: this.state[FORM_FIELD_KEYS.ACCOUNT_NUMBER].text,
      ifsc_code: this.state[FORM_FIELD_KEYS.IFSC_CODE].text,
      account_name: this.state[FORM_FIELD_KEYS.ACCOUNT_HOLDER_NAME].text,
      ...(accountType !== ACCOUNT_TYPE.NONE? {account_type: accountType} : {})
    }
    const bankDetailsId = _.get(this.props.responseBankDetails, '[0].id');

    const kycParams = {
      gstin: this.state[FORM_FIELD_KEYS.GST_NUMBER].text,
      pan: this.state[FORM_FIELD_KEYS.PAN].text,
    }
    const kycId = _.get(this.props.responseKycDetails, '[0].id');

    this.props.dispatch(requestShowLoaderAction(screenName))
    const [resultBankDetails, resultKyc] = await Promise.all([
      serverHelper.updateBankDetails(bankDetailsParams, bankDetailsId),
      serverHelper.updateKyc(kycParams, kycId),
    ])
    this.props.dispatch(requestHideLoaderAction(screenName))
    if(resultBankDetails.response && resultKyc.response) {
      this.showToast("Data saved successfully")
      setTimeout(goBack, 1500);
    }
  }
  
  onSavePress = () => {
    Keyboard.dismiss();
    // console.log("[onSavePress]");

    const validateResult = this.validateForm()
    // console.log("[onSavePress] validateResult: ", validateResult);
    if(Object.keys(validateResult).length) {
      this.setState({...validateResult})
      return;
    }
    this.updateKycBankDetails()
  }

  showToast = (message, duration=1500) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  initialize = async () => {
    this.props.dispatch(requestShowLoaderAction(screenName))
    const [resultBankDetails, resultKycDetails] = await Promise.all([serverHelper.getBankDetails(), serverHelper.getKycDetails()]);
    this.props.dispatch(requestHideLoaderAction(screenName))
    if(resultBankDetails.error || resultKycDetails.error) {
      console.log("[initialize] result has error", {bankDetails: resultBankDetails.error, kycDetails: resultKycDetails.error})
      return;
    }

    let updatedState = { }
    const kycDetails = _.get(resultKycDetails.response, '[0]', null)
    if(kycDetails) {
      updatedState = {
        ...updatedState,
        [FORM_FIELD_KEYS.GST_NUMBER]: {text: kycDetails.gstin || ''},
        [FORM_FIELD_KEYS.PAN]: {text: kycDetails.pan || ''}
      }
    }

    const bankDetails = _.get(resultBankDetails.response, '[0]', null)
    if(bankDetails) {
      const accountType = (bankDetails.account_type || '').toUpperCase();
      let selectedAccountType = ACCOUNT_TYPE.NONE;
      if(accountType === 'SAVINGS') {
        selectedAccountType = ACCOUNT_TYPE.SAVINGS
      } else if(accountType === 'CURRENT') {
        selectedAccountType = ACCOUNT_TYPE.CURRENT
      }
      updatedState = {
        ...updatedState,
        [FORM_FIELD_KEYS.ACCOUNT_HOLDER_NAME]: {text: bankDetails.account_name || ''},
        [FORM_FIELD_KEYS.ACCOUNT_NUMBER]: {text: bankDetails.account_number || ''},
        [FORM_FIELD_KEYS.BANK_NAME]: {text: bankDetails.bank_name || ''},
        [FORM_FIELD_KEYS.IFSC_CODE]: {text: bankDetails.ifsc_code || ''},
        [FORM_FIELD_KEYS.ACCOUNT_TYPE]: selectedAccountType,
      }
    }

    this.setState(updatedState)
  }
  
  constructor(props) {
    super(props)
    this.state = {

      isErrorModalVisible: false,
      errorModalContent: {
        title: 'Error',
        message: 'Oops! Something went wrong',
      },

      [FORM_FIELD_KEYS.PAN] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.GST_NUMBER] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.PAYTM_NUMBER] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.BANK_NAME] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.ACCOUNT_NUMBER] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.IFSC_CODE] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.ACCOUNT_HOLDER_NAME] : {
        text: '',
        error: null,
      },

      [FORM_FIELD_KEYS.ACCOUNT_TYPE]: ACCOUNT_TYPE.NONE,
    }
  }
  
  componentDidMount() {
    waitTillUserInfoIsFetched().then(() => {
      this.initialize();
    })
  }
  
  render() {
    return (
      <NBRoot>
      <Container style={{backgroundColor: colorresource.greybg}}>
      
        <GenericHeader
        title={'KYC and Bank Details'}
        />
        <Content>
          <View style={{backgroundColor: 'white', paddingLeft: paddingHorizontal, paddingRight: paddingHorizontal, paddingBottom: paddingHorizontal}}>

            {UserHelper.isUserBuyer()? 
              <TextInputKeyed
              label={'Enter PAN'}
              error={this.state[FORM_FIELD_KEYS.PAN].error}
              inputKey={FORM_FIELD_KEYS.PAN}
              onChange={this.onTextInputChange}
              value={this.state[FORM_FIELD_KEYS.PAN].text}
              testId={testIds.first}
              />
            : null}

            <TextInputKeyed
            label={'Enter GST number'}
            error={this.state[FORM_FIELD_KEYS.GST_NUMBER].error}
            inputKey={FORM_FIELD_KEYS.GST_NUMBER}
            onChange={this.onTextInputChange}
            value={this.state[FORM_FIELD_KEYS.GST_NUMBER].text}
            testId={testIds.first}
            />
            
          </View>

          <View style={{backgroundColor: 'white', marginTop: 10, padding: paddingHorizontal}}>
            <Text style={{color: colorresource.liteblue, fontSize: 16, marginLeft: -5}}>Bank Details</Text>
            <TextInputKeyed
            label={'Bank name'}
            error={this.state[FORM_FIELD_KEYS.BANK_NAME].error}
            inputKey={FORM_FIELD_KEYS.BANK_NAME}
            onChange={this.onTextInputChange}
            value={this.state[FORM_FIELD_KEYS.BANK_NAME].text}
            testId={testIds.first}
            />

            <TextInputKeyed
            label={'Account number'}
            error={this.state[FORM_FIELD_KEYS.ACCOUNT_NUMBER].error}
            inputKey={FORM_FIELD_KEYS.ACCOUNT_NUMBER}
            onChange={this.onTextInputChange}
            value={this.state[FORM_FIELD_KEYS.ACCOUNT_NUMBER].text}
            textInputProps={{
              keyboardType: 'number-pad',
            }}
            testId={testIds.first}
            />

            <TextInputKeyed
            label={'IFSC code'}
            error={this.state[FORM_FIELD_KEYS.IFSC_CODE].error}
            inputKey={FORM_FIELD_KEYS.IFSC_CODE}
            onChange={this.onTextInputChange}
            value={this.state[FORM_FIELD_KEYS.IFSC_CODE].text}
            textInputProps = {{
              autoCapitalize: 'characters',
            }}
            testId={testIds.first}
            />

            <DropdownMaterial
            mode="dropdown"
            label={"Select Account type"}
            selectedValue={this.state[FORM_FIELD_KEYS.ACCOUNT_TYPE]}
            onValueChange={this.onAccountTypeChange}
            parentStyle={{ marginBottom: 30 }}
            testId = {testIds.state}
            >
              <Picker.Item label={ACCOUNT_TYPE.NONE} value={ACCOUNT_TYPE.NONE}/>
              <Picker.Item label={ACCOUNT_TYPE.SAVINGS} value={ACCOUNT_TYPE.SAVINGS}/>
              <Picker.Item label={ACCOUNT_TYPE.CURRENT} value={ACCOUNT_TYPE.CURRENT}/>
            </DropdownMaterial>

            <TextInputKeyed
            label={'Account holder name'}
            error={this.state[FORM_FIELD_KEYS.ACCOUNT_HOLDER_NAME].error}
            inputKey={FORM_FIELD_KEYS.ACCOUNT_HOLDER_NAME}
            onChange={this.onTextInputChange}
            value={this.state[FORM_FIELD_KEYS.ACCOUNT_HOLDER_NAME].text}
            testId={testIds.first}
            />
          </View>

        </Content>
        <Footer>
          <FooterTab>
            <Button full style={{ backgroundColor: colorresource.liteblue }} onPress={this.onSavePress} {...testIds.save}>
              <Text style={{ color: colorresource.white, fontSize: 15 }}>{'Save'}</Text>
            </Button>
          </FooterTab>
        </Footer>

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
      </Container>
      </NBRoot>
    );
  }
}
  
const mapStateToProps = (state) => {
  return ({
    responseBankDetails: state.userR.responseGetBankDetails,
    responseKycDetails: state.userR.responseGetKyc,
  })
}

export default connect(mapStateToProps)(KycBank)

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