import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import styles from './styles';

import { TestIdGenerator } from "../../utils/TestingHelper";
const buttonIdGenerator = TestIdGenerator("OrdersDetailScreen", "", "Button");
const textIdGenerator = TestIdGenerator("OrdersDetailScreen", "", "Text");

export default class ShipmentAddressSection extends Component {
  render() {
    const shipTo = this.props.shipTo
    if(!shipTo) {
      return null;
    }
    return (
      <View>
        <Text style={styles.title}>Shipment Address</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10
          }}
        >
          <Text style={styles.text}>Shipping Address</Text>
          <Text
            {...textIdGenerator("ShippingAddress")}
            multiline={true}
            style={[
              styles.text,
              {
                marginHorizontal: 10,
                flex: 1,
                flexWrap: "wrap",
                textAlign: "right"
              }
            ]}
          >
            {shipTo.street_address +
              ", " +
              shipTo.state.state_name +
              ", " +
              shipTo.city.city_name +
              " - " +
              shipTo.pincode}
          </Text>
        </View>
      </View>
    )
  }
}