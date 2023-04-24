import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colorresource } from 'app/resources/colorresource'

export default ActionChip = ({text, onPress, chipParentStyle={}, chipStyle={}, chipTextStyle={}, testId={}}) => {
  return (
    <View style={[styles.ChipParent, chipParentStyle]}>
      <TouchableOpacity onPress={onPress} style={[styles.Chip, chipStyle]} {...testId}>
          <Text style={[styles.ChipText, chipTextStyle]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = EStyleSheet.create({
  ChipParent: {
    height: 40,           // necessary to add padding at top and bottom, WITHOUT messing up vertical alignment
    flexDirection: 'row', // necessary to make aligning work in center, otherwise AddChips and SelectedChips won't be centered
    alignItems: 'center',
    paddingRight: 5,      // change this to increase spacing between chips on same row
    // borderWidth: 1,
  },
  Chip: {
    borderWidth: 1, 
    borderColor: colorresource.liteblue,
    borderRadius: 5, 
    height: 30,
  }, 
  ChipText: {
    color: colorresource.liteblue,
    flex: 1,                        // necessary to make text vertical align
    textAlignVertical: 'center',
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 12,
  }
});