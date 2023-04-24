import React, { Component } from 'react'
import { View } from 'react-native';
import { Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

const CatalogDisabledOverlay = ({show}) => {
  if(!show) {
    return null;
  }
  return (
    <View style={styles.parent}>
      <View style={styles.disabledParent}>
        <Text style={styles.disabledText}>Disabled</Text>
      </View>
    </View>
    );
  }

  const styles = EStyleSheet.create({
    parent: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255,255,255,0.5)',
      justifyContent: 'center',
      // alignItems: 'center',
      // borderWidth: 1, 
      // borderColor: 'red',
    },
    disabledParent: {
      // borderWidth: 1, 
      // borderColor: 'yellow',
      backgroundColor: 'rgba(255,255,255,0.5)',
      // flex: 1,
    },
    disabledText: {
      textAlign: 'center',
      //   flex: 1,
      //   textAlignVertical: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      color: 'rgba(0,0,0,0.5)'
    }
  })

  export default CatalogDisabledOverlay