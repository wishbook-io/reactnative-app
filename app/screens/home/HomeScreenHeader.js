import React from 'react';
import PropTypes from 'prop-types';
import { View, Header, Title, Button, Icon, Right, Body, Left, Badge as NBBadge, Text } from "native-base";

import { colorresource } from '../../resources/colorresource';

import styles from './styles';

/*
TODO: We need headers for all the four screens - 
Home, Catalog, Order & Business
So find a good way to add action buttons to those, make them reusable
This implementation works well only for the Home screen
*/

const HeaderBackNativeBase = ({ title, leftConfig, wishlistConfig, cartConfig, notificationConfig }) => (
  <View>
    <Header style={{backgroundColor:colorresource.liteblue}}>
      <Left>
        <Button transparent onPress={leftConfig.onPress} {...leftConfig.testId}>
          <Icon name={leftConfig.icon} style={{color:colorresource.white}} type="MaterialIcons"/>
        </Button>
      </Left>
      <Body>
        <Title style={{color:colorresource.white}}>{title}</Title>
      </Body>
      <Right>
            {
              wishlistConfig.visible?
              <Button transparent onPress={wishlistConfig.onPress} {...wishlistConfig.testId}>
              <Icon name='bookmark' type="MaterialCommunityIcons"/>
              <Badge count={wishlistConfig.count}/>
              </Button>
              :
              null
            }
            {
              cartConfig.visible?
              <Button transparent onPress={cartConfig.onPress} {...cartConfig.testId}>
              <Icon name='cart' type="MaterialCommunityIcons"/>
              <Badge count={cartConfig.count}/>
              </Button>
              :
              null
            }
            
            <Button transparent onPress={notificationConfig.onPress} {...notificationConfig.testId}>
              <Icon name='bell' type="MaterialCommunityIcons" />
              <Badge count={notificationConfig.count}/>
            </Button>
          </Right>
    </Header>
  </View>
);

// TODO: refactor this component in a separate file and easily configurable
const Badge = ({count}) => {
  if(!count) {
    return null;
  }
  return(
    <View style={{
      position: 'absolute',
      backgroundColor: colorresource.sharpred,
      top: 5,
      right: 7,
      borderRadius: 7,
    }}>
      <Text style={{
        fontSize: 8,
        color: 'white',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 3,
        paddingBottom: 3,
      }}>{count}</Text>
    </View>
  );
}

HeaderBackNativeBase.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.string
};

export default HeaderBackNativeBase;
