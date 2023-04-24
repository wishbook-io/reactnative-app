import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { goToBrandsCard } from 'app/actions/navigation-actions'
import { colorresource } from '../../resources/colorresource';

const BrandCard = ({imageUrl, title}) => {
  return(
    <TouchableOpacity onPress={goToBrandsCard}>
      <Card style={styles.BrandCard}>
        <CardItem style={styles.BrandCardItem}>
          <View style={{flexDirection: 'column'}}>
            <View>
              <Image source={{uri: imageUrl}}
              style={styles.BrandImage}/>
            </View>
            <View>
              <Text
              numberOfLines={1} 
              ellipsizeMode='tail' 
              style={styles.BrandName}>{title}</Text>
            </View>
          </View>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}

const styles = EStyleSheet.create({
  $horizontalPadding: 8,
  $imageSize: 80,
  $twiceHorizontalPadding: '$horizontalPadding*2',
  BrandCard: {
    width: '$imageSize+$twiceHorizontalPadding',
  },
  BrandCardItem: {
    paddingTop: 8,
    paddingBottom: 5,
    paddingLeft: '$horizontalPadding',
    paddingRight: '$horizontalPadding',
  },
  BrandImage: {
    height: '$imageSize',
    width: '$imageSize',
  },
  BrandName: {
    fontSize: 12.5,
    color: colorresource.liteblack,
    textAlign: 'center',
    marginTop: 5,
  },
})

export default BrandCard;