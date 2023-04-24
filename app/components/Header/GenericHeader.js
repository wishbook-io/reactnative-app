import React from 'react';
import PropTypes from 'prop-types';
import { 
  View, 
  Header, 
  Title, 
  Button, 
  Icon, 
  Right, 
  Body, 
  Left, 
  Badge as NBBadge, 
  Text,
} from "native-base";
import { connect } from 'react-redux';

import * as navigationActions from 'app/actions/navigation-actions';
import { colorresource } from '../../resources/colorresource';

import styles from './styles';

import { TestIdGenerator } from '../../utils/TestingHelper';
const screenName = 'Header';
const defaultLeftTestId = TestIdGenerator(screenName,'Back','Button');
const defaultTitleTestId =  TestIdGenerator(screenName,'Title','Text');

const GenericHeader = ({ 
  title, 
  titleTestId=defaultTitleTestId, 
  leftConfig={icon: 'arrow-back', onPress: navigationActions.goBack, testId: defaultLeftTestId, visible: true}, 
  wishlistConfig = {}, 
  cartConfig = {}, 
  notificationConfig = {}, 
  cartCount, 
  wishlistCount,
  notificationCount,
  otherRightConfigs = [],
}) => {
  const getPreferenceCount = (p1, p2) => {
    const count1 = parseInt(p1);
    const count2 = parseInt(p2);
    if(Number.isNaN(count1)) {
      return count2;
    }
    return count1;
  }
   
  const rightEmpty = !wishlistConfig.visible && !cartConfig.visible && !notificationConfig.visible;
  return (
    <View>
      <Header style={{backgroundColor:colorresource.liteblue}}>
        {
          leftConfig.visible? 
          <Left>
            <Button transparent onPress={leftConfig.onPress} {...leftConfig.testId}>
              <Icon name={leftConfig.icon} style={{color:colorresource.white,fontSize:24}}/>
            </Button>
          </Left>
          : null
        }
        <Body style={rightEmpty? {flex: 2.5, marginLeft: 10} : {}}>
          <Title style={{color:colorresource.white}} {...titleTestId}>{title}</Title>
        </Body>
        <Right>
        {
          otherRightConfigs.map(c =>
            <Button key={c.icon} transparent onPress={c.onPress} {...c.testId}>
              <Icon name={c.icon} type="MaterialCommunityIcons" style={{color:colorresource.white,fontSize:24}}/>
              <Badge count={c.count}/>
            </Button>)
        }
        {
          wishlistConfig.visible?
          <Button transparent onPress={wishlistConfig.onPress || navigationActions.goToWishlist} {...wishlistConfig.testId}>
            <Icon name='bookmark' type="MaterialCommunityIcons" style={{color:colorresource.white,fontSize:24}}/>
            <Badge count={getPreferenceCount(wishlistConfig.count, wishlistCount)}/>
          </Button>
          : null
        }
        {
          cartConfig.visible?
          <Button transparent onPress={cartConfig.onPress || navigationActions.goToCarts} {...cartConfig.testId}>
            <Icon name='cart' type="MaterialCommunityIcons" style={{color:colorresource.white,fontSize:24}}/>
            <Badge count={getPreferenceCount(cartConfig.count, cartCount)}/>
          </Button>
          : null
        }
        {
          notificationConfig.visible?
          <Button transparent onPress={notificationConfig.onPress || navigationActions.goToNotifications} {...notificationConfig.testId}>
            <Icon name='bell' type="MaterialCommunityIcons" style={{color:colorresource.white,fontSize:24}}/>
            <Badge count={getPreferenceCount(notificationConfig.count, notificationCount)}/>
          </Button>
          : null
        }  
        </Right>
      </Header>
    </View>
  );
}

const mapStateToProps = (state) => {
  return ({
    cartCount: state.cartR.cartCount,
    notificationCount: state.dashboardR.notificationCount,
    wishlistCount: state.wishlistR.wishlistCount
  })
}
export default connect(mapStateToProps)(GenericHeader);


// TODO: refactor this component in a separate file and easily configurable
export const Badge = ({count}) => {
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



// HeaderBackNativeBase.propTypes = {
//   onPress: PropTypes.func,
//   title: PropTypes.string,
//   icon: PropTypes.string
// };
