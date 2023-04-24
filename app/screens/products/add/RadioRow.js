import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import Radio from 'app/components/Radio/Radio';
import styles from './styles';

export default ({config, testIds=[{},{}]}) => {
  
  const onRadioItemPress = (index) => {
    if(config[index].selected) {
      // do nothing if user clicks on already selected radio button
      return;
    }
    config[index].onPress(config[index].text);
  }

  return (
    <View style={localStyles.RadioRowParent}>
      <TouchableOpacity activeOpacity={1} style={localStyles.RadioRowItemWrapper} onPress={() => onRadioItemPress(0)}>
        <View style={localStyles.RadioRowItem}>
          <Radio selected={config[0].selected} radioStyle={localStyles.Radio} onPress={() => onRadioItemPress(0)} testId={testIds[0]}/>
          <Text style={[styles.AddProductsSubHeading, { flexWrap: 'wrap', flex: 1}]}>{config[0].text}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={localStyles.RadioRowItemWrapper} onPress={() => onRadioItemPress(1)}>
        <View style={localStyles.RadioRowItem}>
          <Radio selected={config[1].selected} radioStyle={localStyles.Radio} onPress={() => onRadioItemPress(1)} testId={testIds[1]}/>
          <Text style={[styles.AddProductsSubHeading, { flexWrap: 'wrap', flex: 1}]}>{config[1].text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = EStyleSheet.create({
  RadioRowParent: {
    flexDirection: 'row',
    // marginLeft: 7,
    // borderWidth: 0.5,
    // borderColor: 'purple',
  },
  RadioRowItemWrapper: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 0.5,
    // borderColor: 'yellow',
  },
  RadioRowItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  Radio: {
    marginRight: 5 
  }
})