import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, ImageBackground,Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Text, Thumbnail, Button, Icon } from "native-base";
import _ from 'lodash';

import CatalogDisabledOverlay from './CatalogDisabledOverlay'
import CatalogLabel from './CatalogLabel';
import CatalogStyleSheet from './catalogStyles';
import UserHelper from 'app/config/userHelper';
import assets from 'app/utils/assetsObject';
import { colorresource } from '../../resources/colorresource';
import { formatUnicodeString } from 'app/utils/formatHelper';


import { TestIdGenerator } from '../../utils/TestingHelper';
const buttonIdGenerator = TestIdGenerator("Catalog", '', "Button")
const textIdGenerator = TestIdGenerator("Catalog", '', "Text")


export const SELLING_TYPES = {
  STOP: 1,
  START: 2,
}
const SELLING_TYPES_CONFIG = {
  [SELLING_TYPES.STOP]: {
    text: 'Stop Selling',
    color: colorresource.darkred,
  },
  [SELLING_TYPES.START]: {
    text: 'Start Selling',
    color: colorresource.liteblue,
  }
}

const getHeight = (imageUrl) => {
  Image.getSize(imageUrl, (width, height) => {
    // calculate image width and height 
    const screenWidth = Dimensions.get('window').width
    const scaleFactor = width / screenWidth
    const imageHeight = height / scaleFactor
    console.log('imageHeight',imageHeight)
    return imageHeight;
  })
}


const rupeefy = (string, addSpaceAroundDash = true) => {
  if(addSpaceAroundDash) {
    string = string.replace('-', ' - ');
  }
  const rupeefied = string.replace(/([\d.]+)/g, (match, p1) => {
    return '₹' + p1
  })
  return rupeefied;
}


class CatalogItem extends PureComponent {

  priceUI = (label, value, styles) => {
    return (
      <View style={styles.CatalogItemRow} key={label}>
        <View style={styles.CatalogItemCatalogRow}>
          <Text numberOfLines={1} {...textIdGenerator("Price"+label)} style={styles.CatalogItemPriceText}>{`${label} : ${rupeefy(value)}/Pc.`}</Text>
        </View>
      </View>
    )
  }

  priceDisplay(styles) {
    const data = this.props.data;
    const priceRange = data.price_range
    const singlePriceRange = data.single_piece_price_range
    const isFullCatalogOrdersFalse = data.full_catalog_orders_only === false
    let fullPriceLabel = 'Full'
    const singlePriceLabel = "Single";
    const totalProducts = data.total_products;
    const isScreen = data.product_type === 'set'
    
    let finalUIParams = [null, null]
    if(priceRange) {
      finalUIParams[0] = {
        label: 'Full',
        value: priceRange
      }
    }

    if(totalProducts === 1 && !isScreen && finalUIParams[0]) {
      finalUIParams[0].label = "Price"
      if(isFullCatalogOrdersFalse && singlePriceRange) {
        finalUIParams[0].value = singlePriceRange
      }
    }

    if(totalProducts > 1 
      && !isScreen 
      && !this.props.fullCatalogOn
      && isFullCatalogOrdersFalse
      && singlePriceRange
    ) {
      finalUIParams[1] = {
        label: 'Single',
        value: singlePriceRange
      }
    }

    return finalUIParams.map((p) => p && this.priceUI(p.label, p.value, styles))

  }

  render() {
    const {
      data,
      showListView,
      onPress,
      onWishlistPress,
      hideWishlist = UserHelper.getUserIsGuest() || UserHelper.getUsercompany_id()===data.company || !onWishlistPress,
      onStartStopSellingPress = null,
      showDisabledOverlay = false,
      addedToWishlist = false,
    } = this.props;
    let styles= CatalogStyleSheet(showListView);
    let sellingConfig = null;
    if(onStartStopSellingPress) {
      if(data.buyer_disabled === false) {
        sellingConfig = SELLING_TYPES_CONFIG[SELLING_TYPES.STOP]
      }
      if(data.buyer_disabled === true) {
        sellingConfig = SELLING_TYPES_CONFIG[SELLING_TYPES.START]
      }
    }
    
    return (
      <Container style={styles.CatalogItemTop}>
        <TouchableHighlight underlayColor={'transparent'} onPress={onPress} >
          <ImageBackground 
          style={styles.CatalogItemTop} 
          resizeMode="contain"
          source={{ 
            uri: (data.image === undefined)? data.values.image : showListView? data.image.thumbnail_medium : data.image.thumbnail_small
          }}>
            <View style={styles.CatalogItemLabelTop}>
              <CatalogLabel type={data} styles={styles}/>
              <View style={styles.CatalogItemLabelEmpty}/>
            </View>
        
            <CatalogDisabledOverlay show={showDisabledOverlay && data.buyer_disabled}/>
        
            <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 0.0, y: 0.0 }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0
            }}>
              <View style={styles.CatalogItemViewTop}>
        
                <View style={styles.CatalogItemInfo}>
                  {showListView && data.brand_image?
                    <Thumbnail
                    style={styles.CatalogItemThumbnail} 
                    square resizeMode='contain'
                    source={{ uri: data.brand_image }} />
                  :null}
                  <View style={styles.CatalogItemThumbnailcoloumn}>

                    <View style={styles.CatalogItemRow}>
                      <View style={styles.CatalogItemCatalogRow}>
                        <Text numberOfLines={1} {...textIdGenerator("Title")} style={styles.CatalogItemBrandText}>{data.title}</Text>
                      </View>
                    </View>

                    {this.priceDisplay(styles)}
                    
                    {data.live_stats? 
                      <View style={styles.CatalogItemRow}>
                        <View style={styles.CatalogItemCatalogRow}>
                          <Text numberOfLines={1} {...textIdGenerator("Stats")} style={styles.CatalogItemPriceText}>{formatUnicodeString(data.live_stats)}</Text>
                        </View>
                      </View> 
                    : null}
                    
                  </View>


                  <View style={{alignSelf: 'flex-end', /*borderWidth: 1, borderColor:'white'*/}}>
                  {onStartStopSellingPress
                    ? <TouchableOpacity style={[styles.CatalogItemSellingParent, {backgroundColor: sellingConfig.color}]} onPress={() => onStartStopSellingPress({data})}>
                    <Text style={styles.CatalogItemSellingText}>{sellingConfig.text}</Text>
                    </TouchableOpacity>
                    : 
                    hideWishlist?
                    null
                    :
                    <TouchableOpacity onPress={() => onWishlistPress(data)}>
                      <Thumbnail 
                      {...buttonIdGenerator("Wishlist")} 
                      tintColor={'white'} 
                      style={{height: 25, width: 25, tintColor: 'white'}} 
                      square 
                      resizeMode='contain' 
                      source={addedToWishlist? assets['ic_my_wishlist'] : assets['ic_my_wishlist_bordered']}
                      />
                    </TouchableOpacity>
                  }
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>{/**/}
        </TouchableHighlight>
      </Container>
    )
  }
};
      
CatalogItem.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func
};

export default CatalogItem;
            