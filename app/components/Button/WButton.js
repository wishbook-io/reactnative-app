import React from 'react';

import { TouchableRipple } from 'react-native-paper';

export default WButton = ({
  children,
  style,
  onPress,
  ...rest,
}) => {
  return (
    <TouchableRipple 
    style={style}
    onPress={onPress}
    {...rest}
    >
      {children}
    </TouchableRipple>
  );
}