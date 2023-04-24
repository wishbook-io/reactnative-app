import React, { Component } from "react";
import { connect } from 'react-redux';
import { FlatList, Dimensions,TextInput,Linking,Share, ScrollView,RefreshControl, View,Image,TouchableHighlight,Alert,StyleSheet,TouchableOpacity } from 'react-native';
import { Container, Header, Title, Content,Picker, Button, Icon, Right, Body, Left, Item, Input, Text } from "native-base";
import _ from 'lodash';
import CatalogItem, { CatalogLabelType } from '../products/CatalogItem';
import {goToProductDetailsScreen,goBack} from '../../actions/navigation-actions'
import { HeaderBackNativeBase } from '../../components/Header';
import { colorresource } from '../../resources/colorresource';

import { addToWishlistAction, deleteFromWishlistAction} from '../../actions/wishlist-actions';
import { isInWishlist } from 'app/screens/wishlist/serverHelper';

import { TestIdGenerator } from '../../utils/TestingHelper';
const buttonIdGenerator = TestIdGenerator("OrdersDetailScreen", '', "Button")
const textIdGenerator = TestIdGenerator("OrdersDetailScreen", '', "Text")
let { height, width } = Dimensions.get('window');
import consts from '../../utils/const';


class GridViewList extends Component {

    onWishlistPress = (data) => {
        const addedToWishlist = isInWishlist(data.id, this.props.responseWishlist)
        if(addedToWishlist) {
            this.props.dispatch(deleteFromWishlistAction({product: data.id}))
        } else {
            this.props.dispatch(addToWishlistAction({product: data.id}))
        }
        }

    constructor(props) {
        super(props);
        this.state = {
            starCount: 3,
            showCancelOrderModal:false,
            data:this.props.data,
            showCollapsable:true

    }
    }

    goToProductDetailsPage = (item) =>{
        goToProductDetailsScreen(item.id)  
    }


    render() {

        //console.log('this.prop.data',this.props.data)
        const data = this.props.data
        return (
            <View style={{flex:1}}>
                <HeaderBackNativeBase title={this.props.title}/>
                <FlatList
              data={this.props.data}
              key = {( this.state.showListView ) ? 0 : 1 }
              numColumns = {(this.state.showListView) ? 1 : 2}
              ref={ref => this.listRef = ref}
              refreshing={this.props.isLoading}
              onRefresh ={this._onRefresh}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => {
                      if (item.empty) {
                              return <View style={[styles.Emptyitem, styles.itemEmpty]} />;
                      }
                              return (
                                <CatalogItem data={item}
                                showListView={this.state.showListView}
                                onPress={()=>this.goToProductDetailsPage(item)}
                                onWishlistPress={this.onWishlistPress}
                                addedToWishlist={isInWishlist(item.id, this.props.responseWishlist)}
                                />
              )}}
            />     
          </View>
        )
    }
}

const mapStateToProps = (state,props) => {
   return {
    isLoading: state.catalogR.isLoading || state.wishlistR.isLoading,
    data:props.navigation.state.params.data,
    title:props.navigation.state.params.title,
    responseWishlist: state.wishlistR.responseWishlist,
    };
  };
  
  export default connect(mapStateToProps)(GridViewList);
  