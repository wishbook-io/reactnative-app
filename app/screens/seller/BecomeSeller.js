import React, { Component } from 'react';
import { 
  Alert,
  TextInput,
  Image,
  FlatList,
  Keyboard
} from 'react-native';
import { 
  View,
  Container,
  Content, 
  Title, 
  Button, 
  Footer,
  FooterTab,
  Text,
} from "native-base";
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet'
import _ from 'lodash'

import GenericHeader from 'app/components/Header/GenericHeader'
import Radio from 'app/components/Radio/Radio';
import CatalogLive from 'app/screens/products/CatalogLive';
import SinglePieceMarkup from './SinglePieceMarkup'
import ChooseSizes from './ChooseSizes';
import { SizeItem } from 'app/screens/cart/SizedMultiSelectionItem'
import { colorresource } from 'app/resources/colorresource';

import { sendBecomeSellerCatalogAction, bulkUpdateStartStopAction } from 'app/actions/catalog-actions'
import { getCategoryEavAction } from 'app/actions/category-actions'
import { showToastAction } from 'app/actions/toast-actions'
import { goBack } from 'app/actions/navigation-actions';

import { TestIdGenerator } from 'app/utils/TestingHelper';
import SinglePieceItem from './SinglePieceItem';
const buttonIdGenerator = TestIdGenerator("BecomeSeller", '', "Button")

const MAX_MARGIN_PERCENT = 10
const MIN_MARGIN_VALUE = 60
const SIZE_ITEM_FULL_CATALOG_INDEX = 'SIZE_ITEM_FULL_CATALOG_INDEX'

class BecomeSeller extends Component {

  getSystemSizes = () => {
    const categoryId = this.props.catalogDetails.category
    const sizeEav = this.props.cacheSizeEavForCategory[categoryId]
    if(!sizeEav) {
      console.warn("Requesting system sizes for unknown category")
      return;
    }
    return sizeEav
  }

  isStartStop = () => {
    const startStop = this.props.navigation.getParam('startStop', false)
    return !!startStop
  }

  scrollToTop = () => {
    if(this.contentRef) {
      this.contentRef.scrollTo({x: 0, y: 0, animatedTrue: true})
    }
  }

  registerContentRef = (r) => {
    this.contentRef = r;
  }

  validateSize = () => {
    if(!this.sizeMandatory) {
      return
    }
    if(this.state.radioFullOnly) {
      if(this.state.fullCatalogSizes.length === 0) {
        return "Please select atleast one size";
      }
    } else {
      const sizes = this.state.itemsSizes;
      const selling = this.state.itemsSelling;
      const firstEmptyIndex = selling.findIndex(
        (s, i) => s && (!sizes[i] || sizes[i].length === 0)
      )
      if(firstEmptyIndex !== -1) {
        return "Please select atleast one size in every design"
      }
    }
  }

  validateSelling = () => {
    if(this.state.radioFullOnly) {
      return;
    }
    const firstSellingProduct = this.state.itemsSelling.find(i => i === true)
    if(!firstSellingProduct) {
      return "Please select atleast one product to sell"
    }
  }

  validateMargin = () => {
    if(this.state.radioFullOnly) {
      return
    }
    let margin = this.state.margin.text
    margin = Number.parseInt(margin)
    if(Number.isNaN(margin)) {
      return {margin: {text: '', error: 'Please set a valid margin for single Pcs'}}
    }

    const catalogPrice = Number.parseInt(this.props.catalogDetails.price_range)
    const maxMarginAllowed = Math.max(catalogPrice*MAX_MARGIN_PERCENT/100, MIN_MARGIN_VALUE)
    let maxPercentageAllowed = MAX_MARGIN_PERCENT;
    if(maxMarginAllowed === MIN_MARGIN_VALUE) {
      maxPercentageAllowed = MIN_MARGIN_VALUE*100/catalogPrice
    }

    // console.log("[validateMargin]", {catalogPrice, maxMarginAllowed, maxPercentageAllowed})

    if(this.state.marginTypePercent && margin > maxPercentageAllowed) {
      return {margin: {text: margin + '', error: 'Margin percentage must be <= ' + maxPercentageAllowed + '%'}}
    }

    if(!this.state.marginTypePercent && margin > maxMarginAllowed) {
      return {margin: {text: margin + '', error: 'Margin amount must be <= ₹' + maxMarginAllowed}}
    }
  }

  validateLiveText = () => {
    const text = this.state.live.text;
    // console.log("[validateLiveText]", {text})
    const value = parseInt(text);
    let error = null;
    if(Number.isNaN(value)) {
      error = "Duration can't be empty"
      value = ''
    } else if(value < 10) {
      error = "Minimum enable duration should be 10"
    } else if(value > 90) {
      error = "Maximum enable duration should be 90"
    }
    if(error) {
      return {live: {text: value + '', error}}
    }
  }

  calculateExpiryDate = () => {
    let expiryPeriod = parseInt(this.state.live.text);
    if(Number.isNaN(expiryPeriod)) {
      console.warn("[calculateExpiryDate], live text invalid number")
      expiryPeriod = 30;
    }

    let expiryDate = new Date(new Date().getTime()+(expiryPeriod*24*60*60*1000));
    expiryDate = expiryDate.toISOString();
    return expiryDate;
  }

  getAvailableSizes = (selectedSizeIndices) => {
    if(!selectedSizeIndices) {
      return ''
    }
    const selectedSizes = selectedSizeIndices.sort((a,b) => a-b)
    const sizes = selectedSizes.map(s => this.state.sizeValues[s]).join(',')
    return sizes;
  }

  onBulkUpdateDone = () => {
    goBack()
  }

  onCatalogSellerAdded = () => {
    if(this.state.radioFullOnly && this.state.sizeValues.length === 0) {
      // nothing to do here when we are becoming a seller of 
      // full catalog with no size
      goBack();
      return;
    }

    let products;
    if(this.state.radioFullOnly) {
      const available_sizes = this.getAvailableSizes(this.state.fullCatalogSizes)
      products = [{
        product_id: this.props.catalogDetails.id,
        available_sizes,
        is_enable: !!available_sizes
      }]
    } else {
      products = this.props.catalogDetails.products.map((p, i) => {
        const available_sizes = this.getAvailableSizes(this.state.itemsSizes[i])
        return {
          is_enable: !!this.state.itemsSelling[i],
          available_sizes,
          product_id: p.id
        }
      })
    }

    const params = {
      products,
    }
    console.log("[onCatalogSellerAdded]", params)
    this.props.dispatch(bulkUpdateStartStopAction(params))

  }

  postCatalogSeller = () => {
    const marginParam = this.state.marginTypePercent? 'single_piece_price_percentage' : 'single_piece_price_fix'
    const marginValue = this.state.margin.text
    const params = {
      add_brand: this.props.catalogDetails.brand.id,
      sell_full_catalog: this.state.radioFullOnly,
      expiry_date: this.calculateExpiryDate(),
      catalog: this.props.catalogDetails.catalog_id,
      ...(this.state.radioFullOnly? {} : {[marginParam]: marginValue})
    }

    this.props.dispatch(sendBecomeSellerCatalogAction(params, this.props.catalogDetails.id));
    // this.onCatalogSellerAdded()
  }

  onDonePress = () => {
    Keyboard.dismiss();
    let updatedState = {}

    let validationError = this.validateLiveText()
    if(validationError) {
      updatedState = {...updatedState, ...validationError}
    }

    validationError = this.validateMargin()
    if(validationError) {
      updatedState = {...updatedState, ...validationError}
    }
    
    if(Object.keys(updatedState).length !== 0) {
      this.setState(updatedState)
      this.scrollToTop();
      return;
    }
    // return;

    validationError = this.validateSelling()
    if(validationError) {
      this.props.dispatch(showToastAction(validationError))
      return;
    }

    validationError = this.validateSize()
    if(validationError) {
      this.props.dispatch(showToastAction(validationError))
      return;
    }

    this.postCatalogSeller()
  }

  onItemsSellingPress = (index) => {
    let itemsSelling = _.cloneDeep(this.state.itemsSelling);
    itemsSelling[index] = !itemsSelling[index];
    this.setState({itemsSelling})
  }

  onItemsCheckBoxPress = (index, subIndex) => {
    //console.log("[onItemsCheckBoxPress]", { index, subIndex, selected });
    let selected = _.cloneDeep(this.state.itemsSizes)
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
    this.setState({itemsSizes: selected})
  }

  itemSeparator = () => {
    return (
      <View style={{width: '100%', height: EStyleSheet.hairlineWidth, backgroundColor: colorresource.divider}}/>
    )
  }

  keyExtractor = (item, index) => {
    return item.id.toString()
  }

  renderItem = ({item, index}) => {
    return (
      <SinglePieceItem
      data={item}
      sizes={this.state.sizeValues}
      index={index}
      onCheckBoxPress={this.onItemsCheckBoxPress}
      onSellingPress={this.onItemsSellingPress}
      selling={this.state.itemsSelling[index]}
      selectedSizes={this.state.itemsSizes[index]}
      />
    )
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

  onFullCatalogCheckBoxPress = (subIndex) => {
    // console.log("[onFullCatalogCheckBoxPress] index, subIndex", {index, subIndex})
    const selected = this.getUpdatedSelectedArray(this.state.fullCatalogSizes, subIndex)
    this.setState({fullCatalogSizes: selected})
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

  onFullCatalogRadioPress = () => {
    const updatedState = {
      radioFullOnly: true,
    }
    this.setState(updatedState);
  }

  onSingleAndBothRadioPress = () => {
    const updatedState = {
      radioFullOnly: false,
    }
    this.setState(updatedState);
  }
  
  sellCatalog = () =>{
      var params={};
      const productId = this.props.catalogDetails.id;
      if(this.state.sell_full_catalog){
        // params["sell_full_catalog"]=this.state.sell_full_catalog;
        // params["expiry_date"]=this.state.expiry_date;
        // params["catalog"]=this.props.catalogDetails.catalog_id;
        // params["add_brand"]=this.props.catalogDetails.brand.id;
        this.props.dispatch(sendBecomeSellerCatalogAction(params, productId));
        this.props.onPress()
      }
      else if (this.props.catalogDetails.single_piece_price!==null||this.props.catalogDetails.single_piece_price_percentage!==null)
      {
        // params["sell_full_catalog"]=this.state.sell_full_catalog;
        // params["expiry_date"]=this.state.expiry_date;
        // params["catalog"]=this.props.catalogDetails.catalog_id;
        // params["add_brand"]=this.props.catalogDetails.brand.id;
        this.props.dispatch(sendBecomeSellerCatalogAction(params, productId));
        this.props.onPress()
      }
      else{
        // params["sell_full_catalog"]=this.state.sell_full_catalog;
        // params["expiry_date"]=this.state.expiry_date;
        // params["catalog"]=this.props.catalogDetails.catalog_id;
        // params["add_brand"]=this.props.catalogDetails.brand.id;
        this.state.price_set_percent?
        params["single_piece_price_percentage"]=this.state.single_piece_price_percentage
        :
        params["single_piece_price"]=this.state.single_piece_price
        this.props.dispatch(sendBecomeSellerCatalogAction(params, productId));
        this.props.onPress()
      }
  }
  
  onLiveTextChange = (text) => {
    this.setState({live: {text,}})
  }

  onCategoryEavFetched = (categoryEav) => {
    if(categoryEav.length) {
      const sizeEav = categoryEav[0]
      this.sizeMandatory = sizeEav.is_required // this will be needed in validation
      const sizeValues = sizeEav.attribute_values.map(a => a.value)
      this.setState({sizeValues})
    }
  }

  fetchEavForCategory = () => {
    const categoryId = this.props.catalogDetails.category
    const eavSize = this.props.cacheSizeEavForCategory[categoryId]
    if(eavSize) {
      this.onCategoryEavFetched(eavSize)
    } else {
      this.props.dispatch(getCategoryEavAction(categoryId, 'size'))
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      live: {text: '30'},
      radioFullOnly: true,
      marginTypePercent: true,
      margin: {text: ''},
      sizeValues: [],
      fullCatalogSizes: [],
      itemsSelling: [],
      itemsSizes: [],
    }

    this.sizeMandatory = false;
  }

  componentDidMount() {
    this.fetchEavForCategory()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.responseCategoryEav !== this.props.responseCategoryEav) {
      this.onCategoryEavFetched(this.props.responseCategoryEav)
    }
    if(prevProps.responseBecomeSellerCatalog !== this.props.responseBecomeSellerCatalog) {
      this.onCatalogSellerAdded()
    }
    if(prevProps.responseBulkUpdateStartStop !== this.props.responseBulkUpdateStartStop) {
      this.onBulkUpdateDone()
    }
  }
  
  render() {
    return (
      <Container>
        <GenericHeader 
        title={'Become a Seller'}
        leftConfig={{
          visible: true,
          icon: 'close',
          onPress: goBack
        }}
        />
        <Content style={{padding: 16}} innerRef={this.registerContentRef}>
            <View style={{marginBottom: 10}}>
              <Text style={{color:colorresource.liteblue, fontSize: 16}}>Catalog Duration</Text>
          </View>

          <CatalogLive
          onTextChange={this.onLiveTextChange}
          leadingText={'Your catalog will be visible for'}
          text={this.state.live.text}
          errorText={this.state.live.error}
          />

          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 5}}>
            <Text style={styles.heading}>How would you like to sell catalog </Text>
          </View>

          <View style = {{flexDirection: 'row', alignItems: 'center'}}>
            <Radio  selected={this.state.radioFullOnly} onPress={this.onFullCatalogRadioPress}/>
            <Text style={{marginLeft: 10}}>Full catalog only</Text>
          </View>

          <View style = {{flexDirection: 'row', alignItems: 'center'}}>
            <Radio selected={!this.state.radioFullOnly}  onPress={this.onSingleAndBothRadioPress}/>
            <Text style={{marginLeft: 10}}>Single pieces and full catalog both</Text>
          </View>

          <SinglePieceMarkup
          marginTypePercent={this.state.marginTypePercent}
          onMarginTypeFixedPress={this.onMarginTypeFixedPress}
          onMarginTypePercentPress={this.onMarginTypePercentPress}
          marginText={this.state.margin.text}
          marginError={this.state.margin.error}
          onMarginChange={this.onMarginChange}
          hide={this.state.radioFullOnly}
          />

          <ChooseSizes
          onCheckBoxPress={this.onFullCatalogCheckBoxPress}
          index={-1}
          sizes={this.state.sizeValues}
          selected={this.state.fullCatalogSizes}
          hide={!this.state.radioFullOnly}
          />

          {this.state.radioFullOnly? null : 
            <FlatList
              contentContainerStyle={{paddingBottom: 16}}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              data={this.props.catalogDetails.products}
              extraData={[this.state.itemsSelling, this.state.itemsSizes]}
              ItemSeparatorComponent={this.itemSeparator}
            />
          }
          
        </Content>
        <Footer>
          <FooterTab>
            <Button {...buttonIdGenerator("Done")} style={{backgroundColor: colorresource.liteblue}} onPress={this.onDonePress}>
              <Text style={{color: 'white', fontSize: 16}}>DONE</Text>
            </Button>
          </FooterTab>
        </Footer>    
      </Container>
    );
  }
}
  
const mapStateToProps = (state) => {
  return {
    catalogDetails: state.catalogR.responseCatalogDetails,
    responseCategoryEav: state.categoryR.responseCategoryEav,
    cacheSizeEavForCategory: state.categoryR.cacheSizeEavForCategory,
    responseBecomeSellerCatalog: state.catalogR.responseBecomeSellerCatalog,
    responseBulkUpdateStartStop: state.catalogR.responseBulkUpdateStartStop,
  };
};

export default connect(mapStateToProps)(BecomeSeller);

const styles = EStyleSheet.create({
  heading: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: colorresource.liteblack
  }
})