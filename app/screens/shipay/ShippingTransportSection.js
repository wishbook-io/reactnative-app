import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Radio, Label } from 'native-base';

import styles from './styles';

export default class ShippingTransportSection extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={{
        flexDirection: 'row', 
        //borderWidth: 1, 
        //borderColor: 'yellow'
        }}>
          <Radio 
          selected={true} 
          style={styles.ShippingAddressRadio} 
          onPress={this.onPressHandler}
          />
          <Label style={{
            //borderWidth: 1, 
            //borderColor: 'cyan'
          }}>Transport via Wishbook Shipping Partner</Label>
        </View>
        <View style={styles.ShippingTransportCharges}>
          <View>
            <Text>Shipping Charges</Text> 
          </View>
          <View>
            <Text>{'\u20B9'} 179</Text>
          </View>
        </View>
      </View>
    );
  }
}