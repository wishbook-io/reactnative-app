import React, { Component } from 'react';
import { View, TouchableOpacity, DatePickerAndroid, TextInput, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Text as NBText, Icon, CheckBox } from 'native-base';

import { colorresource } from '../../../resources/colorresource';
import styles from './styles';
import FloatingTextInput from '../../../components/Inputtextbutton/FloatingTextInput';

export default class OtherDetails extends Component {

  onMultiEavChange = (index) => {
    console.log("changed index", index);
    const eav = this.props.eav[0];
    this.props.onMultiEavChange(index)
  }

  constructor(props) {
    super(props)
  }

  render() {
    let {eav} = this.props;
    eav = eav && eav[0];
    return (
      <View style={styles.AddProductsSection}>
      { eav
      ? <MultipleEav 
      data={eav.values.map((item, index)=> item.value)} 
      onValueChange={this.onMultiEavChange}
      heading={eav.name}
      selected={eav.selected}
      />
      : null}
        <View style={styles.AddProductsSubSection}>
          <Text style={styles.AddProductsSubHeading}>Other Details</Text>
          <View>
            <FloatingTextInput
            label={'Type here..'}
            />
          </View>
        </View>
      </View>
    );
  }
}

const MultipleEav = ({data, onValueChange, heading, selected}) => {
  if(!data) {
    return null;
  }
  onPress = (index) => {
    onValueChange(index)
  }
  return (
    <View style={styles.AddProductsSubSection}>
      <Text style={styles.AddProductsSubHeading}>{heading}</Text>
      <View style={localStyles.EavFlexParent}>
        {data.map((item, index) =>
          <TouchableOpacity key={index} style ={localStyles.EavFlexItem} onPress={() => onPress(index)}>
            <Text>{item}</Text>
            <CheckBox style={localStyles.EavCheckbox} checked={selected.includes(index)} onPress={() => onPress(index)}/>
          </TouchableOpacity>
        )}
        
      </View>
    </View>
  );
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
    // borderColor: 'red',
    // borderWidth: 1,
  },
  EavCheckbox: {
    marginRight: 10,
  }
});