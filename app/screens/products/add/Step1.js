import React, { Component, Fragment } from 'react';
import { View, TextInput, ActivityIndicator, InteractionManager, Keyboard, ScrollView } from 'react-native';
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
  Card,
  CardItem,
  Radio,
  Picker,
} from 'native-base';
import { TextInput as PTextInput, HelperText } from 'react-native-paper';
import _ from 'lodash';

import GenericHeader from 'app/components/Header/GenericHeader';
import CustomPicker from './CustomPicker';
import RadioList from './RadioList';
import CustomMultiSelect from './CustomMultiSelect';
import ProductAvailability from './ProductAvailability';
import OtherDetails from './OtherDetails';
import CheckboxFlex from './CheckboxFlex';
import DressMaterialSection from './DressMaterialSection';
import EavInput from './EavInput';
import { formatDate } from 'app/utils/dateHelper';
import { formatStringFromServer } from 'app/utils/formatHelper';
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';
import { showConfirm } from "app/utils/notifier";


// actions
import { connect } from 'react-redux';
import { showToastAction } from 'app/actions/toast-actions'
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';
import * as navigationActions from 'app/actions/navigation-actions';

import { validateProductNameFromServer, validateDiscountFromServer, validateSetNameFromServer, getDynamicAttributes } from './validationHelper';
import * as serverHelper from './serverHelper';
import consts from 'app/utils/const';

import * as debugHelper from 'app/utils/debugHelper';
import { TestIdGenerator } from 'app/utils/TestingHelper';

const screenName = 'Step1';
const inputTestId = TestIdGenerator(screenName, '', 'Input');
const buttonTestId = TestIdGenerator(screenName,'','Button');

// const DEFAULT_CATEGORY_TOP_ID = 4;
const DEFAULT_CATEGORY_TOP_ID = 10;

const EAV_TYPES = {
  RADIO: 1,
  CHECKBOX: 2,
  INPUT_TEXT: 3,
  INPUT_INT: 4,
  INPUT_FLOAT: 5,
}

const EAV_TYPES_INPUT = [EAV_TYPES.INPUT_TEXT, EAV_TYPES.INPUT_INT, EAV_TYPES.INPUT_FLOAT]

const EAV_TYPES_SERVER_TO_LOCAL_MAPPER = {
  'enum': EAV_TYPES.RADIO,
  'multi': EAV_TYPES.CHECKBOX,
  'text': EAV_TYPES.INPUT_TEXT,
  'int': EAV_TYPES.INPUT_INT,
  'float': EAV_TYPES.INPUT_FLOAT,
}

const ENUM_TYPES = {
  FABRIC: 'fabric',
  WORK: 'work',
  STYLE: 'style'
}

const ENUM_TYPES_ARRAY = ['fabric', 'work', 'style']

const DRESS_MATERIAL_TYPES = {
  TOP: 'top_length',
  BOTTOM: 'bottom_length',
  DUPATTA: 'dupatta_length'
}

const DRESS_MATERIAL_TYPES_ARRAY = ['top_length', 'bottom_length', 'dupatta_length']

const PARTIAL_DYNAMIC_EAV = [...ENUM_TYPES_ARRAY, ...DRESS_MATERIAL_TYPES_ARRAY]

const PRODUCT_TYPES = consts.PRODUCT_TYPES;

const PHOTOSHOOT_TYPES = {
  LIVE: 0,
  FACE_CUT: 1,
  NO_MODEL: 2,
}

const PHOTOSHOOT_STRINGS = [
  'Live Model Photoshoot',
  'White Background or Face-cut',
  'Photos without Model'
]

const NO_BRAND_ID = -1;

const SET_TYPES = {
  SIZE: ' (size set)',
  COLOR: ' (color set)'
}

const FORM_FIELD_KEYS = {
  PRODUCT_NAME: 'ProductName',
  ITEM_NAME: 'ItemName',
  FABWORK: 'Fabwork',
  EAV_INPUT: 'EavInput',
  DYNAMIC_EAV: 'DynamicEav',
  LAST_SECTION: 'CatalogLastSection',
}

class Step1 extends Component {

  scrollToComponent = (name) => {
    if(this.contentRef && this.yPos[name] !== undefined) {
      this.contentRef.props.scrollToPosition(0, this.yPos[name])
    }
  }

  onProductNameLayout = (event) => {
    this.yPos[FORM_FIELD_KEYS.PRODUCT_NAME] = event.nativeEvent.layout.y
  }

  onItemNameLayout = (event) => {
    this.yPos[FORM_FIELD_KEYS.ITEM_NAME] = event.nativeEvent.layout.y
  }

  onFabworkLayout = (event) => {
    this.yPos[FORM_FIELD_KEYS.FABWORK] = event.nativeEvent.layout.y
  }

  onEavInputLayout = (event) => {
    this.yPos[FORM_FIELD_KEYS.EAV_INPUT] = event.nativeEvent.layout.y
  }

  onDynamicEavLayout = (event) => {
    this.yPos[FORM_FIELD_KEYS.DYNAMIC_EAV] = event.nativeEvent.layout.y
  }

  onLastSectionLayout = (event) => {
    this.yPos[FORM_FIELD_KEYS.LAST_SECTION] = event.nativeEvent.layout.y
  }

  registerContentRef = (r) => {
    this.contentRef = r;
  }

  onOtherDetailsChange = (text) => {
    this.setState({otherDetails: text})
  }

  onEavInputChange = ({index, text}) => {
    const eavIndex = index;
    let eavList = _.cloneDeep(this.getCurrentDynamicEav());
    let inputEav = eavList[eavIndex]
    const dataType = inputEav.type
    let input = text
    if(dataType === EAV_TYPES.INPUT_INT) {
      input = input.replace(/[^0-9]/g, '')
      if(input === inputEav.input) {
        // there was no change, no need to set state
        return;
      }
    }
    // now we need to set the new input
    eavList[eavIndex].input = input
    const key = this.getCurrentDynamicEavKey();
    this.setState({[key]: eavList})
  }

  onDynamicEavChange = (params) => {
    // console.log("[onDynamicEavChange] params", params);
    const eavIndex = params.id
    const changedIndex = params.index;
    let dynamicEavList = _.cloneDeep(this.getCurrentDynamicEav());
    // console.log("dynamicEav", dynamicEavList)
    let dynamicEav = dynamicEavList[eavIndex];
    if(dynamicEav.selected.includes(changedIndex)) {
      // if checkbox, remove it, if radio, it will never come here, because child won't notify parent in that case
      // since there is nothing actually changing
      dynamicEav.selected = dynamicEav.selected.filter((value) => value !== changedIndex)
    } else {
      // if checkbox, add the index, if radio, set it
      if(dynamicEav.type == EAV_TYPES.CHECKBOX) {
        dynamicEav.selected.push(changedIndex);
      } else {
        dynamicEav.selected = [changedIndex];
      }
    }
    const key = this.getCurrentDynamicEavKey();
    dynamicEavList[eavIndex] = dynamicEav;
    this.setState({[key]: dynamicEavList})
  }

  getCurrentDynamicEav = () => {
    const categoryIndex = this.state.categoryIndex;
    const key = this.getDynamicEavKey(categoryIndex);
    return this.state[key] || [];
  }

  constructCategoryDynamicEav = (eav) => {
    const eavName = formatStringFromServer(eav.attribute_name === 'occasion_wear'? 'occasion' : eav.attribute_name);

    const eavValues = eav.attribute_values
    const eavType = EAV_TYPES_SERVER_TO_LOCAL_MAPPER[eav.attribute_datatype]
    if(!eavType) {
      console.warn("[constructCategoryDynamicEav] not found mapper for ", eav.attribute_datatype)
    }
    return {
      name: eavName,
      type: eavType,
      unit: eav.attribute_type,   // meters, for dress material
      input: '',                  // user input in case of INPUT_* data types
      values: eavValues,          // [], for dress material
      selected: [],               // will not be used for dress material
      tag: eav.attribute_slug,    // this will be required when we build params
      required: eav.is_required   // for validation
    }
  }

  getCurrentDynamicEavKey = () => {
    return this.getDynamicEavKey(this.state.categoryIndex);
  }

  getDynamicEavKey = (categoryIndex) => {
    const category = this.getCategoryFromIndex(categoryIndex)
    if(!category) {
      return "wait"
    }
    const categoryId = category.id
    return "categoryDynamicEav" + String(categoryId)
  }

  fetchAndSetDynamicEavFromIndex = async (index) => {
    // console.log("[fetchAndSetDynamicEavFromIndex] fetching eav for index", index)
    const key = this.getDynamicEavKey(index)
    const dynamicEav = this.state[key];
    if(key in this.state) {
      return;
    }
    const categoryId = this.getCategoryFromIndex(index).id;
    const dynamicEavs = this.state.eavGroupedByCategory[categoryId].map(this.constructCategoryDynamicEav)
    // console.log("[fetchAndSetDynamicEavFromIndex] dynamicEavs", dynamicEavs)
    this.setState({[key]: dynamicEavs});
  }

  extractCategoryNameFromCategory = (category, index) => {
    let suffix = ''
    if(this.state.categorySetType.length > 0 && this.isProductType(PRODUCT_TYPES.SET_MATCHING)) {
      suffix = this.state.categorySetType[this.state.categoryTopIndex][index]
    }
    return category.category_name + suffix
  }

  onCategoryTopChange = (value, index) => {
    this.setState({categoryTopIndex: index}, () => this.onCategoryChange(undefined, 0))
  }

  onCategoryChange = (value, index) => {
    this.fetchAndSetDynamicEavFromIndex(index);
    this.setState({categoryIndex: index});
  }

  onBrandChange = (value, index) => {
    // console.log("new brand value: ", this.props.responseBrands[index])
    this.setState({brandIndex: index});
  }

  onPhotoshootChange = (value, index) => {
    this.setState({photoshootIndex: index});
  }

  onProductNameChange = (text) => {
    // console.log("[onProductNameChange] text", text);
    this.setState({productName: {text}});
  }

  onSetNameChange = (text) => {
    this.setState({setName:{text}})
  }

  onNosPerSetChange = (text) => {
    this.setState({nosPerSet:{text:text.replace(/[^0-9]/g, '')}})
  }

  onPricePerNosChange = (text) => {
    this.setState({pricePerNos:{text:text.replace(/[^0-9]/g, '')}})
  }

  getBrandFromIndex = (index) => {
    const brands = this.props.responseBrands;
    return brands[index];
  }

  getBrandList = () => {
    const noBrand = this.isProductType(PRODUCT_TYPES.CATALOG)
      ? []
      : [{name: 'No Brand', id: -1}];
    return [...noBrand, ...this.props.responseBrands]
  }

  getCategoryFromIndex = (index) => {
    const categories = this.state.responseCategories;
    return categories[this.state.categoryTopIndex][index];
  }

  getPhotoshootFromIndex = (index) => {
    return PHOTOSHOOT_STRINGS[index];
  }

  validateProductName = async (skip = false) => {
    if(skip) {
      return true;
    }
    const productName = this.state.productName.text;
    if(!productName) {
      this.setState({productName: {text: '', error: 'Product name cannot be empty'}})
      return false;
    }

    const brandId = this.getBrandFromIndex(this.state.brandIndex).id;
    const categoryId = this.getCategoryFromIndex(this.state.categoryIndex).id;
    const result = await validateProductNameFromServer(this.state.productName.text, brandId, categoryId);

    if(result.length !== 0) {
      // TODO: show resume selling popup here
      this.setState({productName: {text: '', error: 'Product name already exists for selected brand and category'}})
      return false;
    }

    return true;
  }
  
  validateDiscount = async (skip = false) => {
    if(skip) {
      //console.log("skip is true")
      return true;
    } 
    const brandId = this.getBrandFromIndex(this.state.brandIndex).id;
    const result = await validateDiscountFromServer(brandId)
     
    //console.log("{result} response error", result)
    if(result.error){
      return false
    }
    
    if(result.response && result.response.length === 0){
      showConfirm(
        screenName,
        'You have not set any discount for this brand',
        'If you want to continue to upload a catalog under this brand, need to set dicount first',
        this.onConfirmGoToMyDiscount,
      )
      return false
    }
    
    return true; 
  }
  
  onConfirmGoToMyDiscount = () => navigationActions.goToMyDiscount()
  
  validateFabwork = () => {
    const eav = this.getCurrentDynamicEav();
    // console.log('[validateFabwork]: dynamic eav', eav);
    if(!eav || eav.length === 0) {
      // this category doesn't have eav
      return true;
    }

    const fabPresent = eav.find(e => e.tag === ENUM_TYPES.FABRIC);
    const fabEmpty = fabPresent && fabPresent.selected.length === 0;
    if(fabEmpty) {
      this.showToast("Please select any Fabric");
      return false;
    }

    const workPresent = eav.find(e => e.tag === ENUM_TYPES.WORK);
    const workEmpty = workPresent && workPresent.selected.length === 0;
    if(workEmpty) {
      this.showToast("Please select any Work");
      return false;
    }

    return true;
  }

  validateNosPerSet = (skip = false) => {
    if(skip) {
      return true;
    }
    const nosPerSet = parseInt(this.state.nosPerSet.text);
    if(Number.isNaN(nosPerSet)) {
      this.setState({nosPerSet: {text: '', error: 'Please enter No. of Pcs./Set'}})
      return false;
    }

    if(nosPerSet <= 0) {
      this.setState({nosPerSet: {text: '', error: 'Please enter a valid No. of Pcs./Set'}})
      return false;
    }

    const currentSetType = this.state.categorySetType[this.state.categoryTopIndex][this.state.categoryIndex]

    if(currentSetType === SET_TYPES.SIZE) {
      // console.log("looking at a size set")
      const sizeEav = this.getCurrentDynamicEav().find((item) => item.tag === 'size');
      // console.log({sizeEav});
      const currentSizesCount = parseInt(sizeEav && sizeEav.selected.length);
      // console.log({currentSizesCount, nosPerSet})
      if(currentSizesCount && currentSizesCount !== nosPerSet) {
        this.setState({nosPerSet: {text: String(nosPerSet), error: `Please select ${nosPerSet} sizes or change the No. of Pcs./set to ${currentSizesCount}`}})
        return false;
      }
    }
    return true;
  }

  validatePricePerNos = (skip = false) => {
    if(skip) {
      return true;
    }
    const pricePerNos = parseInt(this.state.pricePerNos.text);
    if(Number.isNaN(pricePerNos)) {
      this.setState({pricePerNos: {text: '', error: 'Please enter Price/Pc.'}})
      return false;
    }
    if(pricePerNos <= 70) {
      this.setState({pricePerNos: {text: '', error: 'Price should be greater than 70'}})
      return false;
    }
    if(pricePerNos > 50000) {
      this.setState({pricePerNos: {text: '', error: 'Price must be less than or equal to 50K'}})
      return false;
    }
    return true;
  }

  validateExpiryPeriod = (skip) => {
    if(skip) {
      return true;
    }
    const period = parseInt(this.state.expiryPeriod.text)
    let error = null;
    if(Number.isNaN(period)) {
      error = "Please enter a valid enable duration";
    }
    if(period < 10) {
      error = "Minimum enable duration should be 10";
    }
    if(period > 90) {
      error = "Maximum enable duration should be 90";
    }
    if(error) {
      this.setState({expiryPeriod:{error}})
      return false;
    }
    return true;
  }

  validateEavInput = () => {
    const eav = this.getCurrentDynamicEav();
    // console.log('[validateEavInput]: dynamic eav', eav);
    if(!eav || eav.length === 0) {
      // this category doesn't have eav
      return true;
    }
    const validator = (tag, minVal = 0.5, maxVal = 10.0, unit = 'm') => {
      const eavPresent = eav.find(e => e.tag === tag)
      if(!eavPresent) {
        // this category doesn't have this specific eav, so it is validated by default
        return true;
      }
      const eavRequired = eavPresent.required
      const eavEmpty = eavPresent.input.length === 0
      const formattedEavName = formatStringFromServer(eavPresent.tag)
      if(eavRequired && eavEmpty) {
        this.showToast("Please enter " + formattedEavName)
        return false;
      }
      if(!eavEmpty) {
        const value = Number.parseInt(eavPresent.input)
        if(value < minVal) {
          this.showToast(`${formattedEavName} can't be less than ${minVal}${unit}`)
          return false;
        }
        if(value > maxVal) {
          this.showToast(`${formattedEavName} can't be more than ${maxVal}${unit}`)
          return false;
        }
      }
      return true;
    }

    const dressMaterialTypesValid = 
      validator(DRESS_MATERIAL_TYPES.TOP, 0.5, 10.0, 'm') &&
      validator(DRESS_MATERIAL_TYPES.BOTTOM, 0.5, 10.0, 'm') &&
      validator(DRESS_MATERIAL_TYPES.DUPATTA, 0.5, 10.0, 'm')
    
    return dressMaterialTypesValid;
  }

  validateEav = () => {
    const eav = this.getCurrentDynamicEav();
    if(!eav || eav.length === 0) {
      // this category doesn't have eav
      return true;
    }
    let i=0;
    let error = null;
    for(i=0; i<eav.length; i++) {
      if(!PARTIAL_DYNAMIC_EAV.includes(eav[i].tag) 
        && (this.isProductType(PRODUCT_TYPES.SET_MATCHING) || eav[i].tag !== 'size') // skip size validation when product type is not set matching
        && eav[i].required 
        && eav[i].selected.length === 0
      ) {
        // nothing was selected in this eav
        const name = eav[i].name;
        error = "Please select any " + name
        break;
      }
    }
    if(error) {
      this.showToast(error);
      return false;
    }
    return true;
  }

  validateSetName = async (skip = false) => {
    if(skip) {
      return true;
    }
    const setName = this.state.setName.text;
    if(!setName) {
      this.setState({setName: {text: '', error: 'Please enter quality name'}})
      return false;
    }

    const result = await validateSetNameFromServer(this.state.setName.text);
    // console.log("got result", result)
    let alreadyExists = false;
    if(result.length > 0) {
      // console.log("Now finding...")
      alreadyExists = !!result.find((item) => {
        // console.log("now comparing setName with", setName, item.title)
        const found = setName.localeCompare(item.title, undefined, { sensitivity: 'base' })
        // console.log("found:", found);
        return found===0;
      })
      // console.log("alreadyExists", alreadyExists);
    }
    if(alreadyExists) {
      this.setState({setName: {text: '', error: 'Quality name already exists'}})
      return false;
    }

    return true;
  }

  onContinuePress = async () => {
    // console.log("[onContinuePress]")
    Keyboard.dismiss();

    //debug
    // console.log("dynamic eav", this.getCurrentDynamicEav())
    // console.log("getfabricworkstyleeav", this.getFabricWorkStyleEavValues())
    // return;
    //debug end

    //debug
    //this.props.finishAddProducts();
    //return;
    // debug end

    //debug
    //this.navigateToNextStep()
    //return;
    // debug end

    //debug
    // this.scrollToComponent(FORM_FIELD_KEYS.PRODUCT_NAME);
    // return;
    //debug end

    // TODO: disable the continue button, or show a loader modal
    // return;

    // console.log("dynamic eav", this.getCurrentDynamicEav())

    const disableValidation = false;

    let valid = disableValidation || this.validateFabwork();
    if(!valid) {
      this.scrollToComponent(FORM_FIELD_KEYS.FABWORK)
      return;
    }

    valid = disableValidation || this.validateEavInput();
    if(!valid) {
      this.scrollToComponent(FORM_FIELD_KEYS.EAV_INPUT)
      return;
    }

    valid = disableValidation || this.validateEav();
    if(!valid) {
      this.scrollToComponent(FORM_FIELD_KEYS.DYNAMIC_EAV)
      return;
    }

    valid = disableValidation || this.validateNosPerSet(!this.isProductType(PRODUCT_TYPES.SET_MATCHING));
    if(!valid) {
      this.scrollToComponent(FORM_FIELD_KEYS.LAST_SECTION);
      return;
    }

    valid = disableValidation || this.validatePricePerNos(!this.isProductType(PRODUCT_TYPES.SET_MATCHING));
    if(!valid) {
      this.scrollToComponent(FORM_FIELD_KEYS.LAST_SECTION);
      return;
    }

    valid = disableValidation || this.validateExpiryPeriod(this.isProductType(PRODUCT_TYPES.SET_MATCHING))
    if(!valid) {
      this.scrollToComponent(FORM_FIELD_KEYS.LAST_SECTION);
      return;
    }
    this.props.dispatch(requestShowLoaderAction(screenName))
    const validateProductNameResult = disableValidation || await this.validateProductName(this.isProductType(PRODUCT_TYPES.SET_MATCHING))
    if(!validateProductNameResult) {
      this.props.dispatch(requestHideLoaderAction(screenName))
      this.scrollToComponent(FORM_FIELD_KEYS.PRODUCT_NAME);
      return;
    }
    
    const validateDiscountResult = disableValidation || await this.validateDiscount()     
    if(!validateDiscountResult){
      this.props.dispatch(requestHideLoaderAction(screenName))      
      return;
    }

    const validateSetNameResult = disableValidation || await this.validateSetName(!this.isProductType(PRODUCT_TYPES.SET_MATCHING))
    if(!validateSetNameResult) {
      this.props.dispatch(requestHideLoaderAction(screenName))
      this.scrollToComponent(FORM_FIELD_KEYS.ITEM_NAME);
      return;
    }
    this.props.dispatch(requestHideLoaderAction(screenName))
    this.navigateToNextStep();
    // this.prepareStepOneParams()
  }

  navigateToNextStep = () => {
    const stepOneParams = this.prepareStepOneParams();

    if(this.isProductType(PRODUCT_TYPES.SET_MATCHING)) {
      this.props.goToStepTwoSet(stepOneParams);
    } else {
      const categoryId = this.getCategoryFromIndex(this.state.categoryIndex).id;
      const sizeEav = this.state.eavGroupedByCategory[categoryId].find(e => e.attribute_slug === 'size')
      // console.log("[navigateToNextStep]", {sizeEav, categoryId})
      this.props.goToStepTwoCatalog(stepOneParams, sizeEav);
    }
  }

  // this function returns a (list of) params object
  // which will be required to send to server in step two
  prepareStepOneParams = () => {
    let params = {
      "title": this.isProductType(PRODUCT_TYPES.SET_MATCHING)? this.state.setName.text : this.state.productName.text,

      ...this.getBrandIdParam(),

      "category": this.getCategoryFromIndex(this.state.categoryIndex).id,

      ...this.getCatalogTypeParam(),

      ...this.getMultiSetTypeParam(),

      ...this.getPiecesParams(),

      "photoshoot_type": this.getPhotoshootFromIndex(this.state.photoshootIndex),

      ...(this.isProductType(PRODUCT_TYPES.SET_MATCHING)? {} : {"expiry_date": this.calculateExpiryDate()}),

      "eav": this.getEavParam(),

      ...this.getDispatchDateParam(),
    }
    return params;
  }

  getPiecesParams = () => {
    if(!this.isProductType(PRODUCT_TYPES.SET_MATCHING)) {
      return {}
    }

    return {
      price_per_design: this.state.pricePerNos.text,
      no_of_pcs_per_design: this.state.nosPerSet.text,
    }
  }

  getMultiSetTypeParam = () => {
    if(!this.isProductType(PRODUCT_TYPES.SET_MATCHING)) {
      return {}
    }

    const currentSetType = this.state.categorySetType[this.state.categoryTopIndex][this.state.categoryIndex]
    let setType = null;
    if(currentSetType === SET_TYPES.COLOR) {
      setType = 'color_set'
    } else if(currentSetType === SET_TYPES.SIZE) {
      setType = 'size_set'
    }
    if(!setType) {
      return {}
    }
    return {multi_set_type: setType}
  }

  getBrandIdParam = () => {
    if(this.state.brandIndex === 0) {
      return {}
    }
    return {brand: this.getBrandFromIndex(this.state.brandIndex).id}
  }

  getCatalogTypeParam = () => {
    if(!this.isProductType(PRODUCT_TYPES.CATALOG)) {
      return {catalog_type: 'noncatalog'}
    }
    return {}
  }

  getDispatchDateParam = () => {
    const dispatchDate = this.state.dispatchDate;
    if(this.isProductType(PRODUCT_TYPES.SET_MATCHING) || !dispatchDate) {
      return {}
    }

    const [year, month, date] = [dispatchDate.year, dispatchDate.month, dispatchDate.day]
    const dispatchDateString = formatDate(new Date(year, month, date), 'YYYY-MM-DD')
    // console.log("dispatchDate", dispatchDateString)
    return {
      "dispatch_date": dispatchDateString,
    }
  }

  getEavParam = () => {
    let params = {
      ...this.getFabricWorkStyleEavValues(),
      ...this.getEavInputValues(),
      ...this.getDynamicEavValues(),
      ...(this.state.otherDetails? {'other': this.state.otherDetails} : {}),
    }
    // console.log("[getEavParam] params", params)
    return params;
  }

  getFabricWorkStyleEavValues = () => {
    const eav = this.getCurrentDynamicEav().filter(e => ENUM_TYPES_ARRAY.includes(e.tag));
    if(!eav || eav.length === 0) {
      return {}
    }
    let eavParams = {}
    eav.forEach((item, index) => {
      const key = item.tag;
      const values = item.selected.map(({id, value}) => value)
      if(values.length > 0) {
        eavParams[key] = values;
      }
    })
    // console.log(eavParams);
    return eavParams;
  }

  getEavInputValues = () => {
    const eav = this.getCurrentDynamicEav().filter(e => EAV_TYPES_INPUT.includes(e.type));
    if(!eav || eav.length === 0) {
      return {}
    }
    let eavParams = {}
    eav.forEach((item, index) => {
      const value = item.input
      if(value) {
        eavParams[item.tag] = value + '';
      }
    })
    // console.log(eavParams);
    return eavParams;
  }

  getDynamicEavValues = () => {
    const eav = this.getCurrentDynamicEav().filter(e => 
      !PARTIAL_DYNAMIC_EAV.includes(e.tag) 
      && (this.isProductType(PRODUCT_TYPES.SET_MATCHING) || e.tag !== 'size')
    );
    if(!eav || eav.length === 0) {
      return {}
    }
    let eavParams = {}
    eav.forEach((item, index) => {
      const key = item.tag;
      const values = item.selected.map((i) => item.values[i].value)
      if(values.length > 0) {
        eavParams[key] = values;
      }
    })
    // console.log(eavParams);
    return eavParams;
  }

  isProductType = (selectedProductType) => {
    return this.state.productType === selectedProductType;
  }

  onProductTypeChange = (productType) => {
    // console.log("new brand value: ", this.props.responseBrands[this.state.brandIndex])
    // Adding the resetting of brandIndex here to make the behaviour same as Android
    const updatedBrandIndex = productType === PRODUCT_TYPES.CATALOG
      ? 1
      : 0;
    const updatedPhotoshootIndex = 
      productType === PRODUCT_TYPES.CATALOG? 0 : 
        productType === PRODUCT_TYPES.NON_CATALOG? 1 : 2
    this.setState({productType, brandIndex: updatedBrandIndex, photoshootIndex: updatedPhotoshootIndex})
  }

  onDispatchDateChange = (dispatchDate) => {
    const {year, month, day} = dispatchDate;
    this.setState({dispatchDate})
  }

  onExpiryPeriodChange = (text) => {
    this.setState({expiryPeriod: {text}});
  }

  calculateExpiryDate = () => {
    let expiryPeriod = parseInt(this.state.expiryPeriod.text);
    if(Number.isNaN(expiryPeriod)) {
      expiryPeriod = 30;
    }

    let expiryDate = new Date(new Date().getTime()+(expiryPeriod*24*60*60*1000));
    expiryDate = expiryDate.toISOString();
    return expiryDate;
  }

  /*
  returns responseFabric / responseWork / ...
  generally used to get the props by
  this.props.responseFabric
  whose format is [{id, value}, {id, value}, ...]
  */
  getResponseKey = (enumType) => {
    const key = 'response'+enumType
    return key;
  }

  /*
  returns selectedFabric / selectedWork / ...
  generally used to get the state selectedItems by
  this.state.selectedFabric
  whose format is [{id, value}, {id, value}, ...]
  */
  getSelectedItemsKey = (enumType) => {
    const key = 'selected'+enumType
    return key;
  }

  navigateToSearch = (params) => {
    const enumType = params.enumType;
    // console.log(this.getResponseKey(enumType));
    // console.log(this.props);
    // const enumData = this.props[this.getResponseKey(enumType)];
    const dynamicEav = this.getCurrentDynamicEav().find(e => e.tag === enumType)
    const enumData = dynamicEav.values;
    const selectedItems =  dynamicEav.selected;
    const onSelectedItemsChange = this.onSelectedItemsChange
    const radio = enumType === ENUM_TYPES.STYLE;
    const navParams = {
      enumType,               // one of ENUM_TYPES i.e. Fabric / Work / ... , needed for identification in callback
      enumData,               // the complete list to show in search [{id, value}, {id, value}]
      selectedItems,          // some subset of enumData which represents the selectedItems
      onSelectedItemsChange,  // this is a callback, it will be called when user presses save on the products search screen
      radio,                  // only 1 style has to be selected, therefore, the list must be rendered accordingly
    }
    // console.log(navParams);
    this.props.navigateToSearch(navParams)
  }

  onSelectedItemsChange = ({enumType, selectedItems}) => {
    const currentDynamicEav = this.getCurrentDynamicEav();
    const eavIndex = currentDynamicEav.findIndex(e => e.tag === enumType)
    let dynamicEavList = _.cloneDeep(currentDynamicEav);
    // console.log("dynamicEav", dynamicEavList)
    let dynamicEav = {...dynamicEavList[eavIndex], selected: selectedItems};
    // console.log("[onSelectedItemsChange]", {dynamicEav});

    const key = this.getCurrentDynamicEavKey();
    dynamicEavList[eavIndex] = dynamicEav;
    this.setState({[key]: dynamicEavList})
  }

  showToast = (message, duration=1000) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  populateCategorySetType = () => {
    // console.log("[populateCategorySetType]");
    const eavCategory = this.state.eavGroupedByCategory;
    const categories = this.state.responseCategories
    // console.log("[populateCategorySetType] eavCategory, categories", eavCategory, categories);
    const categoryItemMapper = (categoryItem, index) => {
      //console.log("categoryItemMapper: ", {categoryItem})
      const eavCategoryItem = eavCategory[categoryItem.id]
      if(!eavCategoryItem) {
        console.warn("[populateCategorySetType], mapping not found");
      }
      const found = eavCategoryItem && eavCategoryItem.find((eavItem) => eavItem.attribute_slug === 'size')
      const setType = found? SET_TYPES.SIZE : SET_TYPES.COLOR;
      return setType;
    }
    const categorySetType = categories.map((category, index) =>  {
      return category.map(categoryItemMapper)
    })
    // console.log("Setting category to set: ", categorySetType);
    this.setState({categorySetType})
  }

  getDefaultCategoryTopState = (responseCategoryTop) => {
    const defaultCategoryTopIndex = responseCategoryTop.findIndex((category) => category.id === DEFAULT_CATEGORY_TOP_ID)
    return {
      categoryTopIndex: defaultCategoryTopIndex,
      categoryTopData: responseCategoryTop.map((category) => category.category_name),
    }
  }

  initialize = async () => {
    this.props.dispatch(requestShowLoaderAction(screenName))
    const [[categoriesTop, categoriesChild, categoriesEav], myBrands] = await Promise.all([serverHelper.initializeCategories(), serverHelper.getMyBrands()])
    const categoryTopIndex = categoriesTop.findIndex((topCategory) => topCategory.id === DEFAULT_CATEGORY_TOP_ID)
    const eavGroupedByCategory = _.groupBy(categoriesEav, (i) => i.category)
    //console.log("[initialize] groupBy", eavGroupedByCategory)
    //console.log("[initialize] groupByKeys", Object.keys(eavGroupedByCategory))
    let updatedState = {
      categoryTopIndex,
      responseCategories: categoriesChild, // this is the top category indexed array of child categories
      eavGroupedByCategory,
    }

    this.setState(updatedState, () => {
      this.populateCategorySetType()
      this.fetchAndSetDynamicEavFromIndex(this.state.categoryIndex)
      this.props.dispatch(requestHideLoaderAction(screenName))
      // this.onContinuePress()
    })
  }

  constructor(props) {
    super(props);
    // const currentDate = new Date();
    this.yPos = {}
    this.state = {
      responseCategories: [[]], // this is the top category indexed array of child categories

      // the data

      // this stores one of the three product types
      productType: PRODUCT_TYPES.CATALOG,


      // this stores the index of the category
      // the category can then be retrieved from
      // responseCategories[selectedCategoryIndex], given the order
      // hasn't changed
      categoryIndex: 0,

      categoryTopIndex: 0,

      // this is an array which stores whether responseCategory[i]
      // is a size or a colour set
      categorySetType: [],

      // instead of storing the index here, we store the id
      // because depending on the product type selected, we
      // can have to show "No Brand" whose id will be set to -1
      // hence, while getting the params, using the id, it will be
      // easy to figure out if we need to send the brand or not
      brandIndex: 1,

      // same story as categoryIndex
      photoshootIndex: 0,

      // the product name, also stores error state
      productName: {
        text: '',
        // text: 'p'+(Math.floor(Math.random()*1000)), // DEBUG: Comment this
        error: null,
      },

      // the set name (called quality name), also stores error state
      setName: {
        text: '',
        // text: 's'+(Math.floor(Math.random()*1000)),
        error: null,
      },

      nosPerSet: {
        text: '',
        // text: '1',
        error: null,
      },

      pricePerNos: {
        text: '',
        // text: '111',
        error: null,
      },

      // selectedFabric: 'Art Silk,Brasso,Brocade'.split(',').map((item,index)=>({id:index+55, value:item})),
      // Fabric and work details
      // each item here has to be of the form:
      // {
      //   id: number (or any id)
      //   value: string
      // }
      selectedfabric: [],
      selectedwork: [],
      selectedstyle: [],

      otherDetails: '',

      // dispatchDate: {
        // year: currentDate.getFullYear(),
        // month: currentDate.getMonth(),
        // day: currentDate.getDate(),
      // },
      dispatchDate: null,
      expiryPeriod: {
        text: '30',
        error: null,
      }
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      //debugHelper.waitTillUserInfoIsFetched().then(() => {    // COMMENT THIS LINE
      this.initialize()
    //})                                                      // COMMENT THIS LINE
    });

    // this.props.dispatch(getUserDetailsAction())
  }

  render() {
    if(this.props.hide) {
      return null;
    }
    const testIds = this.props.testIds;
    const currentDynamicEav = this.getCurrentDynamicEav() || [];

    const currentDynamicEavByTag = _.groupBy(currentDynamicEav, 'tag')
    // console.log("currentdynamic eav group by", currentDynamicEavByTag)
    const fabricDynamicEav = _.get(currentDynamicEavByTag, ENUM_TYPES.FABRIC + '[0]')
    const workDynamicEav = _.get(currentDynamicEavByTag, ENUM_TYPES.WORK + '[0]')
    const styleDynamicEav = _.get(currentDynamicEavByTag, ENUM_TYPES.STYLE + '[0]')

    const eavInputs = currentDynamicEav.filter(e => [EAV_TYPES.INPUT_FLOAT, EAV_TYPES.INPUT_INT, EAV_TYPES.INPUT_TEXT].includes(e.type))
    // console.log("inputEavs", inputEavs)
    return(
      <Container style={{backgroundColor: colorresource.materialbg}}>
        <GenericHeader
          title={'Add Products'}
          leftConfig={{
            visible: true,
            icon: 'arrow-back',
            onPress: this.props.goBack,
            testId: testIds.back
          }}
        />
        <Content 
        keyboardDismissMode={'interactive'} 
        innerRef={this.registerContentRef} 
        keyboardShouldPersistTaps="handled" 
        enableResetScrollToCoords={false}
        >


          <View style={styles.AddProductsSection} onLayout={this.onItemNameLayout}>

            <RadioList
            data={[PRODUCT_TYPES.CATALOG, PRODUCT_TYPES.NON_CATALOG, PRODUCT_TYPES.SET_MATCHING]}
            selectedValue={this.state.productType}
            onValueChange={this.onProductTypeChange}
            heading={'Product Type'}
            testIds={[testIds.catalog, testIds.nonCatalog, testIds.setMatching]}
            />
            { this.isProductType(PRODUCT_TYPES.SET_MATCHING)?  
              <View>
                <PTextInput
                selectionColor={colorresource.liteblue}
                label={'Enter item name'}
                onChangeText={this.onSetNameChange}
                value={this.state.setName.text}
                error={this.state.setName.error}
                inputTestId={testIds.item}
                />
                <HelperText
                type={'error'}
                visible={!!this.state.setName.error}
                >{this.state.setName.error}</HelperText>
              </View>
            : null }

            {/* <CustomPicker
            title={'Select Top Category'}
            options={this.props.responseCategoryTop.map(top => top.category_name)}
            selectedIndex={this.state.categoryTopIndex}
            onChange={this.onCategoryTopChange}
            testId={testIds.top}
            /> */}

            <CustomPicker
            title={'Select Category'}
            options={this.state.responseCategories[this.state.categoryTopIndex].map(this.extractCategoryNameFromCategory)}
            selectedIndex={this.state.categoryIndex}
            onChange={this.onCategoryChange}
            testId={testIds.category}
            />

            <CustomPicker
            title={'Choose a brand'}
            options={this.props.responseBrands.map((item)=>item.name)}
            Hint={() =>
              <Text textDecorationLine='underline' style={styles.AddProductsHintText}>{'If your brand is not registered on Wishbook, then add it from '}
                <Text textDecorationLine='underline' style={styles.AddProductsHintLinkText} onPress={this.props.goToMyBrands}>{'here'}</Text>
              </Text>
            }
            selectedIndex={this.state.brandIndex}
            onChange={this.onBrandChange}
            hideFirst={this.isProductType(PRODUCT_TYPES.CATALOG)}
            testId={testIds.brand}
            />

            { this.isProductType(PRODUCT_TYPES.CATALOG)
              ? null
              : <CustomPicker
              title={'Select photoshoot type'}
              options={PHOTOSHOOT_STRINGS}
              selectedIndex={this.state.photoshootIndex}
              onChange={this.onPhotoshootChange}
              testId={testIds.photoshoot}
              />
            }




            { this.isProductType(PRODUCT_TYPES.SET_MATCHING)
              ? null
              : <View style={styles.AddProductsSubSection} onLayout={this.onProductNameLayout}>
                <PTextInput
                selectionColor={colorresource.liteblue}
                label="Enter Product Name"
                onChangeText={this.onProductNameChange}
                value={this.state.productName.text}
                {...testIds.name}
                error={this.state.productName.error}
                />
                <HelperText
                type={'error'}
                visible={!!this.state.productName.error}
                >
                  {this.state.productName.error}
                </HelperText>
              </View>
            }
          </View>







          <View style={styles.AddProductsSection} onLayout={this.onFabworkLayout}>
            <Text style={styles.AddProductsHeading}>Fabric & Work Details</Text>
            <CustomMultiSelect
              data={fabricDynamicEav}
              enumType={ENUM_TYPES.FABRIC}
              heading={formatStringFromServer(ENUM_TYPES.FABRIC) + ' Details:'}
              selectedItems={fabricDynamicEav && fabricDynamicEav.selected}
              onSelectedItemsChange={this.onSelectedItemsChange}
              onAdd={this.navigateToSearch}
              testId={testIds.fabric}
            />
            <CustomMultiSelect
              data={workDynamicEav}
              enumType={ENUM_TYPES.WORK}
              heading={formatStringFromServer(ENUM_TYPES.WORK) + ' Details:'}
              selectedItems={workDynamicEav && workDynamicEav.selected}
              onSelectedItemsChange={this.onSelectedItemsChange}
              onAdd={this.navigateToSearch}
              testId={testIds.work}
            />
            <CustomMultiSelect
              data={styleDynamicEav}
              enumType={ENUM_TYPES.STYLE}
              heading={formatStringFromServer(ENUM_TYPES.STYLE) + ' (Optional):'}
              selectedItems={styleDynamicEav && styleDynamicEav.selected}
              onSelectedItemsChange={this.onSelectedItemsChange}
              onAdd={this.navigateToSearch}
              testId={testIds.style}
            />
          </View>

          {eavInputs.length?
            <View style={styles.AddProductsSection} onLayout={this.onEavInputLayout}>
              <Text style={[styles.AddProductsSubHeading, {marginBottom: 10}]}>Please enter the material length (in meters)</Text>
              {currentDynamicEav.map((item, index) => {
                if(![EAV_TYPES.INPUT_FLOAT, EAV_TYPES.INPUT_INT, EAV_TYPES.INPUT_TEXT].includes(item.type)) {
                  return null;
                }
                return (
                  <EavInput
                  key={index}
                  data={item}
                  name={item.name}
                  index={index}
                  input={item.input}
                  onTextChange={this.onEavInputChange}
                  unit={item.unit}
                  numeric={item.type !== EAV_TYPES.INPUT_TEXT}
                  />
                );
              })}
            </View>
          : null}

          <View style={styles.AddProductsSection} onLayout={this.onDynamicEavLayout}>
            {currentDynamicEav && currentDynamicEav.map((eav, index) => {
              if(PARTIAL_DYNAMIC_EAV.includes(eav.tag) || (!this.isProductType(PRODUCT_TYPES.SET_MATCHING) && eav.tag === 'size')) {
                return null;
              }
              const nameList = eav.values.map((eavItem) => eavItem.value)
              const isRadio = eav.type === EAV_TYPES.RADIO;
              // eav represents the eav object which was constructed after
              // fetching all eavs from the server for a particular category
              if(isRadio) {
                const currentlySelectedIndex = eav.selected[0];
                return (
                  <RadioList
                  key={index}
                  data={nameList}
                  selectedValue={nameList[currentlySelectedIndex]}
                  onValueChange={(val) => {this.onDynamicEavChange({id: index, index: nameList.indexOf(val)})}}
                  heading={eav.name}
                  />
                );
              }

              return (
                <CheckboxFlex
                key={index}
                data={nameList}
                onValueChange={(i) => {this.onDynamicEavChange({id: index, index: i})}}
                heading={eav.name}
                selected={eav.selected}
                />
              );
            })}
            <View style={styles.AddProductsSubSection}>
              <PTextInput
              label={'Other Details'}
              onChangeText={this.onOtherDetailsChange}
              value={this.state.otherDetails}
              {...testIds.other}
              />
              <HelperText>{'Optional'}</HelperText>
          </View>
        </View>


          {/* <OtherDetails
          eav={this.getCurrentDynamicEav()}
          onOtherDetailsChange={this.onOtherDetailsChange}
          onMultiEavChange={this.onDynamicEavChange}
          /> */}

          <View style={styles.AddProductsSection} onLayout={this.onLastSectionLayout}>
            {this.isProductType(PRODUCT_TYPES.SET_MATCHING)
            ? <View style={styles.AddProductsSubSection}>
            
                <PTextInput
                label={'No. of Pcs./set'}
                onChangeText={this.onNosPerSetChange}
                value={this.state.nosPerSet.text}
                error={this.state.nosPerSet.error}
                keyboardType={'number-pad'}
                selectionColor={colorresource.liteblue}
                maxLength={4}
                {...testIds.noOfPcsPerSet}
                />
                <HelperText type={'error'} visible={!!this.state.nosPerSet.error}>
                  {this.state.nosPerSet.error}
                </HelperText>

                <PTextInput
                style={{marginTop: 10}}
                label={'Price/Pc.'}
                onChangeText={this.onPricePerNosChange}
                value={this.state.pricePerNos.text}
                error={this.state.pricePerNos.error}
                selectionColor={colorresource.liteblue}
                keyboardType={'number-pad'}
                maxLength={5}
                {...testIds.pricePerPc}
                />
                <HelperText type={'error'} visible={!!this.state.pricePerNos.error}>
                  {this.state.pricePerNos.error}
                </HelperText>

              </View>
            : <ProductAvailability
              dispatchDate={this.state.dispatchDate}
              onDispatchDateChange={this.onDispatchDateChange}
              expiryPeriod={this.state.expiryPeriod}
              onExpiryPeriodChange={this.onExpiryPeriodChange}
              testIds={{live: testIds.live, date: testIds.date}}
              />
            }
          </View>

        </Content>

        <Footer style={{/*borderWidth: 1, borderColor: 'black'*/}}>
          <FooterTab style={{}}>
            <Button full style={{backgroundColor: colorresource.liteblue}} onPress={this.onContinuePress} {...testIds.continue}>
              <Text style={{marginTop: 5, color: 'white', fontSize: 17, lineHeight: 17}}>Save & Continue</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}

const AddNoBrand = (brands) => [{name: 'No Brand', id: NO_BRAND_ID}, ...brands]

const mapStateToProps = (state) => {

  return {
    responseCategory:         state.categoryR.responseCategory,
    responseBrands:           AddNoBrand(state.brandsR.responseBrands),
    responseFabric:           state.enumgroupR.responseFabrics,
    responseWork:             state.enumgroupR.responseWorks,
    responseStyle:            state.enumgroupR.responseStyles,
    responseCategoryEvp:      state.masterListR.responseCategoryEvp,
    responseCategoryTop:      state.categoryR.responseGetCategoryTop,
    responseEavCategory:      state.categoryR.responseCategoryEav,
  };
};

export default connect(mapStateToProps)(Step1);

/*
(09:37:05  IST) Bhavik Gandhi:
==========Catalog  ================
3--->catalog add ---> catalog opetion ----> for loop product add

Catalog/NonCatalog Upload URL :
coverpage parameter name : thumbnail
 COMPANY_URL = APP_URL + "/api/v1/companies/" + company_id + "/catalogs/";
                return COMPANY_URL;
Method: Multitype (FileUpload)

Catalog Upload Option :
Mthod : Post
  case "catalogs_upload_option":
                //ADDCATALOG
                COMPANY_URL = APP_URL + "/api/v1/catalog-upload-options/";
                return COMPANY_URL;

Post Product:

   case "productsonly":
                //ADDPRODUCT or GETPRODUCTSBYCAT
                COMPANY_URL = APP_URL + "/api/v2/products/";
                return COMPANY_URL;

=====Set Matching ============
3---->Catalog add ----> for loop product add ---->for loop product photos add
(09:52:35  IST) Bhavik Gandhi:

=====Set Matching ============
3---->Catalog add ----> for loop product add ---->for loop product photos add

     case "products_photos":
                COMPANY_URL = APP_URL + "/api/v2/products-photos/";
                return COMPANY_URL;
*/
