import React, { Component } from 'react'
import { View, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, Clipboard, Share } from 'react-native';
import { Text, Button, Content, DatePicker } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux'

import Modal from 'app/components/Modal/Modal';
import FloatingTextInput from 'app/components/Inputtextbutton/FloatingTextInput';
import consts from 'app/utils/const';
import { formatDate } from 'app/utils/dateHelper'
import { colorresource } from 'app/resources/colorresource';

import { showToastAction } from 'app/actions/toast-actions';

const { width, height } = Dimensions.get('window')


const OFFLINE_MODES = {
  CHEQUE: 'CHEQUE',
  OTHER: 'OTHER',
  NEFT: 'NEFT',
}

class PaymentModeModal extends Component {

  showToast = (message, duration=1000) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  onSharePress = async () => {
    try {
      const result = await Share.share({
        message: consts.PAYMENT_DETAILS,
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  onCopyPress = () => {
    Clipboard.setString(consts.PAYMENT_DETAILS);
    // this.props.dispatch(showToastAction("Copied to clipboard"))
    this.showToast("Copied to clipboard")
  }

  getParamsFromState = () => {
    let params = {};
    const type = this.props.type.display_name;
    const other = type === OFFLINE_MODES.OTHER;
    const cheque = type === OFFLINE_MODES.CHEQUE;
    const neft = type === OFFLINE_MODES.NEFT;
    if(other) {
      params.details = this.state.paymentDetails.text;
    } else if(cheque) {
      params.details = "Bank Name=" + this.state.bankName.text.trim();
      params.details += "\nCheque No=" + this.state.chequeNumber.text.trim();
    } else if(neft) {
      params.details = "Transaction ID=" + this.state.transactionId.text.trim();
    }
    const {year, month, day} = this.state.date
    const dateObj = new Date(year, month, day)
    const date = formatDate(dateObj, 'Y-MM-DD')
    params.date = date;
    console.log("[getParamsFromState] params: ", params)
    return params;
  }

  validate = () => {
    let validateResult = null;
    const type = this.props.type.display_name;
    const other = type === OFFLINE_MODES.OTHER;
    const cheque = type === OFFLINE_MODES.CHEQUE;
    const neft = type === OFFLINE_MODES.NEFT;

    // date will be valid, so no need to check
    // amount will also be valid

    if(neft) {
      if(!this.state.transactionId.text) {
        validateResult = {transactionId: {error: "Transaction Id cannot be empty!"}}
      }
    } else if(cheque) {
      if(!this.state.bankName.text) {
        validateResult = {bankName: {error: "Bank name cannot be empty!"}}
      } else if(!this.state.chequeNumber.text) {
        validateResult = {chequeNumber: {error: "Cheque number cannot be empty!"}}
      }
    } else if(other) {
      if(!this.state.paymentDetails.text) {
        validateResult = {paymentDetails: {error: "Payment details cannot be empty!"}}
      }
    }
    return validateResult;
  }

  onCancelPress = () => {
    this.setState(this.getInitialState())
    console.log("[onCancelPress] type: ", this.props.type)
    this.props.onModalCancelPress()
  }

  onSavePress = () => {
    const validateResult = this.validate();
    if(validateResult) {
      this.setState(validateResult)
      return;
    }
    this.props.onModalSavePress(this.getParamsFromState())
  }

  onBankNameChange = (text) => {
    this.setState({bankName: {text}});
  }
  
  onChequeNumberChange = (text) => {
    this.setState({chequeNumber: {text}})
  }

  onTransactionIdChange = (text) => {
    this.setState({transactionId: {text}})
  }

  onPaymentDetailsChange = (text) => {
    this.setState({paymentDetails: {text}})
  }

  setDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    // console.log("year, month, day", year, month, day)
    this.setState({date: {year, month, day}})
  }

  formatChosenDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dateArray = [day, month+1, year].map(String);
    return dateArray.join('-');
  }

  onContentSizeChange = (w, h) => {
    if(this.throttled) {
      return;
    }
    this.throttled = true;
    setTimeout(() => this.throttled = false, 1000);
    console.log("onContentSizeChange: w, h", w, h);
    if(h < height) {
      this.setState({kavStyles: {height: h}})
    } else {
      this.setState({kavStyles: {flex: 1}})
    }
  }

  getInitialState = () => {
    return ({
      date: {
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth(),
        day: (new Date()).getDate(),
      },

      bankName: {
        text: '',
        error: null,
      },

      chequeNumber: {
        text: '',
        error: null,
      },

      transactionId: {
        text: '',
        error: null,
      },

      paymentDetails: {
        text: '',
        error: null,
      },
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.getInitialState(),
      kavStyles: {
        flex: 1
      }
    }
  }

  render() {
    if(!this.props.showModal) {
      return null;
    }
    const type = this.props.type.display_name;
    const other = type === OFFLINE_MODES.OTHER;
    const cheque = type === OFFLINE_MODES.CHEQUE;
    const neft = type === OFFLINE_MODES.NEFT;
    const testIds = this.props.testIds;
    return (
      <Modal isVisible={true} style={{margin: 0}} onBackdropPress={this.onCancelPress}>
      <KeyboardAvoidingView style={{...this.state.kavStyles}}>
        <Content 
        style={{backgroundColor: 'white', paddingLeft: 20, paddingRight: 20,}} 
        enableResetScrollToCoords={false}
        onContentSizeChange={this.onContentSizeChange}>
          <View style={{paddingTop: 20, paddingBottom: 20}}>
          <Text style={{fontSize: 18, color: colorresource.liteblack}}>Payment</Text>

          {other?
            <View style={{marginTop: 10}}>
              <Text style={localStyles.paymentText}>{consts.PAYMENT_NOTE_OTHER}</Text>
            </View>
            : null}

          {cheque?
            <View style={{marginTop: 10}}>
              <Text style={localStyles.paymentText}>{consts.PAYMENT_NOTE_CHEQUE}</Text>
            </View>
            : null}
          
          {(cheque || neft)?
            <View style={{marginTop: 10}}>
              <Text style={localStyles.paymentText}>{consts.PAYMENT_DETAILS}</Text>
            </View>
            : null}

          {(cheque || neft)?
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
              <View>
                <Text uppercase style={localStyles.detailsButtonText} onPress={this.onCopyPress}>COPY DETAILS</Text>
              </View>
              <View style={{marginLeft: 5}}>
                <Text uppercase style={localStyles.detailsButtonText} onPress={this.onSharePress}>SHARE DETAILS</Text>
              </View>
            </View>
            : null}
          
          <View style={{height: 10}}/>
          
          <View style={{borderBottomColor: colorresource.grey62, borderBottomWidth: 0.5, marginBottom: 10}}>
            <Text style={{fontSize: 12, color: colorresource.grey46}}>Date</Text>
            <DatePicker
            defaultDate={new Date(this.state.date.year, this.state.date.month, this.state.date.day)}
            // minimumDate={new Date(2018, 1, 1)}
            // maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            // placeHolderText={this.props.dispatchDate? undefined : "Select dispatch date"}
            textStyle={{marginLeft: -5, fontSize: 15, color: colorresource.grey900}}
            // placeHolderTextStyle={localStyles.DateSelectorText}
            onDateChange={this.setDate}
            formatChosenDate={this.formatChosenDate}
            disabled={false}
            />
          </View>

          <FloatingTextInput
          label={'Amount'}
          defaultValue={this.props.amount}
          textInputProps={{
            editable: false
          }}
          textColor={'grey'}
          inputTestId={testIds.Amount}
          />

          {cheque?
            <FloatingTextInput
            label={'Enter bank name'}
            defaultValue={this.state.bankName.text}
            onChangeText={this.onBankNameChange}
            error={this.state.bankName.error}
            inputTestId={testIds.BankName}
            />
            : null}

          {cheque? 
            <FloatingTextInput
            label={'Enter cheque number'}
            defaultValue={this.state.chequeNumber.text}
            onChangeText={this.onChequeNumberChange}
            error={this.state.chequeNumber.error}
            inputTestId={testIds.ChequeNumber}
            />
            : null}

          {neft?
            <FloatingTextInput
            label={'Enter transaction Id.'}
            defaultValue={this.state.transactionId.text}
            onChangeText={this.onTransactionIdChange}
            error={this.state.transactionId.error}
            inputTestId={testIds.TransactionId}
            />
            : null}

          {other?
            <FloatingTextInput
            label={'Enter payment details'}
            defaultValue={this.state.paymentDetails.text}
            onChangeText={this.onPaymentDetailsChange}
            error={this.state.paymentDetails.error}
            inputTestId={testIds.PaymentDetails}
            />
            : null}

          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
            <Button style={{backgroundColor: colorresource.liteblue, flex: 1, marginRight: 5,}} onPress={this.onCancelPress} {...testIds.Cancel}>
              <Text style={{textAlign: 'center', flex: 1}}>CANCEL</Text>
            </Button>
            <Button style={{backgroundColor: colorresource.liteblue, flex: 1, marginLeft: 5}} onPress={this.onSavePress} {...testIds.Save}>
              <Text style={{textAlign: 'center', flex: 1}}>SAVE</Text>
            </Button>
          </View>
          </View>
          
        </Content>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const localStyles = EStyleSheet.create({
  paymentText: {
    fontSize: 16,
    color: colorresource.liteblack,
  },
  detailsButtonText: {
    color: colorresource.liteblue,
    fontSize: 14,
    padding: 10,
  }
})

export default connect()(PaymentModeModal);