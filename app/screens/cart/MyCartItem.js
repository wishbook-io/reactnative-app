import React, { Component } from 'react';
import { View, TouchableOpacity, InteractionManager, Image } from 'react-native';
import { Text, Card, CardItem, Icon, Button } from 'native-base';
import FastImage from 'react-native-fast-image';
import _ from 'lodash'

import { formatDate } from 'app/utils/dateHelper';
import { colorresource } from '../../resources/colorresource';
import { isWeb } from 'app/utils/PlatformHelper';
import styles from './styles';

import MyCartItemDetails from './MyCartItemDetails';
import MyCartItemDetailsEntry from './MyCartItemDetailsEntry';

const SKU_ELLIPSIZING_FACTOR = 3

export default class MyCartItem extends Component {

  updateQuantity = (updatedQuantity) => {
    if(updatedQuantity === 0) {
      this.props.onCartItemDelete({ids: this.data.products.map((item) => item.id)});
      return
    }
    const updatedProductItems = this.data.products.map((item, index) => ({
      rate: item.rate, 
      quantity: item.no_of_pcs > 0? item.no_of_pcs * updatedQuantity : updatedQuantity,
      product: item.product,
      is_full_catalog: item.is_full_catalog,
      note: item.note,
    }))
    this.props.onCartQuantityChange({items: updatedProductItems})
  }

  onAddQuantityPress = () => {
    InteractionManager.runAfterInteractions(() => {
      this.updateQuantity(this.cachedState.cartCount + 1)
    })
  }

  onRemoveQuantityPress = () => {
    this.updateQuantity(this.cachedState.cartCount - 1)
  }

  onTrashIconPress = () => {
    this.props.onCartItemDelete({ids: this.data.products.map((item) => item.id)});
  }

  onToggleDetailsPress = () => {
    const updatedDetailsHidden = !this.state.detailsHidden
    this.setState({detailsHidden: updatedDetailsHidden});
  }

  onCatalogPress = () => {
    if(!this.cachedState.isFullCatalog) {
      return this.onProductPress(0)
    }
    const id = this.data.product_id;
    this.props.onCatalogPress({id})
  }

  onProductPress = (index) => {
    const product = this.props.data.products[index]  
    this.navigateToProductViewer(product)
  }

  navigateToProductViewer = (product) => {
    this.props.onProductPress({
      image: product.product_image_medium,
      sku: product.product_sku,
      rate: product.rate,
    })
  }

  getDispatchDate = (date) => {
    if(!date) {
      return null;
    }
    return formatDate(date, 'DD MMM');
  }

  getPerPiecePrice = (price) => {
    if(price.includes('-')) {
      return price
    }
    return this.parseInteger(price);
  }

  getDiscountedPrice = (total, discount) => {
    total = this.parseFloat(total);
    discount = this.parseFloat(discount);
    const discountedPrice = Math.round((total-discount)*10)/10;
    return discountedPrice.toFixed(1);
  }

  parseFloat = (num) => {
    const number = parseFloat(num);
    if(Number.isNaN(number)) {
      return 0;
    }
    return number;
  }

  parseInteger = (num) => {
    const number = parseInt(num);
    if(Number.isNaN(number)) {
      return 0;
    }
    return number;
  }

  getParam = (paramPath, logWhenUndefined = true) => {
    const value = _.get(this.data, paramPath, null)
    if(value === null && logWhenUndefined) {
      console.log("[getParam] attempted to get an undefined property "+paramPath)
    }
    return value;
  }

  // this function takes 2 objects
  // and returns the first, if CartItem is SET or 
  // it returns the second otherwise
  setCatSelector = (setPath, catalogPath, getValueFromPath = true) => {
    let selected = catalogPath
    if(this.getParam('products[0].product_type', false) === 'set') {
      selected = setPath
    }

    if(!getValueFromPath) {
      return selected;
    }

    const value = this.getParam(selected)
    if(value === null) {
      console.log("[setCatSelector] got undefined when selecting out of "+setPath+" and "+catalogPath);
      return null;
    }
    return value;
  }

  singleFullSelector = (singlePath, fullPath, getValueFromPath = true) => {
    let selected = fullPath;
    if(!this.getParam('is_full_catalog', false)) {
      selected = singlePath;
    }

    if(!getValueFromPath) {
      return selected;
    }

    const value = this.getParam(selected)
    if(value === null) {
      console.log("[setCatSelector] got undefined when selecting out of "+singlePath+" and "+fullPath);
      return null;
    }
    return value;
  }

  getDetailsState = (data) => {
    const image = data.product_image;
    let sku = data.product_sku;
    const skuLength = sku.length
    if(skuLength>10) {
      sku = sku.slice(0, SKU_ELLIPSIZING_FACTOR) + '...' + sku.slice(-1*(SKU_ELLIPSIZING_FACTOR+1))
    }
    const rate = data.rate
    const quantity = data.quantity;
    let price = this.parseFloat(rate) * this.parseFloat(quantity);
    price = price.toFixed(1);
    return {
      image,
      sku,
      rate,
      quantity,
      price,
    }
  }

  getStateFromData = (data) => {
    this.data = data;
    const prod0 = (path) => 'products[0].'+path
    const cachedState = {
      
      image: this.singleFullSelector(
        prod0('product_image'), 
        this.setCatSelector(
          prod0('product.image'), 
          'catalog_image',
          false,
        )
      ),

      title: this.singleFullSelector(
        prod0('product_title'),
        this.setCatSelector(
          prod0('product_title'),
          'catalog_title',
          false,
        )
      ),

      subTitle: this.singleFullSelector(
        this.getParam('catalog_title', false),
        null,
        false,
      ),

      quantity: this.parseInteger(this.singleFullSelector(
        prod0('no_of_pcs'),
        this.setCatSelector(
          prod0('no_of_pcs'),
          'total_products',
          false,
        )
      )),

      cartCount: this.parseInteger(this.getParam(prod0('quantity'))),

      isFullCatalog: this.singleFullSelector(false, "Full Catalog", false),
      isSet: this.setCatSelector('Set', false, false),
      isSingleCatalog: this.singleFullSelector(true, false, false) && this.setCatSelector(false, true, false),

      note: this.getParam(prod0('note'), false),

      perPiecePrice: this.getPerPiecePrice(this.singleFullSelector(
        prod0('rate'),
        'price_range',
      )),

      undiscountedPrice: this.parseFloat(this.getParam(('catalog_amount'))).toFixed(1),

      discountPercent: this.parseInteger(this.getParam(prod0('discount_percent'))),

      discountedPrice: this.getDiscountedPrice(this.getParam('catalog_amount'), this.getParam('catalog_discount')),

      totalAmount: this.parseFloat(this.getParam('catalog_total_amount')),

      readyToShip: this.getParam('ready_to_ship', false),
      dispatchDate: this.getDispatchDate(this.getParam('dispatch_date', false)),
      singleDiscount: this.getParam('single_discount')
    }
    this.cachedState = cachedState;
    return cachedState;
  }

  constructor(props) {
    super(props);
    this.data = this.props.data
    // console.log("Got data:", this.data)
    const stateFromData = this.getStateFromData(this.props.data)
    // console.log("stateFromData: ", stateFromData);
    this.state = {
      ...stateFromData,
      detailsHidden: true,
    }
  }
  render() {
    if(!this.props.data) {
      return null;
    }
    // console.log("MyCartItem: render data: ", this.props.data);
    const state = this.getStateFromData(this.props.data);
    const testIds = this.props.testIds;
    return(
      <View style={[styles.MyCartItem]} borderRadius={3}>
        <View style={[styles.MyCartItemTop]}>
        <TouchableOpacity onPress={this.onCatalogPress}>
          <Image 
          style={styles.MyCartItemImage} 
          resizeMode='contain'
          source={{ uri: state.image }}
          />
          </TouchableOpacity>
          <View style={styles.MyCartItemRightParent}>
              
            <View style={styles.MyCartItemRightRow}>
              <View style={{marginRight: 19, ...(isWeb? {flex: 1} : {})}}>
                <Text style={styles.MyCartItemTopText} {...testIds.name}>{state.title}</Text>
                {state.subTitle? <Text style={styles.MyCartItemTopText}>{'From '}<Text style={styles.MyCartItemSubTitleText}>{state.subTitle}</Text></Text> : null}
                {state.isFullCatalog
                  ? <Text style={styles.MyCartItemTopText}>{String(state.quantity)+' Design' + (state.quantity === 1? '' : 's')}</Text>
                  : <Text style={styles.MyCartItemTopText}>{'Single design only'}</Text> 
                }
                {state.isFullCatalog? <Text style={[styles.MyCartItemSmallText, {color: colorresource.darkred}]}>Full Catalog</Text> : null}
              </View>

              <View style={styles.MyCartItemTrashParent}>
                <TouchableOpacity transparent small style={styles.MyCartItemTrashButton} onPress={this.onTrashIconPress} {...testIds.trash}>
                  <Icon name="trash" style={styles.MyCartItemTrashIcon}/>
                </TouchableOpacity>
              </View>
            </View>

            {state.note? 
              <View>
                <Text style={styles.MyCartItemNoteText}>{state.note}</Text>
              </View>
              : null}

            <View style={{
              // borderWidth: 1,
              // borderColor: 'red',
            }}>
              <Text style={styles.MyCartItemPricePerPieceText}>{'\u20B9 '+state.perPiecePrice+'/Pc.'}</Text>
            </View>

            {state.singleDiscount?
            <View style={{flexDirection: 'row',}}>
              <View style={styles.MyCartItemSingleDiscountParent}>
                <Text style={styles.MyCartItemSingleDiscountText}>{state.singleDiscount + '% off'}</Text>
              </View>
            </View>
            : null }
            
            <View style={{flexDirection: 'row'}}>
              <CatalogLabel 
              styles={styles} 
              readyToShip={state.readyToShip} 
              isSet={state.isSet}
              dispatchDate={state.dispatchDate}
              />
            </View>

            <View style={styles.MyCartItemRightRow}>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.MyCartItemNoOfSetsText}>{state.isSingleCatalog? 'No. of pcs.' : 'No. of sets'}</Text>
                {state.isSingleCatalog? null : <Text style={[{fontSize: 11.5, color:'grey'}]}>{'1 set = '+state.quantity+' Pcs.'}</Text>}
              </View>
              <View style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                // borderWidth: 1, 
                // borderColor: 'red'
              }}>
                <TouchableOpacity 
                onPress={this.onRemoveQuantityPress} 
                disabled={state.cartCount <= 1}
                {...testIds.minus}
                >
                  <View style={[styles.MyCartItemQtyButton, { borderWidth:1.5, borderColor: colorresource.liteblack, marginLeft: 0}]}>
                    <Text style={[styles.MyCartItemQtyButtonText, {color:'black'}]}>-</Text>
                  </View>
                </TouchableOpacity>

                <View 
                style={[styles.MyCartItemQtyButton, {
                  backgroundColor:colorresource.litegray,
                }]}
                >
                  <Text style={[styles.MyCartItemQtyText, {color:'black'}]} {...testIds.count}>{state.cartCount}</Text>
                </View>

                <TouchableOpacity onPress={this.onAddQuantityPress} {...testIds.plus}>
                  <View 
                  style={[styles.MyCartItemQtyButton, { 
                    backgroundColor:colorresource.liteblue,
                  }]}
                  >
                    <Text style={[styles.MyCartItemQtyButtonText, {color:'white', paddingBottom: 3}]}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
          
        </View>














        <View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 11, backgroundColor: 'white',
        // borderWidth: 1, 
        // borderColor: 'black'
        }}>
          <View style={{width: '100%', height: 1, backgroundColor: colorresource.litegray}}/>
        </View>




        {state.isFullCatalog && 
          !this.state.detailsHidden && 
          this.props.data.products.slice(0).map(
            (item, index) => 
              <MyCartItemDetailsEntry 
                key={index} 
                {...this.getDetailsState(item)} 
                onImagePress={this.onProductPress}
                index={index}
              />
          )
        }




          
          <View style={{flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 10, marginBottom: 10
          // borderWidth: 1, 
          // borderColor: 'yellow'
          }}>
            
              <View style={{flex: 1}}>
                {state.isFullCatalog? 
                  <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',}} onPress={this.onToggleDetailsPress} {...testIds.details}>
                    <Text style={{color: colorresource.liteblue}}>{this.state.detailsHidden? 'Item Details' : 'Hide Details'}</Text>
                    <Icon name={this.state.detailsHidden? 'chevron-right' : 'chevron-up'} type={'MaterialCommunityIcons'} style={{color: colorresource.liteblue, fontSize: 20}}/>
                  </TouchableOpacity>
                  : null}
              </View>

            {state.discountPercent !== 0?
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <View>
                <Text style={styles.MyCartItemFooterDiscountPercent} {...testIds.discountPercent}>{state.discountPercent+"% Discount"}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.MyCartItemFooterUndiscountedPrice} {...testIds.undiscountedPrice}>{'₹'+state.undiscountedPrice}</Text>
                  <Text style={styles.MyCartItemFooterDiscountedPrice} {...testIds.discountedPrice}>{'₹'+state.discountedPrice}</Text>
                </View>
                </View>
              </View>
              : null}

            <View style={{flex: 1}}>
              <Text style={styles.MyCartItemFooterPriceText} {...testIds.price}>{'₹ '+state.totalAmount}</Text>
              <Text style={styles.MyCartItemFooterGSTText}>{'(Including GST)'}</Text>
            </View>
          </View>


      </View>
    );
  }
}

const CatalogLabel = ({ readyToShip, isSet, dispatchDate, styles }) => {
  if(isSet) {
    return null;
  }
  if(readyToShip === true) {
    return null;
      // return (
      //   <View style={[styles.MyCartItemLabel, {flexDirection:'row', backgroundColor:colorresource.darkgreen}]}>
      //       <Icon style={styles.MyCartItemLabelIcon} name='ios-checkmark-circle'/>
      //       <Text style={styles.MyCartItemLabelText}>Launched</Text>    
      //   </View>
      // );
  } else if(readyToShip === false) {
      return (
          <View style={{
            flex: 1, 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            // borderWidth: 0.5, 
            // borderColor: 'black'
          }}>
            <View>
              <Text style={{fontSize: 12, color: colorresource.gray}}>Dispatch By:</Text>
              <Text style={{fontSize: 12, color: colorresource.liteblack}}>{dispatchDate}</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
            <View style={styles.MyCartItemPreLabel}>
                <Text style={styles.MyCartItemPreLabelText}>Pre-Launch</Text>    
            </View>
            </View>
          </View>
      );
  } else {
      return null;
  }
}