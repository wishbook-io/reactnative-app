import React, {Component} from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Card, CardItem, Left, Right, Text, Button } from 'native-base';
import FastImage from 'react-native-fast-image';

import { colorresource } from '../../resources/colorresource';
import styles from './styles';

const DottedText = ({style, text}) => {
	return (
		<Text 
		style={style}
		numberOfLines={1} 
		ellipsizeMode='tail'>
		{text}
		</Text>

	);
}

export default class WishlistCard extends Component {
	render() {
    const isInCart = this.props.isInCart;
    const [buttonText, buttonCallback] = isInCart
      ? ["Go To Cart", this.props.onGoToCart] 
      : ["Add To Cart", () => this.props.onAddToCart(this.props.data)]
		return (
			<Card style={[styles.HomeScreenWishlistCard]} borderRadius={3}>
            
            <CardItem button onPress={() => this.props.onPress(this.props.data.id)} style={[styles.HomeScreenWishlistCardItemTop, styles.no_padding]}>
              <FastImage 
              style={[{ width: 100, height: 120, borderRadius: 3 }]} 
              resizeMode='contain'
              source={{ uri: this.props.data.image.thumbnail_small }} />
              <View style={styles.HomeScreenWishlistParentTextView}>
                <View style={styles.HomeScreenWishlistCardInfo}>
                  <DottedText style={styles.HomeScreenWishlistGrayText} text={this.props.data.brand_name}/>
                  <DottedText style={styles.HomeScreenWishlistCatalogName} text={this.props.data.title}/>
                  <DottedText style={styles.HomeScreenWishlistNumericInfo} text={this.props.data.total_products + " Designs"}/>
                  {/* <DottedText style={styles.HomeScreenWishlistNumericInfo} text={"Sold By: " + this.props.data.supplier_name}/> */}
                </View>
                <View style={styles.HomeScreenWishlistCardQtyType}>
                  <DottedText style={styles.HomeScreenWishlistGrayText} text={this.props.data.full_catalog_orders_only? "Only full catalog for sale": "Single piece available"}/>
                </View>
              </View>
            </CardItem>

            <CardItem style={[
            	styles.no_padding,
            	styles.HomeScreenWishlistCardItemBottom]}>
              <Left>
                <Text style={styles.HomeScreenWishlistPrice}>{'\u20B9 ' + this.props.data.price_range + "/Pc."}</Text>
              </Left>
              <Right>
                <Button small style={{backgroundColor:colorresource.orange, paddingLeft: 0, marginLeft: 0}} onPress={buttonCallback}>
                  <Text style={styles.HomeScreenWishlistAddToCart}>{buttonText}</Text>
                </Button>
              </Right>
            </CardItem>
            
          </Card>
		);
	}
}
