import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet'

import { colorresource } from 'app/resources/colorresource'

const Info = ({
  label,
  value,
  onPress,
  hide,
  infoValueStyle,
  subInfoValueStyle,
  subInfoValueText,
}) => {
  if(!value || hide) {
    return null;
  }
  if(Array.isArray(value)) {
    value = value.join(', ')
  }
  return (
    <View style={{
      flexDirection: 'row', 
      paddingVertical: 5, 
      // flex: 1, 
      alignItems: 'center',
      // borderWidth: 1,
    }}>
      <View style={infoStyles.infoLabel}>
        <Text style={infoStyles.infoLabelText}>{label + ' :'}</Text>
      </View>
      <View style={infoStyles.infoValue}>
        <Text 
        style={[(onPress? infoStyles.infoValueLinkText : infoStyles.infoValueText), infoValueStyle]} 
        onPress={onPress}
        >{value}</Text>
        {subInfoValueText? <Text style={subInfoValueStyle}>{subInfoValueText}</Text> : null}
      </View>
    </View>
  )
}

const infoStyles = EStyleSheet.create({
  infoLabel: {
    width: 110,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabelText: {
    color: colorresource.gray,
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
  infoValue: {
    flexWrap: 'wrap',
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  infoValueText: {
    color: colorresource.liteblack,
    fontSize: 12,
  },
  infoValueLinkText: {
    color: colorresource.liteblue,
    fontSize: 12,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  }
})

export default Info;