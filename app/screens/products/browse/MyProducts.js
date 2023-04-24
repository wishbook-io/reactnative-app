import React, { Component } from 'react';
import { 
  View, 
  Platform, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  FlatList, 
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Image
} from 'react-native';
import { 
  Header, 
  Title, 
  Content, 
  Button, 
  Left, 
  Right, 
  Body, 
  Icon,
  Item,
  Picker,
  Text,
  Input,
  Container } from 'native-base';
import { FAB } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';


import CatalogItem, {SELLING_TYPES} from 'app/screens/products/CatalogItem';
import HeaderBackNativeBase from 'app/components/Header/HeaderBackNativeBase';
import DownloadWishbookApp from 'app/screens/products/add/DownloadWishbookApp';
import StartSelling from './StartSelling';
import Modal from 'app/components/Modal/Modal';
import { colorresource } from 'app/resources/colorresource';
import consts from 'app/utils/const';
import styles from './styles';
import UserHelper from 'app/config/userHelper'
import { isWeb, isIos } from 'app/utils/PlatformHelper'

// redux
import { connect } from 'react-redux'
import { myProductsGetCatalogsAction } from 'app/actions/catalog-actions';
import { fetchCatalogsFromServer, requestStartSellingCatalog, requestStopSellingCatalog, fetchSetMatching } from './serverHelper';
import { goToProductDetailsScreen, goBack, goToAddProducts } from 'app/actions/navigation-actions';
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';

import { TestIdGenerator } from 'app/utils/TestingHelper';
const screenName = "MyProducts"
const buttonTestId = TestIdGenerator(screenName, '', "Button");

import {waitTillUserInfoIsFetched} from 'app/utils/debugHelper'

const PRODUCT_TYPES = consts.PRODUCT_TYPES;
const PRODUCT_TYPES_PARAMS = {
  [PRODUCT_TYPES.CATALOG]: 'catalog',
  [PRODUCT_TYPES.NON_CATALOG]: 'noncatalog',
  [PRODUCT_TYPES.SET_MATCHING]: 'noncatalog' 
}
const FILTER_ACTIVATION_TYPES = {
  ENABLE: 'Enable',
  DISABLE: 'Disabled',
}

const LIMIT = consts.BASE_PAGE_LIMIT;

const LOADING_TYPES = {
  MORE: 1,
  REFRESH: 2,
}

class MyProducts extends Component {

  showDownloadWishbookAppModal = () => {
    if(!this.downloadWishbookAppRef) {
      return;
    }
    this.downloadWishbookAppRef.showModal();
  }

  registerDownloadWishbookAppRef = (r) => {
    this.downloadWishbookAppRef = r
  }

  goToProductDetails = (params) => {
    const {id} = params
    goToProductDetailsScreen(id);
  }

  isSetMatching = () => {
    return this.isFilterProductType(PRODUCT_TYPES.SET_MATCHING);
  }

  onProductPress = (params) => {
    const {id} = params;
    console.log("[onProductPress] id", id);
    this.goToProductDetails(params)
  }

  onViewAllPress = (params) => {
    const {id, title} = params;
    console.log("[onViewAllPress] id, title", id, title);
    this.props.navigation.navigate('MySetMatchingProducts', params);
  }

  getUpdatedCatalogDataByUpdatingBuyerDisabled = (buyerDisabled, catalogId) => {
    const indexOfUpdatedCatalog = this.state.catalogData.findIndex((item) => item.id === catalogId)
    if(indexOfUpdatedCatalog === -1) {
      // oops this should never happen
      return undefined;
    } 

    let updatedCatalogData = _.cloneDeep(this.state.catalogData);
    updatedCatalogData[indexOfUpdatedCatalog].buyer_disabled = buyerDisabled;
    return updatedCatalogData;
  }

  stopSellingCatalog = async (data) => {
    const catalogId = data.id;
    this.props.dispatch(requestShowLoaderAction(screenName))
    
    const {response, error} = await requestStopSellingCatalog(catalogId);
    // TODO: check for response success here
    // {success:"Product has been disabled"}
    this.props.dispatch(requestHideLoaderAction(screenName))
    if(!response || !response.success) {
      console.warn("[stopSellingCatalog] couldn't stop selling catalog. response, error:", response, error);
      return;
    }
    const updatedCatalogData = this.getUpdatedCatalogDataByUpdatingBuyerDisabled(true, catalogId);
    const updatedState = {
      catalogData: updatedCatalogData,
    }
    this.setState(updatedState)
  }

  startSellingCatalog = async (expiryDate) => {
    // send this date to server, show a loading modal
    // and hide the start selling modal
    
    this.setState({
      startSellingVisible: false, 
    })
    this.props.dispatch(requestShowLoaderAction(screenName))

    const id = this.startSellingCatalogId;
    // console.log("[startSellingCatalog] expiryDate, id", expiryDate, id);
    const requestParams = {expiryDate, id}
    const {response, error} = await requestStartSellingCatalog(requestParams);
    // TODO: check for success here
    // {success:"Product has been enable"}
    this.props.dispatch(requestHideLoaderAction(screenName))
    if(!response || !response.success) {
      console.warn("[startSellingCatalog] couldn't start selling catalog. response, error:", response, error);
      return;
    }
    const updatedCatalogData = this.getUpdatedCatalogDataByUpdatingBuyerDisabled(false, id);
    const updatedState = {
      catalogData: updatedCatalogData,
    }
    this.setState(updatedState);
    this.startSellingCatalogId = null;
  }

  onStartStopSellingPress = (params) => {
    const { data } = params;
    const currentlyDisabled = data.buyer_disabled
    console.log("[onStartStopSellingPress] item, disabled", data, currentlyDisabled);
    if(currentlyDisabled) {
      // show the modal for enabling
      this.setState({startSellingVisible: true});
      this.startSellingCatalogId = data.id; // no need to keep this in state, for now, no UI elements are affected by it directly
    } else {
      // simply disable this catalog
      // show a loader, make the request, hide the loader
      this.stopSellingCatalog(data)
    }

  }

  onStartSellingCancelPress = () => {
    // simply hide the modal here
    this.setState({startSellingVisible: false});
  }

  onStartSellingDonePress = async (expiryDate) => {
    this.startSellingCatalog(expiryDate);
  }

  onRefresh = () => {
    this.onAnyFilterChange();
  }

  isFilterProductType = (productType) => {
    return this.state.filterProductType === productType;
  }

  onFetchCatalogs = (responseParams) => {
    const {response, params} = responseParams
    let updatedState = {
      lastCatalogReached: false,
      isLoading: false,
    }
    if(response.length < LIMIT) {
      // usually means that there are no more
      // catalogs to fetch, we have reached the end
      updatedState.lastCatalogReached = true
    }
    if(params.clear) {
      updatedState.catalogData = response
    } else {
      updatedState.catalogData = this.state.catalogData.concat(response)
    }
    console.log("[onFetchCatalogs] catalogData length: ", updatedState.catalogData.length)
    this.setState(updatedState);
  }

  onFilterSearchChange = (text) => {
    this.setState({filterSearch: text}, this.onAnyFilterChange)
  }

  onAnyFilterChange = () => {
    this.fetchCatalogs(false, true);
  }

  onFilterProductTypeChange = (productType, index) => {
    this.setState({filterProductType: productType, catalogData: []}, this.onAnyFilterChange)
  }

  isFilterSetToDisabled = () => {
    return this.state.filterActivation === FILTER_ACTIVATION_TYPES.DISABLE;
  }

  getProductTypeParams = () => {
    const paramValue = PRODUCT_TYPES_PARAMS[this.state.filterProductType];
    if(this.isFilterProductType(PRODUCT_TYPES.SET_MATCHING)) {
      return {
        // catalog_type: paramValue,
        // set_type: 'multi_set',
        product_type: 'set',
      }
    } else {
      return {
        catalog_type: paramValue,
        product_type: paramValue,
      }
    }
  }

  getDisabledCatalogsParams = () => {
    const disabledCatalogsParams = !this.isSetMatching() && this.isFilterSetToDisabled() ? {buyer_disabled: true} : {}
    return disabledCatalogsParams;
  }

  getParamsForFilteringViaUI = () => {
    const disabledCatalogsParams = this.getDisabledCatalogsParams();
    const productTypeParams = this.getProductTypeParams()
    const params = {
      ...disabledCatalogsParams,
      ...productTypeParams,
    }
    return params
  }

  getParamsForFilteringViaText = () => {
    const text = this.state.filterSearch;
    return {
      search: text,
      ...this.getDisabledCatalogsParams(),
      ...this.getProductTypeParams(),
    }
  }

  fetchCatalogs = (more = true, clear) => {
    if(this.state.isLoading) {
      console.log("[fetchCatalogs] returning since we are loading")
      return;
    }
    if(more && this.state.lastCatalogReached) {
      console.log("[fetchCatalogs] returning since we have reached the end")
      return;
    }
    const loadingType = more? LOADING_TYPES.MORE : LOADING_TYPES.REFRESH;
    this.setState({isLoading: loadingType})
    let params = {}
    let productType = this.state.filterProductType;
    if(this.state.filterSearchVisible) {
      params = this.getParamsForFilteringViaText()
      // clear = true;
      productType = PRODUCT_TYPES.CATALOG; // so that correct url is called
    } else {
      params = this.getParamsForFilteringViaUI()
    }
    params.offset = more? this.state.catalogData.length : 0
    console.log("[fetchCatalogs] dispatching with params, clear:", params, clear)
    fetchCatalogsFromServer({params, clear, productType: productType}, this.onFetchCatalogs);
  }

  onNoCatalogsPull = () => {
    this.fetchCatalogs(false, true);
  }

  onEndReached = () => {
    this.fetchCatalogs(true);
  }

  onFilterActivationDisablePress = () => {
    console.log("[onFilterActivationDisablePress]");
    this.setFilterActivation(false, FILTER_ACTIVATION_TYPES.DISABLE, this.onAnyFilterChange);
  }

  onFilterActivationEnablePress = () => {
    this.setFilterActivation(false, FILTER_ACTIVATION_TYPES.ENABLE, this.onAnyFilterChange);
  }

  onFilterMenuDismiss = () => {
    this.setFilterActivation(false)
  }

  setFilterActivation = (visible, activation, callback) => {
    // TODO: check if we already are in the required state, if yes,
    // then no need to set the state again
    let updatedState = {}
    if(visible !== undefined) {
      updatedState.filterActivationVisible = visible
    }
    if(activation !== undefined) {
      updatedState.filterActivation = activation
    }
    console.log("[setFilterActivation] updatedState", updatedState);
    if(callback) {
      this.setState(updatedState, callback);
    } else {
      this.setState(updatedState);
    }
  }

  onFilterActivationPress = () => {
    // console.log("[onFilterActivationPress]");
    this.setFilterActivation(!this.state.filterActivationVisible);
  }
  setFilterSearch = (visible, text, callback) => {
    let updatedState = {}
    if(visible !== undefined) {
      updatedState.filterSearchVisible = visible
      // updatedState.filterProductType = PRODUCT_TYPES.CATALOG
      updatedState.catalogData = []
    }
    if(text !== undefined) {
      updatedState.filterSearch = text
    }
    if(callback) {
      this.setState(updatedState, callback)
    } else {
      this.setState(updatedState)
    }
  }

  onCrossPress = () => {
    this.setFilterSearch(false, '', this.onAnyFilterChange);
  }

  onSearchPress = () => {
    this.setFilterSearch(true);
  }

  onAddFabPress = () => {
    // console.log("[onAddFabPress]")
    if(isWeb) {
      this.showDownloadWishbookAppModal();
      return;
    }
    goToAddProducts();
  }

  isUserApprovalStatusPending = () => {
    console.log("[isUserApprovalStatusPending]", UserHelper.getUserApprovalStatus())
    const pending = UserHelper.isUserApprovalStatus(consts.SELLER_APPROVAL_PENDING)
    return pending;
  }

  isUserNotApproved = () => {
    const approved = UserHelper.isUserApprovalStatus(consts.SELLER_APPROVAL_APPROVED)
    return !approved
  }

  constructor(props) {
    super(props)
    this.state = {
      filterSearchVisible: false,
      filterSearch: '',
      
      // the menu which allows
      // selecting activation type
      filterActivationVisible: false,

      // TODO: check supplier status here, if disabled,
      // then by default fetch the disabled catalogs,
      // since the enable list will be empty
      filterActivation: this.isUserApprovalStatusPending()? FILTER_ACTIVATION_TYPES.DISABLE : FILTER_ACTIVATION_TYPES.ENABLE,

      filterProductType: PRODUCT_TYPES.CATALOG,

      catalogData: [],
      isLoading: false,

      startSellingVisible: false,
    }
    // this field keeps track of which catalog needs enabling, when the modal returns
    // the expiry date
    this.startSellingCatalogId = null;
  }

  componentDidMount() {
    // waitTillUserInfoIsFetched();
    waitTillUserInfoIsFetched(this.props.dispatch).then(this.onAnyFilterChange);
    // waitTillUserInfoIsFetched(this.props.dispatch).then(fetchSetMatching);
  }

  renderCatalogItem = ({item, index}) => {
    return (
      <CatalogItem
      onPress={() => this.goToProductDetails({id: item.id})} 
      data={item}
      showListView={true}
      onStartStopSellingPress={this.isUserNotApproved()? undefined : this.onStartStopSellingPress}
      showDisabledOverlay={true}
      />
    );
  }

  renderSetMatchingItem = ({item, index}) => {
    // console.log("[renderSetMatchingItem] item, index", item, index);
    return (
      <SetMatchingItem
      data={item}
      onProductPress={this.onProductPress}
      onViewAllPress={this.onViewAllPress}
      />
    )
  }

  render() {
    return (
      <Container style={{backgroundColor: colorresource.grey50}}>
        <HeaderBackNativeBase title={'My Products'} />
        <View style={styles.MyProductsHeader}>
          {this.state.filterSearchVisible? 

            <Item style={{
              // elevation:3
              }}>
              <Input 
              placeholder='Search'
              placeholderTextColor={colorresource.litegray}
              value={this.state.filterSearch}
              onChangeText={this.onFilterSearchChange}
              />
              <Icon 
              style={styles.MyProductsHeaderCrossIcon}
              active 
              name='close' 
              onPress={this.onCrossPress}
              />
            </Item>
            :
            <View style={{
              // elevation:3
              marginRight: 7,
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                {isIos? <Arrow/> : null}
                <Picker
                mode="dropdown"
                {...buttonTestId("Picker")}
                selectedValue={this.state.filterProductType}
                onValueChange={this.onFilterProductTypeChange}
                style={isWeb || true? {flexGrow: undefined} : {}}
                >
                  <Picker.Item label={PRODUCT_TYPES.CATALOG} value={PRODUCT_TYPES.CATALOG} />
                  <Picker.Item label={PRODUCT_TYPES.NON_CATALOG} value={PRODUCT_TYPES.NON_CATALOG} />
                  <Picker.Item label={PRODUCT_TYPES.SET_MATCHING} value={PRODUCT_TYPES.SET_MATCHING} />
                </Picker>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                {this.isSetMatching()? null : 
                <View style={styles.MyProductsHeaderIconParent}>
                  <Text style={styles.MyProductsHeaderIconText}>{`(${this.state.filterActivation})`}</Text>
                  <Icon name='filter-outline' type='MaterialCommunityIcons' style={styles.MyProductsHeaderIcon} onPress={this.onFilterActivationPress} />
                </View>}
                <View style={styles.MyProductsHeaderIconParent}>
                  <Icon name="magnify" type="MaterialCommunityIcons" style={styles.MyProductsHeaderIcon} onPress={this.onSearchPress} />
                </View>
              </View>
            </View>
          }
        </View>



          



        
          <NoCatalogs 
          show={this.state.catalogData.length === 0}
          onPull={this.onNoCatalogsPull}
          isLoading={this.state.isLoading === LOADING_TYPES.REFRESH}
          />

          {/* <SetMatchingItem data={this.props.responseGetSetMatching[5]}/> */}
          

          {!this.isSetMatching() && this.state.catalogData.length !== 0?
            <FlatList
            data={this.state.catalogData}
            // key = {( this.state.showListView ) ? 0 : 1 }
            // numColumns = {(this.state.showListView) ? 1 : 2}
            ref={ref => this.listRef = ref}
            refreshing={this.state.isLoading === LOADING_TYPES.REFRESH}
            onRefresh ={this.onRefresh}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            scrollEventThrottle={400}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderCatalogItem}
            ListFooterComponent={() => {
              if(this.state.isLoading === LOADING_TYPES.MORE) {
                return (
                  <View style={{paddingBottom: 10,}}>
                    <ActivityIndicator
                    size={'large'}
                    color={colorresource.liteblue}
                    animating={true}
                    />
                  </View>
                );
              }
              return null;
            }}
            />
          : null}


          {this.isSetMatching() && this.state.catalogData.length !== 0?
            <FlatList
            data={this.state.catalogData}
            // key = {( this.state.showListView ) ? 0 : 1 }
            // numColumns = {(this.state.showListView) ? 1 : 2}
            ref={ref => this.listRef = ref}
            refreshing={this.state.isLoading === LOADING_TYPES.REFRESH}
            onRefresh ={this.onRefresh}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            scrollEventThrottle={400}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={this.state.filterSearchVisible? this.renderCatalogItem : this.renderSetMatchingItem}
            ListFooterComponent={() => {
              if(this.state.isLoading === LOADING_TYPES.MORE) {
                return (
                  <View style={{paddingBottom: 10,}}>
                    <ActivityIndicator
                    size={'large'}
                    color={colorresource.liteblue}
                    animating={true}
                    />
                  </View>
                );
              }
              return null;
            }}
            />
          : null}



          <FilterMenu
          show={this.state.filterActivationVisible}
          config={[
            {text: FILTER_ACTIVATION_TYPES.ENABLE, callback: this.onFilterActivationEnablePress},
            {text: FILTER_ACTIVATION_TYPES.DISABLE, callback: this.onFilterActivationDisablePress},
          ]}
          onDismiss={this.onFilterMenuDismiss}
          />
        <FAB
            style={{bottom: 0, right: 0, margin: 16, position: 'absolute', backgroundColor: colorresource.liteblue}}
            icon={'add'}
            onPress={() => this.onAddFabPress()}
          />
        <StartSelling
        show={this.state.startSellingVisible}
        onDonePress={this.onStartSellingDonePress}
        onCancelPress={this.onStartSellingCancelPress}
        />
        <DownloadWishbookApp ref={this.registerDownloadWishbookAppRef}/>
      </Container>
    );
  }
}

const NoCatalogs = ({show, onPull, isLoading}) => {
  if(!show) {
    return null;
  }
  return (
    <ScrollView  
    style={styles.MyProductsNoCatalogsScrollView} 
    contentContainerStyle={{flexGrow: 1}}
    refreshControl={
      <RefreshControl
      refreshing={isLoading}
      onRefresh={onPull}
      />
    }
    >
      <View style={styles.MyProductsNoCatalogs}>
        <Text style={styles.MyProductsNoCatalogsText}>No catalogs to display</Text>
      </View>
    </ScrollView>
  );
}

const SetMatchingItem = ({data, onViewAllPress, onProductPress}) => {
  if(!data || !data.products) {
    return null;
  }
  const onViewAllPressInternal = () => {
    onViewAllPress({id: data.id, title: data.title})
  }
  return (
    <View style={{
      backgroundColor: 'white',
      paddingLeft: 5,
      paddingTop: 13,
      marginBottom: 10,
    }}>
      <Text style={{
        fontSize: 16,
        // fontWeight: 'bold',
        marginLeft: 10,
      }}>{data.title}</Text>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
      }}>
        {data.products.slice(0, 3).map((item, index) =>
        
          <View key={item.id} style={localStyles.SetImageFlexItem}>
            <TouchableOpacity style={localStyles.SetImageParent} onPress={() => onProductPress({id: item.id})}>
              <Image style={{flex: 1}} resizeMode={'contain'} source={{uri: item.image.thumbnail_medium}} />
              <CatalogDisabledOverlay show={item.supplier_disabled}/>
            </TouchableOpacity>
          </View>
        )}

        <View style={localStyles.SetImageFlexItem}>
          <Button style={localStyles.SetAddImage} onPress={onViewAllPressInternal}>
            <Text uppercase={false} style={localStyles.SetAddImageText}>{'+ View \nAll'}</Text>
          </Button>
        </View>

      </View>
    </View>
  );
}

const FilterMenu = ({config, show, onDismiss}) => {
  return (
    <Modal
    style={{margin: 0}}
    isVisible={show} 
    onBackdropPress={onDismiss}
    animationIn={'slideInRight'}
    animationOut={'slideOutRight'}
    backdropColor={'transparent'}
    >
      <View style={styles.MyProductsFilterMenu}>
        {config.map((item, index) => 
          <View key={index} style={styles.MyProductsFilterMenuRow} >
            <Text style={styles.MyProductsFilterMenuText} onPress={item.callback}>{item.text}</Text>
          </View>
        )}
      </View>
    </Modal>
  );
}

const CatalogDisabledOverlay = ({show}) => {
  if(!show) {
      return null;
  }
  return (
      <View style={{
          position: 'absolute',
          bottom: 0,  // these are required to make this full width so that justifyContent can center the text
          top: 0,
          left: 0,
          right: 0,
          // flex: 1,
          // height: '100%',
          // width: '100%',
          backgroundColor: 'rgba(255,255,255,0.5)',
          justifyContent: 'center',
          // alignItems: 'center', // we don't do this because then the inner View doesn't span the entire width
          // borderWidth: 1, 
          // borderColor: 'red'
      }}>
        <View style={{
          //flex: 1, 
          // padding: 5, 
          // height: 'auto',
          // width: '100%',
          backgroundColor: 'rgba(255,255,255,0.5)',
          // borderWidth: 1, 
          // borderColor: 'yellow'
          }}>
        <Text style={{
            textAlign: 'center',
            // flex: 1,
            // textAlignVertical: 'center',
            fontSize: 14,
            fontWeight: 'bold',
            // color: 'white'
            color: 'rgba(0,0,0,0.5)'
        }}>Disabled</Text>
        </View>
      </View>
  );
}

const localStyles = EStyleSheet.create({
  SetImageFlexItem: {
    marginRight: 10,
    marginBottom: 8,
    // borderWidth: 1,
  },
  SetAddImage: {
    height: 90,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colorresource.liteblue,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  SetAddImageText: {
    fontSize: 15,
    color: colorresource.liteblue,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center',
    flex: 1,
  },
  SetImageParent: {
    height: 90,
    width: 70,
    borderRadius: 5,
    backgroundColor: colorresource.materialbg,
  },
});

const mapStateToProps = (state) => ({
  responseGetSetMatching: state.catalogR.responseMyProductsGetSetMatching,
  userInfo: state.verifyotpR.userInfo,
})

export default connect(mapStateToProps)(MyProducts)

const trisize = 8
const Arrow = () => (
  <View style={{
    position: 'absolute',
    borderTopWidth: trisize,
    borderRightWidth: trisize,
    borderBottomWidth: 0,
    borderLeftWidth: trisize,
    borderTopColor: colorresource.thirdblack,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    right: 20,
    bottom: 16,
  }}/>
)
