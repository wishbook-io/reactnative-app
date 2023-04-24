import React from 'react';
import PropTypes from 'prop-types';
import { View,Header, Title, Button, Icon, Right, Body, Left } from "native-base";
import styles from './styles';
import { colorresource } from '../../resources/colorresource';
import {goBack} from '../../actions/navigation-actions'

const HeaderBackNativeBase = ({ onPress=goBack, title, icon='arrow-back', backTestId }) => (
  <View>
    <Header style={styles.header}>
      <Left>
        <Button transparent onPress={onPress} {...backTestId}>
          <Icon name={icon} style={{color:colorresource.white,fontSize:24}}/>
        </Button>
      </Left>
      <Body>
        <Title style={{color:colorresource.white}}>{title}</Title>
      </Body>
      <Right />
    </Header>
  </View>
);

HeaderBackNativeBase.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.string
};

export default HeaderBackNativeBase;
