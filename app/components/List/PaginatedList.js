import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';

import { colorresource } from 'app/resources/colorresource';
import consts from 'app/utils/const';
// import { execute } from 'app/config/saga'
import * as serverHelper from './serverHelper';

const LIMIT = consts.BASE_PAGE_LIMIT;

const LOADING_TYPES = {
  MORE: 1,
  REFRESH: 2,
}

class PaginatedList extends Component {

  renderListEmptyComponent = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          width: '100%',
          textAlign: 'center',
          color: colorresource.gray,
          fontSize: 17,
        }}>No catalogs to display</Text>
      </View>
    )
  }

  onRefresh = () => {
    this.fetchData(false, true);
  }

  onFetchData = ({response, error, params}) => {
    let updatedState = {
      lastDataReached: false,
      isLoading: false,
    }
    if(response.length < LIMIT) {
      // usually means that there are no more
      // Brands to fetch, we have reached the end
      updatedState.lastDataReached = true
    }
    if(params.clear) {
      updatedState.data = response
    } else {
      updatedState.data = this.state.data.concat(response)
    }
    console.log("[onFetchData] data length: ", updatedState.data.length)
    this.setState(updatedState);
    this.props.onDataChange(updatedState.data)
  }

  fetchData = (more = true, clear) => {
    // if(this.state.isLoading) {
      // console.log("[fetchData] returning since we are loading")
      // return;
    // }
    if(more && this.state.lastDataReached) {
      console.log("[fetchData] returning since we have reached the end")
      return;
    }
    const loadingType = more? LOADING_TYPES.MORE : LOADING_TYPES.REFRESH;
    this.setState({isLoading: loadingType})
    const params = {
      ...this.props.params,
      offset: more? this.state.data.length : 0,
      limit: LIMIT,
    }
    console.log("[fetchData] dispatching with params, clear", params, clear)
    serverHelper.fetchData(this.props.saga, this.props.actionCreator(params), {params, clear}).then(this.onFetchData);
  }

  onEndReached = () => {
    if(this.state.isLoading === LOADING_TYPES.MORE) {
      return;
    }
    this.fetchData()
  }

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  componentDidMount() {
    this.fetchData(false, true)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.params !== this.props.params) {
      this.fetchData(false, true)
    }
  }

  static defaultProps = {
    flatListProps: {
      
    }
  }

  render() {
    return (
      <FlatList
      data={this.state.data}
      keyExtractor={this.props.keyExtractor}
      refreshing={this.state.isLoading === LOADING_TYPES.REFRESH}
      onRefresh ={this.onRefresh}
      onEndReached={this.onEndReached}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{flexGrow: 1}}
      scrollEventThrottle={400}
      showsVerticalScrollIndicator={false}
      renderItem={this.props.renderItem}
      {...this.props.flatListProps}
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
      ListEmptyComponent={this.renderListEmptyComponent}
      />
    );
  }
}

PaginatedList.defaultProps = {
  saga: null,
  // the name of the saga that has to be executed

  actionCreator: null,
  // a function which takes a param and returns the action
  // that operates on the saga

  renderItem: ({item, index}) => {},
  // flat list render item prop

  keyExtractor: (item) => item.id.toString(),

  onDataChange: (data) => {},
  // a callback to parent to notify it of data changes

  params: {},
  // the params that has to be sent with offset param to fetch data


}

const mapStateToProps = (state) => {
  return ({

  })
}

export default connect(mapStateToProps)(PaginatedList)