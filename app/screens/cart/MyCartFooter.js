import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'native-base';

import { colorresource } from '../../resources/colorresource';

const MyCartFooter = ({ onPlaceOrderPress, totalAmount, testIds }) => {
  if(!totalAmount) {
    return null;
  }
  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor:'white',
      padding: 7,
      //borderWidth: 1,
      //borderColor: 'yellow',
    }}>
      <View style={{justifyContent:'space-around'}}>
        <View>
          <Text style={{fontSize: 17}} {...testIds.total}>{'Total Value: ₹' + totalAmount}</Text>
        </View>

        <View>
          <Text style={{fontSize: 13, color: 'grey'}}>(Including GST)</Text>
        </View>
      </View>

      <View style={{
        //borderWidth:1, 
        //borderColor: 'red', 
        justifyContent:'center'}}>
        <Button 
        style={{backgroundColor: colorresource.orange}}
        borderRadius={5}
        onPress={() => onPlaceOrderPress()}
        {...testIds.placeOrder}
        >
          <Text>Place order</Text>
        </Button>
      </View>
    </View>
  );
}

export default MyCartFooter;