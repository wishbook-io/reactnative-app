import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Header, Title, Button, Icon, Right, Body, Left } from "native-base";
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

const HeaderBackNativeBase3 = ({ onPress, onPress2, title, icon, titleTwo }) => (
  <View>
    <Header style={styles.header}>
      <Left>
        <Button transparent onPress={onPress}>
          <Icon name={icon} style={{ color: colorresource.white }} />
        </Button>
      </Left>
      <Body>
        <Title style={{ color: colorresource.white }}>{title}</Title>
      </Body>

      <Right>
          <Button hasText transparent onPress={onPress2}>
            <Text>{titleTwo}</Text>
          </Button>
      </Right>
    </Header>
  </View>
);

HeaderBackNativeBase3.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.string,
  titleTwo: PropTypes.string
};

export default HeaderBackNativeBase3;
