import React, {Fragment} from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import _ from 'lodash';

import { formatDate } from 'app/utils/dateHelper'
import {colorresource} from 'app/resources/colorresource';
import styles from './styles';

/* global getProp */

export default ({cartDetails, showDeliveryCharges = true, showWbMoney, testIds}) => {
  const getProp = (path, defValue='') => {
    return _.get(cartDetails, path, defValue);
  }

  const cOrderAmount = getProp('amount');
  const cDiscount = getProp('seller_discount')
  const cOrderDate = formatDate('D MMM Y');
  const cGst = getProp('taxes');
  const shippingCharge = getProp('shipping_charges')
  const cDeliveryCharges = showDeliveryCharges? shippingCharge : '';
  const cTotalAmount = getProp('total_amount') // after removing discount and adding GST
  const cWbMoney = getProp('wbmoney_points_used')
  const cRewardPoints = getProp('wbpoints_used')
  const cPayableAmount = getProp('pending_amount') // after subtracting WB Money, Reward points

  return (
    <View style={styles.InvoiceSummaryParent}>
      <View style={styles.InvoiceSummaryEntry}>
        <View>
          <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.gray}]}>Order date</Text>
        </View>
        <View>
          <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.gray}]} {...testIds.OrderDate}>{cOrderDate}</Text>
        </View>
      </View>

      <View style={styles.InvoiceSummaryEntry}>
        <View>
          <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.liteblack}]}>Total order amount</Text>
        </View>
        <View>
          <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.liteblack}]} {...testIds.TotalOrderAmount}>{'\u20B9 '+cOrderAmount}</Text>
        </View>
      </View>

      <View style={styles.InvoiceSummaryEntry}>
        <View>
          <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.darkgreen}]}>Total discount</Text>
        </View>
        <View>
          <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.darkgreen}]} {...testIds.TotalDiscount}>- {'\u20B9 ' + cDiscount}</Text>
        </View>
      </View>

      <View style={styles.InvoiceSummaryEntry}>
        <View>
          <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.gray}]}>Total GST</Text>
        </View>
        <View>
          <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.gray}]} {...testIds.TotalGst}>+ {'\u20B9 '+cGst}</Text>
        </View>
      </View>

      {cDeliveryCharges?
        <View style={styles.InvoiceSummaryEntry}>
          <View>
            <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.liteblack}]}>Delivery charges</Text>
          </View>
          <View>
            <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.liteblack}]} {...testIds.DeliveryCharges}>+ {'\u20B9 ' + cDeliveryCharges}</Text>
          </View>
        </View>
        : null}

      <View style={styles.InvoiceDetailsSeparator}/>

      <View style={styles.InvoiceSummaryEntry}>
        <View>
          <Text style={styles.InvoiceSummaryEntryTotalText}>Total amount</Text>
        </View>
        <View>
          <Text style={styles.InvoiceSummaryEntryTotalText} {...testIds.TotalAmount}>{'\u20B9 ' + cTotalAmount}</Text>
        </View>
      </View>

      { (cWbMoney && cWbMoney > 0) || (cRewardPoints && cRewardPoints > 0)?
        <Fragment>

          {cWbMoney && cWbMoney > 0? 
          <View style={styles.InvoiceSummaryEntry}>
            <View>
              <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.liteblue, fontSize: 14}]}>WB Money</Text>
            </View>
            <View>
              <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.liteblue, fontSize: 14}]} {...testIds.WbMoneyUsed}>- {'\u20B9 ' + cWbMoney}</Text>
            </View>
          </View> 
          : null}

          {cRewardPoints && cRewardPoints > 0?
          <View style={styles.InvoiceSummaryEntry}>
            <View>
              <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.liteblue, fontSize: 14}]}>WB Rewards</Text>
            </View>
            <View>
              <Text style={[styles.InvoiceSummaryEntryDetailsText, {color: colorresource.liteblue, fontSize: 14}]} {...testIds.WbMoneyUsed}>- {'\u20B9 ' + cRewardPoints}</Text>
            </View>
          </View> : null}

          <View style={styles.InvoiceSummaryEntry}>
            <View>
              <Text style={styles.InvoiceSummaryEntryTotalText}>Payable amount</Text>
            </View>
            <View>
              <Text style={styles.InvoiceSummaryEntryTotalText} {...testIds.PayableAmount}>{'\u20B9 ' + cPayableAmount}</Text>
            </View>
          </View>
        </Fragment>
        : null}

      <View style={styles.InvoiceDetailsSeparator}/>

    </View>
  );
}