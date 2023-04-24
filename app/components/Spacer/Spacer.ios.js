import React from 'react'
import { View } from 'react-native'

import { colorresource } from 'app/resources/colorresource';

const SPACER_SIZE = 1000

export default Spacer = () => {
  return (
    <View style={{
      position: 'absolute', 
      backgroundColor: colorresource.liteblue, 
      left: 0, 
      right: 0, 
      height: SPACER_SIZE, 
      top: -SPACER_SIZE
    }}/>
  )
}