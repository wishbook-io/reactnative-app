import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Radio, Label, Button } from 'native-base';
import Collapsible from 'react-native-collapsible';

import { colorresource } from '../../resources/colorresource';

import ShippingAddressEditor from './ShippingAddressEditor';
import ShippingAddress from './ShippingAddress';
import styles from './styles';

export default class ShippingAddressSection extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      addresses: ['one', 'two', 'three'],
      currentAddress: 'three',
      addNewAddressCollapsed: true,
    };
  }

  setShowAddNewAddress() {
    this.setState({addNewAddressCollapsed: false});
  }

  setHideAddNewAddress() {
    this.setState({addNewAddressCollapsed: true});
  }

  onAddNewAddressPress() {
    this.setShowAddNewAddress();
  }

  onAddNewAddressSavePress = () => {
    this.setHideAddNewAddress();
  }

  onAddNewAddressCancelPress = () => {
    this.setHideAddNewAddress();
  }

  onAddressChanged = (newAddress) => {
    console.log("changing address from "+this.state.currentAddress+" to "+newAddress);
    this.setState({currentAddress: newAddress});
  }

  render() {
    return (
      <View style={styles.ParentContainer}>
        <FlatList
        style={{/*borderWidth: 1, borderColor:'red'*/}}
        vertical
        data={this.state.addresses}
        renderItem={({ item, key }) =>
          <ShippingAddress 
          address={item} 
          key={key} 
          selected={this.state.currentAddress==item}
          onAddressChanged={this.onAddressChanged}
          />
        }
        keyExtractor={(item, index) => index.toString()} />

        <Button 
        borderRadius={5} 
        block 
        style={{marginTop: 10, backgroundColor:colorresource.liteblue}}
        onPress={() => this.onAddNewAddressPress()}>
          <Text uppercase={false} style={{fontWeight:'bold'}}>+Add new address</Text>
        </Button>

        <Collapsible collapsed={this.state.addNewAddressCollapsed}>
          <ShippingAddressEditor 
          onUpdatePress={this.onAddNewAddressSavePress}
          onDiscardPress={this.onAddNewAddressCancelPress}/>
        </Collapsible>
      </View>
    );
  }
}