import React, { Component, PureComponent } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { colorresource } from 'app/resources/colorresource';
import EStyleSheet from 'react-native-extended-stylesheet';

import CheckBox from 'app/components/CheckBox/CheckBox';

export default class SelectionItem extends PureComponent {

  onPress = () => {
    this.props.onPress({name: this.props.text, id: this.props.id});
  }
  
  render() {
    const {
      text,
      selected,
      alreadyApplied,
      id,
    } = this.props
    return (
      <View style={styles.parent}>
        {alreadyApplied?
        <View style={styles.info}>
          <Text style={styles.brandText}>{text}</Text>
          <Text style={styles.brandDiscountText}>{`Full catalog discount: ${alreadyApplied.full}%, Single pc. discount: ${alreadyApplied.single}%`}</Text>
        </View>
        : <Text style={styles.brandText}>{text}</Text> }
        <CheckBox selected={selected || alreadyApplied} onPress={this.onPress} disabled={!!alreadyApplied}/>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  parent: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 5, 
    paddingRight: 10, 
    marginBottom: 5,
    // borderWidth: 1,
    // borderColor: 'purple',
  },
  info: {
    flex: 1,
  },
  brandText: {
    flex: 1,
  },
  brandDiscountText: {
    color: colorresource.Darkgrayishblue,
  }
})