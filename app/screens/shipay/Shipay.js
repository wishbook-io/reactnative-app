import React, { Component, Fragment } from 'react';
import { InteractionManager, ActivityIndicator } from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text
} from 'native-base';
import { connect } from 'react-redux';

import GenericHeader from 'app/components/Header/GenericHeader';
import { colorresource } from '../../resources/colorresource';
import styles from './styles';
import * as navigationActions from 'app/actions/navigation-actions';
import UserHelper from 'app/config/userHelper';

import ShippingDetails from './ShippingDetails';
import InvoiceDetails from './InvoiceDetails';
import PaymentMode from './PaymentMode';
import ResellerSection from 'app/screens/resell/ShipayResellerSection';
import { showToastAction } from 'app/actions/toast-actions';
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';
import { goToAddressSelection, goToAddressEditor } from 'app/actions/navigation-actions';

import * as debugHelper from 'app/utils/debugHelper'

import { TestIdGenerator, SuffixedTestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'Shipay';
const buttonTestId = TestIdGenerator(screenName,'','Button');
const textTestId =  TestIdGenerator(screenName,'','Text');
const checkBoxTestId = TestIdGenerator(screenName,'','CheckBox');
const inputTestId = TestIdGenerator(screenName,'','Input');

const getTextTestIds = (names) => {
  let ids = {}
  names.forEach((name) => ids[name] = textTestId(name))
  return ids;
}

const shippingDetailsTestIds = {
  ShippingMethod: SuffixedTestIdGenerator(screenName, 'ShippingMethod', 'Radio'),
  ShippingCharges: SuffixedTestIdGenerator(screenName, 'ShippingCharges', 'Text'),
}

const invoiceDetailsTestIds = {
  WbMoneyCheckBox: checkBoxTestId('WbMoney'),
  ...getTextTestIds([
    'WbMoneyAvailable',
    'OrderDate',
    'TotalOrderAmount',
    'TotalDiscount',
    'TotalGst',
    'DeliveryCharges',
    'TotalAmount',
    'WbMoneyUsed',
    'PayableAmount',
  ])
}

const paymentTestIds = {
  PaymentOnlineRadio: buttonTestId('PaymentOnline', 'Radio'),
  PaymentCashRadio:   buttonTestId('PaymentCash', 'Radio'),
  PaymentRadio:       SuffixedTestIdGenerator(screenName, 'Payment', 'Radio'),
  Amount:             inputTestId('Amount'),
  BankName:           inputTestId('BankName'),
  ChequeNumber:       inputTestId('ChequeNumber'),
  TransactionId:      inputTestId('TransactionId'),
  PaymentDetails:     inputTestId('PaymentDetails'),
  Cancel:             buttonTestId('Cancel'),
  Save:               buttonTestId('Save'),
}

/*
Shipay Android Initialize Flow:
(t stands for true, f for false)
1. GetCartData
2. FetchAddress
3. Check whether default address is valid
4f. Update UI, to reflect this, for user to update address and eventually profile
4t. Check if ship_to is set and valid
5t. patch ship_to back to cart again
6. get shipping methods
7. patch default shipping charge back to cart
8. show invoice UI
9. show resale view
10. fetch payments
11. enable pay button
*/

class Shipay extends Component {

  updateResellerSection = () => {
    if(this.resellerSectionRef) {
      this.resellerSectionRef.update();
    }
  }

  updatePaymentMode = () => {
    if(this.paymentModeRef) {
      this.paymentModeRef.update();
    }
  }

  updateInvoiceDetails = () => {
    if(this.invoiceDetailsRef) {
      this.invoiceDetailsRef.update();
    }
  }

  setFooterDisabled = (disabled) => {
    if(this.state.footerDisabled === disabled) {
      return;
    }
    this.setState({footerDisabled: disabled})
  }

  navigateToAddDeliveryAddress = (params,) => {
    goToAddressEditor(params);
  }

  navigateToSelectDeliveryAddress = (params) => {
    goToAddressSelection(params);
  }

  navigateToBillingAddressChange = () => {
    this.props.navigation.navigate('UpdateBillingAddress');
  }

  navigateToChangeResaleAmount = () => {
    this.props.navigation.navigate("ChangeResaleAmount")
  }

  setLoading = (isLoading) => {
    // console.log("[setLoading] isLoading this.isLoading", isLoading, this.isLoading)
    if(this.isLoading === isLoading) {
      return;
    }

    if(isLoading) {
      this.props.dispatch(requestShowLoaderAction(screenName))
      this.isLoading = true;
    } else {
      this.props.dispatch(requestHideLoaderAction(screenName))
      this.isLoading = false;
    }
  }

  onPaymentSuccess = (pending = false, count) => {
    const proceedToNextScreen = () => {
      if(pending) {
        navigationActions.goToOrdersListScreen('pending', 'Purchase', count)
      } else {
        navigationActions.goToOrdersListScreen('total', 'Purchase', count)
      }
    }
    if(this.isLoading) {
      this.props.dispatch(requestHideLoaderAction(screenName))
      this.isLoading = false;
    }
    proceedToNextScreen();
  }

  onShippingAddressChange = () => {
    if(this.paymentModeRef) {
      this.paymentModeRef.refreshPaymentModes();
    }
    //console.log("[onShippingAddressChange] ref undefined")
  }

  registerResellerSection = (r) => {
    this.resellerSectionRef = r && r.getWrappedInstance()
  }

  registerShippingDetailsRef = (r) => {
    this.shippingDetailsRef = r && r.getWrappedInstance()
  }

  registerInvoiceDetailsRef = (r) => {
    this.invoiceDetailsRef = r && r.getWrappedInstance();
  }

  registerPaymentModeRef = (r) => {
    this.paymentModeRef = r && r.getWrappedInstance()
  }

  updateFooterButtonText = (text) => {
    this.setState({footerButtonText: text})
  }

  navigateToCashfree = (params) => {
    navigationActions.goToCashfree(params);
  }

  navigateToCodTnc = () => {
    navigationActions.goToInAppBrowser('Wishbook', 'http://www.wishbook.io/cod-tnc')
  }

  proceedForPayment = () => {
    if(!this.paymentModeRef) {
      console.warn("[Shipay:onFooterButtonPress] paymentModeRef not found");
      return;
    }
    this.paymentModeRef.onFooterButtonPress()
  }

  onResellerTotalAmountPatched = () => {
    this.proceedForPayment()
  }

  onFooterButtonPress = async () => {
    if(!this.shippingDetailsRef) {
      console.warn("[Shipay:onFooterButtonPress] shippingDetailsRef not found");
      return;
    }
    let valid = this.shippingDetailsRef.validate();
    if(!valid) {
      return;
    }

    if(!UserHelper.canUserResell()) {
      this.proceedForPayment();
      return;
    }

    if(!this.resellerSectionRef) {
      console.warn("[Shipay:onFooterButtonPress] resellerSectionRef not found");
      return;
    }
    
    valid = this.resellerSectionRef.validate();
    if(!valid) {
      return;
    }

    this.resellerSectionRef.patchResellerTotalAmount()
    // () => this.onResellerTotalAmountPatched()
  }

  showToast = (message, duration=1000) => {
    this.props.dispatch(showToastAction(message, duration));
  }

  constructor(props) {
    super(props);
    this.state = {
      footerButtonText: 'Proceed for payment',
      animationDone: false,
      footerDisabled: true,
    }
    this.isLoading = false;
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      debugHelper.waitTillCartDetailsIsFetched().then(() => {    // COMMENT THIS LINE
      this.setState({animationDone: true})
      })                                                      // COMMENT THIS LINE
    })
  }

  render() {
    return (
      <Container style={{backgroundColor: colorresource.materialbg}}>
        <GenericHeader
        title={'Shipment & Payment'}
        />
        <Content>
        {this.state.animationDone?
          <Fragment>

            <ShippingDetails
            ref={this.registerShippingDetailsRef}
            showToast={this.showToast}
            onShippingAddressChange={this.onShippingAddressChange}
            setFooterDisabled={this.setFooterDisabled}
            setLoading={this.setLoading}
            navigateToBillingAddressChange={this.navigateToBillingAddressChange}
            onAddDeliveryPress={this.navigateToAddDeliveryAddress}
            onSelectDeliveryPress={this.navigateToSelectDeliveryAddress}
            updateInvoiceDetails={this.updateInvoiceDetails}
            updatePaymentMode={this.updatePaymentMode}
            updateResellerSection={this.updateResellerSection}
            testIds={shippingDetailsTestIds}
            />

            <InvoiceDetails
            ref={this.registerInvoiceDetailsRef}
            navigation={this.props.navigation}
            testIds={invoiceDetailsTestIds}
            />

            {UserHelper.canUserResell()?
              <ResellerSection
              ref={this.registerResellerSection}
              navigateToChangeResaleAmount={this.navigateToChangeResaleAmount}
              onResellerTotalAmountPatched={this.onResellerTotalAmountPatched}
              showToast={this.showToast}
              />
            : null}

            <PaymentMode
            ref={this.registerPaymentModeRef}
            updateFooterButtonText={this.updateFooterButtonText}
            setFooterDisabled={this.setFooterDisabled}
            onPaymentSuccess={this.onPaymentSuccess}
            navigateToCodTnc={this.navigateToCodTnc}
            navigateToCashfree={this.navigateToCashfree}
            setLoading={this.setLoading}
            testIds={paymentTestIds}
            />
            
          </Fragment>
          : <ActivityIndicator size='large' color={colorresource.liteblue}/>
        }
        </Content>

        <Footer style={{
          borderTopWidth: 3,
          borderTopColor:'lightgrey'
        }}>
          <FooterTab>
            <Button full style={{backgroundColor: this.state.footerDisabled? colorresource.litegray : colorresource.orange}} onPress={this.onFooterButtonPress} {...buttonTestId('Footer')} disabled={this.state.footerDisabled}>
              <Text style={{color:'white', fontSize: 15}} uppercase={true}>{this.state.footerButtonText}</Text>
            </Button>
          </FooterTab>
        </Footer>
        
      </Container>
    );
  }
}

// export default withToast(connect()(Shipay));
export default connect()(Shipay);

/*

======cash free Live Credential ========
Your app id : 2512fff5cc6db69c8c8cd2c62152
Your secret key : d5cf7eaa7f5fef60ae6be3a4f6ac0c256ac8d77a

=====cash free test credential====
Your app id : 9241285a7ab0db6459ef6b1429
Your secret key : 3e3f76483bed2b4b91f1bdd63210a49aa2287a46

======Crash Free ======

https://github.com/cashfree/cashfree-android-sdk-v0
https://docs.cashfree.com/docs/v1/#mobile-app-android


curl -XPOST -H 'Content-Type: application/json' -H 'x-client-id: 9241285a7ab0db6459ef6b1429' -H 'x-client-secret: 3e3f76483bed2b4b91f1bdd63210a49aa2287a46' -d '{
  "orderId": "Order0001",
  "orderAmount":1,
  "orderCurrency":"INR"
}' 'https://test.cashfree.com/api/v2/cftoken/order'



2019-01-21 12:25:55, INFO-[views.py:2193]-CashFreeResponse= CashFreeResponse data = <QueryDict: {u'orderId': [u'TestOrderId2285'], u'referenceId': [u'60540'], u'txTime': [u'2019-01-21 12:25:54'], u'txStatus': [u'SUCCESS'], u'signature': [u'vvYPrq48hRdyPDVVVbm0ps5HpRtr7HWHoUTgWVHca+k='], u'paymentMode': [u'CREDIT_CARD'], u'txMsg': [u'Transaction Successful'], u'orderAmount': [u'9904.00']}>

2019-01-21 12:41:39, INFO-[views.py:2193]-CashFreeResponse= CashFreeResponse data = <QueryDict: {u'orderId': [u'C5034'], u'referenceId': [u'60551'], u'txTime': [u'2019-01-21 12:41:39'], u'txStatus': [u'SUCCESS'], u'signature': [u'mwlIWRuWOkia8bvdMUcObbE3ChBKOWUqY0Way3DwIQc='], u'paymentMode': [u'CREDIT_CARD'], u'txMsg': [u'Transaction Successful'], u'orderAmount': [u'732.50']}>


2019-01-21 12:29:15, INFO-[views.py:2193]-CashFreeResponse= CashFreeResponse data = <QueryDict: {u'orderId': [u'7496'], u'referenceId': [u'60544'], u'txTime': [u'2019-01-21 12:29:15'], u'txStatus': [u'SUCCESS'], u'signature': [u'Bf9nPWLePv4kt2437EYutELZa+4yBEfaQ5W3BD2LvwU='], u'paymentMode': [u'CREDIT_CARD'], u'txMsg': [u'Transaction Successful'], u'orderAmount': [u'732.50']}>



*/
