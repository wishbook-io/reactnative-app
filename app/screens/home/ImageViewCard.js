import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card } from 'native-base';

import WCard from 'app/components/Card/WCard';
import styles from './styles';

const screenWidth = Dimensions.get('window').width;
const aspectRatio = 1.3

export const getCardWidth = (noOfCards) => {
  return (screenWidth / noOfCards) - 11
}

export const getCardHeight = (noOfCards = 3, ratio = aspectRatio) => {
  const width = getCardWidth(noOfCards);
  return width * ratio;
}

const ImageViewCard = ({
  noOfCards = 3,
  itemWidth = getCardWidth(noOfCards),
  itemHeight = getCardHeight(noOfCards),
  url,
  onPress
}) => (
  <WCard
  cardStyle={{borderRadius: 8, margin: 3}}
  bordered
  noPadding
  onPress={onPress}
  >
    <FastImage 
    style={{ width: itemWidth, height: itemHeight, }}
    resizeMode='contain'
    source={{ uri: url }}
    />
    {/* <View style={{width: itemWidth, height: itemHeight, backgroundColor: 'red',}}/> */}
  </WCard>
  );
  
  ImageViewCard.propTypes = {
    noOfCards: PropTypes.number,
    url: PropTypes.string,
    onPress: PropTypes.func
  };
  
  export default ImageViewCard;
  