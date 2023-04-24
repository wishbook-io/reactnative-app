import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Radio, Label } from 'native-base';

import { colorresource } from '../../resources/colorresource';

import styles from './styles';

export default ShippingAddressViewer = ({selected, onPressHandler, address, onEditPress}) => {
    return(
      <View style={{
        //borderWidth: 1, 
        //borderColor: 'purple'
      }}>
        <View style={{
          flexDirection: 'row', 
          //borderWidth: 1, 
          //borderColor: 'yellow'
        }}>
          <Radio 
          selected={selected} 
          style={styles.ShippingAddressRadio} 
          onPress={onPressHandler}
          />
          <Label style={{
            //borderWidth: 1, 
            //borderColor: 'cyan'
          }}>{address}</Label>
        </View>
        <View style={styles.ShippingAddressViewerButtonView}>
          <View style={{flex:1}}>
          </View>
          <View style={styles.ShippingAddressButtonParent}>
            <TouchableOpacity style={styles.ShippingAddressButton} onPress={() => onEditPress()}>
              <Text uppercase={true} style={{color:colorresource.liteblue}}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ShippingAddressButtonParent}>
            <TouchableOpacity style={styles.ShippingAddressButton}>
              <Text uppercase={true} style={{color: 'red'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}