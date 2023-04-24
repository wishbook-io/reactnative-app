import React, { Component } from 'react';
import { View, Image as RNImage, Dimensions } from 'react-native';
import { Text } from 'native-base';
import { Button as PButton } from 'react-native-paper'
import FastImage from 'react-native-fast-image';
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux';

import WCard from 'app/components/Card/WCard';
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';
import { rupeefy } from 'app/utils/formatHelper';
import { isIos, isWeb } from 'app/utils/PlatformHelper'

import { goToCarts } from 'app/actions/navigation-actions'
import { isInCart } from 'app/screens/cart/serverHelper';

import { TestIdGenerator } from '../../utils/TestingHelper';
const screenName = "ProductDetailScreen";
const buttonTestId = TestIdGenerator(screenName, '', "Button")
const textTestId = TestIdGenerator(screenName, '', "Text")

const { width, height } = Dimensions.get('window');
// const styles_ProductImagesScrollViewCardsImage = StyleSheet.flatten(styles.ProductImagesScrollViewCardsImage);
const Image = isIos ? FastImage : RNImage

class ProductsItem extends Component {

  showImageViewer = () => {
    const showImageViewerCallBack = this.props.showImageViewer()
    if(showImageViewerCallBack) {
      this.props.showImageViewer()
    }
  }

  onAddToCartPress = () => {
    this.props.onAddToCartSingle(this.props.data.id)
  }

  onGoToCartPress = () => {
    goToCarts();
  }

  render() {
    const inCart = isInCart(this.props.data.id, this.props.cartDetails);
    const {
      data,
      isFullCatalog,
      onAddToCartSingle,
      price,
    } = this.props;
    if (data.empty) {
      return <View style={[styles.Emptyitem, styles.itemEmpty]} />;
    }
    if(data.image.thumbnail_medium === undefined) {
      return null;
    }
    return (
      <View>
        <WCard
        noPadding
        bordered
        onPress ={this.showImageViewer}
        cardStyle={{margin: 3}}
        {...buttonTestId("DesignThumbnails")}
        >
          <Image
          resizeMode={'contain'}
          source={{uri: data.image.thumbnail_medium}}
          style={styles.ProductImagesScrollViewCardsImage}
          />
        </WCard>
        {isFullCatalog !== true?
          <View style={localStyles.textWrapper}>
            <Text style={localStyles.text}>{'Single Pc: '+rupeefy(price + '', false)}</Text>
          </View> 
        : null }
        {data.available_sizes?
        <View style={localStyles.textWrapper}>
          <Text style={localStyles.text}>{'Sizes: '+data.available_sizes.replace(/,/g, ", ")}</Text>
        </View> : null }

        {onAddToCartSingle? <View style={{justifyContent: 'center', flexDirection: 'row', marginBottom: 5, marginTop: 2}}>
          <PButton
          mode='outlined'
          compact = {true}
          contentStyle = {{width: width*0.3}}
          style={{borderColor: colorresource.liteblue}}
          onPress={inCart? this.onGoToCartPress : this.onAddToCartPress}
          >
            <Text style={{fontSize: 12.5, letterSpacing: 0.5, color: colorresource.liteblue}}>
              {inCart? 'GO TO CART' : 'ADD TO CART'}
            </Text>           
          </PButton>
        </View> : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    cartDetails: state.cartR.responseGetCatalogWiseCartDetails,
  })
}

export default connect(mapStateToProps)(ProductsItem)

const localStyles = EStyleSheet.create({
  textWrapper: {
    width: '100%', 
    flexDirection: 'row'
  },
  text: {
    textAlign: 'center', 
    color: colorresource.liteblack, 
    fontSize: 14, 
    flexWrap: 'wrap', 
    flex: 1, 
    ...(isWeb? {width: 0} : {}),
  }
})