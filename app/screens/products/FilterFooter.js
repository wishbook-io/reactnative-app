import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'native-base';
import { Button as PButton } from 'react-native-paper'

import LocalStorage from 'app/db/LocalStorage';
import { ASYNC_STORAGE } from 'app/utils/const';
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';

const ORDERING = {
  'LATEST': '-id',
  'TRENDING': '-popularity',
  'PRICE_DESC': '-price',
  'PRICE_ASC': 'price',
}

export default class FilterFooter extends Component {

  loadOrdering = async () => {
    const order = await LocalStorage.getItem(ASYNC_STORAGE.ORDERING)
    return order;
  }

  saveOrdering = (order) => {
    LocalStorage.setItem(ASYNC_STORAGE.ORDERING, order)
  }

  onFilterChange = (order, initial) => {
    this.props.onFilterChange({param: 'ordering', value: order, initial,})
    this.saveOrdering(order)
  }

  ordering = (order) => {
    const orderProp = this.props.localFilterStateMap['ordering']
    if(!order) {
      return orderProp
    }
    const ordered =  orderProp === order
    return ordered
  }

  onTrendingPress = () => {
    if(this.ordering(ORDERING.TRENDING)) {
      // already selected, nothing to do here
      return;
    }
    this.onFilterChange(ORDERING.TRENDING)
  }

  onLatestPress = () => {
    if(this.ordering(ORDERING.LATEST)) {
      // already selected, nothing to do here
      return;
    }
    this.onFilterChange(ORDERING.LATEST)
  }

  onPricePress = () => {
    const priceAsc = this.ordering(ORDERING.PRICE_ASC)
    if(priceAsc) {
      this.onFilterChange(ORDERING.PRICE_DESC)
      return;
    }

    this.onFilterChange(ORDERING.PRICE_ASC)
  }

  initialize = async () => {
    let order = await this.loadOrdering()
    if(!order) {
      order = ORDERING.LATEST
    }
    this.onFilterChange(order, true)
  }

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.initialize()
  }

  render() {

    const { 
      visible
    } = this.props

    if(!visible) {
      return null;
    }

    // console.log("[FilterFooter:render()] ordering: ", this.ordering())

    const priceAsc = this.ordering(ORDERING.PRICE_ASC)
    const priceDesc = this.ordering(ORDERING.PRICE_DESC)

    return (
      <View style={styles.Footer}>

        <View style={{flex: 1/3}}>
          <PButton
          mode={'text'}
          color={this.ordering(ORDERING.TRENDING)? undefined : colorresource.gray}
          onPress={this.onTrendingPress}
          >TRENDING</PButton>
        </View>

        <View style={{flex: 1/3}}>

          <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center'}}>
            <View style={{height: 20, borderLeftWidth: 1, borderRightWidth: 1, borderColor: colorresource.gray}}/>
          </View>

          <PButton
          color={this.ordering(ORDERING.LATEST)? undefined : colorresource.gray}
          onPress={this.onLatestPress}
          >LATEST</PButton>

        </View>

        <View style={{flex: 1/3}}>
          <PButton 
          color={(priceAsc || priceDesc)? undefined : colorresource.gray}
          onPress={this.onPricePress}
          >{`${priceAsc? '↑ ' : priceDesc? '↓ ' : ''}PRICE`}</PButton>
        </View>

      </View>
    );
  }
}