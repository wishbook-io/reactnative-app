import React, { Component } from 'react';
import { View, TouchableOpacity, DatePickerAndroid, TextInput, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Text as NBText, Icon } from 'native-base';

import CheckBox from 'app/components/CheckBox/CheckBox';
import { colorresource } from '../../../resources/colorresource';
import styles from './styles';
import FloatingTextInput from '../../../components/Inputtextbutton/FloatingTextInput';

export default CheckBoxFlex = ({data, onValueChange, heading, selected}) => {

  // onMultiEavChange = (index) => {
  //   console.log("changed index", index);
  //   const eav = this.props.eav[0];
  //   this.props.onMultiEavChange(index)
  // }
  if(!data) {
    return null;
  }

  const onPress = (index) => {
    onValueChange(index)
  }

  return (
    <View style={styles.AddProductsSubSection}>
      <Text style={styles.AddProductsSubHeading}>{heading}</Text>
      <View style={localStyles.EavFlexParent}>
        {data.map((item, index) =>
          <TouchableOpacity activeOpacity={1} key={index} style ={localStyles.EavFlexItem} onPress={() => onPress(index)}>
            <Text>{item}</Text>
            <CheckBox checkBoxStyle={localStyles.EavCheckbox} selected={selected.includes(index)} onPress={() => onPress(index)}/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

// local styles: they should not be defined in global styles
const localStyles = EStyleSheet.create({
  EavFlexParent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
  EavFlexItem: {
    flexDirection: 'row',
    marginLeft: 15,
    paddingBottom: 11,
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  EavCheckbox: {
    marginRight: 10,
  }
});