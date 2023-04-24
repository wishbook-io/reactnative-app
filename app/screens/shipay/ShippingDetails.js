import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { Button as PButton, TouchableRipple } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux'

import CheckBox from 'app/components/CheckBox/CheckBox'
import WButton from 'app/components/Button/WButton'
import { colorresource } from 'app/resources/colorresource';
import styles from './styles'

import * as serverHelper from './serverHelper';
import * as shipayActions from 'app/actions/shipay-actions';

const ACTION_TYPES = [
  shipayActions.getAddressAction().type,
  shipayActions.selectShippingAddressAction().type,
  shipayActions.getShippingChargesAction().type,
  shipayActions.patchShippingChargesAction().type,
]

class ShippingDetails extends Component {

  // public methods start
  validate = () => {
    let valid = this.isBillingAddressValid()
    if(!valid) {
      this.props.navigateToBillingAddressChange();
      this.props.showToast("Please complete your profile")
      return false;
    }

    valid = this.isDeliveryAddressValid()
    if(!valid) {
      this.props.showToast("Please select a valid delivery address")
      return false;
    }

    return true;
  }
  // public methods end

  isBillingAddressValid = () => {
    const address = this.getDefaultAddress();
    const valid = this.isAddressValid(address);
    return valid;
  }

  isDeliveryAddressValid = () => {
    const address = this.getDeliveryAddress();
    const valid = this.isAddressValid(address);
    return valid;
  }

  patchShippingCharges = (charge) => {
    this.props.setLoading(true)
    this.props.dispatch(shipayActions.patchShippingChargesAction({
      preffered_shipping_provider: 'WB Provided',
      shipping_charges: charge.shipping_charge,
      shipping_method: charge.shipping_method_id,
    }));
  }

  onShippingChargesPatched = () => {
    this.props.updateInvoiceDetails()
    this.props.updatePaymentMode()
    this.props.updateResellerSection()
  }

  onShippingChargesFetched = () => {
    const shippingCharges = this.props.responseShippingCharges;
    const defaultCharge = shippingCharges.find(s => s.is_default);
    if(!defaultCharge) {
      this.props.setLoading(false);
      return;
    }

    this.patchShippingCharges(defaultCharge);
  }

  onShipToUpdated = () => {
    if(this.props.responseCart.ship_to) {
      this.props.setLoading(true)
      this.props.dispatch(shipayActions.getShippingChargesAction({cart: this.props.responseCart.id}))
    } else {
      this.props.setLoading(false);
      this.props.setFooterDisabled(true);
    }
  }

  setShipTo = (id) => {
    this.props.setLoading(true)
    this.props.dispatch(shipayActions.selectShippingAddressAction({ship_to: id}))
  }

  onAddressUpdated = () => {
    // something was updated in addresses
    const deliveryAddress = this.getDeliveryAddress();
    if(deliveryAddress) {
      this.setShipTo(deliveryAddress.id)
    } else {
      this.props.setLoading(false);
    }
  }

  onAddressAdd = ({address}) => {
    const addressId = address.id
    this.setShipTo(addressId);
  }

  isAddressValid = (address) => {
    // console.log("[isAddressValid] address", address);
    if(!address) {
      return false;
    }

    const invalid = 
      (!address.street_address) || 
      (!address.pincode) || 
      ((address.pincode + '').length !== 6) ||
      (!address.state) ||
      (address.state.state_name === '-') ||
      (!address.city) ||
      (address.city.city_name === '-')
    
    // console.log("[isAddressValid] invalid ", invalid);
    return !invalid
  }

  onAddressSelected = ({index, address}) => {
    // console.log("[onAddressSelected]", {index, address});
    const addressId = address.id
    this.setShipTo(addressId)
  }

  onSelectDeliveryPress = () => {
    const deliveryAddress = this.getDeliveryAddress() || {}
    this.props.onSelectDeliveryPress({
      onAddressPress: this.onAddressSelected, 
      selectedAddressId: deliveryAddress.id
    })
  }

  onAddDeliveryPress = () => {
    this.props.onAddDeliveryPress({
      onUpdateAddress: this.onAddressAdd
    })
  }

  isBillingSameAsDelivery = () => {
    const defaultAddress = this.getDefaultAddress()
    const deliveryAddress = this.getDeliveryAddress()
    const sameAddress = defaultAddress && deliveryAddress && defaultAddress.id === deliveryAddress.id;
    return sameAddress
  }

  getDeliveryAddress = () => {
    const addresses = this.props.responseAddress
    const deliveryAddress = addresses.find(a => a.id === this.props.responseCart.ship_to)
    return deliveryAddress
  }

  getDefaultAddress = () => {
    const addresses = this.props.responseAddress
    const defaultAddress = addresses.find(a => a.is_default)
    return defaultAddress
  }

  onSameAsBillingPress = () => {
    const same = this.isBillingSameAsDelivery()
    if(same) {
      this.setShipTo(null)
    } else {
      const billing = this.getDefaultAddress()
      const addressId = billing.id
      this.setShipTo(addressId)
    }
  }
  
  getCurrentShippingMethodId = () => {
    const id = this.props.responseCart.shipping_method
    return id;
  }

  onBillingAddressChangePress = () => {
    this.props.navigateToBillingAddressChange()
  }

  onShippingMethodRadioPress = (index) => {
    // console.log("[onShippingMethodRadioPress]", index);
    const currentId = this.getCurrentShippingMethodId();
    const selectedCharge = this.props.responseShippingCharges[index]
    if(currentId === selectedCharge.id) {
      return;
    }
    this.patchShippingCharges(selectedCharge);
  }

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.setLoading(true)
    this.props.dispatch(shipayActions.getAddressAction())
  }

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.responseAddress !== this.props.responseAddress) {
      this.onAddressUpdated()
    }

    if(prevProps.responseSelectShippingAddress !== this.props.responseSelectShippingAddress) {
      this.onShipToUpdated();
    }

    if(prevProps.responseShippingCharges !== this.props.responseShippingCharges) {
      this.onShippingChargesFetched();
    }

    if(prevProps.responsePatchShippingCharges !== this.props.responsePatchShippingCharges) {
      this.onShippingChargesPatched();
    }

    if(prevProps.errorActionType != this.props.errorActionType && ACTION_TYPES.includes(this.props.errorActionType)) {
      this.props.setLoading(false);
    }
  }

  render() {
    if(this.props.responseAddress.length === 0) {
      return null
    }
    const testIds = this.props.testIds;

    const defaultAddress = this.getDefaultAddress()
    const defaultAddressValid = this.isAddressValid(defaultAddress)
    
    const deliveryAddress = this.getDeliveryAddress();
    const sameAddress = defaultAddress && deliveryAddress && defaultAddress.id === deliveryAddress.id;
    return(
        <View style={styles.ParentContainer}>
          <Text style={{fontSize: 14, color: colorresource.grey46}}>Please enter your Address in Billing Address and your Buyer's Address in Delivery Address.</Text>
          <Text style={{color: colorresource.liteblue, fontSize: 18, marginVertical: 10}}>Billing Address</Text>
          <AddressDisplay data={defaultAddress} valid={defaultAddressValid}/>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <PButton
            icon={defaultAddressValid? 'edit' : 'add'}
            onPress={this.onBillingAddressChangePress}
            >{defaultAddressValid? 'Change' : 'Add'}</PButton>
          </View>
          
          <View style={{backgroundColor: colorresource.divider, height: EStyleSheet.hairlineWidth}}/>

          <Text style={{color: colorresource.liteblue, fontSize: 18, marginVertical: 10}}>Delivery Address</Text>

          {defaultAddressValid?
            <WButton
            onPress={this.onSameAsBillingPress}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox selected={sameAddress}/>
                <Text>{'Same as billing address'}</Text>
              </View>
            </WButton>
          : null }

          {sameAddress || !defaultAddressValid? null : 
            <Fragment>
              <AddressDisplay data={deliveryAddress}/>


              <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
                <PButton
                icon={'add'}
                onPress={this.onAddDeliveryPress}
                >Add</PButton>
                <PButton
                icon={'done'}
                onPress={this.onSelectDeliveryPress}
                >Select</PButton>
              </View>
            </Fragment>}

          <View style={{backgroundColor: colorresource.divider, height: EStyleSheet.hairlineWidth, marginTop: 5}}/>
          


        
        {/*----------------------------------------------------------------------------------------*/}
        {/* Shipping Details - Transport*/}
        {/*----------------------------------------------------------------------------------------*/}

        {!this.props.responseCart.ship_to? null : 
        <View style={{marginTop: 20}}>
          <Text style={{
            fontSize: 15,
            color: colorresource.liteblack,
          }}>Transport via Wishbook Shipping Partner</Text>
          
          {this.props.responseShippingCharges.map((item, index) =>
            <View key={item.shipping_method_id} style={styles.ShippingDetailsShippingParent}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Radio 
                onPress={() => this.onShippingMethodRadioPress(index)} 
                selected={this.props.responseCart.shipping_method === item.shipping_method_id}
                {...testIds.ShippingMethod(item.shipping_method_name)}
                />
                <Text 
                style={styles.ShippingDetailsShippingMethod} 
                onPress={() => this.onShippingMethodRadioPress(index)}
                >{item.shipping_method_name}</Text>
              </View>
              <View style={styles.ShippingDetailsShippingInfo}>
                <View style={styles.ShippingDetailsShippingRow}>
                  <View>
                    <Text style={styles.ShippingDetailsInfoName}>Shipping Charges</Text>
                  </View>
                  <View>
                    <Text style={styles.ShippingDetailsInfoValue} {...testIds.ShippingCharges(item.shipping_method_name)}>{item.shipping_charge}</Text>
                  </View>
                </View>
                <View style={styles.ShippingDetailsShippingRow}>
                  <View>
                    <Text style={styles.ShippingDetailsInfoName}>Shipping Duration</Text>
                  </View>
                  <View>
                    <Text style={styles.ShippingDetailsInfoValue}>{item.shipping_method_delivery_duration}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>}
        
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseCart: state.cartR.responseGetCatalogWiseCartDetails,
    responseAddress: state.shipayR.responseGetAddress,
    responseSelectShippingAddress: state.shipayR.responseSelectShippingAddress,
    responseShippingCharges: state.shipayR.responseGetShippingCharges,
    responsePatchShippingCharges: state.shipayR.responsePatchShippingCharges,
    responseInitialize: state.shipayR.responseInitializeShippingDetails,
    errorActionType: state.errorHandlerR.errorActionType,
  })
}

export default connect(mapStateToProps, null, null, { withRef: true })(ShippingDetails);

class AddressDisplay extends Component {

  textStyle = {
    fontSize: 14,
    color: colorresource.grey46
  }

  render() {
    if(!this.props.data) {
      return null
    }
    const {
      name,
      street_address,
      city: {city_name},
      state: {state_name},
      pincode,

    } = this.props.data

    if(this.props.valid === false) {
      return (
        <Text style={this.textStyle}>No Address</Text>
      )
    }

    return (
      <View>
        <Text style={this.textStyle}>{name}</Text>
        <Text style={this.textStyle}>{street_address}</Text>
        <Text style={this.textStyle}>{city_name}</Text>
        <Text style={this.textStyle}>{state_name}</Text>
        <Text style={this.textStyle}>{pincode}</Text>
      </View>
    );
  }
}