import React, { Component } from 'react'
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';

import { colorresource } from 'app/resources/colorresource';

import { goToProductDetailsScreen } from 'app/actions/navigation-actions';

export default class SharedCatalogItem extends Component {

  goToProductDetails = () => {
    const id = this.props.data.id
    goToProductDetailsScreen(id)
  }

  render() {
    const data = this.props.data
    const image = _.get(data, 'image.thumbnail_medium')
    const actualPrice = _.get(data, 'shared_details.actual_price')
    const resalePrice = _.get(data, 'shared_details.resell_price')
    const title = data.title
    return (
      <View style={styles.parent}>
        <TouchableOpacity style={styles.touchable} onPress={this.goToProductDetails}>
          <ImageBackground resizeMode={'contain'} source={{uri: image}} style={{height: 220, width: '100%'}}>
            <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 0.0, y: 0.0 }}
            style={styles.gradient}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.priceDetails}>
                <View style={{}}>
                  <Text style={styles.price}>Price</Text>
                  <Text style={styles.priceValue}>{`₹${actualPrice}/Pc`}</Text>
                </View>
                <View style={{marginLeft: 'auto'}}>
                  <Text style={styles.price}>Resale value</Text>
                  <Text style={styles.priceValue}>{`₹${resalePrice}/Pc`}</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  parent: {
    width: '50%', 
    padding: 5, 
    // borderWidth: 1, 
    // borderColor: 'red'
  },
  touchable: {
    flex: 1,
    // borderWidth: 1, 
    // borderColor: 'black'
  },
  gradient: {
    position: 'absolute',
    paddingTop: 20,
    paddingHorizontal: 5,
    left: 0,
    right: 0,
    bottom: 0
  },
  title: {
    color: 'white',
    fontSize: 14,
  },
  priceDetails: {
    flexDirection: 'row', 
    flex: 1, 
    justifyContent: 'space-between', 
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 5,
  },
  price: {
    fontSize: 12,
    color: 'white',
  },
  priceValue: {
    fontSize: 12,
    color: 'white'
  }
})