import React from 'react';
import PropTypes from 'prop-types';
import { View, Header, Title, Button, Icon, Right, Body, Left } from "native-base";
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

const HeaderBackNativeBase2 = ({ onPress, title, icon, titleTwo }) => (
  <View>
    <Header style={styles.header}>
      <Left>
        <Button transparent onPress={onPress}>
          <Icon name={icon} style={{ color: colorresource.black }} />
        </Button>
      </Left>
      <Body>
        <Title style={{ color: colorresource.black }}>{title}</Title>
      </Body>

      <Right>
        <Title style={{ color: colorresource.black, fontSize: 14 }}>{titleTwo}</Title>
      </Right>
    </Header>
  </View>
);

HeaderBackNativeBase2.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.string,
  titleTwo: PropTypes.string
};

export default HeaderBackNativeBase2;
