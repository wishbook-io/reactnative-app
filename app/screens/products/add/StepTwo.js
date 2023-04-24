import React, { Component } from 'react';
import { View, Image, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { 
  Container, 
  Header, 
  Title, 
  Content, 
  Footer,
  FooterTab,
  Button, 
  Left, 
  Right, 
  Body, 
  Icon, 
  Text,
} from 'native-base';
import { Button as PButton, TouchableRipple} from 'react-native-paper'
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-crop-picker';
import SimpleImagePicker from 'react-native-image-picker';
import _ from 'lodash';

import GenericHeader from 'app/components/Header/GenericHeader';
import SinglePieceMarkup from 'app/screens/seller/SinglePieceMarkup'
import CheckBox from 'app/components/CheckBox/CheckBox';
import WCard from 'app/components/Card/WCard'
import { showConfirm } from 'app/utils/notifier';
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';
import { TestIdGenerator } from 'app/utils/TestingHelper';
import Modal from 'app/components/Modal/Modal';
import ProductDetail from './ProductDetail';
import RadioRow from './RadioRow';
import CustomTextInput from './CustomTextInput';
import ChooseSizes from 'app/screens/seller/ChooseSizes';
import { getFormData, getDesignNameFromPath } from './validationHelper';
import * as serverHelper from './serverHelper';

// redux
import { connect } from 'react-redux';
import { uploadCatalogAction, clearUploadCatalogResponse } from 'app/actions/catalog-actions';
import { showToastAction } from 'app/actions/toast-actions'

import {isWeb} from 'app/utils/PlatformHelper'

const screenName = 'StepTwo';
const inputTestId = TestIdGenerator(screenName, '', 'Input');
const buttonTestId = TestIdGenerator(screenName,'','Button');

const SELLING_MODE = {
  FULL: 'Full set',
  BOTH: 'Single pieces and full set both', 
}

const MAX_MARGIN_PERCENT = 10
const MIN_MARGIN_VALUE = 60

class StepTwo extends Component {

  getSinglePiecePrice = (index) => {
    const margin = parseFloat(this.state.margin.text)
    if(Number.isNaN(margin)) {
      return null;
    }

    const publicPrice = parseFloat(this.state.productDetails[index].detailPrice)
    if(Number.isNaN(publicPrice)) {
      return null;
    }
    
    let price;
    if(this.state.marginTypePercent) {
      price = publicPrice * (100 + margin)/100
    } else {
      price = publicPrice + margin
    }
    return price;
  }

  onMarginChange = (text) => {
    this.setState({margin: {text,}})
  }

  onMarginTypeFixedPress = () => {
    this.setState({marginTypePercent: false});
  }

  onMarginTypePercentPress = () => {
    this.setState({marginTypePercent: true})
  }

  isProductTypeCatalog = () => {
    return !this.props.stepOneParams.catalog_type
  }

  validateSize = () => {
    // console.log("[validateSize]")
    const sizeEav = this.props.sizeEav
    if(!sizeEav || sizeEav.is_required !== true) {
      // console.log("[validateSize] no size eav or not required")
      return true;
    }
    if(this.isFull()) {
      // console.log("[validateSize] is full")
      if(this.state.fullSizedSelected.length === 0) {
        this.showToast("Please select atleast 1 size")
        return false;
      }
    } else {
      // console.log("[validateSize] is both")
      const selected = this.state.singleSizedSelected
      let firstEmptyIndex;
      if(selected.length !== this.state.productDetails.length) {
        firstEmptyIndex = 0
      } else {
        firstEmptyIndex = selected.findIndex(
          (s) => !s || s.length === 0
        )
      }
      if(firstEmptyIndex !== -1) {
        this.showToast("Please select atleast one size in every design")
        return false;
      }
    }
    return true;
  }

  validateProductCount = () => {
    if(!this.validateDesignCount()) {
      return false;
    }

    const expectedProductCount =  parseInt(this.state.designCount.text);
    const actualProductCount = this.state.productDetails.length;
    if(actualProductCount > expectedProductCount) {
      this.showToast("You can upload only "+String(expectedProductCount)+" designs");
      return false;
    }
    if(actualProductCount < expectedProductCount) {
      const remaining = expectedProductCount - actualProductCount;
      this.showToast("Please upload remaining "+String(remaining)+" designs");
      return false;
    }

    return true;
  }

  validatePrice = () => {
    let errorMessage = null;
    _.forEach(this.state.productDetails, (item, index) => {
      
      // validate if price exists and is valid
      const price = parseFloat(item.detailPrice);
      if(Number.isNaN(price)) {
        errorMessage = "Price cannot be empty or invalid"
        return false; // this works as break;
      }

      // now validate if price satisfies the min criteria
      const isCatalog = this.isProductTypeCatalog();
      const minPrice = isCatalog? 100 : 70;
      if(price <= minPrice) {
        errorMessage = "Price should be greater than "+String(minPrice);
        return false; // break
      }
    })

    if(errorMessage) {
      this.showToast(errorMessage);
      return false;
    }

    return true;
  }

  validateAtleastOneProduct = () => {
    if(this.state.productDetails && this.state.productDetails.length>0) {
      return true;
    }
    this.showToast("No products selected!");
  }

  validateMargin = () => {
    // price must have been validated, before moving here
    if(this.isFull()) {
      return true;
    }
    let margin = this.state.margin.text
    margin = Number.parseInt(margin)
    if(Number.isNaN(margin)) {
      this.setState({margin: {text: '', error: 'Please set a valid margin for single Pcs'}})
      return false;
    }

    const catalogPrice = Number.parseInt(this.state.productDetails[0].detailPrice)
    const maxMarginAllowed = Math.max(catalogPrice*MAX_MARGIN_PERCENT/100, MIN_MARGIN_VALUE)
    let maxPercentageAllowed = MAX_MARGIN_PERCENT;
    if(maxMarginAllowed === MIN_MARGIN_VALUE) {
      maxPercentageAllowed = MIN_MARGIN_VALUE*100/catalogPrice
    }

    // console.log("[validateMargin]", {catalogPrice, maxMarginAllowed, maxPercentageAllowed})

    if(this.state.marginTypePercent && margin > maxPercentageAllowed) {
      this.setState({margin: {text: margin + '', error: 'Margin percentage must be <= ' + maxPercentageAllowed.toFixed(2) + '%'}})
      return false
    }

    if(!this.state.marginTypePercent && margin > maxMarginAllowed) {
      this.setState({margin: {text: margin + '', error: 'Margin amount must be <= ₹' + maxMarginAllowed.toFixed(2)}})
      return false;
    }
    return true;
  }

  validateCoverPhoto = () => {
    if(this.state.coverPhoto) {
      return true;
    }
    this.setShowErrorModal("Cover Image can't be empty")
    return false;
  }

  onProgressModalOkPress = () => {
    const newState = this.setHideProgressModal(true);
    this.setState(newState, this.props.finishAddProducts);
  }

  onUploadCatalogDone = ({response}) => {
    const newState = this.setHideProgressModal(true);
    this.setState(newState, this.props.finishAddProducts);
    this.props.dispatch(clearUploadCatalogResponse());
  }

  onSubmitPress = () => {
    // console.log("[onSubmitPress]");
    Keyboard.dismiss();
    // debug
    //this.setShowProgressModal();
    //this.setState({uploadCatalogDone: true});
    //return;
    // debug end

    const disableValidation = false;

    let valid = disableValidation || this.validateCoverPhoto()
    if(!valid) {
      return;
    }

    valid = disableValidation || this.validateAtleastOneProduct()
    if(!valid) {
      return;
    }

    valid = disableValidation || this.validatePrice()
    if(!valid) {
      return;
    }

    valid = disableValidation || this.validateProductCount()
    if(!valid) {
      return;
    }

    valid = disableValidation || this.validateMargin()
    if(!valid) {
      return;
    }

    valid = disableValidation || this.validateSize()
    if(!valid) {
      return;
    }

    const params = this.prepareParams();

    this.setShowProgressModal();
    serverHelper.uploadCatalog(params).then(this.onUploadCatalogDone)
  }

  getMarginParam = () => {
    if(this.isFull()) {
      return {}
    }
    const margin = this.state.margin.text
    if(this.state.marginTypePercent) {
      return {'single_piece_price_percentage': margin}
    } else {
      return {'single_piece_price': margin}
    }
  }

  getAvailableSizesParam = (index) => {
    let selectedSizeIndices
    if(this.isFull()) {
      selectedSizeIndices = this.state.fullSizedSelected
    } else {
      selectedSizeIndices = this.state.singleSizedSelected[index] || []
    }

    let sortedIndices = _.clone(selectedSizeIndices).sort((a,b) => a-b)
    const sizes = sortedIndices.map(s => this.props.sizeEav.attribute_values[s].value).join(',')
    return sizes;
  }

  // this function returns an array of params
  // the index corresponds to the API call
  prepareParams = () => {
    
    const callOneParams = this.getCallOneParams();
    const callTwoParams = this.getCallTwoParams();
    const callThreeParams = this.getCallThreeParams();

    return [callOneParams, callTwoParams, callThreeParams];
  }

  getCallThreeParams = () => {
    let callThreeParams = this.state.productDetails.map((item, index) => {
      let params = {
        title: item.detailDesign,
        sku: item.detailDesign,
        price: parseFloat(item.detailPrice),
        public_price: parseFloat(item.detailPrice),
        sort_order: (index+1),
        ...(this.props.sizeEav? {available_sizes: this.getAvailableSizesParam(index)} : {})
      }

      let formData = getFormData(params, item.detailImage, 'image');
      return formData;
    })

    return callThreeParams;
  }

  getCallTwoParams = () => {
    // const stepOneCallTwoParams = this.props.stepOneParams[1];
    const price = this.state.productDetails[0].detailPrice;
    const singlePriceParam = this.state.samePrice
      ? {public_single_price: price, private_single_price: price} 
      : {}
    
    let callTwoParams = {
      // ...stepOneCallTwoParams,
      ...singlePriceParam,
      without_price: false,
    }

    console.log("[prepareParams] callTwoParams", callTwoParams);
    return callTwoParams;
  }

  getCallOneParams = () => {
    const stepOneCallOneParams = this.props.stepOneParams;
    let callOneParams = {
      ...stepOneCallOneParams,
      "public_price": this.state.productDetails[0].detailPrice,
      "view_permission": 'public',
      "sell_full_catalog": this.state.sellingMode === SELLING_MODE.FULL,
      ...this.getMarginParam()
    }
    let formData = getFormData(callOneParams, this.state.coverPhoto, 'thumbnail');

    console.log("[prepareParams] callOneParams", formData);
    return formData;
  }

  getUpdatedSelectedArray = (selectedArray, subIndex) => {
    let selected = _.cloneDeep(selectedArray)
    const foundIndex = selected.findIndex(i => i === subIndex)
    if(foundIndex !== -1) {
      selected.splice(foundIndex, 1)
    } else {
      selected = [...selected, subIndex];
    }
    return selected;
  }

  onFullSizedCheckBoxPress = (index) => {
    const fullSizedSelected = this.getUpdatedSelectedArray(this.state.fullSizedSelected, index)
    this.setState({fullSizedSelected});
  }

  onSamePriceChange = () => {
    const haveToDisableSamePrice = this.state.samePrice;
    if(haveToDisableSamePrice) {
      this.setState({samePrice: false});
      return;
    }
    const priceToSet = _.property('[0].detailPrice')(this.state.productDetails)
    if(!priceToSet) {
      this.setState({samePrice: true})
      return;
    }

    const updatedProductDetails = this.getUpdatedProductDetails((productDetail) => productDetail.detailPrice = priceToSet);
    this.setState({samePrice: true, productDetails: updatedProductDetails});
  }

  getUpdatedProductDetails = (updater, index=-1) => {
    let updatedProductDetails = _.cloneDeep(this.state.productDetails)
    if(index !== -1) {
      updater(updatedProductDetails[index])
    } else {
      updatedProductDetails.forEach(updater);
    }
    return updatedProductDetails;
  }

  onProductDetailCheckBoxPress = ({index, update: {subIndex}}) => {
    console.log("[onProductDetailsCheckBoxPress]", { index, subIndex })
    let selected = _.cloneDeep(this.state.singleSizedSelected)
    if(!selected[index]) {
      selected[index] = []
    } 
    const foundIndex = selected[index].findIndex(i => i === subIndex)
    if(foundIndex !== -1) {
      selected[index].splice(foundIndex, 1)
    } else {
      selected[index] = [...selected[index], subIndex];
    }
    //console.log("updating selected", selected)
    this.setState({singleSizedSelected: selected})
  }

  onProductDetailImagePress = (params) => {
    const index = params.index
    ImagePicker.openPicker({

    }).then((image) => {
      const updatedProductDetails = this.getUpdatedProductDetails((productDetail) => {productDetail.detailImage = image.path}, index)
      this.setState({productDetails: updatedProductDetails})
    }).catch((error) => {
      console.log(error)
    })
  }

  setSamePriceForAllProductDetails = (productDetails, price) => {
    productDetails.forEach((item) => item.detailPrice = price);
    return productDetails;
  }
  getDetailPriceForNewlyAdded = () => {
    if(this.state.productDetails.length === 0 || !this.state.samePrice) {
      return '';
    }

    return this.state.productDetails[0].detailPrice;
  }

  updateProductDetailsFromPrice = (productDetails, update, index) => {
    if(this.state.samePrice) { 
      if(index === 0) {
      // update this change on all ProductDetail instances
      return this.setSamePriceForAllProductDetails(productDetails, update.detailPrice)
      } else {
        // user is changing another detailPrice, 
        // it means that he/she wishes to have different prices
        this.setState({samePrice: false})
      }
    }
    productDetails[index].detailPrice = update.detailPrice;
    return productDetails;
  }

  onProductDetailChange = (params) => {
    const index = params.index;
    const update = params.update;
    let updatedProductDetails = _.cloneDeep(this.state.productDetails)
    if(update.hasOwnProperty('detailPrice')) {
      updatedProductDetails = this.updateProductDetailsFromPrice(updatedProductDetails, update, index)
    } else {
      const changedProductDetail = {...updatedProductDetails[index], ...update}
      updatedProductDetails[index] = changedProductDetail;
    }
    console.log("[onProductDetailChange] updatedProductDetails: ", updatedProductDetails);
    this.setState({productDetails: updatedProductDetails})
  }

  onCoverPhotoPress = () => {
    const options = {
      title: 'Select Cover Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    SimpleImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          coverPhoto: response.uri,
        });
      }
    });
  }

  onCoverPhotoChangeIntent = () => {
    this.setCoverPhotoModalVisibility(true);
  }

  setHideCoverPhotoModal = () => {
    this.setCoverPhotoModalVisibility(false);
  }

  setCoverPhotoModalVisibility = (visible) => {
    this.setState({isCoverPhotoVisible: visible});
  }

  setShowErrorModal = (text) => {
    this.setErrorModalVisibility(true, text);
  }

  setHideErrorModal = () => {
    this.setErrorModalVisibility(false);
  }

  setErrorModalVisibility = (visible, text) => {
    let newState = {errorModalVisible: visible}
    if(text) {
      newState['errorModalText'] = text;
    }
    this.setState(newState);
  }

  setShowProgressModal = (text) => {
    this.setProgressModalVisibility(true);
  }

  setHideProgressModal = (lazy) => {
    return this.setProgressModalVisibility(false, lazy);
  }

  setProgressModalVisibility = (visible, lazy) => {
    let newState = {progressModalVisible: visible}
    if(lazy === true) {
      return newState;
    }
    this.setState(newState);
  }

  onCameraPress = async () => {
    console.log("onCameraPress");
    //this.setHideCoverPhotoModal();
    try{
      const image = await ImagePicker.openCamera({
        width: 250,
        height: 350,
        cropping: true
      });
      this.setState({isCoverPhotoVisible: false, coverPhoto: image.path});
      console.log(image);
      /*
      { 
        cropRect: { height: 350, width: 250, y: 4, x: 5 },
        size: 52085,
        mime: 'image/jpeg',
        height: 350,
        width: 250,
        modificationDate: '1543476353000',
        path: 'file:///data/user/0/com.wishbook.catalogone.sales/cache/react-native-image-crop-picker/7791ec29-db6d-432f-a1ec-eed3ae9e35be.jpg' 
      }
      */
    } catch(error) {
      this.setHideCoverPhotoModal();
    }
  }

  onGalleryPress = async () => {
    // console.log("onGalleryPress1");
    // this.setHideCoverPhotoModal();
    try {
      const image = await ImagePicker.openPicker({
        width: 250,
        height: 350,
        cropping: true
      })
      this.setState({isCoverPhotoVisible: false, coverPhoto: image.path});
      // console.log("onGalleryPress");
      // console.log(image);
      /*
      { cropRect: { height: 350, width: 250, y: 21, x: 15 },
        size: 22683,
        mime: 'image/jpeg',
        height: 350,
        width: 250,
        modificationDate: '1543474723000',
        path: 'file:///data/user/0/com.wishbook.catalogone.sales/cache/react-native-image-crop-picker/9f5584e6-4419-480f-be12-2d03fc7486e5.jpg' 
      }
      */
    } catch(error) {
      this.setHideCoverPhotoModal();
    }
  }

  onDesignCountChange = (text) => {
    console.log("[onDesignCountChange] ", text)
    let updatedDesignCount = {text}
    this.setState({designCount: updatedDesignCount})
  }

  validateDesignCount = () => {
    const designCount = parseInt(this.state.designCount.text);
    
    if(!designCount || designCount<=0) {
      this.setState({designCount:{error: 'Please enter a valid no. of designs'}})
      return false;
    }

    if(designCount < 3) {
      this.setState({designCount: {error: 'No. of designs can\'t be less than 3', text: designCount + ''}})
      return false
    }

    return true;
  }

  onAddProductPress = async () => {
    console.log("[onAddProductPress]")
    if(!this.validateDesignCount()) {
      return;
    }
    const designCount = parseInt(this.state.designCount.text);

    let selectedImages = [];
    try {
      selectedImages = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        maxFiles: designCount,
      });
    } catch(error) {
      console.log("[SteTwo:onAddProductPress]", error)
      return;
    }
    // console.log(selectedImages);
    const detailPrice = this.getDetailPriceForNewlyAdded()
    const newProductDetails = selectedImages.map((item, index) => ({
      detailImage: item.path,
      detailDesign: getDesignNameFromPath(item.path),
      detailPrice: detailPrice,
    }))
    const updatedProductDetails = this.state.productDetails.concat(newProductDetails);
    this.setState({productDetails: updatedProductDetails,});
  }

  onConfirmProductDetailDelete = (index) => {
    let updatedProductDetails = _.cloneDeep(this.state.productDetails)
    updatedProductDetails.splice(index, 1);
    this.setState({productDetails: updatedProductDetails})
  }

  showProductDetailDeleteConfirmation = (index) => {
    showConfirm(
      screenName,
      'Confirm Delete',
      'Are you sure you want to remove?',
      this.onConfirmProductDetailDelete,
      index
    )
  }

  onProductDetailDelete = (params) => {
    console.log('[onProductDetailDelete]', params);
    const index = params.index;
    this.showProductDetailDeleteConfirmation(index)
  }

  isFull = () => {
    const full = this.state.sellingMode === SELLING_MODE.FULL
    return full;
  }

  onSellingModeChange = (sellingMode) => {
    this.setState({sellingMode})
  }

  showToast = (message, duration=1000) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  constructor(props) {
    super(props);
    this.state = {
      uploadCatalogDone: false,
      progressModalVisible: false,

      isCoverPhotoVisible: false,

      /*
      we need to have two state variables here because
      if we simply rely on text for hiding or showing modal
      then while dismissing the modal, we see the modal
      with blank error, owing to the fact that modal dismissing
      is slow. Therefore while hiding modal, we simply set the
      visibility parameter to false, and do not change the text
      parameter so that error remains visible
      */
      errorModalVisible: false,
      errorModalText: null,
      
      // data items for this screen

      // path for cover photo
      // coverPhoto: 'file:///sdcard/t1.png',
      coverPhoto: undefined,

      // whether selling full catalog or single pieces
      sellingMode: SELLING_MODE.FULL,

      // total no. of designs
      designCount: {
        text: '',
        // text: '',
        error: null,
      },

      // same price for all designs
      samePrice: true,
      /* individual details of products like
      {
        image: string
      }
      */
      productDetails: [ 
      /*{ 
        detailImage: 'file:///sdcard/t1.png',
        detailDesign: 'Screenshot_20181127-124901',
        detailPrice: '1000',
      },
      { 
        detailImage: 'file:///sdcard/t1.png',
        detailDesign: 'Screenshot_20181127-124901',
        detailPrice: '101',
      },
      { 
        detailImage: 'file:///sdcard/t1.png',
        detailDesign: 'Screenshot_20181127-124901',
        detailPrice: '501',
      },*/
      ],

      fullSizedSelected: [],
      singleSizedSelected: [],

      marginTypePercent: true,
      margin: {text: ''},

    }
  }

  render() {
    if(this.props.hide) {
      return null;
    }
    const sizeEav = this.props.sizeEav;
    const sizes = sizeEav? sizeEav.attribute_values.map((e, i) => e.value) : []
    // console.log("[StepTwo:render]", {sizeEav, sizes})
    const testIds = this.props.testIds;
    return(
      <Container style={{backgroundColor: colorresource.materialbg}}>
        <GenericHeader
          title={'Add Products'}
          leftConfig={{
            visible: true,
            icon: 'arrow-back',
            onPress: this.props.goToStepOne,
            testId: testIds.back
          }}
        />
        <Content enableResetScrollToCoords={false} showsVerticalScrollIndicator={false}>

          <View style={styles.AddProductsSection}>
            <Text style={styles.AddProductsHeading}>Cover photo</Text>
            <View style={styles.AddProductsSubSection}>
              <View style={{
                flexDirection: 'row'
              }}>
                <View style={{flex: 1}}>
                  {/* <TouchableOpacity style={{height: 170, width: 140, backgroundColor: colorresource.cardshadow}} onPress={this.onCoverPhotoPress}>
                    <Image style={{flex: 1}} resizeMode={'contain'} source={{uri: this.state.coverPhoto}}/>
                  </TouchableOpacity> */}
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <WCard
                    // bordered
                    noPadding
                    cardStyle={{margin: 0}}
                    contentStyle={{height: 170, width: 140, backgroundColor: colorresource.cardshadow}}
                    onPress={this.onCoverPhotoPress}
                    >
                      <Image style={{flex: 1}} resizeMode={'contain'} source={{uri: this.state.coverPhoto}}/>
                    </WCard>
                  </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10}}>
                  {/* <ActionChip 
                  text={this.state.coverPhoto? 'Change Cover Photo' : '+ Add/Edit cover photo'} 
                  chipTextStyle={{fontSize: 14, textAlign: 'center'}} 
                  chipStyle={{height: 40}}
                  onPress = {this.onCoverPhotoChangeIntent}
                  testId={testIds.cover}
                  /> */}
                  <TouchableRipple
                  onPress={this.onCoverPhotoChangeIntent}
                  rippleColor={colorresource.liteblue}
                  testId={testIds.cover}
                  >
                    <View style={{
                      borderWidth: 1, 
                      borderColor: colorresource.liteblue,
                      borderRadius: 5,
                      padding: 5,
                    }}>
                      <Text style={{
                        color: colorresource.liteblue,
                        textAlign: 'center',
                        fontSize: 14,
                      }}>{this.state.coverPhoto? 'Change cover photo' : '+ Add/Edit cover photo'}</Text>
                    </View>
                  </TouchableRipple>
                </View>
              </View>
            </View>
          </View>




          <View style={styles.AddProductsSection}>
            <Text style={styles.AddProductsHeading}>How would you like to sell catalog?</Text>
            <View style={styles.AddProductsSubSection}>
              <RadioRow config={[
                {
                  text: SELLING_MODE.FULL,
                  onPress: this.onSellingModeChange,
                  selected: this.state.sellingMode === SELLING_MODE.FULL,
                },
                {
                  text: SELLING_MODE.BOTH,
                  onPress: this.onSellingModeChange,
                  selected: this.state.sellingMode === SELLING_MODE.BOTH,
                }
              ]}
              testIds={[testIds.full, testIds.single]}
              />
            </View>
          </View>


          <View style={styles.AddProductsSection}>
            <View style={styles.AddProductsSubSection}>
              <View style={{flexDirection: 'row', }}>
                <Text style={[styles.AddProductsSubHeading, {marginTop: 23}]}>Total number of designs</Text>
                <CustomTextInput 
                error={this.state.designCount.error}
                info={'Min. 3 designs required'}
                value={this.state.designCount.text} 
                placeholder={'No. of designs'}
                onChange={this.onDesignCountChange}
                textInputProps={{keyboardType:'numeric'}}
                testId={testIds.count}
                reserveHelperSpace={true}
                />
              </View>
            </View>
          </View>




          <View style={styles.AddProductsSection}>
            <View style={styles.AddProductsSubSection}>
              <TouchableOpacity activeOpacity={1} style={{flexDirection: 'row', alignItems: 'center'}} onPress={this.onSamePriceChange}>
                <CheckBox selected={this.state.samePrice} checkBoxStyle={{marginRight: 10+15}} onPress={this.onSamePriceChange} testId={testIds.same}/>
                <Text style={styles.AddProductsSubHeading}>Same price for all designs</Text>
              </TouchableOpacity>
            </View>
            {sizeEav && this.isFull()?
            <View style={styles.AddProductsSubSection}>
              <ChooseSizes 
              sizes={sizes}
              onCheckBoxPress={this.onFullSizedCheckBoxPress}
              selected={this.state.fullSizedSelected}
              />
            </View> : null }

            {this.isFull()? null : 
              <View style={styles.AddProductsSubSection}>
                <SinglePieceMarkup
                marginTypePercent={this.state.marginTypePercent}
                onMarginTypeFixedPress={this.onMarginTypeFixedPress}
                onMarginTypePercentPress={this.onMarginTypePercentPress}
                marginText={this.state.margin.text}
                marginError={this.state.margin.error}
                onMarginChange={this.onMarginChange}
                hide={this.isFull()}
                />
              </View>
            }
          </View>

          {this.state.productDetails.map((item, index) => 
            <ProductDetail 
            key={index}
            index={index}
            callbacks={{
              onProductDetailChange: this.onProductDetailChange,
              onProductDetailDelete: this.onProductDetailDelete,
              onProductDetailImagePress: this.onProductDetailImagePress,
              onProductDetailCheckBoxPress: this.onProductDetailCheckBoxPress,
            }}
            data={item}
            sizes={this.isFull()? null : sizes}
            selectedSizes={this.state.singleSizedSelected[index]}
            singlePiecePrice={this.isFull()? null : this.getSinglePiecePrice(index)}
            testIds={testIds}
            />
          )}
          


          {true
          ? <View style={{flex: 1, paddingTop: 10, paddingBottom: 30,}}>
            {/* <AddProductChip text={'+ Add product photos'} onPress={this.onAddProductPress} testId={testIds.add}/> */}
            <TouchableRipple
            style={{marginLeft: 5, marginRight: 5,}}
            onPress={this.onAddProductPress}
            rippleColor={colorresource.liteblue}
            testId={testIds.add}
            >
              <View style={{
                borderWidth: 1, 
                borderColor: colorresource.liteblue,
                borderRadius: 5,
                padding: 5,
              }}>
                <Text style={{
                  color: colorresource.liteblue,
                  textAlign: 'center',
                  fontSize: 14,
                }}>{'+ Add product photos'}</Text>
              </View>
            </TouchableRipple>
          </View>
          : null}



        </Content>
        <Footer style={{/*borderWidth: 1, borderColor: 'black'*/}}>
          <FooterTab style={{}}>
            <Button full style={{backgroundColor: colorresource.liteblue}} onPress={this.onSubmitPress} {...testIds.submit}>
                <Text style={{marginTop: 5, color: 'white', fontSize: 17, lineHeight: 17}}>Submit</Text>
            </Button>
          </FooterTab>
        </Footer>
        <Modal 
        onBackdropPress={this.setHideCoverPhotoModal}
        isVisible={this.state.isCoverPhotoVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        >
          <View style={localStyles.ModalParent}>
            <View>
              <View style={localStyles.ModalRowItem}>
                <Text style={localStyles.ModalText} onPress={this.onCameraPress}>Camera</Text>
              </View>
              <View style={localStyles.ModalRowItem}>
                <Text style={localStyles.ModalText} onPress={this.onGalleryPress}>Gallery</Text>
              </View>
              <View style={localStyles.ModalRowItem}>
                <Text style={localStyles.ModalText} onPress={this.setHideCoverPhotoModal}>Cancel</Text>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
        onBackdropPress={this.setHideErrorModal}
        isVisible={this.state.errorModalVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        >
          <View style={localStyles.ErrorModalParent}>
            <Text style={localStyles.ErrorModalText}>{this.state.errorModalText}</Text>
            <Text style={localStyles.ErrorModalButtonText} onPress={this.setHideErrorModal}>OK</Text>
          </View>
        </Modal>

        <Modal
        onBackdropPress={this.setHideProgressModal}
        isVisible={this.state.progressModalVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        >
          <View style={localStyles.ProgressModalParent}>
            {this.state.uploadCatalogDone? 
            <View>
              <Text style={localStyles.ProgressModalHeading}>{'Upload Successful'}</Text>
              <Text style={localStyles.ProgressModalOk} onPress={this.onProgressModalOkPress}>OK</Text>
            </View>
            : <Text style={localStyles.ProgressModalHeading}>{'Uploading Image : '+this.props.responseProgress+' / '+this.state.productDetails.length}</Text>
            }
          </View>
        </Modal>

      </Container>
    );
  }
}

const AddProductChip = ({onPress, text, testId={}}) => {
  return (
    <View style={localStyles.ChipParent}>
      <TouchableOpacity onPress={onPress} style={localStyles.Chip} {...testId}>
          <View>
            <Text style={localStyles.ChipText}>{text}</Text>
          </View>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = EStyleSheet.create({
  ChipParent: {
    height: 40,           // necessary to add padding at top and bottom, WITHOUT messing up vertical alignment
    // flexDirection: 'row', // necessary to make aligning work in center, otherwise AddChips and SelectedChips won't be centered
    // alignItems: 'center',
    marginTop: 10,
    marginBottom: 30
  },
  Chip: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    height: 38, 
    marginLeft: 5, 
    marginRight: 5,
    borderWidth: 1, 
    borderColor: colorresource.liteblue,
    borderRadius: 5, 
  }, 
  ChipText: {
    color: colorresource.liteblue,
    // flex: 1,                        // necessary to make text vertical align
    // textAlignVertical: 'center',
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 14,
  },
  ModalParent: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingTop: 10,
    paddingBottom: 10,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  ModalRowItem: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  ModalText: {
    color: colorresource.grey900,
    fontSize: 22,
  },
  ErrorModalParent: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  ErrorModalText: {
    color: colorresource.gray,
  },
  ErrorModalButtonText: {
    textAlign: 'right',
    color: colorresource.liteblue,
    marginTop: 30,
    marginRight: 20,
  },
  ProgressModalParent: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  ProgressModalHeading: {
    color: colorresource.grey900,
    fontSize: 20,
    fontWeight: 'bold',
  },
  ProgressModalOk: {
    color: colorresource.liteblue,
    fontSize: 16,
    padding: 7,
    textAlign: 'right',
    marginTop: 20,
  }
});

const mapStateToProps = (state) => {
  
  return {
    responseFabric: state.enumgroupR.responseFabrics,
    responseWork:   state.enumgroupR.responseWorks,
    responseStyle:  state.enumgroupR.responseStyles,
    responseProgress: state.catalogR.uploadCatalogProgress,
    responseUploadCatalog: state.catalogR.responseUploadCatalog,
  };
};

export default connect(mapStateToProps)(StepTwo);
