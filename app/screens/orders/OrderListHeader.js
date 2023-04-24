import React, { Component, PureComponent } from 'react';
import { View } from 'react-native'
import { Text, Picker } from 'native-base'
import { HelperText } from 'react-native-paper'

import DropdownMaterial from 'app/components/Dropdown/DropdownMaterial';
import DateRangePicker from 'app/components/Date/CustomDateRangePicker';
import { formatDate } from 'app/utils/dateHelper';
import TextInputKeyed from '../../components/MaterialTextInput/TextInputKeyed';

export const ORDER_STATUS_ALL = 'All'
export const ORDER_STATUS_PLACED = 'Placed'
export const ORDER_STATUS_DISPATCHED = 'Dispatched'
export const ORDER_STATUS_CANCELLED = 'Cancelled'

export const ORDER_STATUS = {
  byKey: {
    [ORDER_STATUS_ALL]: {

    },
    [ORDER_STATUS_PLACED]: {

    },
    [ORDER_STATUS_DISPATCHED]: {

    },
    [ORDER_STATUS_CANCELLED]: {

    },
  },
  keys: [
    ORDER_STATUS_ALL,
    ORDER_STATUS_PLACED,
    ORDER_STATUS_DISPATCHED,
    ORDER_STATUS_CANCELLED,
  ]
}

const DATE_RANGE_ALL = 'All'
const DATE_RANGE_TODAY = 'Today'
const DATE_RANGE_YESTERDAY = 'Yesterday'
const DATE_RANGE_WEEK = 'Last 7 Days'
const DATE_RANGE_MONTH = 'This month'
const DATE_RANGE_CUSTOM = 'Custom'

export const DATE_RANGE = {
  byKey: {
    [DATE_RANGE_ALL]: {

    },
    [DATE_RANGE_TODAY]: {

    },
    [DATE_RANGE_YESTERDAY]: {

    },
    [DATE_RANGE_WEEK]: {

    },
    [DATE_RANGE_MONTH]: {

    },
    [DATE_RANGE_CUSTOM]: {

    },
  },
  keys: [
    DATE_RANGE_ALL,
    DATE_RANGE_TODAY,
    DATE_RANGE_YESTERDAY,
    DATE_RANGE_WEEK,
    DATE_RANGE_MONTH,
    DATE_RANGE_CUSTOM,
  ]
}

class OrderListHeader extends PureComponent {

  onSearchTextChange = (text) => {
    this.props.onSearchTextChange(text)
  }

  onClosePress = () => {
    this.props.hideSearch()
  }

  onDateRangeSelected = (startDate, endDate) => {
    this.onDateRangeChange((new Date(startDate)).toISOString(), (new Date(endDate)).toISOString())
  }

  registerDateRangePickerRef = (r) => {
    this.dateRangePickerRef = r
  }

  formatCustomDateRange = () => {
    const start = this.props.dateRangeStart
    const end = this.props.dateRangeEnd
    // console.log("[formatCustomDateRange]", {start, end})
    const startFormatted = formatDate(start, 'DD/MM/YYYY')
    const customDate =  startFormatted + (start == end? '' : ' → ' + formatDate(end, 'DD/MM/YYYY'))
    // console.log("[formatCustomDateRange]", {customDate})
    return customDate
  }

  isEqual = (date1, date2) => {
    return date1.getTime() === date2.getTime()
  }

  getDateRangeValue = () => {
    const startDate = new Date(this.props.dateRangeStart)
    const endDate = new Date(this.props.dateRangeEnd)
    // console.log("[getDateRangeValue]", {startDate: startDate.toString(), endDate: endDate.toString()})
    if(!startDate.getTime() || !endDate.getTime()) {
      return DATE_RANGE_ALL
    }

    if(this.isEqual(startDate, endDate) && this.isEqual(startDate, this.dToday)) {
      return DATE_RANGE_TODAY
    }
    
    if(this.isEqual(startDate, endDate) && this.isEqual(startDate, this.dYesterday)) {
      return DATE_RANGE_YESTERDAY
    }

    if(this.isEqual(startDate, this.dWeek) && this.isEqual(endDate, this.dToday)) {
      return DATE_RANGE_WEEK
    }
    
    if(this.isEqual(startDate, this.dMonth) && this.isEqual(endDate, this.dToday)) {
      return DATE_RANGE_MONTH
    }

    return DATE_RANGE_CUSTOM    
  }

  onStatusChange = (status) => {
    this.props.onOrderStatusChange(status)
  }

  onDateRangePick = (range) => {
    if(!range) {
      return;
    }
    // console.log("[onDateRangePick]", {range})
    if(range === DATE_RANGE_CUSTOM) {
      // show picker here
      if(!this.dateRangePickerRef) {
        console.warn("[onDateRangePick] picker ref not found")
        return;
      }
      this.dateRangePickerRef.show()
      return;
    }
    switch(range) {
      case DATE_RANGE_ALL:
      this.onDateRangeChange(null, null)
      break;

      case DATE_RANGE_TODAY:
      this.onDateRangeChange(this.dToday.toISOString(), this.dToday.toISOString())
      break;

      case DATE_RANGE_YESTERDAY:
      this.onDateRangeChange(this.dYesterday.toISOString(), this.dYesterday.toISOString())
      break;

      case DATE_RANGE_WEEK:
      this.onDateRangeChange(this.dWeek.toISOString(), this.dToday.toISOString())
      break;

      case DATE_RANGE_MONTH:
      this.onDateRangeChange(this.dMonth.toISOString(), this.dToday.toISOString())
      break;

    }
  }

  onDateRangeChange = (start, end) => {
    // console.log("[OrderListHeader:onDateRangeChange]", {start, end})
    this.props.onDateRangeChange(start, end)
  }

  constructor(props) {
    super(props)

    const dToday = new Date()
    dToday.setHours(0, 0, 0, 0)
    this.dToday = dToday
    
    const dYesterday = new Date(dToday)
    dYesterday.setDate(dYesterday.getDate() - 1)
    this.dYesterday = dYesterday
    
    const dWeek = new Date(dToday)
    dWeek.setDate(dWeek.getDate() - 7)
    this.dWeek = dWeek

    const dMonth = new Date(dToday)
    dMonth.setMonth(dMonth.getMonth() - 1)
    this.dMonth = dMonth

    this.state = {
    }
  }
  
  render() {
    const dateRangeValue = this.getDateRangeValue()
    const customRange = dateRangeValue === DATE_RANGE_ALL? null : this.formatCustomDateRange()
    const {
      searchVisible,
      searchText,
    } = this.props
    return (
      <View style={{}}>
        <View style={{flexDirection: 'column', paddingHorizontal: 10}}>
          {searchVisible?
          <View style={{marginTop: 10}}>
            <TextInputKeyed
              label={'Search All Orders'}
              value={searchText}
              placeholder={'Search by Order Id'}
              trailing={'close'}
              trailingPress={this.onClosePress}
              autoFocus={true}
              onChange={this.onSearchTextChange}
            />
          </View>
          : <>
            <View style={{paddingRight: 0,}}>
              <DropdownMaterial
                label={'Order Status'}
                mode={'dropdown'}
                parentStyle={{flex: 0}}
                selectedValue={this.props.orderStatus}
                onValueChange={this.onStatusChange}
              >
                {ORDER_STATUS.keys.map(item => <Picker.Item label={item} value={item} key={item}/>)}
              </DropdownMaterial>
            </View>

            <View style={{paddingLeft: 0,}}>
              <DropdownMaterial
                label={'Date Range'}
                mode={'dropdown'}
                parentStyle={{flex: 0}}
                selectedValue={dateRangeValue}
                onValueChange={this.onDateRangePick}
              >
                {DATE_RANGE.keys.map(item => <Picker.Item label={item} value={item} key={item}/>)}
              </DropdownMaterial>
              {customRange? <HelperText>{customRange}</HelperText> : null }
            </View>
          </>}

        </View>
        <DateRangePicker
          ref={this.registerDateRangePickerRef}
          onDateRangeSelected={this.onDateRangeSelected}
          hideSelector={true}
        />
      </View>
    )
  }
}

export default OrderListHeader
