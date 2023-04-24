import React, { Component } from 'react';
import { View, FlatList, Image, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native';
import { 
  Header, 
  Title, 
  Content, 
  Button, 
  Left, 
  Right, 
  Body, 
  Icon, 
  Text,
  Container } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash'

import CatalogItem from 'app/screens/products/CatalogItem';
import GenericHeader from 'app/components/Header/GenericHeader'
import UserHelper from 'app/config/userHelper';
import { colorresource } from 'app/resources/colorresource';
import consts from 'app/utils/const';
import styles from './styles';

// actions
import { 
  goToRegisterNewUserScreen, 
  goBack, 
  goToProductDetailsScreen,
  goToCarts,
} from '../../actions/navigation-actions'
import * as wishlistActions from '../../actions/wishlist-actions';
import * as wishlistSaga from 'app/saga/wishlist-saga';
import { execute } from 'app/config/saga'

import * as debugHelper from 'app/utils/debugHelper';

const {width = 0,height = 0} = Dimensions.get('window');

class MyWishlist extends Component {

  onWishlistPress = (data) => {
    if(data.removedFromWishlist) {
      this.props.dispatch(wishlistActions.addToWishlistAction({product: data.id}, false, false,))
    } else {
      this.props.dispatch(wishlistActions.deleteFromWishlistAction({product: data.id}))
    }
  }
  
  reloadWishlist = () => {
    this.props.dispatch(wishlistActions.getWishlistAction())
  }

  constructor(props) {
    super(props);
    this.state = {
      // isLoading: false,
    }
  }

  componentDidMount() {
    if(this.props.responseWishlist.length === 0) {
      debugHelper.waitTillUserInfoAndStatisticsAreFetched().then(this.reloadWishlist);
    }
  }

  render() {
    let isUserSeller = UserHelper.getCompanyType() === 'seller';
    return (
      <Container style={{backgroundColor:'lightgrey'}}>

        <GenericHeader 
          title={'Brand Name'}
        />

        <View style={{backgroundColor: 'white', elevation: 5}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{padding: 5}}>
              <Icon name='filter-outline' type="MaterialCommunityIcons" style={styles.FilterHeaderIcon}/>
              <Text style={styles.FilterHeaderIconText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 5}}>
              <Icon name='sort' type="MaterialIcons" style={styles.FilterHeaderIcon}/>
              <Text style={styles.FilterHeaderIconText}>Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
            
          <FlatList
          data={this.props.responseWishlist}
          renderItem={({item, index}) => <CatalogItem onWishlistPress={this.onWishlistPress} data={item} showListView={true} onPress={() => goToProductDetailsScreen(item.id)} addedToWishlist={!item.removedFromWishlist}/>}
          keyExtractor={(item, index) => item.id.toString()}
          refreshing={false}
          onRefresh={this.reloadWishlist}
          />
        
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.wishlistR.error,
    responseWishlist: state.wishlistR.responseWishlist,
  };
};

export default connect(mapStateToProps)(MyWishlist)