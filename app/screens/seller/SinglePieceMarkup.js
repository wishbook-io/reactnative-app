import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Text } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'

import TextInputPrefixSuffix from 'app/components/MaterialTextInput/TextInputPrefixSuffix';
import { colorresource } from 'app/resources/colorresource'

const MAX_MARGIN_PERCENT = 10

class SinglePieceMarkup extends Component {

  onMarginChange = (text) => {
    let value = text.trim().replace(/[^0-9.]/g, '');
    if(value !== this.props.marginText) {
      this.props.onMarginChange(value)
    }
  }

  onMarginTypeFixedPress = () => {
    if(this.props.marginTypePercent) {
      this.props.onMarginTypeFixedPress()
    }
  }

  onMarginTypePercentPress = () => {
    if(!this.props.marginTypePercent) {
      this.props.onMarginTypePercentPress()
    }
  }

  render() {

    const {
      hide,
      marginTypePercent,
      marginText,
      marginError,
    } = this.props;

    if(hide) {
      return null;
    }
    
    return (
      <View style={{marginTop: 10, marginBottom: 20}}>
        <Text style={styles.heading}>Set margin for single pcs.</Text>
        <Text style={styles.subHeading}>{`Max margin allowed: ${MAX_MARGIN_PERCENT}% of full catalog price`}</Text>
        
        <View style={{flexDirection: 'row', paddingVertical: 5}}>
          <View style={styles.flexStyle}>
            <View style={styles.marginRadioRowItem}>
              <Radio selected={marginTypePercent} onPress={this.onMarginTypePercentPress}/>
              <Text style={styles.flexStyle}>{'Enter margin (%)'}</Text>
            </View>
          </View>
          <View style={styles.flexStyle}>
            <View style={styles.marginRadioRowItem}>
              <Radio selected={!marginTypePercent} onPress={this.onMarginTypeFixedPress}/>
              <Text style={styles.flexStyle}>{'Enter margin (Rs.)'}</Text>
            </View>
          </View>
        </View>

        <TextInputPrefixSuffix
        suffix={marginTypePercent? '%' : ''}
        prefix={marginTypePercent? '' : '₹'}
        error={marginError}

        value={marginText}
        onChange={this.onMarginChange}
        keyboardType={'numeric'}
        maxLength={5}
        />
      </View>
    )
  }
}

export default SinglePieceMarkup

const styles = EStyleSheet.create({
  heading: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: colorresource.liteblack
  },
  subHeading: {
    fontSize: 12,
    color: colorresource.gray
  },
  flexStyle: {
    flex: 1,
  },
  marginRadioRowItem: {
    flexDirection: 'row', 
    alignItems: 'center'
  }
})