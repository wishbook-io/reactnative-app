import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { 
  Container, 
  Content, 
  Text, 
  Icon, 
  Button 
} from 'native-base';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import _ from 'lodash';

import SharedCatalogItem from './SharedCatalogItem';
import DateRangePicker from 'app/components/Date/DateRangePicker';
import PaginatedList from 'app/components/List/PaginatedList';
import { formatDate } from 'app/utils/dateHelper';
import { colorresource } from 'app/resources/colorresource';
import { formatDateToPostServer } from 'app/utils/formatHelper';

import { getSharedProductsAction } from 'app/actions/catalog-actions';
import { getSharedProducts } from 'app/saga/catalog-saga';

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';

class SharedByMe extends Component {

  getDateRangeString = () => {
    console.log({endDate})
    const startDate = formatDate(this.state.params.from_date, "DD/MM/YYYY")
    const endDate = formatDate(this.state.params.to_date, "DD/MM/YYYY")
    return startDate + ' → ' + endDate
  }

  onDataChange = (data) => {

  }

  keyExtractor = (item, index) => {
    return item.id.toString();
  }

  renderItem = ({item, index}) => {
    return (
      <SharedCatalogItem
      data={item}
      />
    );
  }

  initialize = () => {
    const initialToDate = moment()
    const initialFromDate = moment().subtract(30, 'days')
    const toDate = formatDateToPostServer(initialToDate)
    const fromDate = formatDateToPostServer(initialFromDate);
    const initialParams = {
      from_date: fromDate, 
      to_date: toDate
    }
    return initialParams
  }

  onDateRangeSelected = (result) => {
    console.log("[onDateRangeSelected]", { dateRangeSelected: result})
  }
  
  constructor(props) {
    super(props)
    this.state = {
      params: {
        ...this.initialize(),
      }
    }
  }

  componentDidMount() {
    waitTillUserInfoIsFetched().then(() => {
      this.initialize()
    })
  }

  render() {
    return (
      <Content>
        <View style={{padding: 5}}>
          <Text style={{fontSize: 14, color: colorresource.liteblack, marginBottom: 5}}>Date Range</Text>
          <DateRangePicker
          onDateRangeSelected={this.onDateRangeSelected}
          placeholder={this.getDateRangeString()}
          />
        </View>
        <PaginatedList
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        saga={getSharedProducts}
        actionCreator={getSharedProductsAction}
        onDataChange={this.onDataChange}
        params={this.state.params}
        flatListProps={{
          numColumns: 2
        }}
        />
        
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return ({

  })
}

export default connect()(SharedByMe);