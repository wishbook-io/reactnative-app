import React, { Component, PureComponent } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button as PButton } from 'react-native-paper';

import WCard from 'app/components/Card/WCard'
import { colorresource } from 'app/resources/colorresource';

class MyDiscountItem extends PureComponent {
  
  getBrands = () => {
    const data = this.props.data
    if(data.all_brands) {
      return 'All brands';
    }
    const brands = data.brands.map(b => b.name).join(',')
    return brands;
  }

  onPress = () => {
    this.props.onPress(this.props.index)
  }

  render() {
    const {
      data
    } = this.props
    
    return(
      <WCard cardStyle={{marginHorizontal: 10}} onPress={this.onPress}>
        <View>
          <Text style={styles.heading}>{data.name}</Text>

          <View style={styles.row}>
            <Text style={styles.left}>{'Brands:'}</Text>
            <Text style={{fontSize: 14, color: colorresource.liteblack}} numberOfLines={1}>{this.getBrands()}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.left}>{'Full Catalog Discount:'}</Text>
            <Text style={styles.right}>{`Discount ${data.cash_discount}%`}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.left}>{'Single Piece Discount:'}</Text>
            <Text style={styles.right}>{`Discount ${data.single_pcs_discount}%`}</Text>
          </View>

          
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <PButton
              mode={'text'}
              onPress={this.onPress}
            >{'Edit'}</PButton>
          </View>

        </View>
      </WCard>
    )
  }
}

export default MyDiscountItem

const styles = EStyleSheet.create({
  heading: {
    fontSize: 16,
    color: colorresource.liteblue,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    flexWrap: 'wrap',
  },
  left: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  right: {
    color: colorresource.darkgreen,
  }
})