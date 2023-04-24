import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';
import _ from 'lodash';

import { formatDate } from 'app/utils/dateHelper'
import styles from './styles';
import { colorresource } from '../../resources/colorresource';
import {handleDeeplink} from '../../actions/navigation-actions'

export default class MyEarningsHistory extends Component{

  renderTransactionItem = (amount, description, deeplink, index) => {
    const amountStyle = amount >= 0 ? styles.WbMoneyAddedAmountText : styles.WbMoneyRemovedAmountText;
    const amountSign = amount >= 0 ? '+' : '';
    return (
      <View key={index} style={styles.WbMoneyTransactionItem}>
        <View style={{flex: 6/26}}>
          <Text style={amountStyle}>{amountSign + amount}</Text>
        </View>
        <View style={{flex: 20/26}}>
          <Text style={styles.WbMoneyTransactionDescriptionText}>{description}</Text>
        </View>
        <View style={{}}>
          <TouchableOpacity onPress={()=>handleDeeplink(deeplink)} transparent>
            <Icon name='chevron-right' type='FontAwesome' style={styles.WbMoneyTransactionDetailsIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderTransactionList = (date, data) => {
    return (
      <View key={date} style={styles.WbMoneyTransaction}>
        <View style={styles.WbMoneyTransactionDate}>
          <Text style={styles.WbMoneyTransactionDateText}>{date}</Text>
        </View>
        <View style={styles.WbMoneyTransactionItemList}>
          {data.map((item, index) => this.renderTransactionItem(this.getAmount(item), item.display_text_log, item.deep_link_log, index))}
        </View>
      </View>
    );
  }

  populateHistoryState = (history) => {
    /*
    Server returns an array of transaction items
    these items are to be grouped by their date
    Algo:
    1. initialize currentDate to null
    2. iterate over transaction items
    3. compare its date to currentDate
    4. if equal, add this item to the corresponding bucket
    5. if its date is not equal, create a new bucket
    Final output will look something like this:
    [
      {
        date: "20 Oct 2018",
        data: [
          {}, {}, {}
        ]
      },
      {
        date: "19 Oct 2018",
        data: [
          {}, {}, {}
        ]
      }
    ]
    */
    let currentDate = null
    let groupedHistory = []
    history.map((item) => {
      const itemDate = this.parseServerDate(item.created)
      if(itemDate !== currentDate) {
        currentDate = itemDate;
        groupedHistory.push({date: itemDate, data:[]});
      }
      groupedHistory[groupedHistory.length-1].data.push(item)
    })
    this.setState({history: groupedHistory})
  }

  getAmount = (item) => {
    const key = this.props.amountKey || 'points'
    return item[key]
  }

  parseServerDate = (serverDate) => {
    return formatDate(serverDate, 'DD MMM YYYY')
  }

  constructor(props) {
    super(props);
    this.state = {
      history: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEmpty(nextProps.history)) {
      this.populateHistoryState(nextProps.history);
    }
  }

  render() {
    return (
      <View>
        {this.state.history.map((item) => this.renderTransactionList(item.date, item.data))}
      </View>
    );
  }
}