import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card, Icon } from 'native-base';

import WCard from 'app/components/Card/WCard';
import styles from './styles';


const UsersVideoReviewsViewCard = ({  
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
      style={{ width: 250, height: 150,}}
      resizeMode='contain'
      source={{ uri: url }}
      />
      <Icon name='play-circle-filled' type='MaterialIcons' style = {{ color: 'white', position: 'absolute', right: '40%', top: '32%', fontSize: 52}} />
      
    </WCard>
);


export default UsersVideoReviewsViewCard;
