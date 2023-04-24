import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  Icon,
  Container,
  Button,
} from "native-base";
import { Chip, Button as PButton } from "react-native-paper";
import FastImage from 'react-native-fast-image';
import { connect } from "react-redux";
import _ from "lodash";

import WCard from 'app/components/Card/WCard';
import GenericHeader from "app/components/Header/GenericHeader";
import CatalogDetailHeaderView from "./CatalogDetailHeaderView"


import LoginFlow from 'app/screens/login/LoginFlow';
import ProductsItem from "./ProductsItem";
import DetailsDelivery from "./DetailsDelivery";
import { colorresource } from "../../resources/colorresource";
import styles from "./styles";
import { AndroidBackHandler } from 'react-navigation-backhandler'

import { getGuestProductDetailsAction } from "../../actions/catalog-actions";


import { TestIdGenerator } from "../../utils/TestingHelper";
const screenName = "GuestProductDetailScreen";
const buttonIdGenerator = TestIdGenerator(screenName, "", "Button");
const textIdGenerator = TestIdGenerator(screenName, "", "Text");
const buttonTestId = TestIdGenerator(screenName, '', "Button")

const columns = 3

class GuestProductDetails extends Component {
  
  componentDidMount() {
    const urlKey = this.props.navigation.state.params.urlKey;
    // console.log("params in component", urlKey)
    this.props.dispatch(getGuestProductDetailsAction(urlKey));
  
  }
  
  returnImageData = product_type => {
    if (product_type === "set") {
      return this.props.responseGetGuestProductDetails.photos;
    } else {
      return this.props.responseGetGuestProductDetails.products;
    }
  };
  
  getSinglePiecePrice = (index) => {
    const products = this.returnImageData(this.props.responseGetGuestProductDetails.product_type)
    return products[index].single_piece_price
  }
  
  registerLoginFlowRef = (r) => {
    this.loginFlowRef = r && r.getWrappedInstance();
  }
  
  renderProductsItem = ({ item, index }) => {
    // console.log("item",item.image.thumbnail_medium) 
    const fullCatalogOrders = this.props.responseGetGuestProductDetails.full_catalog_orders_only;
    return <ProductsItem 
      onAddToCartSingle={false} 
      data={item} 
      isFullCatalog={fullCatalogOrders}
      price={this.getSinglePiecePrice(index)}
    />;  
  };
  
  goBack = () => {
    if(this.loginFlowRef) {
      this.loginFlowRef.startLoginFlow();
    } else {
      console.warn('FATAL: login flow ref is not registered');
    }
  }
  
  
  render(){    
    const data = this.props.responseGetGuestProductDetails
    
    if (_.isEmpty(this.props.responseGetGuestProductDetails) || _.isEmpty(data)) {
      return (
        <Container>
          <GenericHeader title={"Product Details"} />
          <LoginFlow 
          ref={this.registerLoginFlowRef}
          showLoading={false}
          skipKeyCheck={false}
          />
        <AndroidBackHandler name={'GuestProductDetails'} onBackPress={this.goBack}/>
        </Container>
      );
    }
    // console.log("image thumbnails",data.products[0].image.thumbnail_medium)
    return(
      <Container>
        <LoginFlow 
        ref={this.registerLoginFlowRef}
        showLoading={false}
        skipKeyCheck={false}
        />
        <GenericHeader
          title={"Product Details"}
          leftConfig={{
            onPress: this.goBack,
            visible: true,
            icon: "arrow-back",
            testId: buttonIdGenerator("BackButton")
          }}
          wishlistConfig={{
            // onPress: () => navigationActions.goToWishlist(),
            visible: false,
            // count: this.props.responseStatistics['wishlist'],
            testId: buttonIdGenerator("Wishlist")
          }}
          cartConfig={{
            // onPress: () => navigationActions.goToCarts(),
            visible: false,
            // count: this.props.responseStatistics['total_cart_items'],
            testId: buttonIdGenerator("Cart")
          }}
          notificationConfig={{
            visible: false
          }}
        />
        <AndroidBackHandler name={'GuestProductDetails'} onBackPress={this.goBack}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          vertical={true}
          contentContainerStyle={{
            flexDirection: "column",
            backgroundColor: colorresource.materialbg
          }}
        >     
        
          <View style={styles.CatalogDetailView}>
            <CatalogDetailHeaderView
              data={data}
              isMyCatalog={false}
              // product_type={'catalog'}
              // responseMyProductDetails={this.props.responseMyProductDetails}
            />
            
          </View>
        
          <TouchableOpacity activeOpacity={1} onPress={this.showImageViewer} 
            style={{position: 'absolute', marginLeft: 10, marginTop: 10}}
          >
          <Image
            source={{ uri: data.thumbnail.thumbnail_medium }}
            style={styles.CatalogDetailImageView}
            resizeMode={"contain"}
          />
          </TouchableOpacity>
        
          {data.brand? <View
            style={{
              paddingTop: 10,
              marginBottom: 10,
              paddingLeft: 10,
              backgroundColor: "white",
              // borderWidth: 1,
              //borderColor: 'purple'
            }}
          >
            <Text style={{ fontSize: 16, color: "black" }}>Brand</Text>
            <View style={styles.BrandDetailView}>
              <View
                style={{
                  flexDirection: "row",
                  flexGrow: 1 // req
                  // borderWidth: 1,
                  // borderColor: 'purple',
                }}
              >
                <Image
                  source={{ uri: data.brand.image.thumbnail_small }}
                  style={styles.BrandDetailThumbnail}
                  resizeMode={"contain"}
                />
                <View style={styles.BrandDetailTextView}>
                  <Text
                    {...textIdGenerator("BrandName")}
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: colorresource.grey46,
                      alignSelf: "center"
                    }}
                  >
                    {data.brand.name +
                      (true ? "" : "unnecessarily long name suffixed")}
                  </Text>
                </View>
              </View>
            </View>
          </View> : null}
        
          <DetailsDelivery data={data} isGuest={true}/>
        
          <View style={{ backgroundColor: "#F0F0F0", paddingVertical: 10 }}>
            <FlatList
            data={data.products}
            keyExtractor={item => item.sku}
            numColumns={columns}
            renderItem={this.renderProductsItem}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    responseGetGuestProductDetails: state.catalogR.responseGetGuestProductDetails
    
  }
}

export default connect(mapStateToProps) (GuestProductDetails);
