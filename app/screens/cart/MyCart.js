import React, { Component, Fragment } from 'react';
import { View, RefreshControl, FlatList, ScrollView, Alert, InteractionManager } from 'react-native';
import { 
  Footer, 
  Text,
} from 'native-base';
import { Appbar } from 'react-native-paper'
import _ from 'lodash'

import MyCartFooter from './MyCartFooter';
import MyCartItem from './MyCartItem';
import BannerTemplate from '../home/BannerTemplate';
import PreLaunchModal from './PreLaunchModal';
import { showConfirm } from 'app/utils/notifier';
import { colorresource } from 'app/resources/colorresource';

// redux
import {connect} from 'react-redux';
import {
  getCartBannerAction, 
  getCatalogWiseCartDetailsAction,
  deleteCartItemAction,
  patchCartQuantityAction,
} from 'app/actions/cart-actions';
import * as navigationActions from 'app/actions/navigation-actions';
import { getCreditRatingAction } from '../../actions/credit-actions';
import { isWeb } from 'app/utils/PlatformHelper';

import { waitTillCartDetailsIsFetched, waitTillUserInfoAndStatisticsAreFetched } from 'app/utils/debugHelper';
// import debugJson from './debugCatalogWise.json';

import { TestIdGenerator } from '../../utils/TestingHelper';
const screenName = 'MyCart';
const buttonTestId = TestIdGenerator(screenName,'','Button');
const textTestId =  TestIdGenerator(screenName,'','Text');
const touchableTestId = TestIdGenerator(screenName,'','Touchable');

const myCartItemTestIds = {
  plus: touchableTestId('QuantityPlus'),
  minus: touchableTestId('QuantityMinus'),
  count: textTestId('Quantity'),
  trash: touchableTestId('ItemDelete'),
  details: touchableTestId('ItemDetails'),
  discountPercent: textTestId('DiscountPercent'),
  undiscountedPrice: textTestId('UndiscountedPrice'),
  discountedPrice: textTestId('DiscountedPrice'),
  price: textTestId('ItemPrice'),
  name: textTestId('ProductName'),
}

class MyCart extends Component {

  onBannerPress = () => {
    const banner = this.props.responseBanner[0];
    
    const pageType = banner.landing_page_type
    const page = banner.landing_page
    navigationActions.handleBannersDeepLink(pageType, page);
  }
  
  registerPreLaunchModalRef = (r) => {
    this.preLaunchModalRef = r;
  }

  onCartQuantityChange = (params) => {
    this.props.dispatch(patchCartQuantityAction(params));
  }

  onConfirmCartItemDelete = (ids) => {
    this.props.dispatch(deleteCartItemAction({item_ids: ids}))
  }

  showCartItemDeleteConfirmation = (ids) => {
    showConfirm(
      screenName,
      'Confirm Delete',
      'Are you sure you want to remove this item from cart?',
      this.onConfirmCartItemDelete,
      ids
    )
  }

  onCartItemDelete = (params) => {
    const ids = params.ids;
    this.showCartItemDeleteConfirmation(ids)
  }

  onRefresh = () => {
    this.props.dispatch(getCatalogWiseCartDetailsAction());
  }

  onCatalogPress = (params) => {
    const {id} = params;
    navigationActions.goToProductDetailsScreen(id);
  }

  onProductPress = (params) => {
    navigationActions.goToProductViewer(params)
  }
  
  navigateToShipay = () => {
    this.props.navigation.navigate('Shipay');
  }

  onPlaceOrderPress = () => {
    this.preLaunchModalRef.placeOrder();
  }

  initialize = () => {
    this.props.dispatch(getCartBannerAction())
    // waitTillUserInfoAndStatisticsAreFetched().then(() => {
    if(!this.props.responseCartDetails) {
      this.props.dispatch(getCatalogWiseCartDetailsAction())
    }
    // })
  }

  constructor(props) {
    super(props)
    this.state = {
      // debugCatalog: debugJson.catalogs[0],
      refreshing: false,
      animationDone: false,
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.initialize();
      this.setState({animationDone: true})
    }) 
    // this.props.dispatch(getCatalogWiseCartDetailsAction())
    // waitTillCartDetailsIsFetched().then(() => this.props.dispatch(getCreditRatingAction()))
  }

  render() {
    const responseCartDetails = this.props.responseCartDetails;
    const bannerImage = _.get(this.props.responseBanner, '[0].image.banner')
    // const responseCartDetails = debugJson.catalogs//.filter((item, index) => index===0);
    return(
      <Fragment>
        <Appbar.Header>
          <Appbar.BackAction onPress={navigationActions.goBack} />
          <Appbar.Content
            title="My Cart"
            subtitle={this.props.cartCount? '('+this.props.cartCount+' items)' : null}
          />
        </Appbar.Header>
        <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, backgroundColor: colorresource.materialbg}}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isLoading || !this.state.animationDone}
            onRefresh={this.onRefresh}
          />}
        >
          <BannerTemplate height={150} image={bannerImage? {uri: bannerImage} : null} onPress={bannerImage? this.onBannerPress : undefined}/>
          
          
          {this.state.animationDone && responseCartDetails && responseCartDetails.map((item, index) =>
            <MyCartItem 
              key={index}
              data={item} 
              onCatalogPress={this.onCatalogPress}
              onProductPress={this.onProductPress}
              onCartItemDelete={this.onCartItemDelete}
              onCartQuantityChange={this.onCartQuantityChange}
              testIds={myCartItemTestIds}
              />
          )}

          {(!this.props.isLoading && (!responseCartDetails || responseCartDetails.length === 0))?
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}} {...textTestId('EmptyCartMessage')}>You don't have any items in your Cart.</Text>
            </View>
            : null}

          {/* <MyCartItem data={debugJson.catalogs[9]}/> */}
        </ScrollView>
        <PreLaunchModal 
        ref={this.registerPreLaunchModalRef} 
        cartDetails={this.props.responseCartDetails}
        onDonePress={this.navigateToShipay}  
        />
        {this.props.totalAmount? 
          <Footer style={{/*borderWidth: 1, borderColor: 'black'*/}}>
              <MyCartFooter 
              onPlaceOrderPress={this.onPlaceOrderPress} 
              totalAmount={this.props.totalAmount}
              testIds={{
                total: textTestId('TotalValue'),
                placeOrder: buttonTestId('PlaceOrder'),
              }}
              />
          </Footer>
          : null}
      </Fragment>

    );
  }
}

const mapStateToProps = (state) => {

  let responseCatalogWiseCartDetails = state.cartR.responseGetCatalogWiseCartDetails;
  let totalAmount = 0;
  let responseCartDetails = null;
  // console.log("responseCatalogWiseCartDetails:", responseCatalogWiseCartDetails);
  if(responseCatalogWiseCartDetails.catalogs && responseCatalogWiseCartDetails.catalogs.length > 0) {
    totalAmount = parseFloat(responseCatalogWiseCartDetails.total_amount) - parseFloat(responseCatalogWiseCartDetails.shipping_charges);
    totalAmount = totalAmount.toFixed(2)
    responseCartDetails = responseCatalogWiseCartDetails.catalogs
  }
  
  return ({
    responseBanner: state.cartR.responseGetCartBanner,
    // responseCartDetails: require('./debugCatalogWise.json').catalogs,
    responseCartDetails,
    isLoading: state.cartR.isLoading,
    cartCount: state.cartR.cartCount,
    totalAmount,
  })
}
export default connect(mapStateToProps)(MyCart)