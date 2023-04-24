import React, { Component } from 'react';
import { View, TextInput, Image, FlatList, ActivityIndicator, ScrollView, RefreshControl, Platform } from 'react-native'
import {
  Container,
  Content,
  Icon,
  Text,
} from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash'

import GenericHeader from 'app/components/Header/GenericHeader';
import FillableActionChip from 'app/components/Chip/FillableActionChip';
import { colorresource } from 'app/resources/colorresource'
import consts from 'app/utils/const';

import {goBack } from 'app/actions/navigation-actions';
import * as brandActions from 'app/actions/brand-actions';
import * as serverHelper from './serverHelper';
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';

import * as debugHelper from 'app/utils/debugHelper';

const screenName = "Brands";

const LIMIT = consts.BASE_PAGE_LIMIT;

const LOADING_TYPES = {
  MORE: 1,
  REFRESH: 2,
  MODAL: 3,
}

class Brands extends Component {

  getUpdatedBrandDataBySettingFollow = (index, followed) => {
    let updatedBrandData = _.cloneDeep(this.state.brandData);
    updatedBrandData[index] = {
      ...updatedBrandData[index],
      is_followed: followed
    }

    return updatedBrandData;
  }

  onUnfollowBrand = ({response, error, followId, index}) => {
    // console.log("[onUnfollowBrand] index", index);
    this.props.dispatch(requestHideLoaderAction(screenName))
    if(error) {
      return;
    }
    const brandData = this.getUpdatedBrandDataBySettingFollow(index, false);
    this.setState({brandData,})
  }

  onFollowBrand = ({response, error, brandId, index}) => {
    // console.log("[onFollowBrand] index", index);
    this.props.dispatch(requestHideLoaderAction(screenName))
    if(error) {
      return;
    }
    const brandData = this.getUpdatedBrandDataBySettingFollow(index, response.id);
    this.setState({brandData,})
  }

  onFollowPress = (index) => {
    console.log("[onFollowPress] index", index);
    const brand = this.state.brandData[index];
    this.props.dispatch(requestShowLoaderAction(screenName))
    if(this.state.brandData[index].is_followed) {
      serverHelper.requestUnfollowBrand(brand.is_followed, index).then(this.onUnfollowBrand)
    } else {
      serverHelper.requestFollowBrand(brand.id, index).then(this.onFollowBrand);
    }
  }

  onNoBrandsPull = () => {
    this.onRefresh();
  }

  onCrossPress = () => {
    this.setState({searchText: ''});
  }

  onSearchTextChange = (text) => {
    this.setState({searchText: text}, () => this.fetchBrands(false, true));
  }

  onFetchBrands = ({response, error, params}) => {
    let updatedState = {
      lastBrandReached: false,
      isLoading: false,
    }
    if(response.length < LIMIT) {
      // usually means that there are no more
      // Brands to fetch, we have reached the end
      updatedState.lastBrandReached = true
    }
    if(params.clear) {
      updatedState.brandData = response
    } else {
      updatedState.brandData = this.state.brandData.concat(response)
    }
    console.log("[onFetchBrands] brandData length: ", updatedState.brandData.length)
    this.setState(updatedState);
  }

  fetchBrands = (more = true, clear) => {
    // if(this.state.isLoading) {
      // console.log("[fetchBrands] returning since we are loading")
      // return;
    // }
    if(more && this.state.lastBrandReached) {
      console.log("[fetchBrands] returning since we have reached the end")
      return;
    }
    const loadingType = more? LOADING_TYPES.MORE : LOADING_TYPES.REFRESH;
    this.setState({isLoading: loadingType})
    const params = {
      ...this.getParams(),
      offset: more? this.state.brandData.length : 0,
    }
    console.log("[fetchBrands] dispatching with params, clear", params, clear)
    serverHelper.fetchBrandsFromServer({params, clear}).then(this.onFetchBrands);
  }

  onEndReached = () => {
    if(this.state.isLoading === LOADING_TYPES.MORE) {
      return;
    }
    this.fetchBrands()
  }

  onRefresh = () => {
    this.fetchBrands(false, true);
  }

  getParams = () => {
    return ({
      offset: 0,
      ...(this.props.navigation.getParam('following', false)? { brand_i_follow: true } : { has_catalog: true }),
      name: this.state.searchText,
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      brandData: [],
      isLoading: 0,
    }
  }

  componentDidMount() {
    debugHelper.waitTillUserInfoIsFetched().then(() => this.onRefresh())
  }

  render() {
    return (
      <Container style={{backgroundColor: colorresource.grey50}}>
        <GenericHeader
        title={this.props.navigation.getParam("following", false)? "Brands I Follow" : "Brands"}
        />
        <View style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: Platform.OS === 'ios'? 5 : 0,
          elevation: 3,
          // borderColor: 'magenta',
          // borderWidth: 1,
        }}>
          <Icon name='search' style={{alignSelf: 'center', marginLeft: 15, marginRight: 12, fontSize: 24}}/>
          <View style={{
            flexDirection: 'row',
            flex: 1,
            // borderColor: 'yellow',
            // borderWidth: 1,
          }}>
            <TextInput
            style={{flex: 1, fontSize: 16}}
            placeholder={'Search Brand'}
            placeholderTextColor={colorresource.litegray}
            autoCorrect={false}
            selectionColor={colorresource.liteblue}
            onChangeText={this.onSearchTextChange}
            value={this.state.searchText}
            />
            {this.state.searchText? <Icon name='close' style={{alignSelf: 'center', marginRight: 15, fontSize: 24}} onPress={this.onCrossPress}/> : null}
          </View>
        </View>

        <NoBrands
        show={this.state.brandData.length === 0}
        onPull={this.onNoBrandsPull}
        isLoading={this.state.isLoading === LOADING_TYPES.REFRESH}
        />

        {this.state.brandData.length === 0? null :
          <FlatList
          data={this.state.brandData}
          refreshing={this.state.isLoading === LOADING_TYPES.REFRESH}
          onRefresh ={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          scrollEventThrottle={400}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <View key={item.id} style={{
                width: '50%',
                padding: 5,
                margin: 3,
                backgroundColor: 'white',
                // borderWidth: 1,
                // borderColor: 'blue',
              }}
              >
                <View style={{alignItems: 'center'}}>
                  <Image resizeMode={'contain'} source={{uri: item.image.thumbnail_small}} style={{ height: 130, width: '100%'}}/>
                  <Text style={{fontSize: 16, fontWeight: 'bold', color: colorresource.grey46}} adjustsFontSizeToFit={true} numberOfLines={1}>{item.name}</Text>
                  <Text style={{color: colorresource.gray, fontSize: 12}}>{`${item.total_catalogs} catalogs`}</Text>
                  <FillableActionChip
                  text={item.is_followed? 'Following' : '+ Follow'}
                  chipTextStyle={{fontSize: 14}}
                  chipStyle={{height: 40}}
                  chipParentStyle={{height: 50}}
                  filled={!!item.is_followed}
                  index={index}
                  onPress={this.onFollowPress}
                  />
                </View>
              </View>
            )
          }}
          ListFooterComponent={() => {
            if(this.state.isLoading === LOADING_TYPES.MORE) {
              return (
                <View style={{paddingBottom: 10, paddingTop: 10,}}>
                  <ActivityIndicator
                  size={'large'}
                  color={colorresource.liteblue}
                  animating={true}
                  />
                </View>
              );
            }
            return null;
          }}
          />
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseBrands: state.brandsR.responseGetBrandsCard,
  })
}

export default connect(mapStateToProps)(Brands);

const NoBrands = ({show, onPull, isLoading}) => {
  if(!show) {
    return null;
  }
  return (
    <ScrollView
    style={{ backgroundColor: colorresource.grey50,}}
    contentContainerStyle={{flexGrow: 1}}
    refreshControl={
      <RefreshControl
      refreshing={isLoading}
      onRefresh={onPull}
      />
    }
    >
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style={{width: '100%',
          textAlign: 'center',
          color: colorresource.gray,
          fontSize: 23,
        }}>No Brands to display</Text>
      </View>
    </ScrollView>
  );
}
