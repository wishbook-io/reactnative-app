import React, { Component, PureComponent } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import { SizeItem } from 'app/screens/cart/SizedMultiSelectionItem';
import { colorresource } from 'app/resources/colorresource'

export default class ChooseSizes extends PureComponent {

  onCheckBoxPress = (subIndex) => {
    //console.log("[ChooseSizes:onCheckBoxPress]", {subIndex})
    this.props.onCheckBoxPress(subIndex);
  }

  render() {
    const { 
      sizes,
      hide,
      selected,
      parentStyle={}
    } = this.props;

    if(!sizes || hide || sizes.length === 0) {
      return null;
    }

    return (
      <View style={parentStyle}>
        <Text>{'Choose sizes you sell:'}</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.props.sizes.map((size, index) => 
            <SizeItem
              key={size}
              data={size}
              selected={selected && selected.includes(index)}
              index={index}
              onCheckBoxPress={this.onCheckBoxPress}
            />
          )}
        </View>
      </View>
    )
  }
}