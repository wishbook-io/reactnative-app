import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'native-base';

import { colorresource } from 'app/resources/colorresource';
import styles from './styles';

const CatalogLabel = ({ type: {full_catalog_orders_only: fullCatalog, ready_to_ship: readyToShip, product_type:productType},styles }) => {
  if(productType === 'set') {
    return null;
  }

  if(fullCatalog === false) {
    return (
      <View style={[styles.CatalogItemLabel, {flexDirection:'row', backgroundColor:'green'}]}>
        <Icon style={styles.CatalogItemLabelIcon} name='ios-checkmark-circle'/>
        <Text style={styles.CatalogItemLabelText}>Single Pcs</Text>    
      </View>
    );
  } 
    
  if(readyToShip === false) {
    return (
      <View style={[styles.CatalogItemLabel, {backgroundColor: colorresource.liteblue}]}>
        <Text style={styles.CatalogItemLabelText}>Pre-Launch</Text>    
      </View>
      );
    } 
      
  return null;
}

export default CatalogLabel