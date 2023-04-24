import React, { Component } from 'react';
import { WebView, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import {View,Text, Dimensions} from 'react-native';

export class CashfreePG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
      visibleModal : true,
      canGoBack: true,   
      msgData: '',   
   }
  }

  _hideModal(){
    this.setState({
      visibleModal: false,
    })
  }

  _onNavigationStateChange(webViewState){
    event = webViewState.url;

    function getParameterByName(name, event) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(event);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    let msgData = getParameterByName('val',event);

    if (msgData != undefined) {
      this.setState({msgData: msgData});
      this.props.caller.setState({testData: msgData});
      this._hideModal();  
    }
  }
  
  render() {
    const appId = this.props.appId;
    const orderId = this.props.orderId;
    const orderAmount = this.props.orderAmount;
    const orderCurrency = this.props.orderCurrency;
    const orderNote = this.props.orderNote;
    const source = this.props.source;    
    const customerName =this.props.customerName;
    const customerEmail = this.props.customerEmail;
    const customerPhone = this.props.customerPhone;
    const notifyUrl = this.props.notifyUrl;
    const paymentModes = this.props.paymentModes;
    const env = this.props.env;
    const tokenData = this.props.tokenData;
    var formUrl = "";

    if (env == "TEST") {
      formUrl = "https://test.cashfree.com/billpay/checkout/post/app-submit";
    } else {
      formUrl = "https://www.cashfree.com/checkout/post/app-submit";
    }

    console.log("-------------------------------");
    console.log({appId});
    console.log({orderId});
    console.log({orderAmount});
    console.log({orderCurrency});
    console.log({orderNote});
    console.log({source});
    console.log({customerName});
    console.log({customerEmail});
    console.log({customerPhone});
    console.log({notifyUrl});
    console.log({paymentModes});
    console.log({env});
    console.log({tokenData});
    console.log({formUrl});
    console.log("-------------------------------");

    return (
     <Modal visible={this.state.visibleModal}>
    
      <View style={{flex:1, marginTop:30}}>
      <View style={styles.topbar}>
          <TouchableOpacity onPress={this.onBack.bind(this)}>
            <Text style={this.state.canGoBack ? styles.topbarText : styles.topbarTextDisabled}>Go Back</Text>
          </TouchableOpacity>
        </View>
      <WebView        
        ref={webview => {
              this.myWebView = webview;
        }}     
        javaScriptEnabled = {true} 
        domStorageEnabled={true}  
        originWhitelist = {['*']}

        source = {{html : '<body><form id="redirectForm" method="post" action="' + formUrl + '"><input type="hidden" name="appId" value="' + appId + '"/><input type="hidden" name="orderId" value="' + orderId +  '"/><input type="hidden" name="source" value="' + source + '"/><input type="hidden" name="orderAmount" value="' +  orderAmount + '"/><input type="hidden" name="orderCurrency" value="' + orderCurrency+ '"/><input type="hidden" name="orderNote" value="' + orderNote +'"><input type="hidden" name="customerEmail" value="' + customerEmail+'"/><input type="hidden" name="customerName" value="' + customerName +'"><input type="hidden" name="customerPhone" value="'+ customerPhone +'"/><input type="hidden" name="notifyUrl" value="' + notifyUrl +'"><input type="hidden" name="paymentModes" value="' + paymentModes +'"><input type="hidden" name="tokenData" value="' +  tokenData + '"/></form><script> document.getElementById("redirectForm").submit();</script></body>'}}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        style={{marginTop : 30,width: Dimensions.get('window').width}}
        
        />        
      </View>
      </Modal>

    );
  }
  onBack() {
    this.setState({
      visibleModal: false,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#F5FCFF',
  },
  topbar: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbarTextDisabled: {
    color: 'gray'
  }
});

export default CashfreePG;