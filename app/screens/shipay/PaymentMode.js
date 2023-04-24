import React, { Component } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { Text, H2, H3 } from 'native-base';
import Collapsible from 'react-native-collapsible';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux'
import _ from 'lodash';

import Modal from 'app/components/Modal/Modal';
import Radio from 'app/components/Radio/Radio';
import CheckBox from 'app/components/CheckBox/CheckBox';
import PaymentModeModal from './PaymentModeModal';

import { getPaymentModesAction } from 'app/actions/shipay-actions';
import { clearCatalogWiseCartDetails } from 'app/actions/cart-actions'
import * as serverHelper from './serverHelper';
import UserHelper from '../../config/userHelper';
import { formatDate } from 'app/utils/dateHelper'
import consts from 'app/utils/const';
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';

import { waitTillCartDetailsIsFetched } from 'app/utils/debugHelper';

const PAYMENT_TYPES = {
  ONLINE: "Online",
  COD: "Cash on Delivery",
  OFFLINE: "Offline",
  CREDIT: "Credit",
}

const FULL_WB_MONEY = {
  id: 100,
  display_name: 'OTHER',
  payment_type: PAYMENT_TYPES.OFFLINE,
  details: 'FULL WB MONEY USED',
  mode: 'Other',
}

const CREDIT_SUPPORT_NO = '02616718985'

class PaymentMode extends Component {

  //public methods start
  update = () => {
    this.setState({hide: false})
    this.refreshPaymentModes();
  }
  //public methods end
  
  constructor(props) {
    super(props);

    let selected = new Array(7).fill(false);
    selected[0] = true;
    this.state = {
      selected: selected,
      visibleCODModal: false,
      modesByType: {},
      paymentMode: {
        [PAYMENT_TYPES.ONLINE]: 0
      },
      showOfflineModal: false,

      dialogVisible: false,
      dialogTitle: '',
      dialogDescription: '',
      hide: true,
    }
  }

  getUniqueSellersCount = () => {
    const sellingCompanies = this.props.responseCartDetails.items.reduce(
      (acc, cur) => (acc[cur.selling_company] = true, acc), {}
    )
    const count = Object.keys(sellingCompanies).length
    return count;
  }

  onDialogOkPress = () => {
    this.setState({dialogVisible: false})
    const count = this.getUniqueSellersCount()
    this.props.onPaymentSuccess(false, count);
    this.props.dispatch(clearCatalogWiseCartDetails())
  }

  onCashfreeResponse = (response) => {
    console.log("[onCashfreeResponse] response", response)
    if(!response || response.txStatus !== 'SUCCESS') {
      this.setState({dialogVisible: true, dialogTitle: 'Payment Failure', dialogDescription: ''})
    } else {
      console.log("[onCashfreeResponse] success", response)
      const dialogDescription =`OrderId: ${response.orderId}\nStatus: ${response.txStatus}\nAmount: ${response.orderAmount}`;
      this.setState({dialogVisible: true, dialogTitle: 'Transaction Success', dialogDescription,})
    }
  }

  goToCashfree = (amount) => {
    amount = amount? amount : this.props.responseCartDetails.pending_amount;
    const params = {
      name: UserHelper.getUserFirstName(),
      email: UserHelper.getUserEmail(),
      mobile: UserHelper.getUserMobile(),
      orderId: 'C' + this.props.responseCartDetails.id,
      // orderId: 'TestOrderId'+(Math.floor(Math.random()*10000)),
      amount: amount + '',
      onResponse: this.onCashfreeResponse,
    }
    this.props.navigateToCashfree(params);
  }

  getCurrentlySelectedMode = () => {
    const [key, value] = Object.entries(this.state.paymentMode)[0]
    // const modesByType = this.state.modesByType
    // const path = key+'['+value+']'
    // console.log('[getCurrentlySelectedMode] path', path)
    const val = _.get(this.state.modesByType, key+'['+value+']')
    // console.log('[getCurrentlySelectedMode] returning, key, value', val, key, value)
    return val;
  }

  onOfflineModalSave = async ({details, date}) => {
    this.setState({showOfflineModal: false})
    this.makeOfflinePayment({
      amount: this.props.responseCartDetails.pending_amount,
      mode: this.getCurrentlySelectedMode().name,
      details,
      date,
    }, true)
  }

  onOfflineModalCancel = () => {
    this.setState({showOfflineModal: false})
  }

  makeOfflinePayment = async ({amount=this.props.responseCartDetails.pending_amount, mode, details, date=formatDate('Y-MM-DD')}, pending) => {
    const params = {
      amount,
      date,
      mode,
      details,
    }
    this.props.setLoading(true)
    const newOrdersCount = this.getUniqueSellersCount()
    // console.log("[makeOfflinePayment]", {newOrdersCount})
    const { response, error } = await serverHelper.offlinePayment(params);
    // console.log("[onFooterButtonPress] response: ", response)
    if(error) {
      this.props.setLoading(false)
      return;
    }
    this.props.onPaymentSuccess(pending, newOrdersCount);
  }

  handleCodPayment = () => {
    if(this.isCodDepositRequired()) {
      this.goToCashfree(this.getCodDownpayAmount())
    } else {
      this.makeOfflinePayment({
        mode: 'COD',
        details: 'COD',
        amount: 0,
      }, true)
    }

  }

  onFooterButtonPress = async () => {
    // console.log("[button press]");
    // console.log("[onFooterButtonPress] modesbytype", this.state.modesByType)
    if(this.isSelected(PAYMENT_TYPES.CREDIT, 0)) {
      // here we make the call directly
      this.makeOfflinePayment({
        mode: "Wishbook Credit",
        details: "Wishbook Credit",
      })
    } else if(this.isSelected(PAYMENT_TYPES.ONLINE, 0)) {
      this.goToCashfree()
    } else if(this.isSelected(PAYMENT_TYPES.COD, 0)) {
      this.handleCodPayment();
    } else if(_.get(this.state.modesByType[PAYMENT_TYPES.OFFLINE], '[0].display_name') === FULL_WB_MONEY.display_name) {
      // here we make the call directly
      this.makeOfflinePayment({
        mode: FULL_WB_MONEY.mode,
        details: FULL_WB_MONEY.details,
      })
    }
    else {
      this.setState({showOfflineModal: true}) 
    }
  }

  isSelected = (type, index) => {
    return this.state.paymentMode[type] === index;
  }

  getCodFinalAmount = () => {
    const downpayAmount = this.getCodDownpayAmount();
    return Math.round(parseFloat(this.props.responseCartDetails.pending_amount) - downpayAmount);
  }

  getCodDownpayAmount = () => {
    const codMode = this.state.modesByType[PAYMENT_TYPES.COD]
    const amount = codMode[0].amount
    return amount
  }

  refreshPaymentModes = () => {
    if(this.props.responseCartDetails.pending_amount <= 0) {
      this.processPaymentModes([FULL_WB_MONEY])
      this.setState({
        paymentMode: {
          [FULL_WB_MONEY.payment_type]: 0
        }
      })
      this.props.updateFooterButtonText('DONE');
    } else {
      serverHelper.getPaymentModes().then(this.processPaymentModes);
    }
  }

  processPaymentModes = async ({response: paymentModes, error}) => {
    // const paymentModes = [{"id":8,"amount":0,"name":"cod","payment_type":"Cash on Delivery","display_name":"Cash On Delivery","status":"Enable"},{"id":10,"amount":0,"name":"wishbookcredit","payment_type":"Credit","display_name":"Wishbook Credit","status":"Enable"},{"id":7,"amount":0,"name":"Other","payment_type":"Offline","display_name":"OTHER","status":"Enable"},{"id":6,"amount":0,"name":"Cheque","payment_type":"Offline","display_name":"CHEQUE","status":"Enable"},{"id":2,"amount":0,"name":"NEFT","payment_type":"Offline","display_name":"NEFT","status":"Enable"},{"id":9,"amount":0,"name":"cashfree","payment_type":"Online","display_name":"Wallet/UPI/Credit/Debit/Net Banking (Cashfree)","status":"Enable"}]
    //await serverHelper.getPaymentModes();
    //console.log(paymentModes);
    if(error) {
      this.props.setLoading(false)
      return;
    }
    let modesByType = {}

    paymentModes.forEach((mode) => {
      for(const [k, v] of Object.entries(PAYMENT_TYPES)) {
        if(v !== mode.payment_type) {
          continue;
        }

        if(v in modesByType) {
          modesByType[v].push(mode)
        } else {
          modesByType[v] = [mode]
        }

        break;
      }
    })
    // console.log({modesByType})
    // selectPaymentMode: {[PAYMENT_TYPES.OFFLINE]: index}
    // so currently selected payment mode will be identified by the key (payment type) 
    // and the value corresponds to the index in that type

    // TODO: check only for wishbook credit here, not all credit types
    if(modesByType[PAYMENT_TYPES.CREDIT]) {
      // fetch credit line here and output the status
      let [responseCreditLine, responseCreditRating] = await Promise.all([serverHelper.getCreditLine(), serverHelper.getCreditRating()])
      if(responseCreditLine.length === 0) {
        modesByType[PAYMENT_TYPES.CREDIT][0].isDisabled = true;
        // console.log({responseCreditRating})
        modesByType[PAYMENT_TYPES.CREDIT][0].isUnderProcess = responseCreditRating.length > 0;
      } else {
        let creditMode = modesByType[PAYMENT_TYPES.CREDIT][0];
        // console.log({responseCreditLine})
        let creditLine = responseCreditLine[0]
        // console.log({creditLine})
        creditMode.isAmountExceeded = parseFloat(this.props.responseCartDetails.pending_amount) >= parseFloat(creditLine.available_line)
        creditMode.isDisabled = !(creditLine.is_active === true) || creditMode.isAmountExceeded;
        if(creditLine.is_active) {
          creditMode.approvedLimit = creditLine.approved_line;
          creditMode.usedLimit = creditLine.used_line;
          creditMode.availableLimit = creditLine.available_line;
          // console.log({creditMode})
        }
        modesByType[PAYMENT_TYPES.CREDIT][0] = creditMode
      }
    }
    this.setState({modesByType})
    this.props.setFooterDisabled(false)
    this.props.setLoading(false)
  }

  onCodTncPress = () => {
    this.setState({visibleCODModal: false}, this.props.navigateToCodTnc)
  }

  setShowCODModal = () => {
    this.setState({visibleCODModal: true});
  }

  setHideCODModal = () => {
    if(this.state.visibleCODModal) {
      this.setState({visibleCODModal: false});
    }
  }

  onConfirmCODPress = () => {
    this.setState({paymentMode: {[PAYMENT_TYPES.COD]: 0}})
    this.setHideCODModal();
  }

  onCancelCODPress = () => {
    this.setHideCODModal();
  }

  isCodDepositRequired = () => {
    const amount = this.getCodDownpayAmount()
    return !!amount;
  }

  onCodRadioPress = () => {
    if(this.isCodDepositRequired()) {
      this.setShowCODModal();
    } else {
      this.onConfirmCODPress();
      this.props.updateFooterButtonText('confirm cod order');
    }
  }

  onRadioPress(type, index) {
    if(this.isSelected(type, index)) {
      // nothing to be changed here
      return;
    }
    // now handle things differently here
    let updatedState = {}
    let footerButtonText = ''
    if(type === PAYMENT_TYPES.ONLINE) {
      this.props.updateFooterButtonText("proceed for payment")
    } else if(type === PAYMENT_TYPES.OFFLINE) {
      this.props.updateFooterButtonText("enter payment details")
    } else if(type === PAYMENT_TYPES.COD) {
      this.onCodRadioPress()
      return; // returning because we don't want to set the selected state
    } else if(type === PAYMENT_TYPES.CREDIT) {
      this.props.updateFooterButtonText('done');
    }
    
    this.setState({paymentMode: {[type]: index}})
  }

  render() {
    
    if(this.state.hide || !this.props.responseCartDetails.ship_to) {
      return null;
    }
    
    const codMode = this.state.modesByType[PAYMENT_TYPES.COD]
    const testIds = this.props.testIds;
    return (
      <View style={styles.ParentContainer}>
        <H3 style={styles.SectionHeading} onPress={() => this.processPaymentModes()}>Select Payment Mode</H3>
        {/* <Text style={styles.PaymentModeHelpText}>For availing Cash discount, select any option from Online or Offline modes below. For Credit discount, select 'Buy on Credit'. </Text> */}
        <View>

          {/*Online*/}
          {this.state.modesByType[PAYMENT_TYPES.ONLINE]?
          <View>
            <Text style={styles.PaymentModeCategoryText}>{PAYMENT_TYPES.ONLINE}</Text>
            {this.state.modesByType[PAYMENT_TYPES.ONLINE].map((method, index) => 
              <View key={method.id} style={styles.PaymentModeMethod}>
                <Radio 
                selected={this.isSelected(PAYMENT_TYPES.ONLINE, index)} 
                radioStyle={styles.ShippingAddressRadio} 
                onPress={() => this.onRadioPress(PAYMENT_TYPES.ONLINE, index)}
                {...testIds.PaymentOnlineRadio}
                />
                <Text style={styles.PaymentModeMethodText} onPress={() => this.onRadioPress(PAYMENT_TYPES.ONLINE, index)}>{method.display_name}</Text>
              </View>)}
          </View>
          : null}

          {/*Cash on delivery*/}
          {codMode?
          <View>
            <Text style={styles.PaymentModeCategoryText}>{PAYMENT_TYPES.COD}</Text>
            <View style={styles.PaymentModeMethod}>
              <Radio 
              selected={this.isSelected(PAYMENT_TYPES.COD, 0)} 
              radioStyle={styles.ShippingAddressRadio} 
              onPress={() => this.onRadioPress(PAYMENT_TYPES.COD, 0)}
              {...testIds.PaymentCashRadio}
              />
              <Text style={styles.PaymentModeMethodText} onPress={() => this.onRadioPress(PAYMENT_TYPES.COD, 0)}>{codMode[0].display_name}</Text>
            </View>
            <Collapsible collapsed={!this.isSelected(PAYMENT_TYPES.COD, 0) || !this.isCodDepositRequired()}>
              <Text style={styles.PaymentModeMethodHelpText}>{`Pay ₹${this.getCodDownpayAmount()} now and ₹${this.getCodFinalAmount()} cash at the time of delivery`}</Text>
            </Collapsible>

            <Modal
            // animationType="slide"
            isVisible={this.state.visibleCODModal}
            onBackdropPress={() => this.onCancelCODPress()}
            >
              <View style={styles.CODModalParent}>
                <H2>Do you wish to continue with COD?</H2>
                <View style={{height:20}}/>
                <Text style={{color: 'grey'}}>
                  {`Pay ₹${this.getCodDownpayAmount()} now, remaining ₹${this.getCodFinalAmount()} cash on delivery. Amount ₹${this.getCodDownpayAmount()} will be non-refundable if you do not accept the shipment `}
                  <Text style={{color: colorresource.liteblue, textDecorationLine: 'underline'}} onPress={this.onCodTncPress}>*COD T&C</Text>
                </Text>
                
                <TouchableOpacity onPress={this.onConfirmCODPress} style={styles.CODModalButton}>
                  <Text uppercase={true} style={styles.CODModalButtonText}>yes, i want to avail cod option</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onCancelCODPress} style={styles.CODModalButton}>
                  <Text uppercase={true} style={styles.CODModalButtonText}>no, i'll choose another payment method</Text>
                </TouchableOpacity>
              </View>
            </Modal>

          </View>
          : null }

          {/*Offline*/}
          {this.state.modesByType[PAYMENT_TYPES.OFFLINE]?
          <View>
            <Text style={styles.PaymentModeCategoryText}>{PAYMENT_TYPES.OFFLINE}</Text>
            {this.state.modesByType[PAYMENT_TYPES.OFFLINE].map((method, index) => 
              <View key={method.id} style={styles.PaymentModeMethod}>
                <Radio 
                selected={this.isSelected(PAYMENT_TYPES.OFFLINE, index)} 
                radioStyle={styles.ShippingAddressRadio} 
                onPress={() => this.onRadioPress(PAYMENT_TYPES.OFFLINE, index)}
                {...testIds.PaymentRadio(method.display_name)}
                />
                <Text style={styles.PaymentModeMethodText} onPress={() => this.onRadioPress(PAYMENT_TYPES.OFFLINE, index)}>{method.display_name}</Text>
              </View>
            )}
          </View>
          : null}

          {/*Credit*/}
          {this.state.modesByType[PAYMENT_TYPES.CREDIT]?
          <View>
            <Text style={styles.PaymentModeCategoryText}>{PAYMENT_TYPES.CREDIT}</Text>
            {this.state.modesByType[PAYMENT_TYPES.CREDIT].map((method, index) => 
              <View key={method.id} >
                <View style={styles.PaymentModeMethod}>
                  <Radio 
                  selected={this.isSelected(PAYMENT_TYPES.CREDIT, index)} 
                  radioStyle={styles.ShippingAddressRadio}
                  disabled={method.isDisabled}
                  onPress={() => this.onRadioPress(PAYMENT_TYPES.CREDIT, index)}
                  {...testIds.PaymentRadio(method.display_name)}
                  />
                  <Text style={[styles.PaymentModeMethodText, method.isDisabled? {color: colorresource.grey400} : {}]} onPress={() => this.onRadioPress(PAYMENT_TYPES.CREDIT, index)}>{method.display_name}</Text>
                </View>

                {method.approvedLimit?
                  <View style={{marginLeft: 10, marginTop: 5}}>
                    {method.isAmountExceeded?
                      <View style={{marginBottom: 5}}>
                        <Text style={[styles.PaymentModeCreditText, {color: colorresource.darkred}]}>Your order is exceeding the available limit, please reduce the products in your cart.</Text>
                      </View>
                      : null}
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Text style={styles.PaymentModeCreditText}>Approved Limit:{'\n'}</Text>
                        <Text style={styles.PaymentModeCreditText}>Used Limit:{'\n'}</Text>
                        <Text style={styles.PaymentModeCreditText}>Available Limit:{'\n'}</Text>
                      </View>
                      <View style={{marginLeft: 5}}>
                        <Text style={styles.PaymentModeCreditText}>₹{method.approvedLimit}{'\n'}</Text>
                        <Text style={styles.PaymentModeCreditText}>₹{method.usedLimit}{'\n'}</Text>
                        <Text style={styles.PaymentModeCreditText}>₹{method.availableLimit}{'\n'}</Text>
                      </View>
                    </View>
                  </View>
                  : method.isUnderProcess? 
                    <View style={{paddingLeft: 7}}>
                      <Text style={styles.PaymentModeCreditText}>{'Your application is under process. For more information call: '}<Text style={styles.LinkText} onPress={() => Linking.openURL(`tel:${CREDIT_SUPPORT_NO}`)}>{CREDIT_SUPPORT_NO}</Text></Text>
                      {/* <Text uppercase style={{color: colorresource.liteblue, textAlign: 'right', padding: 10, fontSize: 14}}>edit</Text> */}
                    </View>
                    :
                    <View style={{paddingLeft: 7}}>
                      <Text style={styles.PaymentModeCreditText}>{'Ohh! It seems you have not applied for \'Wishbook Credit\'. Don\'t worry'}</Text>
                      {/* <Text uppercase style={{color: colorresource.liteblue, textAlign: 'right', padding: 10, fontSize: 14}}>apply now</Text> */}
                    </View>
                  }
              </View>

            )}
            <Collapsible collapsed={!this.state.selected[6]}>
              <Text style={styles.PaymentModeMethodHelpText}>No discounts will be applicable on this payment mode.</Text>
            </Collapsible>

          </View>
          : null}

        </View>
        <PaymentModeModal
          showModal={this.state.showOfflineModal}
          onModalCancelPress={this.onOfflineModalCancel}
          onModalSavePress={this.onOfflineModalSave}
          type={this.getCurrentlySelectedMode()}
          amount={this.props.responseCartDetails.pending_amount}
          testIds={testIds}
        />

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>{this.state.dialogTitle}</Dialog.Title>
          <Dialog.Description>{this.state.dialogDescription}</Dialog.Description>
          <Dialog.Button label="OK" onPress={this.onDialogOkPress}/>
        </Dialog.Container>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseCartDetails: state.cartR.responseGetCatalogWiseCartDetails,
    responseCreditRating: state.creditR.responseGetCreditRating,

  })
}
export default connect(mapStateToProps, null, null, {withRef: true})(PaymentMode)