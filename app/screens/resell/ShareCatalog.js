import React, { Component } from 'react';
import { View, Clipboard, Image, TouchableOpacity, Keyboard } from 'react-native';
import { 
  Container,
  Content,
  Text,
  Icon,
  Footer,
} from 'native-base';
import { Button as PButton } from 'react-native-paper';
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet';

import GenericHeader from 'app/components/Header/GenericHeader';
import TextInputKeyed from 'app/components/MaterialTextInput/TextInputKeyed'
import ShareCatalogItem from './ShareCatalogItem';
import Sharer, { SHARE_TYPE } from 'app/utils/Sharer';
import { formatCatalogDetails } from 'app/screens/products/formatHelper'
import { colorresource } from 'app/resources/colorresource';

import { goBack } from 'app/actions/navigation-actions';
import { showToastAction } from 'app/actions/toast-actions';
import { startSharingAction } from 'app/actions/catalog-actions'

class ShareCatalog extends Component {

  onShareItemPressCallback = (sharedOn) => {
    this.postStartSharing(sharedOn)
  }

  validate = () => {
    Keyboard.dismiss()
    
    if(this.isSinglePcAvailable() && Object.keys(this.state.selectedCatalog).length === 0) {
      this.props.dispatch(showToastAction("Please select atleast one product"))
      return false;
    }

    const error = this.validateResalePrice()
    if(error) {
      this.setState(error)
      return false;
    }
    
    return true;
  }

  getSharableProducts = () => {
    const singlePc = this.isSinglePcAvailable()
    if(singlePc) {
      return this.getSinglePcSelectedProducts()
    }
    return this.getDisplayableProducts()
  }

  startSharingPosted = () => {
    if(!this.sharedOn) {
      console.warn("[onSharePress] sharedOn mode unavailable")
      return;
    }
    if(!this.sharerRef) {
      console.warn("[onSharePress] ref unavailable")
      return;
    }
    if(this.sharedOn === SHARE_TYPE.WHATSAPP) {
      this.sharerRef.shareVia(SHARE_TYPE.WHATSAPP, this.getSharableProducts())
    }
  }

  registerSharerRef = (ref) => {
    this.sharerRef = ref && ref.getWrappedInstance()
  }

  postStartSharing = (sharedOn, loading) => {
    this.sharedOn = sharedOn
    const params = this.prepareParams(sharedOn)
    this.props.dispatch(startSharingAction(params, loading))
  }

  onShareOthersPress = () => {
    const isValid = this.validate()
    if(!isValid) {
      return;
    }

    if(!this.sharerRef) {
      console.warn("[onSharePress] ref unavailable")
      return;
    }

    this.sharerRef.onOpen({onShareItemPressCallback: this.onShareItemPressCallback})
  }

  onShareOnWhatsAppPress = () => {
    const isValid = this.validate()
    if(!isValid) {
      return;
    }

    if(!this.sharerRef) {
      console.warn("[onSharePress] ref unavailable")
      return;
    }

    this.postStartSharing(SHARE_TYPE.WHATSAPP, true)
  }

  prepareParams = (sharedOn) => {
    // returns an object of {products: []}
    const singlePcAvailable = this.isSinglePcAvailable()
    const params = {
      shared_on: sharedOn,
      resell_price: this.state.resalePrice.text,
      sell_full_catalog: !singlePcAvailable,
      actual_price: '' + this.avgTotal,
    }
    let selectedProducts = singlePcAvailable? this.getSinglePcSelectedProducts() : [this.getCatalogData()]
    const products = selectedProducts.map(product => ({
      ...params,
      product_id: product.id,
    }))

    return {
      products,
    }
  }

  isSetMatching = (catalogData) => {
    const set = catalogData.product_type === 'set'
    return set
  }

  getDisplayableProducts = () => {
    const catalogData = this.getCatalogData()
    if(this.isSetMatching(catalogData)) {
      return catalogData.photos
    } else if(this.isSingleView()) {
      return [catalogData]
    } 
    else {
      return catalogData.products
    }
  }

  getSinglePcSelectedProducts = () => {
    const indices = Object.keys(this.state.selectedCatalog)
    const data = this.getCatalogData()
    // if(this.isSingleView()) {
    //   return [this.props.singleData]
    // }
    const selected = indices.map((index) => data.products[Number.parseInt(index)])
    return selected
  }

  isSinglePcAvailable = () => {
    return !this.isFullCatalog()
  }

  isFullCatalog = () => {
    const data = this.getCatalogData();
    const isFull = data.full_catalog_orders_only
    return !!isFull
  }

  getPriceBreakup = () => {
    let { 
      avgPrice = 0,
      avgTax = 0,
      avgShipping = 0,
      avgTotal = 0
    } = {}
    const data = this.getCatalogData()
    const isSingle = data.product_type === 'single';
    const isSet = data.product_type === 'set'
    const isCatOrNonCat = !isSingle && !isSet
    const isFull = this.isFullCatalog()
    const selectedProducts = isFull? data.products : this.getSinglePcSelectedProducts()
    const productCount = selectedProducts.length

    if(isCatOrNonCat && isFull) {
      // console.log("[getPriceBreakup] cat/noncat, full" )
      let productsPrice = 0, productsPriceWithGst = 0
      selectedProducts.forEach(product => {
        productsPrice += Number.parseFloat(product.final_price)
        productsPriceWithGst += Number.parseFloat(product.public_price_with_gst)
      })

      const totalShippingCharges = data.shipping_charges
      avgTotal = (productsPriceWithGst + totalShippingCharges)/productCount
      avgPrice = productsPrice/productCount
      avgTax = (productsPriceWithGst - productsPrice)/productCount
      avgShipping = totalShippingCharges/productCount
    } 
    
    else if(isCatOrNonCat && !isFull) {
      // console.log("[getPriceBreakup] cat/noncat, not full", {selectedProducts})
      // selling single pieces
      let productsPrice = 0, productsPriceWithGst = 0, productsShippingCharges = 0
      selectedProducts.forEach(product => {
        // console.log("[getPriceBreakup] forEach", {product})
        productsPrice += product.single_piece_price;
        productsPriceWithGst += product.single_piece_price_with_gst;
        productsShippingCharges += product.shipping_charges2
        
      })
      avgTotal = (productsPriceWithGst + productsShippingCharges)/productCount
      avgPrice = productsPrice/productCount
      avgTax = (productsPriceWithGst - productsPrice)/productCount
      avgShipping = productsShippingCharges/productCount
    }

    else if(isSingle) {
      // singles view
      // console.log("[getPriceBreakup] singles view" )
      const pricePerDesignWithGst = Number.parseFloat(data.price_per_design_with_gst)
      const shippingCharges = Number.parseFloat(data.shipping_charges)
      const singlePiecePrice = Number.parseFloat(data.single_piece_price)
      avgTotal = pricePerDesignWithGst + shippingCharges
      if(('' + data.single_piece_price_range).includes('-')) {
        avgPrice = singlePiecePrice
      } else {
        avgPrice = Number.parseFloat(data.single_piece_price_range)
      }
      avgTax = pricePerDesignWithGst - avgPrice
      avgShipping = shippingCharges
      // console.log("[getPriceBreakup] singles view", {avgPrice, avgTax, avgShipping, avgTotal})
    }

    else {
      // set matching
      // console.log("[getPriceBreakup] set matching" )
      const pricePerDesign = Number.parseFloat(data.price_per_design)
      const pricePerDesignWithGst = Number.parseFloat(data.price_per_design_with_gst)
      const noOfPcsPerDesign = Number.parseFloat(data.no_of_pcs_per_design)
      const shippingCharges = Number.parseFloat(data.shipping_charges)

      avgPrice = pricePerDesign
      avgTax = pricePerDesignWithGst - pricePerDesign
      avgShipping = shippingCharges / noOfPcsPerDesign
      avgTotal = pricePerDesignWithGst * noOfPcsPerDesign + shippingCharges

    }
    this.avgTotal = avgTotal
    return { 
      avgPrice: this.formatNumber(avgPrice),
      avgTax: this.formatNumber(avgTax), 
      avgShipping: this.formatNumber(avgShipping), 
      avgTotal: this.formatNumber(avgTotal),
    }
  }

  formatNumber = (num) => {
    // console.log("[formatNumber]", {num})
    return Number.isNaN(num)? '' : num.toFixed(1).replace(/\.0/, '')
  }

  onImagePress = (index) => {
    console.log("[onImagePress]", { index })
    const selectedCatalog = {...this.state.selectedCatalog}
    if(selectedCatalog[index]) {
      delete selectedCatalog[index]
    } else {
      const catalogData = this.getCatalogData()
      selectedCatalog[index] = true
    }
    this.setState({selectedCatalog})
  }

  isSingleView = () => {
    const singleView = this.props.navigation.getParam('isSingleView', false)
    return singleView
  }

  getCatalogData = () => {
    if(this.isSingleView()) {
      return this.props.singleData;
    }
    return this.props.catalogData;
  }

  validateResalePrice = () => {
    const data = this.getCatalogData();
    const resalePriceText = this.state.resalePrice.text
    const resalePrice = Number.parseFloat(resalePriceText)
    const catalogPrice = Number.parseFloat(this.avgTotal);
    console.log("[validateResalePrice]", {resalePrice, catalogPrice})
    let error
    if(!resalePriceText || Number.isNaN(resalePrice)) {
      error = 'Please enter a valid resale price'
    } else if(resalePrice <= catalogPrice) {
      error = 'Resale price should be greater than '+ catalogPrice
    }
    if(error) {
      return {resalePrice: {text: resalePriceText, error,}}
    }
  }

  isResalePriceValid = () => {
    const catalogPrice = Number.parseFloat(this.avgTotal);
    if(!catalogPrice) {
      return false
    }
    const validation = this.validateResalePrice();
    return !validation
  }

  onCopyDetailsPress = () => {
    const isValid = this.validate()
    if(!isValid) {
      return;
    }
    const text = formatCatalogDetails(this.getCatalogData(), this.state.resalePrice.text)
    Clipboard.setString(text);
    this.props.dispatch(showToastAction('Product description copied to Clipboard'))
  }

  onResalePriceChange = (text) => {
    let value = text.trim().replace(/[^0-9.]/g, '');
    if(value !== this.state.resalePrice.text) {
      this.setState({resalePrice: {text}})
    }
  }

  constructor(props) {
    super(props)

    let selectedCatalog = {}
    if(this.isSinglePcAvailable()) {
      const length = this.getCatalogData().products.length
      Array.from({length}, (item, index) => selectedCatalog[index] = true)
    }
    this.state = {
      resalePrice: {text: '', error: ''},
      selectedCatalog,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.responseStartSharing !== this.props.responseStartSharing) {
      this.startSharingPosted()
    }
  }
  
  render() {
    const catalogData = this.getCatalogData()
    const catalogTitle = catalogData.title;
    const { 
      avgPrice, 
      avgTax, 
      avgShipping, 
      avgTotal
    } = this.getPriceBreakup()
    // console.log("[ShareCatalog:render]", { avgTotal })
    const singlePcAvailable = this.isSinglePcAvailable();
    const products = this.getDisplayableProducts()
    return (
      <Container>
        <GenericHeader
          leftConfig={{
            icon: 'close',
            onPress: goBack,
            visible: true,
            testId: {},
          }}
          title={'Share ' + catalogTitle}
        />
        <Content contentContainerStyle={{paddingVertical: 20, paddingHorizontal: 8, }}>

          <View style={styles.infoParent}>
            <View style={styles.infoLabel}>
              <Text style={styles.infoLabelText}>Avg Price/Piece:</Text>
            </View>
            <View style={styles.infoValue}>
              <Text style={styles.infoLabelText}>
                {`₹${avgPrice} + ₹${avgTax} (tax) + ₹${avgShipping} (shipping)`}
              </Text>
              <Text style={styles.avgTotalText}>
                {`= ₹${avgTotal}`}
              </Text>
            </View>
          </View>

          <View style={styles.infoParent}>
            <View style={styles.infoLabel}>
              <Text style={styles.infoLabelText}>Resale Price:</Text>
            </View>
            <View style={styles.infoValue}>
              <TextInputKeyed
                label={'Resale price'}
                onChange={this.onResalePriceChange}
                value={this.state.resalePrice.text}
                error={this.state.resalePrice.error}
                hideEmptyHelper={true}
                textInputProps={{
                  keyboardType: 'numeric',
                  maxLength: 6,
                }}
              />
            </View>
          </View>

          <View style={styles.infoParent}>
            <View style={styles.infoLabel}>
              <Text style={styles.infoLabelText}>Availability:</Text>
            </View>
            <View style={styles.infoValue}>
              <Text style={singlePcAvailable? styles.singlePcText : styles.fullCatalogText}>
                {singlePcAvailable? 'Single Pcs.' : 'Full Catalog only'}
              </Text>
            </View>
          </View>

          <View style={styles.infoParent}>
            <View style={styles.infoLabel}/>
            <View style={styles.infoValue}>
              <PButton
                icon='content-copy'
                mode='outlined'
                uppercase={false}
                style={{marginRight: 'auto'}}
                disabled={!this.isResalePriceValid()}
                onPress={this.onCopyDetailsPress}
              >
                {'Copy Details'}
              </PButton>
            </View>
          </View>

          <View style={{flexWrap: 'wrap', flex: 1, flexDirection: 'row',}}>
            {products.map((product, index) => {
              return (
                <ShareCatalogItem
                  key={product.id}
                  data={product}
                  index={index}
                  selected={this.state.selectedCatalog[index]}
                  onPress={singlePcAvailable? this.onImagePress : undefined}
                />
              )
            })}
          </View>
          
        </Content>
        <Sharer ref={this.registerSharerRef} getSelectedSinglePcs={this.getSharableProducts}/>
        <Footer>
          <TouchableOpacity activeOpacity={1} style={styles.shareOnWhatsApp} onPress={this.onShareOnWhatsAppPress}>
            <Text style={{color: 'white', fontSize: 14}}>Share on WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.shareOthers} onPress={this.onShareOthersPress}>
            <Text style={{color: 'black', fontSize: 14}}>Others</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    catalogData: state.catalogR.responseCatalogDetails,
    singleData: state.catalogR.responseGetProductDetails,
    responseStartSharing: state.catalogR.responseStartSharing,
  })
}
export default connect(mapStateToProps)(ShareCatalog);
// Android:
// ResellerCatalogShareBottomSheet
// Fragment_ResellerMultipleProductShare

// Test:
// navigationActions.goToProductDetailsScreen(40110) // single pieces
// navigationActions.goToProductDetailsScreen(41205) // full catalog
// navigationActions.goToSingleProductDetailsScreen(40910) // singles view
// navigationActions.goToSingleProductDetailsScreen(40637) // set matching

const styles = EStyleSheet.create({
  infoParent: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingBottom: 10,
  },
  infoLabel: {
    flex: 3/10,
  },
  infoValue: {
    flex: 7/10,
  },
  infoLabelText: {
    color: colorresource.liteblack,
    fontSize: 14,
  },
  avgTotalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  fullCatalogText: {
    fontSize: 14,
    color: 'red',
  },
  singlePcText: {
    fontSize: 14,
    color: 'green',
  },
  shareOnWhatsApp: {
    flex: 3/5, 
    backgroundColor: colorresource.liteblue, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  shareOthers: {
    flex: 2/5, 
    backgroundColor: colorresource.litegray, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

