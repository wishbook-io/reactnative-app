import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { 
  Button, 
  Container } from 'native-base';
import base64 from 'react-native-base64'
import { connect } from 'react-redux';
import  { CashfreePG, returnData } from './cashfreesdk';

import GenericHeader from 'app/components/Header/GenericHeader'
import consts, { PROD } from '../../utils/const';
import { CONSTANT_URL } from 'app/utils/URLConstants'

// actions
import { getCashfreeTokenDataAction } from 'app/actions/shipay-actions';
import { getCashfreeTokenData } from 'app/saga/shipay-saga';
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';
import { execute } from 'app/config/saga';

import { isDev } from 'app/utils/debugVars';

const {width = 0,height = 0} = Dimensions.get('window');

const screenName = 'Cashfree';

class Cashfree extends Component {

  onCashfreeDone = () => {
    const decodedResponse = base64.decode(this.state.testData)
    console.log("decodedResponse", decodedResponse);
    // 'decodedResponse', '{"orderId":"TestOrderId8089","referenceId":"60562","orderAmount":"10532.50","txStatus":"SUCCESS","txMsg":"Transaction Successful","txTime":"2019-01-21 13:22:30","paymentMode":"CREDIT_CARD","signature":"tFEJke1bGdUgIQFrXW1rbhk5s1Do0h9EIX3chWGMleA="}'
    const parsedJson = JSON.parse(decodedResponse);
    console.log("parsedJson", parsedJson);

    const onResponse = this.props.navigation.getParam('onResponse', () => {})
    onResponse(parsedJson);
    this.props.navigation.goBack();
  }
  
  fetchTokenData = async () => {
    this.props.dispatch(requestShowLoaderAction(screenName))
    const response = await execute(getCashfreeTokenData, getCashfreeTokenDataAction({
      orderId: this.props.navigation.getParam('orderId'),
      amount: this.props.navigation.getParam('amount'),
    }))
    this.props.dispatch(requestHideLoaderAction(screenName))
    this.setState({cashfreeVisible: true, tokenData: response.cftoken})
  }

  constructor(props) {
    super(props);
    this.state = {
      testData: '',
      cashfreeVisible: false,
    };

    const {name, email, mobile, orderId, amount } = this.props.navigation.state.params;
    console.log({name, email, mobile, orderId, amount})
    // console.log("[Cashfree] got tokenData of length ", this.props.navigation.getParam("tokenData", '').length)
  }

  componentDidMount() {
    this.fetchTokenData()
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevState.testData && this.state.testData) {
      this.onCashfreeDone()
    }
  }

  render() {
    return (
      <Container>
        <GenericHeader
        title={"Payment"}
        />
        {this.state.cashfreeVisible?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <CashfreePG 
          // appId={isDev? consts.CASHFREE_TEST_APP_ID : consts.CASHFREE_LIVE_APP_ID}
          appId={consts.CASHFREE_APP_ID}
          orderId={this.props.navigation.getParam('orderId')}
          orderAmount = {this.props.navigation.getParam('amount') + ''}
          orderCurrency = 'INR'
          orderNote = {PROD? '' : 'testing'}
          source = 'reactsdk'
          customerName = {this.props.navigation.getParam('name')}
          customerEmail = {this.props.navigation.getParam('email')}
          customerPhone = {this.props.navigation.getParam('mobile')}
          notifyUrl = {CONSTANT_URL.CASHFREE_NOTIFY_URL}
          paymentModes = ''
          env = {PROD? undefined : 'TEST'}
          tokenData = {this.state.tokenData}
          caller = {this}
          /> 
          <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
          />
          {/* <Text>{base64.decode(this.state.testData)}</Text> */}
        </View>
        : null }

      </Container>
    );
  }
}

export default connect()(Cashfree);