import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card, CardItem, Text } from 'native-base';

import WCard from 'app/components/Card/WCard';
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';
import { ENABLE_SINGLE_PCS } from 'app/utils/const';

class PromoCategoryItem extends Component {

  onImagePress = () => {
    const id = this.props.id;
    this.props.onPress(id)
  }

  onSinglePcPress = () => {
    const id = this.props.id;
    this.props.onSinglePcPress(id);
  }

  onCollectionPress = () => {
    const id = this.props.id;
    this.props.onCollectionPress(id);
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {
      title,
      url,
      id,
      onPress,
      onCollectionPress,
      onSinglePcPress,
    } = this.props;

    return (
      <View>
        <WCard
        noPadding
        onPress={this.onImagePress}
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
              {title} 
            </Text>
          </View>
        </WCard>

        <PromoButton onPress={this.onCollectionPress} style={{marginLeft: 5, marginRight: 5}}/>
        {ENABLE_SINGLE_PCS? <PromoButton text = 'Single Pcs' onPress={this.onSinglePcPress} style={{marginLeft: 5, marginRight: 5, marginTop: 5}}/> : null}

      </View>
    );
  }
}

export default PromoCategoryItem;

export const PromoButton = ({text = 'Collections', onPress, style}) => {
  return (
    <WButton style={[{
      // alignSelf: 'center', 
      // width: 90, 
      flex: 1,
      flexGrow: 1,
      // justifyContent: 'center', 
      alignItems: 'center', 
      padding: 8, 
      borderColor: colorresource.litegray, 
      borderWidth: 0.5,
      borderRadius: 3,
      backgroundColor: 'white',
    }, style]}
    onPress={onPress}>
      <Text style={{fontSize: 14, color: colorresource.liteblue, flex: 1}}>{text}</Text>
    </WButton>
  )
}