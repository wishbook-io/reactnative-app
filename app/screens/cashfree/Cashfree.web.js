import React, { Component } from 'react';
import { View } from 'react-native';

import CryptoJS from 'crypto-js';
import consts, { PROD } from 'app/utils/const'
import { CONSTANT_URL } from 'app/utils/URLConstants';

let cfInitialized = false;

class Cashfree extends Component {

  getNavParam = (param, defaultValue) => {
    return this.props.navigation.getParam(param, defaultValue)
  }

  getName = () => {
    const name = this.getNavParam('name');
    return name;
  }

  getEmail = () => {
    const email = this.getNavParam('email');
    return email;
  }

  getMobile = () => {
    const mobile = this.getNavParam('mobile');
    return mobile;
  }

  getOrderId = () => {
    const orderId = this.getNavParam('orderId');
    return orderId;
  }

  getAmount = () => {
    const amount = this.getNavParam('amount');
    return amount + '';
  }

  getReturnUrl = () => {
    const url = CONSTANT_URL.CASHFREE_RETURN_URL;
    return "";
  }

  getSecret = () => {
    const secret = consts.CASHFREE_SECRET_KEY
    return secret;
  }

  getAppId = () => {
    const appId = consts.CASHFREE_APP_ID
    return appId;
  }

  generateToken = () => {
    // $tokenData = "appId=".$appId."&orderId=".$orderId."&orderAmount=".$orderAmount."&returnUrl=".$returnUrl."&paymentModes=".$paymentModes;
    const appId = this.getAppId();
    const orderId = this.getOrderId();
    const orderAmount = this.getAmount();
    const returnUrl = this.getReturnUrl();
    const message = `appId=${appId}&orderId=${orderId}&orderAmount=${orderAmount}&returnUrl=${returnUrl}&paymentModes=${""}`
    // console.log("[generateToken] message", message);
    var hash = CryptoJS.HmacSHA256(message, consts.CASHFREE_SECRET_KEY);
    hash = CryptoJS.enc.Base64.stringify(hash);
    // console.log("[generateToken] hash", hash);
    return hash;
    //Wq0jZeyTAm5ewPGjRsPNnwn7ApaMolAdhW+PA2qxCdA=
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  handlePaymentResponse = (event) => {
    const response = event.response
    if(!response) {
      return;
    }

    const status = response.txStatus;
    console.log("txStatus", status);
    if(status === "CANCELLED") {
      // modal dismissed, don't call onResponse
      // as we don't want the failure modal to be shown
      this.goBack();
    } else if(status === "SUCCESS") {
      this.goBack();
      console.log("before onResponsecall")
      this.getNavParam('onResponse')(event.response)
      console.log("after onResponsecall")
    }
    // failed case, don't do anything here 
    // as the cashfree modal is not dismissed
    // and it itself shows an error
  }

  onCashfreePaymentResult = (event) => {
    var eventName = event.name;
    switch(eventName) {
      case "PAYMENT_REQUEST":
        console.log("[onCashfreePaymentResult] payment request message", event.message);
        break;

        case "PAYMENT_RESPONSE":
        this.handlePaymentResponse(event);
        break;
     };
     console.log("[onCashfreePaymentResult] event", event);
    }

  initCashfree = () => {
    const config = {};
    config.layout = {view: "popup", width: "650"};
    config.mode = PROD? "PROD" : "TEST"; //use PROD when you go live
    var response = CashFree.init(config);
    if (response.status == "OK") {
      cfInitialized = true;
       console.log("[initCashfree] success:", response);
       return true;
    }
    console.log("[initCashfree] error:", response.message);
    return false;
  }

  initialize = () => {
    if(!cfInitialized) {
      const initialized = this.initCashfree()
      if(!initialized) {
        return;
      }
    }

    const orderId = this.getOrderId();
    const orderAmount = this.getAmount();
    const customerName = this.getName();
    const customerEmail = this.getEmail();
    const customerPhone = this.getMobile();
    const returnUrl = this.getReturnUrl();
    const notifyUrl = CONSTANT_URL.CASHFREE_NOTIFY_URL;
    const appId = this.getAppId();
    const paymentToken = this.generateToken();
    const data = {
      orderId,
      orderAmount,
      customerName,
      customerPhone,
      customerEmail,
      returnUrl,
      notifyUrl,
      appId,
      paymentToken,
    }
    // console.log("[cashfree params]", data)
    CashFree.makePayment(data, this.onCashfreePaymentResult);
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    return null;
  }
}

export default Cashfree