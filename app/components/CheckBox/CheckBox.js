import React from 'react';
import { CheckBox as NBCheckBox } from 'native-base'
import { Checkbox as PCheckBox } from 'react-native-paper'
import { colorresource } from 'app/resources/colorresource'

const CheckBoxUsingNativeBase = ({
  checkBoxStyle={}, 
  selectedColor=colorresource.liteblue, 
  deselectedColor='black', 
  disabledColor=colorresource.grey400, 
  disabled, 
  selected,
  onPress,
  testId={},
  }) => {
  return (
    <NBCheckBox
    color={disabled? disabledColor : selected? selectedColor : deselectedColor}
    // selectedColor={disabled? disabledColor : selectedColor}
    disabled={disabled}
    checked={selected}
    style={checkBoxStyle}
    onPress={onPress}
    {...testId}
    />
  )
}

export default CheckBox = ({
  checkBoxStyle={}, 
  selectedColor=colorresource.liteblue, 
  deselectedColor='black', 
  disabledColor=colorresource.grey400, 
  disabled, 
  selected,
  onPress,
  testId={},
  }) => {
  return (
    <PCheckBox.Android
    status={selected? 'checked' : 'unchecked'}
    disabled={disabled}
    color={selectedColor}
    uncheckedColor={deselectedColor}
    onPress={onPress}
    style={checkBoxStyle}
    {...testId}
    />
  )
}