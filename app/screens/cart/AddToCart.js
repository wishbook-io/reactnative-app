import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity } from 'react-native'
import { Text, Header, Left, Body, Title, Icon, Container, Content, Footer, FooterTab, Button } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import _ from 'lodash';

import {colorresource} from 'app/resources/colorresource';
import { fontresource } from 'app/resources/fontresource';
import Modal from '../../components/Modal/Modal'
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';
import { showToastAction } from 'app/actions/toast-actions'
import { goToSizedMultiSelection, goToSizedSelection } from 'app/actions/navigation-actions'
import { getProductDetails, updateCart } from './serverHelper';

import { TestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'AddToCart';
const inputTestId = TestIdGenerator(screenName, '', 'Input');
const buttonTestId = TestIdGenerator(screenName,'','Button');

import {waitTillUserInfoAndStatisticsAreFetched} from 'app/utils/debugHelper'



class AddToCart extends Component {
  // call this function by registering a ref:
  // pass the catalog id of the product which needs to be added to cart
  // also pass callbacks here onSuccess, onFailure, onCancel
  addToCart(id, onSuccess) {
    this.onSuccess = onSuccess; // save this callback for future
    this.id = id // even save this
    this.props.dispatch(requestShowLoaderAction(screenName))
    getProductDetails(id).then(this.onProductDetailsFetch)
  }

  // pass the product details of the singles (the one received by setting collection = false)
  // this will automatically do the hardwork of showing appropriate UI
  addToCartSingles = (singles, onSuccess) => {
    this.onSuccess = onSuccess
    const singlesMultipleSize = []
    const singles0Or1Size = []
    singles.forEach(item => {
      const sizes = (item.available_sizes && item.available_sizes.split(',')) || []
      if(sizes.length > 1) {
        singlesMultipleSize.push(item)
      } else {
        singles0Or1Size.push({data: item, size: sizes.map(s => ({quantity: 1, tag: s}))})
      }
    })

    let itemParams = []
    singles0Or1Size.forEach(item => {
      const params = this.getItemsParam(item.data, item.size)
      itemParams.push(...params)
    })

    if(itemParams.length === 0) {
      this.goToSizedMultiSelection(singlesMultipleSize)
      return;
    }

    let params = {
      items: itemParams,
      add_quantity: true,
    }
    updateCart(params).then(() => {
      this.goToSizedMultiSelection(singlesMultipleSize)
    })
  }

  goToSizedMultiSelection = (singlesMultipleSize) => {
    if(singlesMultipleSize.length === 0) {
      return;
    }
    goToSizedMultiSelection({data: singlesMultipleSize, callback: this.onSizedMultiSelectionDone})
  }

  onSizedMultiSelectionDone = (details, sizes) => {
    let itemParams = []
    details.forEach((data, i) => {
      const params = this.getItemsParam(data, sizes[i])
      itemParams.push(...params)
    })

    const params = {
      items: itemParams,
      add_quantity: true,
    }
    updateCart(params).then(this.onAddToCartSuccess)
  }

  onAddToCartSuccess = () => {
    console.log("[onAddToCartSuccess]")
    this.props.dispatch(requestHideLoaderAction(screenName))
    this.responseProductDetails = null;
    
    let onStateUpdatedCallback = undefined
    if(this.onSuccess) {
      onStateUpdatedCallback = () => this.onSuccess(this.id)
    }
    
    this.setState({sizeItems: [], modalVisible: false}, onStateUpdatedCallback)
  }

  onModalCancel = () => {
    this.setState({modalVisible: false})
  }

  isSet = (productDetails) => {
    return productDetails.product_type === 'set';
  }

  isSingle = (productDetails) => {
    return productDetails.product_type === 'single';
  }

  isCatalog = (productDetails) => {
    return productDetails.product_type === 'catalog';
  }

  isBundleProduct = (productDetails) => {
    // a product is a bundle product when all its products have same price
    
    const products = productDetails.products;
    if(products.length <= 1) {
      return false;
    }
    let runningPrice = products[0].public_price
    let result = true;
    for(let i=1; i<products.length; i++) {
      const currentPrice = products[i].public_price
      if(runningPrice !== currentPrice) {
        result = false;
        break;
      }
    }
    // console.log("[isBundleProduct] ", productDetails.id, result)
    return result;
  }

  duplicateParamWithSize = (params, sizeArray = [], designsFactor = 1) => {
    if(!sizeArray || sizeArray.length === 0) {
      return [{quantity: designsFactor, ...params}];
    }
    // console.log("[duplicateParamWithSize] sizeArray", sizeArray);
    const duplicated = sizeArray.filter(size => size.quantity).map( (size, index) => ({
      quantity: size.quantity * designsFactor,
      note: 'Size : ' + size.tag,
      ...params,
    }))

    return duplicated;
  }

  getItemsParam = (productDetails, sizeItems) => {
    // console.log("[getItemsParam]");
    const isCatalog = this.isCatalog(productDetails);
    const isSet = this.isSet(productDetails);
    const isSingle = this.isSingle(productDetails);
    let items = []
    if(isSingle) {
      items.push(...(this.duplicateParamWithSize({
        product: productDetails.id,
        is_full_catalog: !isSingle,
        rate: productDetails.single_piece_price
      }, sizeItems)))
    }
    else if(isSet) {
      items = [{
        product: productDetails.id,
        is_full_catalog: false,
        rate: productDetails.public_price,
        quantity: productDetails.no_of_pcs,
      }]
    }
    else if(this.isBundleProduct(productDetails)) {
      items.push(...(this.duplicateParamWithSize({
        product: productDetails.id,
        is_full_catalog: !isSingle,
        rate: productDetails.products[0].public_price
      }, sizeItems, productDetails.products.length)))
    } else {
      for(let i=0; i<productDetails.products.length; ++i) {
        const prod = productDetails.products[i]
        const sizeAppendedItems = this.duplicateParamWithSize({
          product: prod.id,
          is_full_catalog: !isSingle,
          rate: isSingle? prod.single_piece_price : prod.public_price
        }, sizeItems)
        items.push(...sizeAppendedItems)
      }
    }
    // console.log("[getItemsParam] items", items);
    return items;
  }

  updateCartOnServer = (sizeItems, showLoader) => {
    if(showLoader) {
      this.props.dispatch(requestShowLoaderAction())
    }
    const productDetails = this.responseProductDetails;
    
    const itemsParam = this.getItemsParam(productDetails, sizeItems);
    const params = {
      items: itemsParam,
      add_quantity: true
    }

    // debug
    // console.log("[updateCartOnServer] params: ", params);
    // return;
    // debug end

    updateCart(params).then(this.onAddToCartSuccess);
  }

  onProductDetailsFetch = (responseProductDetails) => {
    // console.log("[onProductDetailsFetch]");
    this.responseProductDetails = responseProductDetails; // saving this too
    if(responseProductDetails.selling === false) {
      this.props.dispatch(requestHideLoaderAction(screenName))
      this.props.dispatch(showToastAction("This item cannot be added to cart as it is not being sold"))
      return;
    }
    let sizes = responseProductDetails.available_sizes
    sizes = sizes && sizes.split(',')
    const sizeCount = sizes && sizes.length
    const isSet = this.isSet(responseProductDetails);
    const isSingle = this.isSingle(responseProductDetails);
    if(sizeCount > 1 && !isSet) {
      this.props.dispatch(requestHideLoaderAction(screenName))
      goToSizedSelection({ data: responseProductDetails, callback: this.updateCartOnServer })
    } else if (sizeCount === 1) {
      // DO NOT HIDE the loading UI
      this.updateCartOnServer([{quantity: 1, tag: sizes[0]}])
    } else {
      // DO NOT HIDE the loading UI
      this.updateCartOnServer()
    }

  }

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      sizeItems: [],
    }
  }

  componentDidMount() {

    // for single design, no size
    // {u'items': [{u'product': u'22801', u'is_full_catalog': False, u'rate': u'600.0', u'quantity': u'1'}], u'add_quantity': True, u'finalize': False, u'add_size': False}
    // waitTillUserInfoAndStatisticsAreFetched().then(() => this.addToCart(22801, this.onAddToCartSuccess));

    // for catalog no size
    // {u'items': [{u'product': u'22799', u'is_full_catalog': True, u'rate': u'500.0', u'quantity': u'2'}], u'add_quantity': True, u'finalize': False, u'add_size': False}
    // waitTillUserInfoAndStatisticsAreFetched().then(() => this.addToCart(22799, this.onAddToCartSuccess));

    // for catalog no size
    // {u'items': [{u'product': u'22799', u'is_full_catalog': True, u'rate': u'500.0', u'quantity': u'2'}], u'add_quantity': True, u'finalize': False, u'add_size': False}
    // waitTillUserInfoAndStatisticsAreFetched().then(() => this.addToCart(22799, this.onAddToCartSuccess));

    // for set multiple size
    // {u'items': [{u'product': u'25707', u'is_full_catalog': False, u'rate': u'222', u'quantity': u'4'}], u'add_quantity': True, u'finalize': False, u'add_size': False}
    // waitTillUserInfoAndStatisticsAreFetched().then(() => this.addToCart(25707, this.onAddToCartSuccess));

    // for multiple kurtis with size, same price
    // not sending rate here, because is_full_catalog is true
    // {u'items': [{u'note': u'Size : XL', u'product': 25695, u'is_full_catalog': True, u'quantity': 3}, {u'note': u'Size : XS', u'product': 25695, u'is_full_catalog': True, u'quantity': 6}, {u'note': u'Size : S', u'product': 25695, u'is_full_catalog': True, u'quantity': 9}, {u'note': u'Size : M', u'product': 25695, u'is_full_catalog': True, u'quantity': 12}], u'add_size': True, u'finalize': False, u'add_quantity': False}
    // waitTillUserInfoAndStatisticsAreFetched().then(() => this.addToCart(25695, this.onAddToCartSuccess));
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return ({

  })
}

export default connect(mapStateToProps, null, null, {withRef: true})(AddToCart)


/*

// set with size (Set size same price)
{u'items': [{u'is_full_catalog': False, u'rate': u'222', u'display_amount': 0.0, u'product': u'28615', u'quantity': u'3'}], u'add_size': False, u'reseller_order': False, u'finalize': False, u'add_quantity': True}

// for set (WB 3858 1)
{u'items': [{u'is_full_catalog': False, u'rate': u'222', u'display_amount': 0.0, u'product': u'26180', u'quantity': u'1'}], u'add_size': False, u'reseller_order': False, u'finalize': False, u'add_quantity': True}

// for single piece kurtis size single pc diff price (2nd product)
{u'items': [{u'note': u'Size : L', u'product': u'28613', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'262.0', u'quantity': u'3'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}
{u'items': [{u'note': u'Size : M', u'product': u'28613', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'262.0', u'quantity': u'2'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}
{u'items': [{u'note': u'Size : S', u'product': u'28613', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'262.0', u'quantity': u'1'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}

// for single piece kurtis size single pc diff price (1st product)
{u'items': [{u'note': u'Size : L', u'product': u'28612', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'261.0', u'quantity': u'3'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}
{u'items': [{u'note': u'Size : M', u'product': u'28612', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'261.0', u'quantity': u'2'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}
{u'items': [{u'note': u'Size : S', u'product': u'28612', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'261.0', u'quantity': u'1'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}

// for full catalog kurtis size single pc diff price (working in RN as expected, but...)
{u'items': [{u'note': u'Size : L', u'product': u'28612', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'201.0', u'quantity': u'3'}, {u'note': u'Size : L', u'product': u'28613', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'202.0', u'quantity': u'3'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': False}
{u'items': [{u'note': u'Size : M', u'product': u'28612', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'201.0', u'quantity': u'2'}, {u'note': u'Size : M', u'product': u'28613', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'202.0', u'quantity': u'2'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': False}
{u'items': [{u'note': u'Size : S', u'product': u'28612', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'201.0', u'quantity': u'1'}, {u'note': u'Size : S', u'product': u'28613', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'202.0', u'quantity': u'1'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': False}
RN:
{u'items': [{u'note': u'Size : S', u'product': 28611, u'is_full_catalog': True, u'quantity': 2}, {u'note': u'Size : M', u'product': 28611, u'is_full_catalog': True, u'quantity': 4}, {u'note': u'Size : L', u'product': 28611, u'is_full_catalog': True, u'quantity': 6}], u'add_size': True, u'finalize': False, u'add_quantity': False}

// for full catalog kurtis size single pc (working in RN as expected)
{u'items': [{u'note': u'Size : L', u'product': u'28608', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'222.0', u'quantity': u'2'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': False}
{u'items': [{u'note': u'Size : M', u'product': u'28608', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'222.0', u'quantity': u'2'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': False}
{u'items': [{u'note': u'Size : S', u'product': u'28608', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'222.0', u'quantity': u'2'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': False}
RN:
{u'items': [{u'note': u'Size : S', u'product': 28608, u'is_full_catalog': True, u'quantity': 2}, {u'note': u'Size : M', u'product': 28608, u'is_full_catalog': True, u'quantity': 4}, {u'note': u'Size : L', u'product': 28608, u'is_full_catalog': True, u'quantity': 6}], u'add_size': True, u'finalize': False, u'add_quantity': False}

// for single piece kurtis size single pc (2nd product)
{u'items': [{u'note': u'Size : L', u'product': u'28610', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'282.0', u'quantity': u'3'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}
{u'items': [{u'note': u'Size : M', u'product': u'28610', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'282.0', u'quantity': u'2'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}
{u'items': [{u'note': u'Size : S', u'product': u'28610', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'282.0', u'quantity': u'1'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}

RN:
{u'items': [{u'note': u'Size : S', u'product': 28610, u'is_full_catalog': False, u'rate': u'282.00', u'quantity': 1}, {u'note': u'Size : M', u'product': 28610, u'is_full_catalog': False, u'rate': u'282.00', u'quantity': 2}, {u'note': u'Size : L', u'product': 28610, u'is_full_catalog': False, u'rate': u'282.00', u'quantity': 3}], u'finalize': False, u'add_size': True}

// for single piece kurtis size single pc (1st product)
{u'items': [{u'note': u'Size : L', u'product': u'28609', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'282.0', u'quantity': u'3'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}
{u'items': [{u'note': u'Size : M', u'product': u'28609', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'282.0', u'quantity': u'2'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}
{u'items': [{u'note': u'Size : S', u'product': u'28609', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'282.0', u'quantity': u'1'}], u'add_size': True, u'reseller_order': False, u'finalize': False, u'add_quantity': True}


// for full catalog (kurtifull)
{u'items': [{u'note': u'Size : L', u'product': u'27537', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'250.0', u'quantity': u'3'}], u'add_quantity': False, u'reseller_order': False, u'finalize': False, u'add_size': True}
{u'items': [{u'note': u'Size : S', u'product': u'27537', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'250.0', u'quantity': u'3'}], u'add_quantity': False, u'reseller_order': False, u'finalize': False, u'add_size': True}
{u'items': [{u'note': u'Size : M', u'product': u'27537', u'display_amount': 0.0, u'is_full_catalog': True, u'rate': u'250.0', u'quantity': u'3'}], u'add_quantity': False, u'reseller_order': False, u'finalize': False, u'add_size': True}

RN:
{u'items': [{u'note': u'Size : L', u'product': 27537, u'is_full_catalog': True, u'quantity': 3}, {u'note': u'Size : M', u'product': 27537, u'is_full_catalog': True, u'quantity': 6}, {u'note': u'Size : S', u'product': 27537, u'is_full_catalog': True, u'quantity': 9}], u'add_size': True, u'finalize': False, u'add_quantity': False}

TODO: for some catalog with only one product and single piece available, treat it as add to cart (singles) (Noncat Single Pc Same Price)
{u'items': [{u'display_amount': 0.0, u'product': u'27466', u'is_full_catalog': False, u'rate': u'560.0', u'quantity': u'1'}], u'add_quantity': True, u'reseller_order': False, u'finalize': False, u'add_size': False}
and NOT as
{u'items': [{u'product': 27466, u'is_full_catalog': True, u'rate': 500, u'quantity': 1}], u'add_size': False, u'finalize': False, u'add_quantity': True}

for full noncatalog, individual price
{u'items': [{u'display_amount': 0.0, u'product': u'27462', u'is_full_catalog': True, u'rate': u'600.0', u'quantity': u'1'}, {u'display_amount': 0.0, u'product': u'27463', u'is_full_catalog': True, u'rate': u'300.0', u'quantity': u'1'}, {u'display_amount': 0.0, u'product': u'27464', u'is_full_catalog': True, u'rate': u'200.0', u'quantity': u'1'}], u'add_quantity': True, u'reseller_order': False, u'finalize': False, u'add_size': False}
RN:
{u'items': [{u'product': 27462, u'is_full_catalog': True, u'rate': 600, u'quantity': 1}, {u'product': 27463, u'is_full_catalog': True, u'rate': 300, u'quantity': 1}, {u'product': 27464, u'is_full_catalog': True, u'rate': 200, u'quantity': 1}], u'add_size': False, u'finalize': False, u'add_quantity': True}

for full noncatalog, no size
{u'items': [{u'display_amount': 0.0, u'product': u'27458', u'is_full_catalog': True, u'rate': u'500.0', u'quantity': u'2'}], u'add_quantity': True, u'reseller_order': False, u'finalize': False, u'add_size': False}
RN:
{u'items': [{u'product': 27458, u'is_full_catalog': True, u'quantity': 2}], u'add_size': False, u'finalize': False, u'add_quantity': True}

for full catalog with XL size (modal displayed)
{u'items': [{u'note': u'Size : XL', u'product': u'25695', u'is_full_catalog': True, u'rate': u'222.0', u'quantity': u'3'}], u'add_quantity': False, u'finalize': False, u'add_size': True}

when adding a set, no size
{u'items': [{u'product': u'25700', u'is_full_catalog': False, u'rate': u'200', u'quantity': u'2'}], u'add_quantity': True, u'finalize': False, u'add_size': False}

when adding a screen having size
{u'items': [{u'product': u'25707', u'is_full_catalog': False, u'rate': u'222', u'quantity': u'4'}], u'add_quantity': True, u'finalize': False, u'add_size': False}

for full catalog with no size
{u'items': [{u'product': u'22799', u'is_full_catalog': True, u'rate': u'500.0', u'quantity': u'2'}], u'add_quantity': True, u'finalize': False, u'add_size': False}
*/