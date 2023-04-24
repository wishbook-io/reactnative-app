import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation'
import { 
  View,
  Platform, 
  FlatList,
  ActivityIndicator, 
  Alert, 
  Dimensions,
  Clipboard,
  ToastAndroid
} from 'react-native';
import {  
  Picker,
  Container,
  Text,
} from 'native-base';
import { connect } from 'react-redux';
import { FAB, Button as PButton } from 'react-native-paper';
import RNFetchBlob from 'app/libs/RNFetchBlob';
import PropTypes from 'prop-types';
import _ from 'lodash';

import DownloadWishbookApp from 'app/screens/products/add/DownloadWishbookApp';
import FilterHeader from './FilterHeader';
import FilterFooter from './FilterFooter';
import MyFilters from './MyFilters';
import GenericHeader from '../../components/Header/GenericHeader'
import CatalogItem, { CatalogLabelType } from './CatalogItem';
import SingleProductItem from './SingleProductItem';
import SelectionFooter from './SelectionFooter';
import Sharer, { SHARE_TYPE } from 'app/utils/Sharer'
import AddToCart from 'app/screens/cart/AddToCart'
import UserHelper from '../../config/userHelper';
import { isWeb, isDroid } from 'app/utils/PlatformHelper'
import { isInWishlist } from 'app/screens/wishlist/serverHelper';
import { colorresource } from '../../resources/colorresource';
import { formatCatalogDetails } from './formatHelper';
import styles from './styles';
import { ENABLE_SINGLE_PCS } from 'app/utils/const';

import {
  goToProductDetailsScreen,
  goToSingleProductDetailsScreen,
  goToMyFilters,
  goToWishlist, 
  goToAddProducts,
  goToCarts,
} from 'app/actions/navigation-actions';
import {
  getPublicCatalogAction,
  getPublicCatalogLoadMoreAction
} from  'app/actions/catalog-actions';
import {
  getSavedFilterFromServerAction,
  removeSavedFilterFromServerAction
} from 'app/actions/productTab-filter-actions';
import { 
  addToWishlistAction, 
  deleteFromWishlistAction
} from 'app/actions/wishlist-actions';
import { 
  getCategoriesAction 
} from 'app/actions/category-actions'
import { showToastAction } from 'app/actions/toast-actions'
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions'
import * as serverHelper from './serverHelper';

import { TestIdGenerator } from '../../utils/TestingHelper';
const screenName = "BrowseProducts"
const buttonIdGenerator = TestIdGenerator(screenName, '', "Button")

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper'

var localFilterStateMap = new Map();

class Products extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    data:PropTypes.array,
  };

  onFooterAddToCartDone = () => {
    this.setState({singlePcSelected: {}})
  }

  onFooterAddToCartPress = () => {
    const selected = Object.keys(this.state.singlePcSelected);
    const selectedSingles = selected.map(i => this.props.data[i])
    if(selectedSingles.length === 1) {
      this.onSingleAddToCartPress(selectedSingles[0], this.onFooterAddToCartDone)
      return;
    }
    if(!this.addToCartRef) {
      console.warn("[Products:onFooterAddToCartPress] cart ref undefined");
      return;
    }
    this.addToCartRef.addToCartSingles(selectedSingles, this.onFooterAddToCartDone)
  }

  onSingleAddToCartPress = (id, callback) => {
    if(!this.addToCartRef) {
      console.warn("[Products:onSingleAddToCartPress] cart ref undefined");
      return;
    }
    this.addToCartRef.addToCart(id, callback)
  }

  registerAddToCartRef = (ref) => {
    this.addToCartRef = ref && ref.getWrappedInstance();
  }

  registerSharerRef = (ref) => {
    this.sharerRef = ref && ref.getWrappedInstance();
  }

  shareOnWhatsAppPress = async () => {
    const selectedIndices = Object.keys(this.state.singlePcSelected)
    if(selectedIndices.length === 1) {
      this.onWhatsAppPress(this.props.data[selectedIndices[0]].id)
    } else {
      if(this.sharerRef) {
        this.sharerRef.shareVia(SHARE_TYPE.WHATSAPP)
      }
    }
  }

  getExt = (url) => {
    const regexp = new RegExp('\.(png|jpg|jpeg|gif)')
    const matchObj = url.match(regexp)
    if(!matchObj || !matchObj.length) {
      return 'png'
    }
    const ext = matchObj[1]
    if(ext === 'jpg') {
      return 'jpeg' // it doesn't work otherwise :(
    }
    return matchObj[1]
  }

  onWhatsAppPress = async (id) => {
    // TODO: throttle the button press
    this.props.dispatch(requestShowLoaderAction(screenName))
    const response = await serverHelper.getCatalogDetails(id)
    this.props.dispatch(requestHideLoaderAction(screenName))
    if(!response) {
      return;
    }
    const pastableText = formatCatalogDetails(response)
    Clipboard.setString(pastableText)
    const toastMessage = 'Product Description copied to clipboard'
    if(isDroid) {
      ToastAndroid.show(toastMessage, ToastAndroid.SHORT)
    } else {
      this.props.dispatch(showToastAction(toastMessage))
    }

    if(this.sharerRef) {
      this.sharerRef.shareVia(SHARE_TYPE.WHATSAPP, [response])
    }
  }

  getSelectedSinglePcs = () => {
    const indices = Object.keys(this.state.singlePcSelected).map(i => parseInt(i))
    console.log(indices);
    const data = this.props.data
    const selectedSinglePcs = indices.map(i => data[i])
    return selectedSinglePcs
  }

  onOthersPress = () => {
    if(this.sharerRef) {
      this.sharerRef.onOpen({})
    }
  }

  registerFilterHeaderRef = (r) => {
    this.filterHeaderRef = r && r.getWrappedInstance();
  }

  isSingleView = () => {
    if(this.filterHeaderRef) {
      return this.filterHeaderRef.isSingleView();
    }
  }

  onAddProductsPress = () => {
    if(isWeb) {
      this.downloadWishbookAppRef && this.downloadWishbookAppRef.showModal()
    } else {
      goToAddProducts();
    }
  }

  registerDownloadWishbookAppRef = (r) => {
    this.downloadWishbookAppRef = r;
  }

  onSinglePcCheckBoxPress = (index) => {
    // console.log('[onSinglePcCheckBoxPress] index', index);
    let updatedSinglePcSelected = {...this.state.singlePcSelected}
    if(updatedSinglePcSelected[index]) {
      delete updatedSinglePcSelected[index];
    } else {
      updatedSinglePcSelected[index] = true;
    }
    this.setState({singlePcSelected: updatedSinglePcSelected})
  }

  renderSingleItem = ({item, index}) => {
    let userIsGuest = UserHelper.getUserIsGuest();
    if (item.empty) {
      return <View style={[styles.Emptyitem, styles.itemEmpty]} />;
    }
    return (
      <SingleProductItem 
      data={item}
      showListView={this.state.showListView}
      onPress={this.goToSingleProductDetailsPage}
      fullCatalogOn={localFilterStateMap.get('sell_full_catalog') === true}
      onCheckBoxPress={this.onSinglePcCheckBoxPress}
      index={index}
      selected={this.state.singlePcSelected[index]}
      onWhatsAppPress={this.onWhatsAppPress}
      onSingleAddToCartPress={this.onSingleAddToCartPress}
      />
    )
  }

  renderItem = ({item, index}) => {
    let userIsGuest = UserHelper.getUserIsGuest();
    if (item.empty) {
      return <View style={[styles.Emptyitem, styles.itemEmpty]} />;
    }
    return (
      <CatalogItem 
      data={item}
      onWishlistPress={this.onWishlistPress}
      addedToWishlist={isInWishlist(item.id, this.props.responseWishlist)}
      showListView={this.state.showListView}
      onPress={()=>this.goToProductDetailsPage(item)}
      fullCatalogOn={localFilterStateMap.get('sell_full_catalog') === true}
      />
    )
  }

  keyExtractor = (item) => {
    return item.id.toString()
  }

  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  }

  registerListRef = (ref) => {
    this.listRef = ref
  }

  //gotoproductdetails
  goToProductDetailsPage = (item) =>{
      goToProductDetailsScreen(item.id)  
  }

  goToSingleProductDetailsPage = (item) => {
    goToSingleProductDetailsScreen(item.id);
  }

  onWishlistPress = (data) => {
    const addedToWishlist = isInWishlist(data.id, this.props.responseWishlist)
    if(addedToWishlist) {
      this.props.dispatch(deleteFromWishlistAction({product: data.id}))
    } else {
      this.props.dispatch(addToWishlistAction({product: data.id}, true, false))
    }
  }

  //apply my filters 
  applyMyFilter = (filter) => {
    this.resetCurrentLocalMapFilters()
    let filters =JSON.parse(filter)
    for (var key in filters) {
      if (filters.hasOwnProperty(key)) {
        // console.log(key + " -> " + filters[key]);
        localFilterStateMap.set(key,filters[key])
      }
    }
    let staticfilterReadyToShip =filters["ready_to_ship"];
    // console.log('applyMyFilter',filters,staticfilterReadyToShip)
    this.setState({showMyFilterModal:false,staticfilterReadyToShip:staticfilterReadyToShip},()=>{
      this.props.dispatch(getPublicCatalogAction(undefined,undefined,filters))
    })
  }

  //CONVERT local map object to json object 
  convertMapToJson(map){
    let object={}
    map.forEach((value, key) => {
    object[key]=value
    })
    return object;
  }
  
  //convert object to local map 
  convertObjectToMap(filters){
    // console.log('[convertObjectToMap]')
    // let filters =JSON.parse(object)

    const productType = filters['product_type'] || localFilterStateMap.get('product_type');
    const ordering = filters['ordering'] || localFilterStateMap.get('ordering');

    localFilterStateMap.clear();
    for (var key in filters) {
      if (filters.hasOwnProperty(key)) {
        // console.log(key + " -> " + filters[key]);
        localFilterStateMap.set(key,filters[key])
      }
    }
    
    localFilterStateMap.set('ordering', ordering)
    localFilterStateMap.set('product_type', (productType || 'catalog'));
  }

  fetchPublicCatalog = () =>{
    if(localFilterStateMap.has("ready_to_ship")){
      if(this.state.staticfilterReadyToShip===false&&this.state.staticfilterPreOrder===false||this.state.staticfilterReadyToShip===true&&this.state.staticfilterPreOrder===true)
      localFilterStateMap.delete("ready_to_ship")
      // console.log('case 1',localFilterStateMap)
    }
    else{
      // console.log('case 2 stets',this.state.staticfilterPreOrder,this.state.staticfilterReadyToShip)
    if(this.state.staticfilterReadyToShip===false&&this.state.staticfilterPreOrder===false||this.state.staticfilterReadyToShip===true&&this.state.staticfilterPreOrder===true)
    localFilterStateMap.delete("ready_to_ship")
    else if(this.state.staticfilterPreOrder===true)
    localFilterStateMap.set("ready_to_ship",false);
    else if(this.state.staticfilterReadyToShip===true)
    localFilterStateMap.set("ready_to_ship",true);
    // console.log('case 2',localFilterStateMap)
    }

    if(!localFilterStateMap.has("product_type"))
    localFilterStateMap.set("product_type",this.state.product_type)

    let filter =this.convertMapToJson(localFilterStateMap);
    // console.log('filter to appply',filter)
    this.props.dispatch(getPublicCatalogAction(undefined,undefined,filter));

  }

  resetCurrentLocalMapFilters(){
    // console.log("[resetCurrentLocalMapFilters]")
    const ordering = localFilterStateMap.get('ordering')
    localFilterStateMap.clear();
    
    if(ordering) {
      localFilterStateMap.set('ordering', ordering);
    }
    
    if(this.state.staticfilterPreOrder)
    localFilterStateMap.set("ready_to_ship",false);
    if(this.state.staticfilterReadyToShip)
    localFilterStateMap.set("ready_to_ship",true);
    
    const productType = this.state.product_type
    localFilterStateMap.set("product_type", productType); 
   }

  flag_UserIsSellerOfCatalog = (data) =>{
    // console.log('flag_UserIsSellerOfCatalog',UserHelper.getUsercompany_id(),this.props.responseCatalogDetails.company)
    const flag = UserHelper.getUsercompany_id()===data.company
    return flag;
  }

  getNavParam = (param, defaultValue) => {
    return this.props.navigation.getParam(param, defaultValue)
  }

  onFocusUtility = () => {
    //console.log("[onFocusUtility] start")
    if(!this.navParamsConsumed) {
      //console.log("[onFocusUtility] not consumed")
      const newState = {
        ...this.initialState,
        product_type: this.getNavParam('product_type', 'catalog'),
        staticfilterPreOrder: this.getNavParam('staticfilterPreOrder', false),
        staticfilterReadyToShip: this.getNavParam('staticfilterReadyToShip', true),
      }
      //console.log({newState})
      this.setState(newState, () => {
        const filters = this.getNavParam('filters', {})
        if(filters && Object.keys(filters).length !== 0) {
          this.convertObjectToMap(filters)
        } else {
          // console.log("onFocusUtility: clear")
          this.resetCurrentLocalMapFilters();
        }
        //console.log("[onFocusUtility]: fetchpubliccatalog")
        this.fetchPublicCatalog();
        this.navParamsConsumed = true;
      })
    }
    //console.log("[onFocusUtility] end")
  }

  getFilterCount = () => {
    //console.log("getFilterCount", localFilterStateMap)
    const filterObj = this.convertMapToJson(localFilterStateMap)
    let filterCount = 0;
    //console.log("getFIlterCount filterObj", filterObj)
    for( const key of Object.keys(filterObj) ) {
      //console.log("now iterating for", key)
      if(key === 'min_price') {
        filterCount += 1
      }
      else if(key === 'category') {
        filterCount += 1
      } 
      else if(key === 'brand') {
        filterCount += 1
      }
      else if(key === 'work') {
        filterCount += 1
      }
      else if(key === 'state') {
        filterCount += 1
      }
      else if(key === 'size') {
        filterCount += 1
      }
      else if(key === 'style') {
        filterCount += 1
      }
      else if(key === 'stitching_type') {
        filterCount += 1
      }
      else if(key === 'fabric') {
        filterCount += 1
      }
      else if(key === 'category') {
        filterCount += 1
      }
      else if(key === 'sell_full_catalog') {
        // filterCount += 1
      }
      else if(key === 'product_type') {
        // filterCount += 1
      }
    }
    return filterCount
  }

  _onRefresh = () => {
    this.fetchPublicCatalog()
  }

  onEndReached = ({ distanceFromEnd }) => {
    // console.log("[onEndReached]")
    if((isWeb && this.props.data.length % 10 === 0) || !this.onEndReachedCalledDuringMomentum){
      localFilterStateMap.set("ordering",this.state.ordering)
      let filter =this.convertMapToJson(localFilterStateMap);
      if(this.props.isLoading === false && this.props.isLoadingMore === false) {
        this.props.dispatch(getPublicCatalogLoadMoreAction(this.props.data.length,undefined,filter));
      }
      this.onEndReachedCalledDuringMomentum = true;
    }
  }

  onControlsFilterChange = ({param, value, initial}) => {
    if(value == undefined) {
      localFilterStateMap.delete(param)
    } else {
      localFilterStateMap.set(param, value)
    }
    if(!initial) {
      // the initial flag is responsbile to only update param
      // but not fetch the catalogs
      this.fetchPublicCatalog()
    }
  }

  onFilterPress = () => {
    const params = {
      product_type: this.state.product_type,
      localFilterStateMap: localFilterStateMap
    }
    this.props.navigation.navigate('FilterScreen', params)
  }

  onMyFiltersPress = () => {
    goToMyFilters({
      onApply: this.applyMyFilter
    })
  }

  changeViewType = () => {
    this.setState({showListView:!this.state.showListView});
  }

  goToSearchScreen = () =>{
    this.props.navigation.navigate('SearchScreen');
  }

  goToCart = () =>{
    this.props.navigation.navigate('MyCart')
  }

  listEmptyComponent = () => {
    return (
      <View style={{
        flex: 1,
        height: '100%',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          flex: 1,
          width: '100%',
          textAlign: 'center',
          color: colorresource.gray,
          fontSize: 17,
        }}>No catalogs to display</Text>
      </View>
    )
  }

  footerComponent = () => {
    if(this.props.isLoadingMore) {
      return (
        <View style={styles.ProductListFooter}>
          <ActivityIndicator
          size={'large'}
          color={colorresource.liteblue}
          animating={true}
          />
        </View>
      );
    }
      return null;
  }

  onSelectNonePress = () => {
    this.setState({singlePcSelected: {}})
  }

  inSelectionMode = () => {
    const selectionMode = Object.keys(this.state.singlePcSelected).length > 0
    return selectionMode;
  }

  // debugComponentDidUpdate = (prevProps, prevState) => {
  //   console.log('---------Rrow update diff:----------------');

  //   const now = Object.entries(this.props);
  //   const added = now.filter(([key, val]) => {
  //     if (prevProps[key] === undefined) return true;
  //     if (prevProps[key] !== val) {
  //       console.log(`${key}
  //         - ${JSON.stringify(val)}
  //         + ${JSON.stringify(prevProps[key])}`);
  //     }
  //     return false;
  //   });
  //   added.forEach(([key, val]) => console.log(`${key}
  //         + ${JSON.stringify(val)}`));
  //   console.log('------------------------------------------');
  // }

  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      ordering:'-id',
      showListView:false,
      product_type:'catalog',
      staticfilterPreOrder:false,
      staticfilterReadyToShip:true,
      showMyFilterModal:false,

      // singlePcSelected: { '0': true, '1': true},
      singlePcSelected: {},
    }
    this.initialState =this.state;
    this.navParamsConsumed = false;
  }
    
  componentDidMount(){
    if(this.props.responseCategory.length === 0) {
      this.props.dispatch(getCategoriesAction())   
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({count: this.props.data.length});
    }
    
    if(prevProps.navigation.state.params !== this.props.navigation.state.params) {
      //console.log("[CDU] nav params have changed from ", prevProps.navigation.state.params, "to", this.props.navigation.state.params)
      this.navParamsConsumed = false;
    }

    // this.debugComponentDidUpdate(prevProps, prevState)
  }

  componentWillUnmount() {
    console.log('unmounted')
  }

  render() {
    let sellerViewVisible = UserHelper.getCompanyType()==='seller'?true:false;
    //console.log('Products Render',localFilterStateMap)
    //console.log('Products Render',this.props.navigation.state)

    return (
      <Container style={{backgroundColor: colorresource.materialbg}}>
        <NavigationEvents
        onDidFocus={this.onFocusUtility}
        />
        <GenericHeader
        otherRightConfigs={[
          {
            onPress: this.goToSearchScreen,
            visible: true,
            icon: 'magnify'
          },
          {
            onPress: this.changeViewType,
            visible: true,
            icon: this.state.showListView? 'view-grid' : 'view-list',
          },
          {
            onPress: this.onMyFiltersPress,
            visible: true,
            icon: 'folder',
          }
        ]}
        wishlistConfig={{
          onPress: goToWishlist,
          visible: !sellerViewVisible,
          testId: buttonIdGenerator("Wishlist"),
        }}
        cartConfig={{
          onPress: goToCarts,
          visible: !sellerViewVisible,
          testId: buttonIdGenerator("Cart"),
        }}
        />

        <FilterHeader
        ref={this.registerFilterHeaderRef}
        onFilterPress={this.onFilterPress}
        filterCount={this.getFilterCount()}
        onFilterChange={this.onControlsFilterChange}
        localFilterStateMap={this.convertMapToJson(localFilterStateMap)}
        />

        <View style={{flexDirection: 'row'}}>
        {this.inSelectionMode()?
          <PButton onPress={this.onSelectNonePress} mode={'text'}>{'Select None'}</PButton>
          : null}
        </View>

        <FlatList
        data={this.props.data}
        contentContainerStyle={{flexGrow: 1}}
        extraData={[this.state.singlePcSelected]}
        key = {( this.state.showListView ) ? 0 : 1 }
        numColumns = {(this.state.showListView) ? 1 : 2}
        ref={this.registerListRef}
        refreshing={this.props.isLoading}
        onRefresh ={this._onRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={this.onMomentumScrollBegin}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
        keyExtractor={this.keyExtractor}
        renderItem={(ENABLE_SINGLE_PCS && this.isSingleView())? this.renderSingleItem : this.renderItem}
        style={styles.ProductList}
        removeClippedSubviews={true}
        ListFooterComponent={this.footerComponent}
        ListEmptyComponent={this.listEmptyComponent}
        />

        <FAB
        style={{
          bottom: 0, 
          right: 0, 
          margin: 16, 
          position: 'absolute', 
          backgroundColor: colorresource.liteblue
        }}
        icon={'add'}
        visible={false && (sellerViewVisible||UserHelper.getCompanyType()==='all')}
        onPress={this.onAddProductsPress}
        />

        {this.inSelectionMode()
          ? <SelectionFooter
            selected={this.state.singlePcSelected}
            shareOnWhatsAppPress={this.shareOnWhatsAppPress}
            othersPress={this.onOthersPress}
            addToCartPress={this.onFooterAddToCartPress}
          />
          : <FilterFooter
          visible={true}
          onFilterChange={this.onControlsFilterChange}
          localFilterStateMap={this.convertMapToJson(localFilterStateMap)}
          />
        }

        <DownloadWishbookApp ref={this.registerDownloadWishbookAppRef}/>
        <Sharer
        ref={this.registerSharerRef}
        getSelectedSinglePcs={this.getSelectedSinglePcs}
        />
        <AddToCart ref={this.registerAddToCartRef}/>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
 return {
  isLoading: state.catalogR.isLoading,
  isLoadingMore: state.catalogR.isLoadingMore,
  data:state.catalogR.responsePublicCatalog,
  responseCategory: state.categoryR.responseCategory,
  responseWishlist: state.wishlistR.responseWishlist,
  };
};

export default connect(mapStateToProps)(Products);


// =========Freshchat Set User Properties =================== 
// userProp.put("City", companyProfile.getCity_name());
// userProp.put("State", companyProfile.getState_name());
// if (companyProfile.getCompany_group_flag() != null) {
// String company_type = "";
// if (companyProfile.getCompany_group_flag().getManufacturer())
// userProp.put("Manufacturer", "true");//company_type += "Manufacturer/";
// if (companyProfile.getCompany_group_flag().getWholesaler_distributor())
// userProp.put("WholesalerDistributor", "true");//company_type += "Wholesaler/Distributor/";
// if (companyProfile.getCompany_group_flag().getOnline_retailer_reseller())
// userProp.put("OnlineRetailerReseller", "true");//company_type += "OnlineRetailer/Reseller/";
// if (companyProfile.getCompany_group_flag().getBroker())
// userProp.put("Broker", "true");//company_type += "Broker/";
// if (companyProfile.getCompany_group_flag().getRetailer())
// userProp.put("Retailer", "true");//company_type += "Retailer";
// userProp.put("Type", company_type);
// }
// Freshchat.getInstance(getApplicationContext()).setUserProperties(userProp);

// ====Freshchat set User =============

// FreshchatUser hlUser = Freshchat.getInstance(getApplicationContext()).getUser();

// hlUser.setFirstName(UserInfo.getInstance(Activity_Home.this).getFirstName());
// hlUser.setLastName(UserInfo.getInstance(Activity_Home.this).getLastName());
// hlUser.setEmail(UserInfo.getInstance(Activity_Home.this).getEmail());
// hlUser.setPhone("+91", UserInfo.getInstance(Activity_Home.this).getMobile());

// Freshchat.getInstance(getApplicationContext()).setUser(hlUser);
