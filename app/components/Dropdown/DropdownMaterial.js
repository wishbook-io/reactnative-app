import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native'
import { Text, Picker } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import color from 'color';

import { isWeb } from 'app/utils/PlatformHelper';
import { colorresource } from 'app/resources/colorresource';

const bgColor = color(colorresource.materialbg).darken(0.06).rgb().string()
const radius = 5;
const trisize = 5;

export default class DropdownMaterial extends Component {
  render() {
    const {
      error,
      label,
      labelStyle = {},
      arrowStyle = {},
      pickerStyle = {},
      parentStyle = {},
      loading = false,
      hideArrow = isWeb || loading,
      testId = {},
      children,
      ...rest
    } = this.props;
    return (
      <View style={[
        styles.parent, 
        {borderBottomColor: error? colorresource.materialerror : '#ababab'}, 
        parentStyle
      ]}>

        {loading? 
          <View style={styles.loader}>
            <ActivityIndicator color={colorresource.liteblue}/>
          </View>
        : null}

        <Text style={[
          styles.label, 
          {
            color: error? colorresource.materialerror : colorresource.thirdblack, 
          }, 
          labelStyle
        ]}>{label}</Text>
        {children?
        <Picker
        mode="dropdown"
        style={[styles.picker, pickerStyle]}
        {...testId}
        {...rest}
        >{children}</Picker> : <View style={{flex: 1, height: 50}}/>}
        {hideArrow? null : <View style={[styles.arrow, arrowStyle]}/>}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  parent: {
    flex:1, 
    marginVertical: 10,
    backgroundColor: bgColor,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    borderBottomWidth: 1,
    overflow: 'hidden',
    paddingLeft: 12,
  },
  label: {
    fontSize: 12, 
    marginTop: 12, 
    marginBottom: 0, 
    paddingBottom: 0
  },
  picker: {
    backgroundColor: bgColor,
    marginLeft: -5,
  },
  arrow: {
      position: 'absolute',
      borderTopWidth: trisize,
      borderRightWidth: trisize,
      borderBottomWidth: 0,
      borderLeftWidth: trisize,
      borderTopColor: colorresource.thirdblack,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      right: 15,
      bottom: 20,
  },
  loader: {
    position: 'absolute',
    right: 15,
    bottom: 20,
  }
})