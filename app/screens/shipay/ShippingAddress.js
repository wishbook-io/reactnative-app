import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import Collapsible from 'react-native-collapsible';
import { Button as PButton} from 'react-native-paper'
import { colorresource } from '../../resources/colorresource';

import Radio from 'app/components/Radio/Radio';
import ShippingAddressViewer from './ShippingAddressViewer';
import ShippingAddressEditor from './ShippingAddressEditor';
import styles from './styles';

const ShippingAddress = ({
  data, 
  stateList, 
  index, 
  selected, 
  onRadioPress, 
  onEditPress, 
  onDeletePress, 
  onEditorChange, 
  onEditorDiscardPress, 
  onEditorUpdatePress
}) => {

  const notifyParent = (callback, update={}) => {
    console.log("[notifyParent] index:", index)
    callback({index: index, ...update})
  }

  const onEditPressInternal = () => {
    notifyParent(onEditPress);
  }

  const onDeletePressInternal = () => {
    notifyParent(onDeletePress);
  }

  const onDiscardPress = () => {
    notifyParent(onEditorDiscardPress);
  }

  const onUpdatePress = () => {
    notifyParent(onEditorUpdatePress);
  }

  const onRadioItemPress = () => {
    if(!selected) {
      notifyParent(onRadioPress)
    }
  }

  return (
    <View>
      <View style={{
      //borderWidth: 1, 
      //borderColor: 'purple'
      }}>
        <TouchableOpacity onPress={onRadioItemPress}>
          <View style={{
            flexDirection: 'row', 
            //borderWidth: 1, 
            //borderColor: 'yellow'
          }}>
            <Radio 
            selected={selected} 
            radioStyle={styles.ShippingAddressRadio} 
            onPress={onRadioItemPress}
            />
            <Text style={{
              fontSize: 14,
              flex: 1,
              flexWrap: 'wrap',
              //borderWidth: 1, 
              //borderColor: 'cyan'
            }}
            >{data.displayedAddress}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.ShippingAddressViewerButtonView}>
          <View style={{flex:1}}>
          </View>
          <View style={styles.ShippingAddressButtonParent}>
            <PButton
            mode={'text'}
            color={colorresource.liteblue}
            onPress={onEditPressInternal}
            >
              {'EDIT'}
            </PButton>
          </View>
          { data.isDefault? null : 
          <View style={styles.ShippingAddressButtonParent}>
            <PButton
            mode={'text'}
            color={colorresource.sharpred}
            onPress={onDeletePressInternal}
            >
              {'DELETE'}
            </PButton>
          </View>
          }
        </View>
      </View>
      
      <Collapsible collapsed={!data.showEditor}>
        <ShippingAddressEditor 
        index={index}
        data={data.editorData}
        stateList={stateList}
        onUpdatePress={onUpdatePress} 
        onDiscardPress={onDiscardPress}
        successButton={{text: 'Update', onPressCallback: onUpdatePress}}
        failureButton={{text: 'Discard', onPressCallback: onDiscardPress}}
        onEditorChange={onEditorChange}
        />
      </Collapsible>
      
    </View>
  );
}

export default ShippingAddress;