import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { 
  Text,
  Container } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash'

import CatalogItem from '../products/CatalogItem';
import GenericHeader from 'app/components/Header/GenericHeader'
import UserHelper from 'app/config/userHelper';
import { colorresource } from '../../resources/colorresource';
import styles from './styles';

// actions
import { 
  goToProductDetailsScreen,
  goToCarts,
} from '../../actions/navigation-actions'
import * as wishlistActions from '../../actions/wishlist-actions';

import * as debugHelper from 'app/utils/debugHelper';

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

  renderListEmptyComponent = () => {
    return (
      <View style={styles.MyWishlistNoCatalogs}>
        <Text style={styles.MyWishlistNoCatalogsText}>No catalogs to display</Text>
      </View>
    )
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
      <Container style={{backgroundColor: colorresource.materialbg}}>

        <GenericHeader 
          title={'My Wishlist'}
          cartConfig={{
            onPress: () => goToCarts(),
            visible: !isUserSeller,
            // testId: buttonTestId("Cart"),
          }}
        />
        <FlatList
        data={this.props.responseWishlist}
        renderItem={({item, index}) => <CatalogItem onWishlistPress={this.onWishlistPress} data={item} showListView={true} onPress={() => goToProductDetailsScreen(item.id)} addedToWishlist={!item.removedFromWishlist}/>}
        keyExtractor={(item, index) => item.id.toString()}
        refreshing={false}
        onRefresh={this.reloadWishlist}
        ListEmptyComponent={this.renderListEmptyComponent}
        contentContainerStyle={{flexGrow: 1}}
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