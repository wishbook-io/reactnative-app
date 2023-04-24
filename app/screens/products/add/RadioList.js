import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Text } from 'native-base';

import Radio from 'app/components/Radio/Radio';

import { colorresource } from '../../../resources/colorresource';
import styles from './styles';

export default RadioList = ({data, selectedValue, onValueChange, heading, testIds=[]}) => {
  
  const onRadioPress = (value) => {
    if(selectedValue !== value) {
      onValueChange(value)
    }
  }

  return (
    <View style={styles.AddProductsSubSection}>
      <Text style={styles.AddProductsSubHeading}>{heading}</Text>
      <View style={localStyles.AddProductsRadioList}>
        {data.map((item, index) => 
          <RadioRow text={item} selected={selectedValue === item} onRadioPress={onRadioPress} key={index} testId={testIds[index]}/>
        )}
      </View>
    </View>
  );
}

const RadioRow = ({text, onRadioPress, selected, testId={}}) => {
  const onPress = () => onRadioPress(text)
  return (
    <TouchableOpacity activeOpacity={1} style={localStyles.AddProductsRadioRow} onPress={onPress}>
      <View style={localStyles.AddProductsRadioView}>
        <Radio radioStyle={localStyles.AddProductsRadio} selected={selected} onPress={onPress} testId={testId}/>
      </View>
      <View>
        <Text style={styles.AddProductsDefaultText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

// local styles: they should not be defined in global styles
const localStyles = EStyleSheet.create({
  $radioLineSpace: 10,
  AddProductsRadioList: {
    paddingTop: '$radioLineSpace',
  },
  AddProductsRadioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '$radioLineSpace'
  },
  $radioFlank: 10,
  AddProductsRadioView: {
    paddingLeft: '$radioFlank',
    paddingRight: '$radioFlank',
  },
  AddProductsRadio: {
    marginLeft: '$radioFlank',
    marginRight: '$radioFlank',
  },
});