import React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import styles from './styles';
import { colorresource } from '../../../resources/colorresource';
import { formatStringFromServer } from 'app/utils/formatHelper';

export default DressMaterialSection = () => {
  const data=['top', 'bottom', 'dupatta']
  return (
    <View style={localStyles.Parent}>
      {data.map((item, index) => 
        <View key={item} style={localStyles.RowParent}>
          <View style={{
            width: 120, 
            // borderWidth: 0.5, 
            // borderColor: 'yellow'
          }}>
            <Text style={styles.AddProductsSubHeading}>{formatStringFromServer(item)}</Text>
          </View>
          <View style={{
            flex: 1, 
            // borderWidth: 0.5, 
            // borderColor: 'blue'
          }}>
            <View style={{
              flexDirection: 'row', 
              // borderWidth: 0.5, 
              // borderColor: 'red'
            }}>
              <TextInput
              style={localStyles.TextInput}
              keyboardType='number-pad'
              />
              <View style={{alignSelf: 'center', marginLeft: 5,}}>
                <Text style={[styles.AddProductsSubHeading, {color: colorresource.gray}]}>meter</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const localStyles = EStyleSheet.create({
  Parent: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    // borderWidth: 0.5,
    // borderColor: 'purple',
  },
  RowParent: {
    flexDirection: 'row', 
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    // borderWidth: 0.5,
    // borderColor: 'red',
  },
  TextInput: {
    borderWidth: 0.5, 
    borderColor: colorresource.gray, 
    borderRadius: 5, 
    flex: 1,  
    marginTop: 0, 
    marginBottom: 0, 
    paddingTop: 0, 
    paddingBottom: 0,
  }

})