import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { colorresource } from 'app/resources/colorresource';
import EStyleSheet from 'react-native-extended-stylesheet';

import CheckBox from 'app/components/CheckBox/CheckBox';

export default class SelectionHeader extends Component {
  render() {
    const {
      text,
      selected,
      onPress,
    } = this.props
    return (
      <View style={styles.parent}>
        <Text style={styles.brandText}>{text}</Text>
        <CheckBox selected={selected} onPress={onPress}/>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  parent: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colorresource.materialbg, 
    padding: 10, 
    marginBottom: 5, 
    // borderWidth: 1,
  },
  brandText: {
    flex: 1, 
    fontWeight: 'bold',
  }
})