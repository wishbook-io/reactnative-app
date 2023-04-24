import React,  { Component } from 'react';
import { View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import {
  Text,
  Container,
  Content,
} from 'native-base'
import { FAB } from 'react-native-paper'
import { connect } from 'react-redux'

import GenericHeader from 'app/components/Header/GenericHeader'
import DownloadWishbookApp from 'app/screens/products/add/DownloadWishbookApp';
import PromoCategoryItem, { PromoButton } from 'app/screens/home/PromoCategoryItem';
import WButton from 'app/components/Button/WButton'
import UserHelper from 'app/config/userHelper'
import { colorresource } from 'app/resources/colorresource';
import { fontresource } from 'app/resources/fontresource';

import { getCategoryAction } from 'app/actions/masterlist-actions';
import { getProductPromotionalTagsAction } from 'app/actions/promotions-actions';
import { showToastAction } from 'app/actions/toast-actions';
import * as navigationActions from 'app/actions/navigation-actions'
import { isWeb } from 'app/utils/PlatformHelper';
import { ENABLE_SINGLE_PCS } from 'app/utils/const';

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';

import { TestIdGenerator } from 'app/utils/TestingHelper';
const buttonTestId = TestIdGenerator("ProductsPromotion", '', "Button");

class ProductsTab extends Component {

  navigateToProductsTab = (filters) => {
    navigationActions.goToProductsTab({filters})
  }

  showDownloadWishbookAppModal = () => {
    if(!this.downloadWishbookAppRef) {
      return;
    }
    this.downloadWishbookAppRef.showModal();
  }

  registerDownloadWishbookAppRef = (r) => {
    this.downloadWishbookAppRef = r
  }

  onAddProductsPress = () => {
    if(isWeb) {
      this.showDownloadWishbookAppModal();
      return;
    }
    if(UserHelper.getCompanyname()) {
      navigationActions.goToAddProducts();
    } else {
      this.props.dispatch(showToastAction("Please complete your profile"))
      this.props.navigation.navigate('UpdateBillingAddress')
    }
  }

  onCollectionsPress = (url) => {
    navigationActions.handleDeeplink(url)
  }

  onCollectionsCollectionPress = (url) => {
    this.onCollectionsPress(url)
  }

  onCollectionsSinglePcPress = (url) => {
    url = url + '&collection=false';
    this.onCollectionsPress(url);
  }

  goToSearchScreen = () => {
    navigationActions.goToSearchScreen();
  }

  onCategoryCollectionPress = (id) => {
    this.navigateToProductsTab({category: id})
  }

  onCategorySinglePcPress = (id) => {
    this.navigateToProductsTab({category: id, collection: false})
  }

  initialize = () => {
    if(this.props.responseCategory.length === 0) {
      this.props.dispatch(getCategoryAction())
    }

    if(this.props.responsePromotion.length === 0) {
      this.props.dispatch(getProductPromotionalTagsAction())
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidMount() {
    waitTillUserInfoIsFetched().then(() => {
      this.initialize();
    })
  }

  render() {
    const { height, width } = Dimensions.get('window')
    let sellerDashboardVisible = UserHelper.getCompanyType()==='seller'?true:false
    return (
      <Container style={{backgroundColor: colorresource.materialbg}}>
        <GenericHeader
        leftConfig={{visible: false}}
        title={'Products'}
        otherRightConfigs={[{
          onPress: this.goToSearchScreen,
          icon: 'magnify'
        }]}
        wishlistConfig={{
          onPress: navigationActions.goToWishlist,
          visible: !sellerDashboardVisible,
          testId: buttonTestId("Wishlist"),
        }}
        cartConfig={{
          onPress: navigationActions.goToCarts,
          visible: !sellerDashboardVisible,
          testId: buttonTestId("Cart"),
        }}
        />
        <Content contentContainerStyle={{paddingVertical: 10, backgroundColor: colorresource.materialbg}}>
          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontFamily: fontresource.medium, fontSize: 15,}}>Categories</Text>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.props.responseCategory}
            contentContainerStyle={{paddingLeft: 5}}
            renderItem={({ item: rowData }) => 
              <PromoCategoryItem
              id={rowData.id}
              title={rowData.category_name}
              url={rowData.image.thumbnail_small} 
              noOfCards={rowData.length}
              onPress={this.onCategoryCollectionPress}
              onCollectionPress={this.onCategoryCollectionPress} 
              onSinglePcPress={this.onCategorySinglePcPress}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={{marginTop: 20}}>
            <Text style={{fontFamily: fontresource.medium, fontSize: 15, marginLeft: 5, marginBottom: 10}}>{'Collections'}</Text>
            <FlatList
            numColumns={2}
            data={this.props.responsePromotion}
            renderItem={({item, index}) => {
              return (
                <View style={{margin: 5}}>
                  <TouchableOpacity activeOpacity={1} onPress={() => this.onCollectionsPress(item.url)}>
                    <Image style={{height: width/2 - 10 , width: width/2 - 10,}} source={{uri: item.image.thumbnail_small}}/>
                  </TouchableOpacity>
                  <PromoButton onPress={() => this.onCollectionsCollectionPress(item.url)} style={{marginVertical: 5,}}/>
                  {ENABLE_SINGLE_PCS? <PromoButton text={'Single Pcs'} onPress={() => this.onCollectionsSinglePcPress(item.url)}/> : null}
                </View>
              );
            }}
            keyExtractor={(item, index) => item.id.toString()}
            />
          </View>
        </Content>
        <FAB
        style={{
          bottom: 0, 
          right: 0, 
          margin: 16, 
          position: 'absolute', 
          backgroundColor: colorresource.liteblue
        }}
        icon={'add'}
        onPress={this.onAddProductsPress}
        visible={!UserHelper.isUserBuyer()}
        />
        <DownloadWishbookApp ref={this.registerDownloadWishbookAppRef}/>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseCategory: state.masterListR.responseCategory,
    responsePromotion: state.promotionsR.responseGetProductPromotionalTags,
  })
}

export default connect(mapStateToProps)(ProductsTab);