import React from 'react';
import { TouchableOpacity } from 'react-native'
import { Radio as NBRadio, Icon } from 'native-base'
import { RadioButton as PRadio } from 'react-native-paper'

import { colorresource } from 'app/resources/colorresource'

const RadioUsingNativeBase = ({
  radioStyle={}, 
  selectedColor=colorresource.liteblue, 
  deselectedColor='black', 
  disabledColor=colorresource.grey400, 
  disabled, 
  selected,
  onPress,
  testId={},
  }) => {
  return (
    <NBRadio
    color={disabled? disabledColor : deselectedColor}
    selectedColor={disabled? disabledColor : selectedColor}
    disabled={disabled}
    selected={selected}
    style={radioStyle}
    onPress={onPress}
    {...testId}
    />
  )
}

const RadioUsingIcon = ({
  radioStyle={}, 
  selectedColor=colorresource.liteblue, 
  deselectedColor='black', 
  disabledColor=colorresource.grey400, 
  disabled, 
  selected,
  onPress,
  testId={},
  }) => {
  return (
    <TouchableOpacity {...testId} onPress={onPress} disabled={disabled}>
      <Icon
      color={disabled? disabledColor : deselectedColor}
      selectedColor={disabled? disabledColor : selectedColor}
      type={'MaterialIcons'}
      name={selected? "radio-button-checked" : 'radio-button-unchecked'}
      style={[radioStyle, {fontSize: 24, color: disabled? disabledColor : selected? selectedColor: deselectedColor}]}
      />
    </TouchableOpacity>
  )
}

export default Radio = ({
  radioStyle={}, 
  selectedColor=colorresource.liteblue, 
  deselectedColor='black', 
  disabledColor=colorresource.grey400, 
  disabled, 
  selected,
  onPress,
  hide,
  testId={},
  }) => {
  if(hide) {
    return null;
  }
  return (
    // <TouchableOpacity {...testId} onPress={onPress} disabled={disabled}>
    //   <Icon
    //   color={disabled? disabledColor : deselectedColor}
    //   selectedColor={disabled? disabledColor : selectedColor}
    //   type={'MaterialIcons'}
    //   name={selected? "radio-button-checked" : 'radio-button-unchecked'}
    //   style={[radioStyle, {fontSize: 24, color: disabled? disabledColor : selected? selectedColor: deselectedColor}]}
    //   />
    // </TouchableOpacity>
    <PRadio.Android
    status={selected? 'checked' : 'unchecked'}
    color={selectedColor}
    uncheckedColor={deselectedColor}
    disabled={disabled}
    onPress={onPress}
    {...testId}
    />
  )
}