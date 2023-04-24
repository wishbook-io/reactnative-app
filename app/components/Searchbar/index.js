import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native'
import { Container, Header, Item, Input, Icon, Button, Text as NBText } from 'native-base';
import headerStyle from '../Header/styles'

export default class SearchBarExample extends Component {
  render() {
    return (
        <View style={headerStyle.header}>
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white', 
            borderRadius: 5, 
            margin: 10,
            padding: 5,
          }}
          onPress={this.props.onPress}
          {...this.props.inputTestId}
          >
            <Icon name="search" type="MaterialIcons" style={{color: 'gray', fontSize: 24}}/>
            
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={{marginLeft: 10, flex: 1, color: 'gray'}}>{this.props.placeholder}</Text>
            
          </TouchableOpacity>
        </View>
    );
  }
}
