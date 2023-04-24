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

import { colorresource } from "../../resources/colorresource";
import styles from "./styles";


import { TestIdGenerator } from "../../utils/TestingHelper";
const screenName = "ProductDetailScreen";
const buttonIdGenerator = TestIdGenerator(screenName, "", "Button");
const textIdGenerator = TestIdGenerator(screenName, "", "Text");

const PRODUCT_TYPE_SET = "set";
const PRODUCT_TYPE_NON_CATALOG = 'noncatalog'

class CatalogDetailHeaderView extends Component {
  
  hideFullPrice = () => {
    const data = this.props.data
    const notSet = data.product_type !== PRODUCT_TYPE_SET;
    const notNoncat = data.product_type !== PRODUCT_TYPE_NON_CATALOG;
    const notOneProduct = !data.products || data.products.length !== 1
    const notSelling = this.props.data.selling === false;
    if(notSet && notNoncat && notOneProduct && notSelling) {
      return true;
    }
    return false;
  };
  
  getFullPrice = () => {
    if(this.props.isMyCatalog) {
      return this.props.responseMyProductDetails.full_price
    }
    return this.props.data.price_range;
  }
  
  getOverallSinglePrice = () => {
    if(this.props.isMyCatalog) {
      return this.props.responseMyProductDetails.single_piece_price
    }
    return this.props.data.single_piece_price_range
  }
  
  render(){
    const data = this.props.data
    // console.log("data from details text view", data.products.length)
    
    const isSet = data.product_type === PRODUCT_TYPE_SET;  
    const cDesignCount = isSet
      ? data.no_of_pcs_per_design
      : data.products.length;
    const cSingleDesignProduct = cDesignCount == 1;
    const cDesignOrPieces = isSet ? "Pieces" : "Designs";
    const setType = data.catalog_multi_set_type;
    const colorOrSize =
      setType === "color_set" ? "Color" : setType === "size_set" ? "Size" : "";
    const pluralSuffix = cSingleDesignProduct ? "" : "s";  
    const cPiecesValue =
      cDesignCount +
      (colorOrSize &&
        " (Set of " + cDesignCount + " " + colorOrSize + pluralSuffix + ")");
    const singleDiscount = Number.parseFloat(data.single_discount)
    const fullDiscount = Number.parseFloat(data.full_discount)
    const originalPrice = Number.parseFloat(data.mwp_single_price)
    const cDesignOrPiecesValue = isSet ? cPiecesValue : cDesignCount
    const isSingle = data.full_catalog_orders_only === false
          
    return(        
      <View style={styles.CatalogDetailTextView}>
        <View style={styles.CatalogDetailTextDetailView}>
          <View style={{ alignSelf: "flex-start" }}>
            <Text
              {...textIdGenerator("ProductName")}
              style={{ fontSize: 17, color: colorresource.liteblack }}
            >
              {data.product_type === "set"
                ? `${data.title} From ${data.catalog_title}`
                : `${data.title}`}
            </Text>
          </View>

          <View style={{ flex: 1, marginTop: 5 }}>
            <Text style={styles.CatalogDetailBasicDesignPieces}>{data.category_name + ' (' + cDesignOrPiecesValue + ' ' + cDesignOrPieces + ')'}</Text>
            {originalPrice? <Text style={styles.CatalogDetailBasicOriginalPrice}>{'₹' + originalPrice + "/Pc."}</Text> : null}
            {this.hideFullPrice() ? null : (
              <View style={styles.CatalogDetailBasicRow}>
                <Text style={styles.CatalogDetailBasicLeftMediumText}>
                  {data.product_type === "catalog"
                    ? `Full Catalog:`
                    : `Full Set:`}
                </Text>
                <Text
                  {...textIdGenerator("FullCatalogPrice")}
                  style={styles.CatalogDetailBasicRightMediumText}
                >
                  {"₹" + (this.getFullPrice()) + "/Pc."}
                  {fullDiscount? <Text style={styles.CatalogDetailBasicDiscountText}>{'  ' + fullDiscount+'% off'}</Text> : null}
                </Text>
              </View>
            )}

            {cSingleDesignProduct || isSet ? null : (
              <View style={styles.CatalogDetailBasicRow}>
                <Text style={styles.CatalogDetailBasicLeftMediumText}>
                  Single Pcs.:
                </Text>
                <Text
                  {...textIdGenerator("SinglePcsPrice")}
                  style={styles.CatalogDetailBasicRightMediumText}
                >
                  {isSingle
                    ? `₹${this.getOverallSinglePrice()}/Pc.`
                    : `Not Available`}
                  {isSingle && singleDiscount? <Text style={styles.CatalogDetailBasicDiscountText}>{'  ' + singleDiscount+'% off'}</Text> : null}
                </Text>
              </View>
            )}

          </View>
        </View>
      </View>
    );    
  }
}

export default CatalogDetailHeaderView