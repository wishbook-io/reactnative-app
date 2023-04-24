import React, { Component } from 'react';
import { View, Switch } from 'react-native';
import {
  Text,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux'

import { colorresource } from 'app/resources/colorresource'
import consts from 'app/utils/const'
import UserHelper from 'app/config/userHelper';
import shipayStyles from 'app/screens/shipay/styles';

import { patchResellerTotalAmountAction } from 'app/actions/shipay-actions'

class ShipayResellerSection extends Component {

  //public methods start
  update = () => {
    this.setState({hide: false});
  }
  
  validate = () => {
    // console.log("[ShipayResellerSection:validate]")
    if(!this.state.resellerOrderSwitch) {
      // console.log("[ShipayResellerSection:validate] switch off")
      return true;
    }
    
    const catalogs = this.props.responseCart.catalogs;
    for(let i=0; i<catalogs.length; i++) {
      const displayAmount = Number.parseFloat(catalogs[i].catalog_display_amount)
      const itemAmount = this.calculatePriceForCatalog(i)
      // console.log("[ShipayResellerSection:validate]", { displayAmount, itemAmount })
      if(displayAmount <= itemAmount) {
        this.props.navigateToChangeResaleAmount();
        // this.props.showToast("Please enter a valid resale amount greater than " + itemAmount)
        return false
      }
    }

    const orderAmount = Number.parseInt(this.props.responseCart.total_amount)
    const resaleAmount = this.calculateResaleAmount();
    if(resaleAmount > orderAmount) {
      return true;
    }
    this.props.navigateToChangeResaleAmount();
    this.props.showToast("Please enter a valid resale amount")
    return false
  }

  patchResellerTotalAmount = () => {
    const isResellerOrder = this.state.resellerOrderSwitch;
    this.props.dispatch(patchResellerTotalAmountAction({
      reseller_order: isResellerOrder,
      display_amount: isResellerOrder? this.calculateResaleAmount() : 0
    }))
  }
  //public methods end

  calculatePriceForCatalog = (index) => {
    const item = this.props.responseCart.catalogs[index]
    const amount = parseInt(item.catalog_total_amount) + parseInt(item.catalog_shipping_charges)
    return amount;
  }

  onResellerTotalAmountPatched = () => {
    this.props.onResellerTotalAmountPatched();
  }

  calculateResaleAmount = () => {
    const products = this.props.responseCart.catalogs || []
    return products.reduce((total, curr) => {
      const amount = Number.parseInt(curr.catalog_display_amount)
      return total + (amount? amount : 0)
    }, 0)
  }

  onResellerOrderSwitchChange = (value) => {
    this.setState({resellerOrderSwitch: value})
  }
  
  constructor(props) {
    super(props)
    this.state = {
      hide: true,
      resellerOrderSwitch: UserHelper.isUserReseller(),
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.responsePatch !== this.props.responsePatch) {
      this.onResellerTotalAmountPatched()
    }
  }

  render() {
    
    if(this.state.hide || !this.props.responseCart.ship_to) {
      return null;
    }

    return (
      <View style={shipayStyles.ParentContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={shipayStyles.SectionHeading}>Reseller Order</Text>
          <Switch value={this.state.resellerOrderSwitch} onValueChange={this.onResellerOrderSwitchChange}/>
        </View>
        <Text style={{marginTop: 8, color: colorresource.gray, fontSize: 14}}>{this.state.resellerOrderSwitch? consts.RESELLER_SWITCH_ON_NOTE : consts.RESELLER_SWITCH_OFF_NOTE}</Text>
        
        {this.state.resellerOrderSwitch? 
          <ResellerAmountSection 
          onChangePress={this.props.navigateToChangeResaleAmount}
          totalAmount={this.props.responseCart.total_amount}
          resaleAmount={this.props.responseCart.display_amount}
          /> 
        : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseCart: state.cartR.responseGetCatalogWiseCartDetails,
    responsePatch: state.shipayR.responsePatchResellerTotalAmount,
  })
}

export default connect(mapStateToProps, null, null, {withRef: true})(ShipayResellerSection)

const styles = EStyleSheet.create({
  ResellerAmountParent: {
    marginTop: 16,
    flexDirection: 'row',
  },
  ResellerAmountLabelText: {
    color: colorresource.liteblack,
    fontSize: 16,
  },
  ResellerAmountText: {
    marginLeft: 10,
    color: colorresource.liteblack,
    fontSize: 16,
  }
})

export const ResellerAmountSection = ({onChangePress, totalAmount, resaleAmount}) => {
  return (
    <View>
      <View style={styles.ResellerAmountParent}>
        <Text style={styles.ResellerAmountLabelText}>Order Amount</Text>
        <Text style={styles.ResellerAmountText}>{`₹${totalAmount}`}</Text>
      </View>
      <View style={styles.ResellerAmountParent}>
        <Text style={styles.ResellerAmountLabelText}>Resale Amount</Text>
        <Text style={styles.ResellerAmountText}>{`₹${resaleAmount}`}</Text>
        {onChangePress? <Text style={{color: colorresource.liteblue, textDecorationLine: 'underline', marginLeft: 10}} onPress={onChangePress}>Change</Text> : null }
      </View>
    </View>
  );
}