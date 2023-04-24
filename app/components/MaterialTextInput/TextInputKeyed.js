import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput as PTextInput, HelperText } from 'react-native-paper';

import { colorresource } from 'app/resources/colorresource';

export default class TextInputKeyed extends Component {

  onTrailingPress = () => {
    if(this.props.trailingPress) {
      this.props.trailingPress({key: this.props.inputKey})
    }
  }

  onChangeText = (text) => {
    const givenKey = this.props.inputKey;
    if(givenKey) {
      this.props.onChange({key: this.props.inputKey, text})
    } else {
      this.props.onChange(text);
    }
  }
  
  render() {
    const {
      inputKey,
      icon,
      onChange,
      error,
      info,
      trailing,
      trailingPress,
      hideEmptyHelper,
      textInputProps = {},
      parentStyle={},
      testId={},
      ...rest
    } = this.props;
    return (
      <View style={[{paddingBottom: 5}, parentStyle]}>
        <PTextInput
        leadingIcon={icon}
        trailingIcon={trailing}
        trailingIconOnPressIn={trailingPress? this.onTrailingPress : undefined}
        onChangeText={this.onChangeText}
        error={error}
        selectionColor={colorresource.liteblue}
        {...textInputProps}
        {...testId}
        {...rest}
        />
        {(error || info || !hideEmptyHelper)? 
          <HelperText type={error? 'error' : 'info'} visible={error || info}>{error? error: info}</HelperText>
        : null}
      </View>
    );
  }
}