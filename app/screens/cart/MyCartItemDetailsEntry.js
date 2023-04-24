import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import FastImage from 'react-native-fast-image';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colorresource } from 'app/resources/colorresource';

class MyCartItemDetailsEntry extends PureComponent {

  onImagePress = () => {
    this.props.onImagePress(this.props.index)
  }

  render() {
    const {
      image, 
      sku, 
      rate, 
      quantity, 
      price
    } = this.props
    return (
      <View style={styles.parent}>

        <View style={styles.detailsParent}>
          <TouchableOpacity activeOpacity={1} onPress={this.onImagePress}>
            <FastImage 
              style={styles.image} 
              resizeMode='stretch'
              source={{ uri: image }}
            />
          </TouchableOpacity>
          
          <View style={styles.parentTextView}>
            <View>
              <Text style={styles.skuText}>{sku}</Text>
            </View>

            <View style={styles.priceRow}>
              <View>
                <Text style={styles.priceBreakupText}>{'₹ '+rate+' x '+quantity+' pc'}</Text>
              </View>
              <View>
                <Text style={styles.priceText}>{'₹ '+price}</Text>
              </View>
            </View>

          </View>
        </View>

        <View style={styles.dividerParent}>
          <View style={styles.divider}/>
        </View>

      </View>
    );
  }
}

export default MyCartItemDetailsEntry;

const styles = EStyleSheet.create({
  parent: {
    padding:10,
    paddingBottom: 0,
    backgroundColor: 'white',
    // flex:1,
    // marginBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: colorresource.litegray,
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
  detailsParent: {
    // flex:1, 
    flexDirection: 'row',
    marginLeft: 19,
    // borderWidth: 1,
    // borderColor: 'purple',
  },
  image: {
    width: 44, 
    height: 60, 
    borderRadius: 3,
  },
  parentTextView: {
    flex: 1,
    //height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: 25, /* space between image and text */
    paddingRight: 15,
    //borderWidth: 1,
    //borderColor: 'gray',
  },
  skuText: {
    color: colorresource.liteblack,
    fontSize: 13,
  },
  priceRow: {
    flexDirection:'row', 
    justifyContent:'space-between',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  priceBreakupText: {
    color: colorresource.gray,
    fontSize: 14,
  },
  priceText: {
    color: colorresource.liteblack,
    fontSize: 14,
  },
  dividerParent: {
    paddingTop: 10, 
    backgroundColor: 'white',
    // borderWidth: 1, 
    // borderColor: 'black'
  },
  divider: {
    width: '100%', 
    height: 1, 
    backgroundColor: colorresource.litegray,
  },
})