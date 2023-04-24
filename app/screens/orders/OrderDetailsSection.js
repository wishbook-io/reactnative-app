import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet'

import styles, { getColorFromStatus } from './styles';
import { formatDateFromServer } from 'app/utils/dateHelper';
import { colorresource } from 'app/resources/colorresource';

import { TestIdGenerator } from "../../utils/TestingHelper";
const buttonIdGenerator = TestIdGenerator("OrdersDetailScreen", "", "Button");
const textIdGenerator = TestIdGenerator("OrdersDetailScreen", "", "Text");

class OrderDetailsSection extends Component {
  render() {
    const data = this.props.data;
    if(!data) {
      return null;
    }
    return (
      <View>
        <Text style={styles.title}>Order Details</Text>
        <View style={styles.textBox}>
          <Text style={styles.text}>Order No</Text>
          <Text {...textIdGenerator("OrderNumber")} style={styles.text}>
            {data.order_number}
          </Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>Order Date</Text>
          <Text {...textIdGenerator("OrderDate")} style={styles.text}>
            {formatDateFromServer(data.date)}
          </Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>Order Status</Text>
          <Text
            {...textIdGenerator("OrderStatus")}
            style={[
              styles.text,
              { color: getColorFromStatus(data.processing_status) }
            ]}
          >
            {data.processing_status === "Pending"
              ? "Order Placed"
              : data.processing_status}
          </Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>Payment Status</Text>
          <Text
            {...textIdGenerator("PaymentStatus")}
            style={[
              styles.text,
              { color: getColorFromStatus(data.payment_status) }
            ]}
          >
            {data.payment_status}
          </Text>
        </View>
        {data.payment_date === null ? null : (
          <View style={styles.textBox}>
            <Text style={styles.text}>Payment Date</Text>
            <Text
              {...textIdGenerator("PaymentDate")}
              style={[styles.text, { color: colorresource.green }]}
            >
              {formatDateFromServer(data.payment_date, "MMMM DD, YYYY")}
            </Text>
          </View>
        )}
        {data.payment_details === null ? null : (
          <View style={styles.textBox}>
            <Text style={styles.text}>Payment Detail</Text>
            <View style={{ flex: 1 }}>
              <Text
                {...textIdGenerator("PaymentDetails")}
                style={[
                  styles.text,
                  { color: colorresource.green, textAlign: "right" }
                ]}
              >
                {data.payment_details}
              </Text>
            </View>
          </View>
        )}
        {this.props.marginAmount?
          <View style={styles.textBox}>
            <Text style={styles.text}>Margin amount</Text>
            <Text
              {...textIdGenerator("MarginAmount")}
              style={[styles.text, { color: colorresource.green }]}
            >
              {this.props.marginAmount}
            </Text>
          </View>
          : null
        }
      </View>
    )
  }
}

export default OrderDetailsSection;