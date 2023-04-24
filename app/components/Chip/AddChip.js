import React from 'react'
import { View } from 'react-native'
import { Chip as PChip } from 'react-native-paper'

import { colorresource } from 'app/resources/colorresource'
import styles from './styles'

export default AddChip = ({text, onPress, testId}) => {
  return (
    <View style={styles.ChipsParent}>
      <PChip
      mode={'outlined'}
      onPress={onPress}
      theme={{colors:{text: colorresource.liteblue}}}
      // selectedColor={colorresource.liteblue}
      style={{borderColor: colorresource.liteblue}}
      >
        {text}
      </PChip>
    </View>
  );
}