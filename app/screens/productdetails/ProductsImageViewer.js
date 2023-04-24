import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { Icon, Container, CheckBox, Radio, Button } from "native-base";
import Swiper from "react-native-swiper";
import PhotoView from "react-native-photo-view";
import { connect } from "react-redux";

import Modal from "app/components/Modal/Modal";
import PinchZoomView from "./ZoomableImage";
import { Badge } from "app/components/Header/GenericHeader";
import AddToCart from "app/screens/cart/AddToCart";
import { isInCart } from "app/screens/cart/serverHelper";
import UserHelper from "../../config/userHelper";
import { rupeefy } from 'app/utils/formatHelper'
import { goBack, goToCarts } from "../../actions/navigation-actions";
import { isWeb } from "app/utils/PlatformHelper";
import { colorresource } from "../../resources/colorresource";
const { height, width } = Dimensions.get("window");

import { TestIdGenerator } from "../../utils/TestingHelper";
const buttonIdGenerator = TestIdGenerator("ProductImageViewer", "", "Button");

class ProductsImageViewer extends Component {
  constructor(props) {
    super(props);
    const {
      products,
      product_type,
      fabric,
      work,
      price_per_design,
      design_no,
      singleAllowed,
      isSized,
      fullCatalogProductId,
      getSinglePiecePrice,
      isMyCatalog
    } = props.navigation.state.params;
    //console.log('params',props.navigation.state.params)
    this.state = {
      showsButtons: true,
      products: products,
      product_type: product_type,
      fabric: fabric,
      work: work,
      design_no: design_no,
      price_per_design: price_per_design,
      singleAllowed,
      isSized,
      fullCatalogProductId,
      getSinglePiecePrice,
      isMyCatalog
    };
  }

  toggleButtons = () => {
    this.setState({ showsButtons: !this.state.showsButtons });
  };

  registerAddToCartRef = r => {
    this.addToCartRef = r && r.getWrappedInstance();
  };

  onAddToCartFinish = () => {};

  onAddToCart = id => {
    this.addToCartRef.addToCart(id, this.onAddToCartFinish);
  };

  onAddToCartSinglePress = index => {
    const productId = this.state.products[index].id;
    console.log("[onAddToCartSinglePress] index, productId", index, productId);
    if (this.state.products.length === 1) {
      // treat this as full catalog
      this.onAddToCart(this.state.fullCatalogProductId);
    } else {
      this.onAddToCart(productId);
    }
  };

  onGoToCartSinglePress = () => {
    goToCarts();
  };

  render() {
    //console.log('ProductsImageViewer',this.state.products,this.state.price_per_design)
    return (
      <Fragment>
        <Swiper
          showsButtons={this.state.showsButtons}
          showsPagination={false}
          prevButtonElement={
            <View style={{}}>
              <Icon
                name="chevron-left"
                type={"MaterialIcons"}
                style={{ color: "white", fontSize: 30 }}
              />
            </View>
          }
          dotElement={<View />}
          activeDotElement={<View />}
          nextButtonElement={
            <View style={{}}>
              <Icon
                name="chevron-right"
                type={"MaterialIcons"}
                style={{ color: "white", fontSize: 30 }}
              />
            </View>
          }
          controlsWrapperStyle={{}}
        >
          {this.state.products !== undefined
            ? this.state.products.map((item, index) => {
                const {singlePiecePrice, mwp, singleDiscount} = this.state.getSinglePiecePrice(index)
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "black",
                      alignItems: "center",
                      flex: 1,
                      flexDirection: "column"
                    }}
                  >
                    <View
                      style={{
                        height: height,
                        width: width,
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}
                    >
                      {item.image.thumbnail_medium === undefined ? null : (
                        <PhotoView
                          source={{ uri: item.image.thumbnail_medium }}
                          maximumZoomScale={3}
                          androidScaleType="center"
                          onTap={this.toggleButtons}
                          style={{ flex: 1, backgroundColor: "black" }}
                          {...(isWeb ? { resizeMode: "contain" } : {})}
                        />
                      )}
                      {isWeb ? (
                        <TouchableOpacity
                          underlayColor={"transparent"}
                          style={{
                            position: "absolute",
                            height: height,
                            width: width
                          }}
                          onPress={this.toggleButtons}
                          activeOpacity={1}
                        />
                      ) : null}

                      {this.state.showsButtons ? (
                        <View
                          style={{
                            height: height * 0.1,
                            width: width,
                            flexDirection: "row",
                            position: "absolute",
                            justifyContent: "space-between",
                            paddingHorizontal: 10
                          }}
                        >
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Button
                              transparent
                              onPress={() => goBack()}
                              style={{
                                elevation: 5,
                                shadowColor: "#000000",
                                shadowOpacity: 0.8,
                                padding: 5
                              }}
                            >
                              <Icon
                                onPress={isWeb ? undefined : goBack}
                                {...buttonIdGenerator("Back")}
                                name="arrow-back"
                                style={{ color: "white", fontSize: 34 }}
                              />
                            </Button>
                          </View>

                          {UserHelper.getCompanyType() === "seller" ? null : (
                            <View
                              style={{
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <TouchableHighlight
                                onPress={goToCarts}
                                style={{
                                  elevation: 5,
                                  width: 40,
                                  height: 40,
                                  borderRadius: 20,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: "white",
                                  shadowColor: "#000000",
                                  shadowOpacity: 0.8,
                                  marginRight: 10
                                }}
                              >
                                <Icon
                                  name="cart"
                                  style={{ color: "black", fontSize: 34 }}
                                />
                              </TouchableHighlight>
                              <Badge count={this.props.cartCount} />
                            </View>
                          )}
                        </View>
                      ) : (
                        <View
                          style={{
                            height: height * 0.1,
                            width: width,
                            flexDirection: "row",
                            position: "absolute"
                          }}
                        />
                      )}

                      {this.state.showsButtons ? (
                        <View
                          style={{
                            width: width,
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            alignSelf: "flex-end",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            position: "absolute",
                            bottom: 15
                          }}
                        >
                          {this.state.product_type === "set" ||
                          !this.state.singleAllowed ? (
                              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                            <Text
                              style={{
                                color: "white",
                                fontSize: 14,
                              }}
                            >
                              {'Price : '}
                              {this.state.product_type === "set"
                                ? "₹" + this.state.price_per_design + "/Pc."
                                : "₹" + item.public_price + "/Pc."}
                                {'  '}<Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{rupeefy(mwp)}</Text>
                            </Text>
                            <View style={{backgroundColor: colorresource.darkgreen, marginLeft: 10, paddingHorizontal: 3, borderRadius: 3}}>
                                <Text style={{color: 'white'}}>{item.full_discount + ' % off'}</Text>
                            </View>
                            </View>
                          ) : (
                              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{ color: "white", fontSize: 14 }}>
                              {'Single Pcs. : ' + rupeefy(singlePiecePrice) + "/Pc."}
                              {'  '}<Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{rupeefy(mwp)}</Text>
                            </Text>
                            <View style={{backgroundColor: colorresource.darkgreen, marginLeft: 10, paddingHorizontal: 3, borderRadius: 3}}>
                                <Text style={{color: 'white'}}>{singleDiscount + ' % off'}</Text>
                            </View>
                            </View>
                          )}
                          <Text style={{ color: "white", fontSize: 12 }}>
                            Design No :{" "}
                            {this.state.product_type === "set"
                              ? this.state.design_no
                              : item.sku}{" "}
                          </Text>
                          <Text style={{ color: "white", fontSize: 12 }}>
                            Fabric :{" "}
                            {this.state.product_type === "set"
                              ? this.state.fabric
                              : item.fabric}{" "}
                          </Text>
                          <Text style={{ color: "white", fontSize: 12 }}>
                            Work :{" "}
                            {this.state.product_type === "set"
                              ? this.state.work
                              : item.work}{" "}
                          </Text>
                          {this.state.singleAllowed &&
                          !this.state.isMyCatalog ? (
                            <View
                              style={{
                                marginTop: 10,
                                alignSelf: "center",
                                borderRadius: 7,
                                borderWidth: 1,
                                borderColor: "white",
                                marginBottom: isWeb ? 20 : 0
                              }}
                            >
                              {isInCart(
                                item.id,
                                this.props.responseCartDetails
                              ) && !this.state.isSized ? (
                                <Text
                                  style={{
                                    color: "white",
                                    fontSize: 15,
                                    padding: 7
                                  }}
                                  onPress={goToCarts}
                                >
                                  GO TO CART
                                </Text>
                              ) : (
                                <Text
                                  style={{
                                    color: "white",
                                    fontSize: 15,
                                    padding: 7
                                  }}
                                  onPress={() =>
                                    this.onAddToCartSinglePress(index)
                                  }
                                >
                                  ADD TO CART
                                </Text>
                              )}
                            </View>
                          ) : null}
                        </View>
                      ) : null
                      //  <View style={{height:height*0.1,width:width,padding:10,marginBottom:5, alignSelf:'flex-end',backgroundColor:'rgba(0,0,0,0.5)',position:'relative'}}/>
                      }
                    </View>
                  </View>
                );
              })
            : null}
        </Swiper>
        <AddToCart ref={this.registerAddToCartRef} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    responseCartDetails: state.cartR.responseGetCatalogWiseCartDetails,
    cartCount: state.cartR.cartCount
  };
};

export default connect(mapStateToProps)(ProductsImageViewer);
