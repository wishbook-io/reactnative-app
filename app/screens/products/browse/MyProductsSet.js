import React, { Component, Fragment } from 'react';
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
  Fab,
  Container, 
  Footer,
  FooterTab} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';

import { colorresource } from 'app/resources/colorresource';

import CatalogItem, {SELLING_TYPES} from 'app/screens/products/CatalogItem';
import HeaderBackNativeBase from 'app/components/Header/HeaderBackNativeBase';
import StartSelling from './StartSelling';
import consts from 'app/utils/const';
import styles from './styles';


// redux
import { connect } from 'react-redux'
import { myProductsGetCatalogsAction } from 'app/actions/catalog-actions';
import { requestStartSellingCatalog, requestStopSellingCatalog, fetchSetMatchingProducts } from './serverHelper';
import * as navigationActions from 'app/actions/navigation-actions';
import { showToastAction } from 'app/actions/toast-actions'
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';

import { TestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'MyProductsSet';
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
  MODAL: 3,
}

class MyProductsSet extends Component {

  onAddSetDone = () => {
    this.showToast('Set added successfully', 2000);
  }

  onAddSetPress = () => {
    this.props.navigation.navigate('MyProductsAddImages', {
      setId: this.state.setMatchingProductId, 
      sortOrder: this.state.catalogData.length,
      colorSet: this.state.catalogData[0].catalog_multi_set_type === 'color_set',
      onAddSetDone: this.onAddSetDone,
    });
  }

  isSetMatching = () => {
    return this.isFilterProductType(PRODUCT_TYPES.SET_MATCHING);
  }

  onProductPress = () => {
    console.log("[onProductPress]");
  }

  onViewAllPress = () => {
    console.log("[onViewAllPress]");
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
    console.log("[startSellingCatalog] expiryDate, id", expiryDate, id);
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
        product_type: 'set',
        // set_type: 'multi_set',
      }
    } else {
      return {
        catalog_type: paramValue,
        product_type: paramValue,
      }
    }
  }
  
  getDisabledCatalogsParams = () => {
    const disabledCatalogsParams = this.isFilterSetToDisabled() ? {buyer_disabled: true} : {}
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
      clear = true;
      productType = PRODUCT_TYPES.CATALOG; // so that correct url is called
    } else {
      params = this.getParamsForFilteringViaUI()
    }
    params.offset = more? this.state.catalogData.length : 0
    params.catalog_id = this.state.setMatchingProductId;
    console.log("[fetchCatalogs] dispatching with params, clear:", params, clear)
    fetchSetMatchingProducts({params, clear, productType: productType}, this.onFetchCatalogs);
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
  setFilterSearch = (visible, text) => {
    let updatedState = {}
    if(visible !== undefined) {
      updatedState.filterSearchVisible = visible
    }
    if(text !== undefined) {
      updatedState.filterSearch = text
    }
    this.setState(updatedState)
  }

  onCrossPress = () => {
    this.setFilterSearch(false);
  }

  onSearchPress = () => {
    this.setFilterSearch(true);
  }


  onAddFabPress = () => {
    console.log("[onAddFabPress]")
  }
  
  goBack = () => {
    this.props.navigation.goBack();
  }

  showToast = (message, duration=1000) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  constructor(props) {
    super(props)
    console.log("Navigation params: ", this.props.navigation.state.params);
    let getNavParam = this.props.navigation.getParam;
    const setMatchingProductId = getNavParam('id', 9815);//5916);
    const setMatchingProductTitle = getNavParam('title', 'S397');
    this.state = {

      setMatchingProductId: setMatchingProductId,
      setMatchingProductTitle: setMatchingProductTitle,

      filterSearchVisible: false,
      filterSearch: '',
      
      // the menu which allows
      // selecting activation type
      filterActivationVisible: false,

      // TODO: check supplier status here, if disabled,
      // then by default fetch the disabled catalogs,
      // since the enable list will be empty
      filterActivation: FILTER_ACTIVATION_TYPES.ENABLE,

      filterProductType: PRODUCT_TYPES.SET_MATCHING,

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
    // waitTillUserInfoIsFetched(this.props.dispatch).then(this.onAnyFilterChange);
    // waitTillUserInfoIsFetched(this.props.dispatch).then(fetchSetMatchingProducts);
    this.onAnyFilterChange()
  }

  renderCatalogItem = ({item, index}) => {
    return (
      <CatalogItem 
      data={item}
      showListView={true}
      onStartStopSellingPress={this.onStartStopSellingPress}
      onPress={() => navigationActions.goToProductDetailsScreen(item.id)}
      />
    );
  }

  renderSetMatchingItem = ({item, index}) => {
    console.log("[renderSetMatchingItem] item, index", item, index);
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
        <View style={{elevation: 3, shadowColor: 'black', shadowOffset: {width: 0, height: 2}, shadowRadius: 1.2, shadowOpacity: 0.2}}>
        <Header style={{ paddingRight: 0, justifyContent: 'space-between', paddingLeft: 0, marginLeft: 0, backgroundColor: this.state.filterSearchVisible? 'white':colorresource.liteblue}}>
        
        <View style={{flexDirection: 'row', alignSelf: 'center', width: '100%'}}>
          <View style={{marginLeft: 0}}>
            <Button transparent onPress={this.goBack} style={{paddingLeft: 0, marginLeft: 0, paddingTop: 5, paddingBottom: 5, marginRight: 0}}>
              <Icon name={'arrow-back'} style={{paddingTop: 0, paddingBottom: 0, marginBottom: 0, marginTop: 0, marginLeft: 10, marginRight: 0, color: this.state.filterSearchVisible? colorresource.liteblue : 'white'}}/>
            </Button>
          </View>
            {this.state.filterSearchVisible
            ?
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 20}}>
            <TextInput
              style={{flex: 1, fontSize: 18}}
              placeholder={'Search by name'}
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
          </View>
            : null}
          {this.state.filterSearchVisible? null :
          <View style={{
            flexDirection: 'row', 
            alignItems: 'center', 
            flex: 1, 
            justifyContent: 'space-between',
            // borderWidth: 1,
            // borderColor: 'black',
            }}>
            <View style={{marginLeft: 20, flex: 1}}>
              <Title style={{color:colorresource.white, textAlign: 'left'}}>{this.state.setMatchingProductTitle}</Title>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              
              <View style={styles.MyProductsHeaderIconParent}>
                <Text style={[styles.MyProductsHeaderIconText, {color: 'white'}]}>{`(${this.state.filterActivation})`}</Text>
                <Icon name='filter-outline' type='MaterialCommunityIcons' style={[styles.MyProductsHeaderIcon, {color: 'white'}]} onPress={this.onFilterActivationPress} />
              </View>
              
              <View style={styles.MyProductsHeaderIconParent}>
                <Icon name="search" type="MaterialIcons" style={[styles.MyProductsHeaderIcon, {color: 'white'}]} onPress={this.onSearchPress} />
              </View>

            </View>
          </View>
          }
          </View>
        </Header>
        </View>
        
          <NoCatalogs 
          show={this.state.catalogData.length === 0}
          onPull={this.onNoCatalogsPull}
          isLoading={this.state.isLoading === LOADING_TYPES.REFRESH}
          />

          {/* <SetMatchingItem data={this.props.responseGetSetMatching[5]}/> */}
          

          {this.state.catalogData.length !== 0?
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


          
          <FilterMenu
          show={this.state.filterActivationVisible}
          config={[
            {text: FILTER_ACTIVATION_TYPES.ENABLE, callback: this.onFilterActivationEnablePress},
            {text: FILTER_ACTIVATION_TYPES.DISABLE, callback: this.onFilterActivationDisablePress},
          ]}
          containerStyle={{top: 55}}
          />
        {/* <Fab
        active={true}
        direction="up"
        containerStyle={{backgroundColor: 'white'}}
        style={{ backgroundColor: colorresource.liteblue }}
        position="bottomRight"
        onPress={this.onAddFabPress}>
          <Icon name="plus" type={'Feather'} />
        </Fab> */}

        <Footer>
          <FooterTab>
            <Button style={{backgroundColor:colorresource.liteblue}} onPress={this.onAddSetPress} >
              <Text uppercase={false} style={{color:'white', fontSize: 14, paddingTop: 0, paddingBottom: 0}}>{'+ Add set'}</Text>
            </Button>
          </FooterTab>
        </Footer>

        <StartSelling
        show={this.state.startSellingVisible}
        onDonePress={this.onStartSellingDonePress}
        onCancelPress={this.onStartSellingCancelPress}
        />

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

const SetMatchingItem = ({data}) => {
  if(!data) {
    return null;
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
            <View style={localStyles.SetImageParent}>
            <Image style={{flex: 1}} resizeMode={'contain'} source={{uri: item.image.thumbnail_medium}}/>
            </View>
          </View>
        )}

        <View style={localStyles.SetImageFlexItem}>
          <Button style={localStyles.SetAddImage} onPress={() => {}}>
            <Text uppercase={false} style={localStyles.SetAddImageText}>{'+ View \nAll'}</Text>
          </Button>
        </View>

      </View>
    </View>
  );
}

const FilterMenu = ({config, show, containerStyle}) => {
  if(!show) {
    return null;
  }
  return (
    <View style={[styles.MyProductsFilterMenu, containerStyle]}>
      {config.map((item, index) => 
        <View key={index} style={styles.MyProductsFilterMenuRow} >
          <Text style={styles.MyProductsFilterMenuText} onPress={item.callback}>{item.text}</Text>
        </View>
      )}
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
  // catalogData: state.catalogR.responseMyProductsGetCatalogs,
  // isLoading: state.catalogR.myProductsGetCatalogsLoading,
  responseGetSetMatching: state.catalogR.responseMyProductsGetSetMatching,
  userInfo: state.verifyotpR.userInfo,
})

export default connect(mapStateToProps)(MyProductsSet)