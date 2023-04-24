import React, { Component, PureComponent } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Icon, Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colorresource } from '../../../resources/colorresource';
import styles from './styles';
import RadioRow from './RadioRow';
import CustomTextInput from './CustomTextInput';
import ChooseSizes from '../../seller/ChooseSizes';

// TODO: refactor product photo to product detail

export default class ProductDetail extends PureComponent {

  onProductDetailInteraction = (update, callback) => {
    const params = {
      index: this.props.index,
      update,
    }
    callback(params);
  }

  onCheckBoxPress = (subIndex) => {
    this.onProductDetailInteraction({subIndex}, this.props.callbacks.onProductDetailCheckBoxPress);
  }

  onDesignChange = (text) => {
    this.onProductDetailInteraction({detailDesign: text}, this.props.callbacks.onProductDetailChange);
  }

  onPriceChange = (text) => {
    // console.log("[onPriceChange]", text)
    this.onProductDetailInteraction({detailPrice: text}, this.props.callbacks.onProductDetailChange);
  }

  onImagePress = () => {
    this.onProductDetailInteraction({}, this.props.callbacks.onProductDetailImagePress);
  }

  onProductDetailDelete = () => {
    this.onProductDetailInteraction({}, this.props.callbacks.onProductDetailDelete)
  }

  render() {
    const {data, index, callbacks, testIds, sizes, selectedSizes, singlePiecePrice} = this.props
  
    return (
      <View style={styles.AddProductsSection}>
        {index===0? <Text style={styles.AddProductsHeading}>Add product photos</Text> : null }
        <View style={styles.AddProductsSubSection}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            
            <View style={{flex: 1/3}}>
              <TouchableOpacity style={localStyles.PhotoParent} onPress={this.onImagePress}>
                <Image style={{flex: 1}} resizeMode={'contain'} source={{uri: data.detailImage}}/>
                <View style={localStyles.PhotoEdit}>
                    <Text style={localStyles.PhotoEditText}>EDIT</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={[localStyles.PhotoDetails, {flex: 2/3}]}>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity transparent style={localStyles.PhotoDelete} onPress={this.onProductDetailDelete} {...testIds.delete}>
                  <Icon name='trash' style={localStyles.PhotoDeleteIcon}/>
                </TouchableOpacity>
              </View>

              <View style={localStyles.PhotoDetailsRow}>
                  <CustomTextInput
                  placeholder={'Enter design number'}
                  value={data.detailDesign}
                  onChange={this.onDesignChange}
                  textInputStyle={{textAlign: 'left'}}
                  testId={testIds.design}
                  />
              </View>

              <View style={localStyles.PhotoDetailsRow}>
                <CustomTextInput
                placeholder={'Full catalog price/design'}
                value={data.detailPrice}
                onChange={this.onPriceChange}
                textInputStyle={{textAlign: 'left'}}
                textInputProps={{keyboardType:'numeric', maxLength: 5}}
                testId={testIds.price}
                />
              </View>

              <ChooseSizes
              parentStyle={{marginLeft: 5}}
              sizes={sizes}
              selected={selectedSizes}
              onCheckBoxPress={this.onCheckBoxPress}
              />

              {singlePiecePrice? 
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 14, color: colorresource.liteblack, textAlign: 'right'}}>{'Price for single Pc.: ₹' + singlePiecePrice}</Text>
                </View> 
              : null }

            </View>
          </View>
        </View>
      </View>
    )
  };
}

const localStyles = EStyleSheet.create({
  PhotoParent: {
    flex: 1,
    marginTop: 30,
    marginBottom: 0,
    backgroundColor: colorresource.materialbg,
  },
  PhotoEdit: {
    position: 'absolute', 
    width: '100%',
    height: 20, 
    backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: 0,
  },
  PhotoEditText: {
    flex:1, 
    paddingTop: 0, 
    paddingBottom: 0, 
    color: 'white', 
    textAlign: 'center', 
    textAlignVertical: 'center',
    fontSize: 14,
  },
  PhotoDelete: {
    padding: 5,   // so that touch is detected properly
    marginTop: 0,
    marginBottom: 5,
    alignItems: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  PhotoDeleteIcon: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginBottom: 0,
    color: colorresource.litegray,
    fontSize: 23,
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
  PhotoDetails: {
    flex: 1, 
    marginLeft: 15,
  },
  PhotoDetailsRow: {
    paddingBottom: 15
  },
  PhotoInputParent: {
    borderWidth: 0.5, 
    borderColor: colorresource.litegray, 
    borderRadius: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  PhotoInput: {
    paddingTop: 4, 
    paddingBottom: 4, 
    fontSize: 14,
  },
  MarginSettingsParent: {
    marginTop: 15,
    marginBottom: 15,
  },
  MarginInputParent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  }
});