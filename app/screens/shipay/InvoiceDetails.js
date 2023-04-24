import React, {Component} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, H3 } from 'native-base';
import {connect} from 'react-redux'

import { colorresource } from '../../resources/colorresource';
import CheckBox from 'app/components/CheckBox/CheckBox';
import InvoiceSummary from './InvoiceSummary';
import styles from './styles';

import { getCatalogWiseCartDetailsAction } from 'app/actions/cart-actions';
import { getWbMoneyDashboardAction } from 'app/actions/wbmoney-actions';

import {patchWbMoney} from './serverHelper';
import { waitTillUserInfoAndStatisticsAreFetched } from 'app/utils/debugHelper';

const FEATURE_DISABLE_WB_MONEY = true;

class InvoiceDetails extends Component {

  //public methods start
  update = () => {
    this.setState({hide: false})
  }
  //public methods end

  getAvailableWbMoney = () => {
    const responseWbMoney = this.props.responseWbMoneyDashboard;
    if(Object.keys(responseWbMoney).length > 0) {
      return this.props.responseWbMoneyDashboard.total_available
    }
    return ''
  }

  onWbMoneyCheckBoxPress = () => {
    const updatedUsingWbMoney = !this.usingWbMoney();
    let patchAmount = 0;
    if(updatedUsingWbMoney) {
      const totalAmount = parseFloat(this.props.responseCartDetails.total_amount)
      const wbMoney = this.getAvailableWbMoney();
      patchAmount = Math.min(totalAmount, wbMoney)
    }
    patchWbMoney({wbmoney_points_used: patchAmount})
  }

  usingWbMoney = () => {
    return this.props.responseCartDetails.wbmoney_points_used > 0
  }

  disableWbMoney = () => {
    return this.props.responseCartDetails.wbmoney_points_used < 0
  }

  constructor(props) {
    super(props)
    this.state = {
      hide: true
    }

  }

  componentDidMount() {
    // waitTillUserInfoAndStatisticsAreFetched().then(() => this.props.dispatch(getCatalogWiseCartDetailsAction()))
    this.props.dispatch(getWbMoneyDashboardAction());
  }

  render() {
    
    if(this.state.hide || !this.props.responseCartDetails.ship_to) {
      return null;
    }

    const testIds = this.props.testIds;
    return (
      <View style={styles.ParentContainer}>

        {FEATURE_DISABLE_WB_MONEY? null : 
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
          <View>
            <CheckBox 
            checkBoxStyle={{marginRight: 10}} 
            checked={this.usingWbMoney()} 
            disabled={this.disableWbMoney()}
            onPress={this.onWbMoneyCheckBoxPress}
            {...testIds.WbMoneyCheckBox}
            />
          </View>
          <TouchableOpacity style={{flex: 1, marginLeft: 20}}  onPress={this.onWbMoneyCheckBoxPress} disabled={this.disableWbMoney()}>
            <Text style={[{fontSize: 14}, this.disableWbMoney? {color: colorresource.grey400} : {}]}>Use WB Money for this payment</Text>
            <Text style={{fontSize: 12, color: colorresource.liteblue}} {...testIds.WbMoneyAvailable}>{this.getAvailableWbMoney() + ' WB Money available'}</Text>
          </TouchableOpacity>
        </View>}
      
        <Text style={styles.SectionHeading}>Invoice Details</Text>

        <InvoiceSummary cartDetails={this.props.responseCartDetails} testIds={testIds}/>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseCartDetails: state.cartR.responseGetCatalogWiseCartDetails,
    responseWbMoneyDashboard: state.wbMoneyR.responseWbMoneyDashboard,
  })
}

export default connect(mapStateToProps, null, null, { withRef: true })(InvoiceDetails);
