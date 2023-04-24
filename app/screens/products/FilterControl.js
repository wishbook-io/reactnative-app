import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import  { Text, Icon } from 'native-base';

import { colorresource } from 'app/resources/colorresource'

export default class FilterControl extends Component {
  render() {
    const { 
      title, 
      value,
      onPress,
      disabled,
    } = this.props
    // console.log("now rendering FilterControl", {title, value})
    return (
      <TouchableOpacity activeOpacity={1} style={{marginLeft: 10}} onPress={onPress} disabled={disabled}>
        <Text style={{color: colorresource.gray, fontSize: 12}}>{title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 3}}>
          <Text style={{fontSize: 14, color: disabled? colorresource.litegray : undefined}}>{value}</Text>
          <Icon name='chevron-down' type='MaterialCommunityIcons' style={{fontSize: 21, color: (disabled? colorresource.litegray : undefined)}}/>
        </View>
      </TouchableOpacity>
    )
  }
}