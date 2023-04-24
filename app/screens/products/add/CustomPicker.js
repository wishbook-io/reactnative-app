import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Text, Picker } from 'native-base';
import { HelperText } from 'react-native-paper';

import DropdownMaterial from 'app/components/Dropdown/DropdownMaterial';
import { colorresource } from '../../../resources/colorresource';
import styles from './styles';

export default CustomPicker = ({title, options, Hint, selectedIndex, onChange, hideFirst, testId}) => {
  const selectedValue = options[selectedIndex]
  let optionList = options;
  if(hideFirst) {
    optionList.splice(0,1)
  }
  const onValueChange = (selectedValue, selectedIndex) => {
    if(selectedIndex === undefined) {
      selectedIndex = options.findIndex(i => i === selectedValue)
    }
    if(hideFirst) {
      selectedIndex = selectedIndex + 1;
    }
    onChange(selectedValue, selectedIndex);
  }
  return (
    <View style={styles.AddProductsSubSection}>
      <DropdownMaterial
      // style={localStyles.AddProductsPicker}
      parentStyle={{marginVertical: 0, marginTop: 10,}}
      label={title}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      testId={testId}
      >
      { optionList.map((item, index) => {
          return (
            <Picker.Item key={index} label={item} value={item}/>
          );
      })}
      </DropdownMaterial>
      { Hint ?
        <View style={styles.AddProductsHint}>
          <Hint/>
        </View>
        : null
      }
    </View>
  );
}


// local styles: they should not be defined in global styles
const localStyles = EStyleSheet.create({
  AddProductsPickerParent: {
    borderBottomWidth: 0.5,
    borderBottomColor: colorresource.litegray,
  },
  AddProductsPicker: {

  }
});
