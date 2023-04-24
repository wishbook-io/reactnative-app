import React, { Component } from "react";
import { Image, Text } from 'react-native';
import { Button, Icon, Footer, FooterTab } from "native-base";
import { strings } from '../../utils/i18n';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';
import assets from '../../utils/assetsObject';
import { TestIdGenerator } from "../../utils/TestingHelper";
import {connect} from 'react-redux';
import {getPublicCatalogAction} from '../../actions/catalog-actions'
import {goToProductsPromotion, goToHomeTab} from '../../actions/navigation-actions'
const screenName = 'BottomTabBar';
const buttonTestId = TestIdGenerator(screenName,'','Button');

 class TabScreenNavigator extends Component {

  onItemPress = (screenId) => {
    if(screenId=="ProductsTab"){
      goToProductsPromotion()
    }
    else if(screenId === 'HomeScreen') {
      goToHomeTab({refresh: true})
    }
    else{
    this.props.navigation.navigate(screenId);

    }
  }

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: 'white' }}>
          <TabItem
          onPress={this.onItemPress}
          screenId={'HomeScreen'}
          textId={'tabNavigator.home'}
          iconName={'ic_home'}
          active={this.props.navigation.state.index === 0}
          testId={'Home'}
          />
          <TabItem
          onPress={this.onItemPress}
          screenId={'ProductsTab'}
          textId={'tabNavigator.products'}
          iconName={'ic_my_products'}
          active={this.props.navigation.state.index === 1}
          testId={'Products'}
          />
          <TabItem
          onPress={this.onItemPress}
          screenId={'OrdersTab'}
          textId={'tabNavigator.orders'}
          iconName={'ic_my_orders'}
          active={this.props.navigation.state.index === 2}
          testId={'Orders'}
          />
          <TabItem
          onPress={this.onItemPress}
          screenId={'MyBusiness'}
          textId={'tabNavigator.my_business'}
          iconName={'ic_my_business'}
          active={this.props.navigation.state.index === 3}
          testId={'MyBusiness'}
          />
        </FooterTab>
      </Footer>
    );
  }
}

const TabItem = ({onPress, screenId, textId, iconName, active, testId}) => {
  return (
    <Button 
    style={styles.tab_button}
    vertical
    active={active}
    onPress={() => onPress(screenId)}
    activeOpacity={1}
    {...buttonTestId(testId)}
    >
      <Image resizeMode='contain' source={assets[iconName]} style={active? styles.tab_icon_active : styles.tab_icon_inactive} />
      <Text uppercase={false} style={active? styles.tab_text_active : styles.tab_text_inactive}>{strings(textId)}</Text>
  </Button>
  );
}

const mapStateToProps = (state) => {
 return {
     filterState:state.productFilterR.defaultFilterState,

  };
};

export default connect(mapStateToProps)(TabScreenNavigator);

