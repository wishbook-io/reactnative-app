import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { colorresource } from '../../resources/colorresource';

import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
  LayoutAnimation,
  Modal,
  FlatList,
  StyleSheet,
  ActivityIndicator,KeyboardAvoidingView
} from 'react-native';
import { Container, Radio, Header, Content, Item, Input, Icon } from 'native-base';


// visibleSearch, data, uniqueKey, displaykey, placeholder

class RadioListWithSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            selectedRadio:'',
            searchTerm: '',
        }
    }

    getProp = (object, key) => object && object[key]

    
    _filterItems = (searchTerm) => {
        
        const {
          items,
          uniqueKey,
          displayKey,
        } = this.props;
    
        let filteredItems = []
    
        items.forEach((item) => {
          const parts = searchTerm.trim().split(/[[ \][)(\\/?\-:]+/)
          const regex = new RegExp(`(${parts.join('|')})`, 'i')
          if (regex.test(this.getProp(item, displayKey))) {
            filteredItems.push(item)
          }
        })
    
        return filteredItems
      }
      
      
    render() {
        const { searchTerm } = this.state;
        const { 
            items,
            visibleSearch,
            placeholder,
            renderItem
        } = this.props;
        const renderItems = searchTerm ? this._filterItems(searchTerm.trim()) : items;
        return (

            <View style={{flex:1,flexDirection:'column'}}>
                    {(visibleSearch)?
                        <Item style={{marginLeft:15,marginRight:15}}>
                            <Icon active name='search' />
                            <Input 
                                placeholder={placeholder}
                                onChangeText={searchTerm => this.setState({ searchTerm })}/>
                        </Item> : null
                    }  
                
                    <FlatList
                        data={renderItems}
                        renderItem={renderItem}
                        extraData={[]}
                        keyExtractor={(item, index) => index.toString()}
                    />
                
            </View>
        );
    }
}


export default (RadioListWithSearch);
