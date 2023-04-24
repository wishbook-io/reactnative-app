import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Radio from '../Radio/Radio';

import styles from './styles';

const RadioList = ({
  text,
  onPress,
  selected = false,
  checkmark = true,
  visible = true,
  iconBackground,
  radioTestId,
}) => (
    <TouchableRipple onPress={onPress} {...radioTestId}>
      <View style={styles.row}>
        <Text style={styles.text}>{text}</Text>
        {selected ? (
            <Radio selected={checkmark} onPress={onPress} />
        ) : (
            <Radio selected={false} onPress={onPress}/>
          )}
      </View>
    </TouchableRipple>
  );

  RadioList.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  checkmark: PropTypes.bool,
  visible: PropTypes.bool,
  iconBackground: PropTypes.string,
};

export default RadioList;
