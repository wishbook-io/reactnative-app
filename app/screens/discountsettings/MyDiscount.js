import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { 
  Text,
  Container,
  Content,
} from 'native-base';
import { FAB } from 'react-native-paper'
import { connect } from 'react-redux'

import GenericHeader from 'app/components/Header/GenericHeader';
import MyDiscountItem from './MyDiscountItem'
import { colorresource } from 'app/resources/colorresource'

import { listDiscountAction } from 'app/actions/discount-actions';
import { goToSetDiscount } from 'app/actions/navigation-actions';

class MyDiscount extends Component {

  onRefresh = () => {
    this.props.dispatch(listDiscountAction(true))
  }
  
  onDiscountPress = (index) => {
    console.log("[onDiscountPress]", index)
    const id = this.props.responseListDiscount[index].id
    goToSetDiscount({id})
  }

  onAddDiscountPress = () => {
    goToSetDiscount();
  }

  listEmptyComponent = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{padding: 10}}>
          <Text style={{flex: 1, textAlign: 'center', fontSize: 16, color: colorresource.liteblack}}>
            {'Hello! You have not provided discounts on any of your brands. '+
            'Touch the (+) icon below and start adding discounts now!\n\n'+
            'Please note that these discounts will be applicable on your sales to Wishbook. '+
            'Wishbook reserves the right to manage discounts to be displayed to the buyers (retailers and resellers).'}
          </Text>
        </View>
      </View>
    )
  }

  keyExtractor = (item, index) => {
    return item.id.toString()
  }

  renderItem = ({item, index}) => {
    return (
      <MyDiscountItem
        data={item}
        index={index}
        onPress={this.onDiscountPress}
      />
    )
  }

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.props.dispatch(listDiscountAction())
  }

  render() {
    return (
      <Container>
        <GenericHeader
          title={'My Discount'}
        />

        <FlatList
          contentContainerStyle={{flexGrow: 1, backgroundColor: colorresource.materialbg}}
          data={this.props.responseListDiscount}
          renderItem={this.renderItem}
          ListEmptyComponent={this.listEmptyComponent}
          keyExtractor={this.keyExtractor}
          onRefresh={this.onRefresh}
          refreshing={this.props.isRefreshing}
        />
          
        <FAB
        style={{
          bottom: 0, 
          right: 0, 
          margin: 16, 
          position: 'absolute', 
          backgroundColor: colorresource.liteblue
        }}
        icon={'add'}
        onPress={this.onAddDiscountPress}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    responseListDiscount: state.discountR.responseListDiscount,
    isRefreshing: state.discountR.isRefreshing,
  })
}

export default connect(mapStateToProps)(MyDiscount);