import React from 'react'
import { View } from 'react-native';
import { Chip as PChip } from 'react-native-paper'

import styles from './styles'

export default Chip = ({text, onCrossPress, index}) => {
  return (
    <View style={styles.ChipsParent}>
      <PChip
      onClose={() => onCrossPress(index)}
      >
        {text}
      </PChip>
    </View>
    
  );
}