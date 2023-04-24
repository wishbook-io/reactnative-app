import React, { Component } from 'react'
import { View, TextInput } from 'react-native';
import { Text, Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colorresource } from 'app/resources/colorresource';
import { isWeb } from 'app/utils/PlatformHelper'

class CatalogLive extends Component {

  onChangeText = (text) => {
    let value = text.trim().replace(/[^0-9]/g, '');
    if(value !== this.props.text) {
      this.props.onTextChange(value)
    }
  }

  render() {

    const {
      leadingText = 'Keep the product live for',
      errorText,
      text,
      onTextChange,
      testIds = {},
    } = this.props

    return (
      <View style={styles.LiveRow}>
        <View>
          <Text style={styles.AddProductsSubHeading}>{leadingText}</Text>
        </View>
        <View>
          <View style={[styles.LiveTextInputParent, errorText? {borderColor: colorresource.materialerror} : {} ]}>
            <TextInput
            keyboardType={'numeric'}
            maxLength={2}
            style={styles.LiveTextInput}
            selectionColor={colorresource.liteblue}
            value={text}
            onChangeText={this.onChangeText}
            {...testIds.live}
            />
            {errorText? <Icon type='FontAwesome' name="exclamation-circle" style={styles.ErrorIcon}/> : null}

          </View>
          {errorText? <View style={{flexDirection:'row'}}><Text multiline={true} style={styles.ErrorText}>{errorText}</Text></View> : null}
        </View>
        <View>
          <Text style={styles.AddProductsSubHeading}>Days</Text>
        </View>
      </View>
    )
  }
}

export default CatalogLive

const styles = EStyleSheet.create({
  DateSelector: {
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  DateSelectorText: {
      fontSize: 14,
      color: colorresource.liteblue,
      marginLeft: 10,
  },
  DateSelectorRow: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  LiveRow: {
    flexDirection: 'row', 
    alignItems:'center',
    flexWrap: 'wrap',
  },
  LiveTextInputParent: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colorresource.materialinputbg,
    overflow: 'hidden',
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 4,
    paddingRight: 4,
    flexDirection: 'row',
  },
  LiveTextInput: {
    textAlign: 'center', 
    // width: 40, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    color: colorresource.grey900,
    ...(isWeb? {width: 50} : {minWidth: 50} )
  },
  AddProductsSubHeading: {
    color: colorresource.liteblack,
    fontSize: 14,
  },
  ErrorText: {
    fontSize: 9, 
    flexWrap: 'wrap', 
    flex: 1, 
    color: colorresource.materialerror,
    textAlign: 'center'
  },
  ErrorIcon: {
    color: colorresource.materialerror,
    fontSize: 20, 
    alignSelf: 'center'
  }
});