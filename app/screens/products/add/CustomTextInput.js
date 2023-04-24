import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon, Text } from 'native-base';
import { TextInput as PTextInput, HelperText } from 'react-native-paper';

import { colorresource } from 'app/resources/colorresource';

export default ({
  error, 
  placeholder, 
  onChange, 
  textInputProps, 
  value, 
  textInputStyle, 
  testId={},
  info,
  reserveHelperSpace=false
}) => {
  
  return (
    <View style={{
      marginLeft: 5,
      // borderWidth: 1,
      // borderColor: 'purple',
      flex: 1,
    }}>
    <PTextInput
    placeholder={placeholder}
    mode={'outlined'}
    error={error}
    maxLength={(textInputProps && textInputProps.keyboardType === 'numeric')? 3: undefined}
    onChangeText={onChange}
    value={value}
    {...textInputProps}
    {...testId}
    />
    {error || info || reserveHelperSpace? <HelperText type={error? 'error' : undefined} visible={!!(error || info)}>{error || info}</HelperText> : null}

    </View>
  );
}
