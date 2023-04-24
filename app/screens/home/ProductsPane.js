import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Card, CardItem, Text, Icon } from 'native-base'
import { Card as PCard} from 'react-native-paper'

import {goToAddProducts, goToMyProducts} from 'app/actions/navigation-actions';
import WCard from 'app/components/Card/WCard';
import {colorresource} from '../../resources/colorresource';
import styles from './styles'

const IconType = {
  PRODUCT_ICON: 0,
  ADD_ICON: 1,
}

const ProductIcon = () => <Image source={require('../../images/home/ic_action_catalogs.png')} style={{height: 33, width: 33}}/>
const AddIcon = () => <Image source={require('../../images/home/addproduct_blue.png')} style={{height: 20, width: 20, marginRight: 5}}/>

const ProductsCard = ({ iconName, iconType, iconStyle, text, onPress}) => {
  return (
      <WCard
      cardStyle={styles.HomeScreenProductsCard}
      noPadding
      bordered
      contentStyle={styles.HomeScreenProductsCardItem}
      onPress={onPress}
      >
        <View>
          { iconType === IconType.PRODUCT_ICON? <ProductIcon/> : <AddIcon/> }
        </View>

        <View style={{flex: 1}}>
        <Text style={{color: '#757575', fontSize: 14}}>{text}</Text>
        </View>

        <View style={{width: '34%'}}>
        </View>
      </WCard>
  );
}

export default class ProductsPane extends Component {
  render() {
    return (
      <View style={{flexDirection:'row', flex: 1}}>
              
        <ProductsCard
        iconType={IconType.PRODUCT_ICON}
        text={'You have '+this.props.enabledProducts+' enable Products'}
        onPress={() => goToMyProducts()}
        />
              
        <ProductsCard 
        iconType={IconType.ADD_ICON}
        text='Add new Product'
        onPress={this.props.onAddProductsPress}
        />
            
      </View>
    );
  }
}
