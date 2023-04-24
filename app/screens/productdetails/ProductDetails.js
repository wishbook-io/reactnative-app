import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Modal,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlight,
  Linking,
  Clipboard
} from "react-native";
import {
  Icon,
  Container,
  CheckBox,
  Button,
  Row,
  Footer,
  FooterTab,
  Body
} from "native-base";
import { Chip, Button as PButton } from "react-native-paper";
import { connect } from "react-redux";
import _ from "lodash";

import Radio from "../../components/Radio/Radio";
import WCard from "app/components/Card/WCard";
import Loader from "../../components/Loader/loader";
import { HeaderBackNativeBase } from "../../components/Header";
import BecomeSeller from "../seller/BecomeSeller";
import SendEnquiryForm from "./SendEnquiry";
import ProductsImageViewer from "./ProductsImageViewer";
import StartSelling from "../seller/StartSelling";
import AddToCart from "app/screens/cart/AddToCart";
import GenericHeader from "app/components/Header/GenericHeader";
import * as FreshchatHelper from "app/utils/freshchat";
import CatalogDetailHeaderView from "./CatalogDetailHeaderView"

import UserHelper from "../../config/userHelper";
import DetailsDelivery from "./DetailsDelivery";
import ProductsItem from "./ProductsItem";
import Sharer from "app/utils/Sharer";
import { isInCart } from "app/screens/cart/serverHelper";
import { showConfirm } from "app/utils/notifier";
import { isInWishlist } from "app/screens/wishlist/serverHelper";
import { formatStringFromServer, rupeefy } from "app/utils/formatHelper";
import { formatCatalogDetails } from "app/screens/products/formatHelper";
import consts from "../../utils/const";
import { colorresource } from "../../resources/colorresource";
import styles from "./styles";

import {
  followBrandAction,
  unfollowBrandAction,
  getBrandhasPermissionAction
} from "../../actions/brand-actions";
import {
  addToWishlistAction,
  deleteFromWishlistAction
} from "../../actions/wishlist-actions";
import {
  sendCatalogEnquiryAction,
  disableSellCatalogAction,
  catalogViewedAction,
  getMyProductDetailsAction
} from "../../actions/catalog-actions";
import { getCatalogDetailsAction } from "../../actions/catalog-actions";
import * as navigationActions from "../../actions/navigation-actions";
import { showToastAction } from "app/actions/toast-actions";
import { waitTillUserInfoIsFetched } from "app/utils/debugHelper";
// import { openChatWithUser } from 'app/utils/ApplozicHelper';

import { TestIdGenerator } from "../../utils/TestingHelper";
import { getCategoryEavAction } from "../../actions/category-actions";
const screenName = "ProductDetailScreen";
const buttonIdGenerator = TestIdGenerator(screenName, "", "Button");
const textIdGenerator = TestIdGenerator(screenName, "", "Text");
const { height, width } = Dimensions.get("window");
const columns = 3;

const PRODUCT_TYPE_SET = "set";
const PRODUCT_TYPE_SINGLE = "single";

const EXCLUDED_EAV_DATA = ["gender", "fabric", "work", "other"];
const EAV_DATA_LABEL_MAPPER = {
  stitching_type: "Stitch",
  occasion_wear: "Occasion"
};

const BRAND_HAS_PERMISSION_ERROR_KEY = "BRAND_HAS_PERMISSION_ERROR_KEY";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      sendEnquiryModalVisibilty: false,
      curIndex: 0,
      data: {},
      start_selling: false,
      showBecomeSeller: false,
      companyProfile: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    this.props.dispatch(getCatalogDetailsAction(id));
    // waitTillUserInfoIsFetched().then(() => {
    this.setState({ companyProfile: UserHelper.getCompanyType() });
    // })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps[BRAND_HAS_PERMISSION_ERROR_KEY] !==
        this.props[BRAND_HAS_PERMISSION_ERROR_KEY] &&
      this.props[BRAND_HAS_PERMISSION_ERROR_KEY]
    ) {
      this.onBrandHasPermissionFailure();
    }

    if (
      prevProps.responseBrandHasPermission !==
      this.props.responseBrandHasPermission
    ) {
      this.onBrandHasPermissionSuccess();
    }

    if(prevProps.responseMyProductDetails !== this.props.responseMyProductDetails) {
      this.onMyProductDetailsFetched()
    }

    // debug start
    //if(prevProps.cacheSizeEavForCategory !== this.props.cacheSizeEavForCategory) {
    // this.onBrandHasPermissionSuccess()
    // this.stopSellingProduct()
    //}
    // debug end
  }

  registerSharerRef = r => {
    this.sharerRef = r && r.getWrappedInstance();
  };

  onSharePress = () => {
    if (!this.sharerRef) {
      console.warn("[onSharePress] ref unavailable");
      return;
    }

    const isReseller = UserHelper.isUserReseller();
    if (isReseller) {
      navigationActions.goToShareCatalog();
      return;
    }

    const pastableText = formatCatalogDetails(this.state.data);
    Clipboard.setString(pastableText);
    this.props.dispatch(
      showToastAction("Product description copied to Clipboard")
    );
    setTimeout(() => this.sharerRef.onOpen({showWhatsApp: true}), 300);
  };

  getProductsToShare = () => {
    return this.state.data.products;
  };

  registerAddToCartRef = r => {
    this.addToCartRef = r && r.getWrappedInstance();
  };

  onAddToCartSingle = id => {
    // console.log("[ProductDetails:onAddToCartSingle]", {id})
    this.addToCartRef.addToCart(id, this.onAddToCartFinish);
  };

  onAddToCart = () => {
    // console.log("[onAddToCart] params", params);
    this.addToCartRef.addToCart(
      this.props.responseCatalogDetails.id,
      this.onAddToCartFinish
    );
  };

  onAddToCartFinish = id => {
    // console.log("[onAddToCartFinish]");
  };

  onGoToCart = params => {
    navigationActions.goToCarts();
  };

  _onRefresh = () => {
    const { id } = this.props.navigation.state.params;
    this.myDetailsFetched = false;
    this.props.dispatch(getCatalogDetailsAction(id));
  };

  showImageViewer = () => {
    let products = this.returnImageData(this.state.data.product_type);
    let product_type = this.props.responseCatalogDetails.product_type;
    let fabric = this.props.responseCatalogDetails.eavdata.fabric;
    let work = this.props.responseCatalogDetails.eavdata.work;
    let price_per_design = this.props.responseCatalogDetails.price_per_design;
    let design_no = this.props.responseCatalogDetails.sku;
    const singleAllowed =
      !this.props.responseCatalogDetails.full_catalog_orders_only
    let obj = {};
    obj["products"] = products;
    obj["product_type"] = product_type;
    obj["fabric"] = fabric;
    obj["work"] = work;
    obj["price_per_design"] = price_per_design;
    obj["design_no"] = design_no;
    obj["singleAllowed"] = singleAllowed;
    obj["isSized"] = this.isProductSized();
    obj["fullCatalogProductId"] = this.props.responseCatalogDetails.id;
    obj["getSinglePiecePrice"] = this.getSinglePiecePrice;
    obj["isMyCatalog"] = this.isMyCatalog;
    navigationActions.goToProductsImageViewer(obj);
  };

  goBack = () => {
    this.props.navigation.dispatch({ type: "Navigation/BACK" });
    // this.props.navigation.goBack();
  };

  showEnquiryModal = () => {
    this.setState({
      sendEnquiryModalVisibilty: !this.state.sendEnquiryModalVisibilty
    });
  };

  startSellingModal = () => {
    this.setState({ start_selling: !this.state.start_selling });
  };

  getSizeEav = () => {
    const categoryId = this.props.responseCatalogDetails.category;
    const sizeEav = this.props.cacheSizeEavForCategory[categoryId];
    if (!sizeEav) {
      console.warn("Requesting getSizes for an unpopulated category");
      return;
    }
    return sizeEav;
  };

  amISellingFull = () => {
    const full = _.get(
      this.props.responseCatalogDetails,
      "supplier_details.i_am_selling_sell_full_catalog"
    );
    return full;
  };

  onPressStartSelling = () => {
    const full = this.amISellingFull();
    const sizeEav = this.getSizeEav();
    if (full && sizeEav.length === 0) {
      this.setState({ start_selling: true });
      return;
    }
    navigationActions.goToSizedStartStopSelling({ start: true, sizeEav, full });
  };

  stopSellingProduct = () => {
    const full = this.amISellingFull();
    const sizeEav = this.getSizeEav();
    if (full && sizeEav.length === 0) {
      this.props.dispatch(
        disableSellCatalogAction(this.props.responseCatalogDetails.id)
      );
      return;
    }
    navigationActions.goToSizedStartStopSelling({
      start: false,
      sizeEav,
      full
    });
  };

  onChatWithUsPress = () => {
    navigationActions.goToSupportChat();
  };

  shouldUpdateProfile = () => {
    if (!UserHelper.getCompanyname()) {
      this.props.dispatch(showToastAction("Please complete your profile"));
      this.props.navigation.navigate("UpdateBillingAddress");
      return true;
    }
    return false;
  };

  onBrandHasPermissionFailure = () => {
    // we need to show a confirmation if the user would like
    // to add this brand to his/her brands I sell list
    // and then proceed normally as onBrandHasPermissionSuccess
    showConfirm(
      screenName,
      "Please Allow",
      'This brand is not yet on your "Brand I Sell" list. Do you want to add this brand and sell this catalog?',
      this.onBrandHasPermissionSuccess
    );
  };

  onBrandHasPermissionSuccess = () => {
    navigationActions.goToBecomeSeller();
    this.setState({ showBecomeSeller: true });
  };

  becomeSeller = () => {
    if (this.shouldUpdateProfile()) {
      return;
    }
    var params = {};
    params["brand"] = this.props.responseCatalogDetails.brand.id;
    this.props.dispatch(
      getBrandhasPermissionAction(params, BRAND_HAS_PERMISSION_ERROR_KEY)
    );
  };
  followBrand = () => {
    let obj = {};
    obj["brand"] = this.props.responseCatalogDetails.brand.id;
    const { id } = this.props.navigation.state.params;
    this.props.dispatch(followBrandAction(obj, id));
  };
  sendEnquiry = obj => {
    console.log("sendEnquiry", obj);
    const { id } = this.props.navigation.state.params;
    this.props.dispatch(sendCatalogEnquiryAction(obj, id));
    this.showEnquiryModal();
  };

  removeFromWishlist = () => {
    //console.log('calling removeFromWishlist')
    const { id } = this.props.navigation.state.params;
    this.props.dispatch(deleteFromWishlistAction({ product: id }));
  };
  unFollowBrand = () => {
    console.log("calling unFollowBrand");
    let brandId = this.props.responseCatalogDetails.brand.is_followed;
    const { id } = this.props.navigation.state.params;
    this.props.dispatch(unfollowBrandAction(brandId, id));
  };
  addToWishlist = () => {
    const id = this.props.responseCatalogDetails.id;
    this.props.dispatch(addToWishlistAction({ product: id }, true, false));
  };
  hide_become_seller_view = () => {
    this.setState({ showBecomeSeller: false });
  };
  returnImageData = product_type => {
    if (product_type === "set") {
      return this.props.responseCatalogDetails.photos;
    } else {
      return this.props.responseCatalogDetails.products;
    }
  };

  flag_UserIsSellerOfCatalog = () => {
    // console.log('flag_UserIsSellerOfCatalog',UserHelper.getUsercompany_id(),this.props.responseCatalogDetails.company)
    if (
      UserHelper.getUsercompany_id() ===
      this.props.responseCatalogDetails.company
    )
      return true;
    else return false;
  };

  userIsOwnerOfBrand = () => {
    const userCompanyId = UserHelper.getUsercompany_id();
    const brandOwnerCompanyId = _.get(
      this.props.responseCatalogDetails,
      "brand.company_id"
    );
    return userCompanyId === brandOwnerCompanyId;
  };

  returnPolicy = policyObject => {
    if (
      this.props.responseCatalogDetails.supplier_details.seller_policy ===
      undefined
    )
      return null;
    else {
      for (
        let i = 0;
        i <
        this.props.responseCatalogDetails.supplier_details.seller_policy.length;
        i++
      ) {
        let obj = this.props.responseCatalogDetails.supplier_details
          .seller_policy[i];
        // console.log('policy_type',policyObject[i],obj["policy"])
        if (obj["policy_type"] === policyObject) return obj["policy"];
      }
    }
    return null;
  };

  isProductSized = () => {
    return false; // <---- TODO: feature pending from server
    const sizeItems = _.get(
      this.props.responseCatalogDetails,
      "eavdata.size.length",
      0
    );
    const isSized =
      sizeItems > 1 && this.props.responseCatalogDetails.product_type !== "set";
    return isSized;
  };

  isUserApprovalStatusPending = () => {
    // console.log("[isUserApprovalStatusPending]", UserHelper.getUserApprovalStatus())
    const pending = UserHelper.isUserApprovalStatus(
      consts.SELLER_APPROVAL_PENDING
    );
    return pending;
  };

  canBecomeASupplier = () => {
    const data = this.state.data;
    const flag =
      this.state.companyProfile === "all" &&
      !(data.product_type === "noncatalog" || data.product_type === "set") &&
      this.flag_UserIsSellerOfCatalog() === false &&
      data.supplier_details.i_am_selling_this === false &&
      data.view_permission === "public";
    return flag;
  };

  chatWbSupportHandler = () => {
    FreshchatHelper.chatWbSupport();
  };

  callWbSupportHandler = () => {
    Linking.openURL("tel:+919978618989");
  };

  hideAddToCartSingleButton = index => {
    const data = this.state.data;
    const hide =
      (data.supplier_details.i_am_selling_this && !data.buyer_disabled) ||
      this.flag_UserIsSellerOfCatalog() === true ||
      this.state.companyProfile === "seller" ||
      (data.products[index] && data.products[index].selling === false);
    return hide;
  };

  hideAddToCartCatalogButton = () => {
    const data = this.state.data;
    const hide =
      (data.supplier_details.i_am_selling_this && !data.buyer_disabled) ||
      this.flag_UserIsSellerOfCatalog() === true ||
      this.state.companyProfile === "seller" ||
      data.selling === false;
    return hide;
  };

  onMyProductDetailsFetched = () => {
    this.myDetailsFetched = true;

    const myDetails = this.props.responseMyProductDetails
    const isOwner = myDetails.is_owner
    const isSeller = myDetails.is_seller
    if(isOwner || isSeller) {
      this.isMyCatalog = true
      this.props.dispatch(getCatalogDetailsAction(
        this.props.responseCatalogDetails.id, false, {view_type: 'mycatalogs'}
      ));
    }
  }

  fetchMyDetails = (id) => {
    id = id || this.props.responseCatalogDetails.id
    this.props.dispatch(getMyProductDetailsAction(id))
  }

  fetchSizeEav = categoryId => {
    if (!this.props.cacheSizeEavForCategory[categoryId]) {
      this.props.dispatch(getCategoryEavAction(categoryId, "size"));
    }
  };

  getSinglePiecePrice = (index) => {
    const products = this.returnImageData(this.state.data.product_type)
    let singlePiecePrice, singleDiscount = products[index].single_discount, mwp

    if(this.isMyCatalog && (products.length === this.props.responseMyProductDetails.products.length)) {
      const myDetails = this.props.responseMyProductDetails.products[index]
      singlePiecePrice = myDetails.single_piece_price
      mwp = myDetails.mwp_price
    } else {
      singlePiecePrice = products[index].single_piece_price
      mwp = products[index].mwp_single_price
    }
    return {singlePiecePrice, mwp, singleDiscount}
  }

  renderProductsItem = ({ item, index }) => {
    const hideAddToCartButton = this.hideAddToCartSingleButton(index);
    const fullCatalogOrders = this.state.data.full_catalog_orders_only;
    const onAddToCartSingle =
      hideAddToCartButton || fullCatalogOrders
        ? undefined
        : this.onAddToCartSingle;
    return <ProductsItem 
      onAddToCartSingle={onAddToCartSingle} 
      data={item} 
      showImageViewer={this.showImageViewer}
      isFullCatalog={fullCatalogOrders}
      price={this.getSinglePiecePrice(index).singlePiecePrice}
    />;
  };

  componentWillReceiveProps(nextProps) {
    //   console.log('componentWillUpdate',prevProps.responseCatalogDetails,this.props.responseCatalogDetails)
    if (
      nextProps.responseCatalogDetails !== this.props.responseCatalogDetails
    ) {
      this.setState({
        data: nextProps.responseCatalogDetails
      }, () => {
        if(this.myDetailsFetched) {
          this.catalogHasMyDetails = true
        }
      });
      if(!this.myDetailsFetched) {
        this.props.dispatch(
          catalogViewedAction({ product: nextProps.responseCatalogDetails.id })
        );
        this.fetchSizeEav(nextProps.responseCatalogDetails.category);
        this.fetchMyDetails(nextProps.responseCatalogDetails.id)
      }
      // setTimeout(this.onSharePress, 3000)
    }
  }

  render() {
    const data = this.state.data;
    //console.log('data in products details',UserHelper.getCompanyType(),this.props.responseCatalogDetails)
    if (_.isEmpty(this.props.responseCatalogDetails) || _.isEmpty(data)) {
      return (
        <Container>
          <GenericHeader title={"Product Details"} />
        </Container>
      );
    }
    const productsNull = data.products
    if(!productsNull) {
      console.log("products null", { data })
      return null;
    }
    const shouldGoToCart =
      !this.isProductSized() &&
      isInCart(
        this.props.responseCatalogDetails.id,
        this.props.responseCartDetails
      );
    const isSet = data.product_type === PRODUCT_TYPE_SET;
    const isSingle = data.product_type === PRODUCT_TYPE_SINGLE;

    return (
      <Container>
        {/* <BecomeSeller onPress={this.hide_become_seller_view} showBecomeSeller ={this.state.showBecomeSeller} catalogDetails={data} /> */}
        <GenericHeader
          title={"Product Details"}
          leftConfig={{
            onPress: this.goBack,
            visible: true,
            icon: "arrow-back",
            testId: buttonIdGenerator("BackButton")
          }}
          wishlistConfig={{
            onPress: () => navigationActions.goToWishlist(),
            visible: true,
            // count: this.props.responseStatistics['wishlist'],
            testId: buttonIdGenerator("Wishlist")
          }}
          cartConfig={{
            onPress: () => navigationActions.goToCarts(),
            visible: true,
            // count: this.props.responseStatistics['total_cart_items'],
            testId: buttonIdGenerator("Cart")
          }}
          notificationConfig={{
            visible: false
          }}
        />
        <SendEnquiryForm
          sendEnquiryModalVisibilty={this.state.sendEnquiryModalVisibilty}
          onPress={this.showEnquiryModal}
          userDetails={this.props.userDetails[0]}
          sendEnquiry={this.sendEnquiry}
          data={data}
        />
        <StartSelling
          start_selling={this.state.start_selling}
          onPress={this.startSellingModal}
          catalogDetails={data}
        />
        <Loader loading={this.props.loaderOverProductDetails} />

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoading}
              onRefresh={this._onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          vertical={true}
          contentContainerStyle={{
            flexDirection: "column",
            backgroundColor: colorresource.materialbg
          }}
        >
          {/*----------------------------------------------------------------------------------------*/}
          {/* Catalog details - category details/image/follow&sharebutton*/}
          {/*----------------------------------------------------------------------------------------*/}

          <View style={styles.CatalogDetailView}>
            <CatalogDetailHeaderView
              data={this.state.data}
              isMyCatalog={this.isMyCatalog}
              responseMyProductDetails={this.props.responseMyProductDetails}
            />
              
            <View style={styles.CatalogDetailButtonView}>
              <View style={styles.CatalogDetailButtonDetailView}>
                {this.flag_UserIsSellerOfCatalog() === true ||
                this.state.companyProfile === "seller" ? null : !isInWishlist(
                    data.id,
                    this.props.responseWishlist
                  ) ? (
                  <TouchableHighlight
                    {...buttonIdGenerator("AddToWishlist")}
                    underlayColor="transparent"
                    style={{ flexDirection: "column", alignItems: "center" }}
                    onPress={this.addToWishlist}
                  >
                    <View
                      style={{ flexDirection: "column", alignItems: "center" }}
                    >
                      <View style={styles.CircleIcon}>
                        <Icon
                          name="bookmark-outline"
                          type="MaterialCommunityIcons"
                          style={{
                            color: colorresource.liteblue,
                            fontSize: 27,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                          }}
                        />
                      </View>
                      <Text style={{ color: colorresource.liteblue }}>
                        Add to Wishlist
                      </Text>
                    </View>
                  </TouchableHighlight>
                ) : (
                  <TouchableHighlight
                    {...buttonIdGenerator("RemoveFromWishlist")}
                    underlayColor="transparent"
                    style={{ flexDirection: "column", alignItems: "center" }}
                    onPress={this.removeFromWishlist}
                  >
                    <View
                      style={{ flexDirection: "column", alignItems: "center" }}
                    >
                      <View
                        style={[
                          styles.CircleIcon,
                          { backgroundColor: colorresource.liteblue }
                        ]}
                      >
                        <Icon
                          name="bookmark"
                          type="MaterialCommunityIcons"
                          style={{
                            fontSize: 27,
                            color: "white",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                          }}
                        />
                      </View>
                      <Text style={{ color: colorresource.liteblue }}>
                        Added to Wishlist
                      </Text>
                    </View>
                  </TouchableHighlight>
                )}

                <TouchableHighlight
                  {...buttonIdGenerator("Share")}
                  underlayColor="transparent"
                  style={{ flexDirection: "column", alignItems: "center" }}
                  onPress={this.onSharePress}
                >
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <View
                      style={[
                        styles.CircleIcon,
                        { backgroundColor: colorresource.liteblue }
                      ]}
                    >
                      <Icon
                        name="share"
                        style={{
                          fontSize: 24,
                          color: "white",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0
                        }}
                        type="MaterialCommunityIcons"
                      />
                    </View>
                    <Text style={{ color: colorresource.liteblue }}>Share</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={this.showImageViewer} 
              style={{position: 'absolute', marginLeft: 10, marginTop: 10}}
            >
            <Image
              source={{ uri: data.image.thumbnail_medium }}
              style={styles.CatalogDetailImageView}
              resizeMode={"contain"}
            />
            </TouchableOpacity>
          </View>
          {/*----------------------------------------------------------------------------------------*/}
          {/* Brand details - thumbnail image/name/followbutton*/}
          {/*----------------------------------------------------------------------------------------*/}
          {data.brand === null || _.isEmpty(data.brand) ? null : (
            <View
              style={{
                paddingTop: 10,
                marginBottom: 10,
                paddingLeft: 10,
                backgroundColor: "white"
                //borderWidth: 1,
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
                      {data.brand_name +
                        (true ? "" : "unnecessarily long name suffixed")}
                    </Text>
                  </View>
                </View>
                <View style={styles.BrandDetailFollowButtonView}>
                  {this.state.companyProfile === "seller" ||
                  this.userIsOwnerOfBrand() === true ? null : data.brand
                      .is_followed === undefined ||
                    data.brand.is_followed === null ? (
                    <Chip
                      {...buttonIdGenerator("Follow")}
                      mode={"outlined"}
                      theme={{ colors: { text: colorresource.liteblue } }}
                      onPress={this.followBrand}
                      style={{ borderColor: colorresource.liteblue }}
                    >
                      {"+ Follow"}
                    </Chip>
                  ) : (
                    <Chip
                      {...buttonIdGenerator("UnFollow")}
                      mode={"flat"}
                      theme={{ colors: { text: "white" } }}
                      onPress={this.unFollowBrand}
                      style={{ backgroundColor: colorresource.liteblue }}
                    >
                      {"Following"}
                    </Chip>
                  )}
                </View>
              </View>
            </View>
          )}

          <DetailsDelivery data={data} />

          <View style={{ backgroundColor: "#F0F0F0", height: 10 }} />

          {// data.product_type==="noncatalog"?
          data.ready_to_ship === false ? (
            <View
              style={[styles.CatalogItemLabel, { backgroundColor: "orange" }]}
            >
              <Text
                {...textIdGenerator("PreLaunchTag")}
                style={styles.CatalogItemLabelText}
              >
                Pre-Launch
              </Text>
            </View>
          ) : null}

          <View style={{ backgroundColor: "#F0F0F0" }}>
            {this.canBecomeASupplier() ? (
              this.isUserApprovalStatusPending() ? (
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                  <Text style={{ fontSize: 14, textAlign: "center" }}>
                    {"Your Wishbook Supplier Status Review is "}
                    <Text style={{ color: "#ffaa00", fontSize: 14 }}>
                      {"Pending."}
                    </Text>
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    <View style={{ marginHorizontal: 20 }}>
                      <PButton
                        mode={"outlined"}
                        theme={{ colors: { primary: colorresource.green } }}
                        {...buttonIdGenerator("CallWbSupport")}
                        onPress={() => this.callWbSupportHandler()}
                        icon={"call"}
                      >
                        {"Call WB Support"}
                      </PButton>

                      <PButton
                        mode={"outlined"}
                        style={{ marginTop: 20 }}
                        {...buttonIdGenerator("ChatWbSupport")}
                        onPress={() => this.chatWbSupportHandler()}
                        icon={"chat"}
                      >
                        {"Chat WB Support"}
                      </PButton>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                    marginBottom: 10
                  }}
                >
                  <PButton
                    {...buttonIdGenerator("BecomeSupplier")}
                    mode={"outlined"}
                    uppercase={false}
                    style={{ borderColor: colorresource.liteblue }}
                    onPress={this.becomeSeller}
                  >
                    {"Become a supplier of this catalog"}
                  </PButton>
                </View>
              )
            ) : null}
            {(data.supplier_details.i_am_selling_this ||
              this.flag_UserIsSellerOfCatalog() === true) &&
            data.buyer_disabled === true &&
            !this.isUserApprovalStatusPending() ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  marginBottom: 10,
                  marginHorizontal: 20
                }}
              >
                <Text style={{ color: colorresource.green, marginBottom: 10 }}>
                  {consts.START_SELLING}
                </Text>
                {/* <TouchableHighlight {...buttonIdGenerator("StartSelling")} underlayColor={'transparent'} onPress={()=>this.setState({start_selling:true})} style={{borderRadius:6,padding:5,borderColor:colorresource.blue,borderWidth:1,alignItems:'center',justifyContent:'center'}}>
                    <Text adjustsFontSizeToFit style={{color:colorresource.blue}}>Start Selling Again</Text>
                </TouchableHighlight> */}

                <PButton
                  {...buttonIdGenerator("StartSelling")}
                  mode={"outlined"}
                  uppercase={false}
                  style={{ borderColor: colorresource.liteblue, width: "100%" }}
                  onPress={this.onPressStartSelling}
                >
                  {"Start Selling Again"}
                </PButton>
              </View>
            ) : null}
            {data.supplier_details.i_am_selling_this &&
            data.buyer_disabled === false ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  marginBottom: 10,
                  marginHorizontal: 20
                }}
              >
                <Text
                  style={{ color: colorresource.darkgreen, marginBottom: 10 }}
                >
                  {consts.STOP_SEELING}
                </Text>

                {/* <TouchableHighlight {...buttonIdGenerator("StopSelling")} underlayColor={'transparent'} onPress={this.stopSellingProduct} style={{borderRadius:6,padding:5,borderColor:colorresource.blue,borderWidth:1,alignItems:'center',justifyContent:'center'}}>
                <Text adjustsFontSizeToFit style={{color:colorresource.blue}}>Stop Selling</Text>
            </TouchableHighlight> */}

                <PButton
                  {...buttonIdGenerator("StopSelling")}
                  mode={"outlined"}
                  uppercase={false}
                  style={{ borderColor: colorresource.liteblue, width: "100%" }}
                  onPress={this.stopSellingProduct}
                >
                  {"Stop Selling"}
                </PButton>
              </View>
            ) : null}
          </View>

          <View style={{ backgroundColor: "#F0F0F0", paddingVertical: 10 }}>
            <FlatList
              data={this.returnImageData(data.product_type)}
              keyExtractor={item => item.sku}
              numColumns={columns}
              renderItem={this.renderProductsItem}
            />
          </View>
          <View
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              paddingBottom: 10,
              backgroundColor: "#F0F0F0"
            }}
          >
            <PButton
              {...buttonIdGenerator("ChatWithUs")}
              mode={"outlined"}
              uppercase={false}
              style={{ borderColor: colorresource.liteblue }}
              onPress={this.onChatWithUsPress}
            >
              {"Chat With Us"}
            </PButton>
          </View>
        </ScrollView>

        {this.hideAddToCartCatalogButton() ? null : (
          <>
            <View style={{ backgroundColor: "#F0F0F0", height: 3 }} />
            <Footer style={{}}>
              <FooterTab>
                <Button
                  style={{ backgroundColor: colorresource.orange }}
                  onPress={shouldGoToCart ? this.onGoToCart : this.onAddToCart}
                  {...buttonIdGenerator("AddOrGoToCart")}
                >
                  <Text style={styles.CartButtonText}>
                    {shouldGoToCart ? "GO TO CART" : "ADD TO CART"}
                  </Text>
                </Button>
              </FooterTab>
            </Footer>
          </>
        )}

        <AddToCart ref={this.registerAddToCartRef} />
        <Sharer
          ref={this.registerSharerRef}
          getSelectedSinglePcs={this.getProductsToShare}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.catalogR.isLoading,
    responseCatalogDetails: state.catalogR.responseCatalogDetails,
    error: state.catalogR.error,
    loaderOverProductDetails: state.catalogR.isLoadingOverUI,
    userDetails: state.verifyotpR.userInfo,
    responseCartDetails: state.cartR.responseGetCatalogWiseCartDetails,
    cartCount: state.cartR.cartCount,
    [BRAND_HAS_PERMISSION_ERROR_KEY]:
      state.errorHandlerR[BRAND_HAS_PERMISSION_ERROR_KEY],
    responseBrandHasPermission: state.brandsR.responseBrandHasPermission,
    responseWishlist: state.wishlistR.responseWishlist,
    cacheSizeEavForCategory: state.categoryR.cacheSizeEavForCategory,
    responseMyProductDetails: state.catalogR.responseGetMyProductDetails,
  };
};

export default connect(mapStateToProps)(ProductDetails);

const KeyValueDetail = ({ keyString, value, testId = {} }) => {
  value = Array.isArray(value) ? value.join(", ") : value;
  return (
    <View style={styles.TextLineView}>
      <View style={styles.TextLineViewTitle}>
        <Text style={{ color: "gray", fontSize: 12 }}>{keyString + " :"}</Text>
      </View>
      <View style={styles.TextLineViewValue}>
        <Text {...testId} style={{ color: "black", fontSize: 12 }}>
          {value}
        </Text>
      </View>
    </View>
  );
};
