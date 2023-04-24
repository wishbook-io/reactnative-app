import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card, CardItem, Text } from 'native-base';

import WCard from 'app/components/Card/WCard';
import styles from './styles';

const ImageViewCardWithFooter = ({
  rowData = {title: ''},
  url,
  onPress
}) => (
  <WCard
  noPadding
  onPress={onPress}
  contentStyle={{
    flexDirection: 'column',
    ...styles.no_padding,
    width: 90,
    // borderWidth: 1,
    // borderColor: 'yellow',
  }}
  >
    <FastImage 
    style={{ width: 90, height: 90 }} 
    resizeMode='stretch'
    source={{ uri: url }} />
    <View style={[{ backgroundColor:'white', 'justifyContent':'center'}, styles.card_text_padding]}>
      <Text 
      numberOfLines={1} 
      ellipsizeMode='tail' 
      style={{textAlign:'center', fontWeight:'bold', fontSize: 13,}}>
        {rowData.title} 
      </Text>
    </View>
  </WCard>
);
  
ImageViewCardWithFooter.propTypes = {
  noOfCards: PropTypes.number,
  url: PropTypes.string,
  onPress: PropTypes.func
};

export default ImageViewCardWithFooter;

  
  