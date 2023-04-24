import React, { Component } from 'react'
import { View, Keyboard, ActivityIndicator } from 'react-native';
import { Text } from 'native-base'
import { Button as PButton } from 'react-native-paper'
import { connect } from 'react-redux'

import TextInputKeyed from 'app/components/MaterialTextInput/TextInputKeyed'
import Info from './Info'
import { colorresource } from 'app/resources/colorresource';

import { getDeliveryInfoAction } from 'app/actions/shipay-actions';

const AVAILABLE = 'Available';
const NOT_AVAILABLE = 'Unavailable'

class PincodeChecker extends Component {

  onDeliveryInfoError = () => {

  }

  onDeliveryInfoUpdated = () => {
    const info = this.props.deliveryInfo;
    console.log({info})
    if(this.state.hideDeliveryInfo) {
      this.setState({hideDeliveryInfo: false})
    }
  }

  onApplyPress = () => {
    Keyboard.dismiss()
    const pincode = this.state.pincodeText
    const pincodeNumber = parseInt(pincode)
    if(!pincode || pincode.length !== 6 || !pincodeNumber || pincodeNumber <= 99999) {
      this.setState({pincodeError: "Please enter a valid pincode", hideDeliveryInfo: true,})
      return;
    }
    this.props.dispatch(getDeliveryInfoAction({pincode, product: this.props.productId}))
  }

  pincodeChange = ({text}) => {
    let value = text.trim().replace(/[^0-9]/g, '');
    if(value !== this.state.pincodeText) {
      this.setState({pincodeText: value, pincodeError: ''})
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      pincodeText: '',
      pincodeError: '',
      hideDeliveryInfo: true,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.deliveryInfo != this.props.deliveryInfo) {
      this.onDeliveryInfoUpdated()
    }
    if(prevProps.errorActionType != this.props.errorActionType && this.props.errorActionType === getDeliveryInfoAction().type) {
      this.onDeliveryInfoError()
    }
  }

  render() {
    const deliveryInfo = this.props.deliveryInfo
    return (
      <View style={{paddingVertical: 10, paddingHorizontal: 5, marginTop: 10, backgroundColor: 'white'}}>
        <Text>Delivery Info</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{
            flex: 1, 
            // borderWidth: 1
          }}>
            <TextInputKeyed
            label='Enter pincode'
            error={this.state.pincodeError}
            inputKey='Pincode'
            onChange={this.pincodeChange}
            value={this.state.pincodeText}
            textInputProps={{
              keyboardType: 'numeric',
              maxLength: 6,
            }}
            />
          </View>
          <View style={{
            // borderWidth: 1,
          }}>
            <View style={{height: 30, justifyContent: 'center'}}>
              {this.props.loadingDeliveryInfo? <ActivityIndicator color={colorresource.liteblue}/> : null}
            </View>
            <PButton
            mode='text'
            onPress={this.onApplyPress}
            // loading={this.props.loadingDeliveryInfo}
            disabled={this.props.loadingDeliveryInfo}
            >{'Apply'}</PButton>
          </View>
        </View>

        <Info
        label={'Delivery'}
        hide={this.state.hideDeliveryInfo}
        value={deliveryInfo.delivery? AVAILABLE : NOT_AVAILABLE}
        />

        <Info
        label={'COD'}
        value={deliveryInfo.cod_available? AVAILABLE : NOT_AVAILABLE}
        hide={this.state.hideDeliveryInfo}
        />

        <Info
        label={'Shipping options'}
        value={deliveryInfo.shipping_methods && deliveryInfo.shipping_methods.map(m => m.shipping_method_name).join(', ')}
        hide={this.state.hideDeliveryInfo}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    deliveryInfo: state.shipayR.responseGetDeliveryInfo,
    loadingDeliveryInfo: state.shipayR.loadingDeliveryInfo,
    errorActionType: state.errorHandlerR.errorActionType,
  })
}

export default connect(mapStateToProps)(PincodeChecker)