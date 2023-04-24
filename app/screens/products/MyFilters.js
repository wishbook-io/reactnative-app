import React, { Component } from 'react';
import { 
  View, 
  TouchableOpacity, 
  TouchableHighlight, 
  ScrollView, 
  Dimensions, 
  RefreshControl,
  InteractionManager
} from 'react-native';
import { 
  Icon, 
  Text,
  Container,
  Content,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import GenericHeader from 'app/components/Header/GenericHeader';
import MyFiltersItem from './MyFiltersItem';
import Radio from 'app/components/Radio/Radio';
import { showConfirm } from 'app/utils/notifier'
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';

import {
  getSavedFilterFromServerAction,
  removeSavedFilterFromServerAction
} from 'app/actions/productTab-filter-actions';
import { goBack } from 'app/actions/navigation-actions';

import { TestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'MyFilters';
const buttonTestId = TestIdGenerator(screenName, '', "Button")

class MyFilters extends Component {

  getCurrentlySelectedFilterId = () => {
    const id = this.props.navigation.getParam("currentlySelected")
    return id
  }

  onApply = (params) => {
    const onApplyCallback = this.props.navigation.getParam('onApply')
    if(onApplyCallback) {
      onApplyCallback(params)
      goBack()
    } else {
      console.warn("[MyFilters:onApply] no callback")
    }
  }

  onRefresh = () => {
    this.props.dispatch(getSavedFilterFromServerAction(true))
  }

  onConfirmDeleteFromMyFilter = (id) => {
    this.props.dispatch(removeSavedFilterFromServerAction(id))
  }

  onDeletePress =(id) => {
    showConfirm(
      screenName,
      'Confirm Delete',
      'Are you sure you want to remove this filter?',
      this.onConfirmDeleteFromMyFilter,
      id)
  }

  constructor(props) {
    super(props)
    this.state = {
      animationDone: false,
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(getSavedFilterFromServerAction(false))
      this.setState({animationDone: true,})
    })
  }

  render() {

    const { height, width } = Dimensions.get('window')

    if(!this.state.animationDone) {
      return null;
    }

    return (
      <Container>
        <GenericHeader
          title={'My Filters'}
          leftConfig={{
            icon: 'close',
            onPress: goBack,
            visible: true,
          }}
        />

        <Content 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {this.props.responseFilters.map((item, index) => (
            <MyFiltersItem
              key={item.id}
              onApply={this.onApply}
              index={index}
              selected={this.getCurrentlySelectedFilterId() === item.id}
              data={item}
            />
          ))}

          {!this.props.isRefreshing && this.props.responseFilters.length === 0?
            <View style={{flexGrow: 1, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>There are no saved filters</Text> 
            </View>
          : null}
        </Content>   
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseFilters: state.productFilterR.responseSavedFilterServerListReversed,
    isRefreshing: state.productFilterR.isRefreshing,
  })
}

export default connect(mapStateToProps)(MyFilters);