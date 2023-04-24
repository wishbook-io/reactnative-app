import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, CardItem } from 'native-base';
import { colorresource } from '../../resources/colorresource';

class MyCartItemToggleDetails extends Component {
  render() {
    return (
      <CardItem style={{/*borderWidth: 1, borderColor: 'black'*/}}>
        <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{color: colorresource.liteblue, fontWeight:'bold'}}>Item Details {'>'}</Text>
          <View>
            <Text>{'\u20B9'} 4530.0</Text>
          </View>
        </View>
      </CardItem>
    );
  }
}

export default MyCartItemToggleDetails;