import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { 
  View, 
  Image, 
  ImageBackground,
  Dimensions, 
  TouchableHighlight, 
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Text, Thumbnail, Button, Icon } from "native-base";
import { Button as PButton } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux'
import _ from 'lodash';

import CatalogLabel from './CatalogLabel';
import CheckBox from 'app/components/CheckBox/CheckBox';
import AddToCart from 'app/screens/cart/AddToCart';
import CatalogStyleSheet from './catalogStyles';
import { rupeefy } from 'app/utils/formatHelper'
import { colorresource } from 'app/resources/colorresource';
import assets from 'app/utils/assetsObject';
import { isInCart } from 'app/screens/cart/serverHelper';
import * as navigationActions from 'app/actions/navigation-actions'

import { TestIdGenerator } from '../../utils/TestingHelper';
const buttonIdGenerator = TestIdGenerator("Catalog", '', "Button")
const textIdGenerator = TestIdGenerator("Catalog", '', "Text")

class SingleProductItem extends PureComponent {

  onAddToCartPress = () => {
    this.props.onSingleAddToCartPress(this.props.data.id)
  }

  onGoToCartPress = () => {
    navigationActions.goToCarts();
  }

  onWhatsAppPress = () => {
    this.props.onWhatsAppPress(this.props.data.id)
  }

  onPressImage = () => {
    this.props.onPress(this.props.data);
  }

  onCheckBoxPress = () => {
    this.props.onCheckBoxPress(this.props.index)
  }

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

  getParentStyle = (showListView) => {
    const {
      width = 0,
      height = 0
    } = Dimensions.get('window');

    let parentHeight=null;
    let parentWidth=null;
    let marginBottom=null;
    let marginLeft=0;
    if(showListView){
        parentHeight=height*0.6;
        parentWidth=width;
        marginBottom=20;
    }
    else{
        parentHeight=height*0.35;
        parentWidth=width*0.46;
        marginBottom=8;
        marginLeft=5;
    }

    return ({
       // flex: 1, 
       marginTop: 2, 
       marginBottom: marginBottom, 
       height: parentHeight,
       width: parentWidth,
       marginLeft:marginLeft,
       marginRight:marginLeft,
       // backgroundColor: 'white',
       // borderWidth: 1,
       // borderColor: 'purple',
    })
  }

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const {
      data,
      showListView,
      onPress,
      onCheckBoxPress,
      index,
    } = this.props;
    let parentStyle= this.getParentStyle(showListView);
    const added = isInCart(data.id, this.props.cartDetails)
    return (
      <View>
      <View style={parentStyle}>
        <TouchableHighlight underlayColor={'transparent'} onPress={this.onPressImage} >
          <ImageBackground 
          style={[parentStyle, {backgroundColor: 'white'}]} 
          resizeMode="contain"
          source={{ 
            uri: (data.image === undefined)? data.values.image : data.image.full_size
          }}>
            
        
            <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 0.0, y: 0.0 }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0
            }}>

              <View style={styles.CatalogItemLabelTop}>
                <CatalogLabel type={data} styles={styles}/>
                <View style={styles.CatalogItemLabelEmpty}/>
              </View>

              <View style={styles.CatalogItemViewTop}>
        
                <View style={styles.CatalogItemInfo}>
                
                  <View style={styles.CatalogItemThumbnailcoloumn}>

                    <View style={styles.CatalogItemRow}>
                      <View style={styles.CatalogItemCatalogRow}>
                        <Text numberOfLines={1} {...textIdGenerator("Title")} style={styles.CatalogItemBrandText}>{data.catalog_title}</Text>
                      </View>
                    </View>

                    <View style={styles.CatalogItemRow}>
                      <View style={styles.CatalogItemCatalogRow}>
                        <Text numberOfLines={1} {...textIdGenerator("Id")} style={styles.CatalogItemBrandText}>{`(${data.id})`}</Text>
                      </View>
                    </View>

                    <View style={styles.CatalogItemRow}>
                      <View style={styles.CatalogItemCatalogRow}>
                        <Text numberOfLines={1} {...textIdGenerator("Price")} style={styles.CatalogItemPriceText}>{`Price: ${rupeefy(data.single_piece_price)}/Pc.`}</Text>
                      </View>
                    </View>
                    
                  </View>


                  <View style={{
                    alignSelf: 'flex-end', 
                    // borderWidth: 1, 
                    // borderColor:'white'
                  }}>
                    <TouchableOpacity activeOpacity={1} onPress={this.onWhatsAppPress}>
                      <Image source={assets['ic_whatsapp_white']} style={{height: 24, width: 24}}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>{/**/}
        </TouchableHighlight>
        <View style={{zIndex: 99, position: 'absolute', top: 0, right: 0}}>
          <CheckBox selected={this.props.selected} onPress={this.onCheckBoxPress}/>
        </View>
        </View>

        <View style={{justifyContent: 'center', flexDirection: 'row', marginBottom: 5}}>
          <PButton
          mode='outlined'
          style={{borderColor: colorresource.liteblue}}
          onPress={added? this.onGoToCartPress : this.onAddToCartPress}
          >{added? 'Go To Cart' : 'Add to Cart'}</PButton>
        </View>

      </View>
    )
  }
};
      
SingleProductItem.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func
};

const mapStateToProps = (state) => {
  return ({
    cartDetails: state.cartR.responseGetCatalogWiseCartDetails
  })
}
export default connect(mapStateToProps)(SingleProductItem);

const styles = EStyleSheet.create({
  CatalogItemLabelTop: {
    flexDirection: 'row',
    marginTop: 20,
    // borderColor: 'black',
    // borderWidth: 1,

},
CatalogItemLabel: {
   //backgroundColor: colorresource.orange,
   borderTopRightRadius: 5,
   borderBottomRightRadius:5,
   paddingLeft: 15,
   paddingRight: 15,
   paddingTop: 3,
   paddingBottom: 3,
},
CatalogItemLabelEmpty: {
    flex: 1,
    //backgroundColor: 'white',
},
CatalogItemLabelText: {
    fontSize: 13,
    color: 'white',
},
CatalogItemLabelIcon: {
    fontSize: 18,
    color: 'white',
    marginRight: 5,
},
CatalogItemViewTop: {
    flexDirection:'column',
    padding: 5,
    // borderWidth: 1,
    // borderColor: 'grey',
},
CatalogItemInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end'
},
CatalogItemThumbnail: {
    flex: .8, 
    height: 70, 
    marginLeft: 5
},
CatalogItemThumbnailcoloumn: {
    flex: 2, 
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor:'red',
},
CatalogItemRow: {
    flexDirection: 'row'
},
CatalogItemCatalogRow: {
    marginLeft: 5, 
    flexDirection: 'row'
},
CatalogItemBrandText: {
    color: 'white',
    fontSize: 13,
},
CatalogItemCatalogText: {
    fontSize: 13, 
    color: 'white',
    fontWeight: 'bold',
},
CatalogItemPriceText: {
    fontSize: 13, 
    // marginLeft: 5, 
    color: 'white',
    fontWeight: 'bold',
},
CatalogItemPriceView: {
    flex: 1,
    flexDirection: 'row', 
    marginTop: 3

},
CatalogItemSellingParent: {
    backgroundColor: colorresource.darkred,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
},
CatalogItemSellingText: {
    color: 'white',
    fontSize: 14,
}
})