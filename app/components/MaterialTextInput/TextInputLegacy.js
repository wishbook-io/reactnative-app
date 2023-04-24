import React, { Component } from 'react';
import { View } from 'react-native'
import { Icon } from 'native-base';
import { TextField } from 'react-native-materialui-textfield'

import { colorresource } from 'app/resources/colorresource'

export default class TextInputLegacy extends Component{
  render() {
    const {
      inputTestId = {},
      trailingTestId = {},
      labelHeight = 16,
      trailingStyle,
      trailingProps,
      parentStyle={},
      ...rest
    } = this.props
    return (
      <View style={parentStyle}>
        <TextField
          labelHeight={labelHeight}
          tintColor={colorresource.liteblue}
          selectionColor={colorresource.liteblue}
          {...inputTestId}
          {...rest}
        />
        {trailingProps? 
          <Icon 
            {...trailingProps} 
            style={[{position: 'absolute', right: 5, top: 17}, trailingStyle]}
            {...trailingTestId}
          /> : null}
      </View>
    )
  }
}