import React, { Component } from 'react';
import RNDateRanges from 'react-native-date-ranges';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colorresource } from 'app/resources/colorresource';

class DateRangePicker extends Component {

  onDateRangeSelected = ({ startDate, endDate}) => {
    this.props.onDateRangeSelected({startDate, endDate})
  }

  render() {
    const {
      placeholder = 'Select Date Range',
      onDateRangeSelected
    } = this.props
    return (
      <RNDateRanges
      mode='range'
      markText={'Select Date Range'}
      ButtonText={'DONE'}
      ButtonTextStyle={{color: colorresource.liteblue}}
      selectedBgColor={colorresource.liteblue}
      placeholder={placeholder}
      onConfirm={this.onDateRangeSelected}
      blockAfter={true}
      outFormat={'DD/MM/YYYY'}
      style={{
        backgroundColor: colorresource.materialinputbg,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colorresource.materialinputtextul,
        borderRadius: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      }}
      customStyles={{
        headerMarkTitle: {
          color: 'white',
        },
        headerStyle: {
          backgroundColor: colorresource.liteblue,
        },
        contentText: {
          color: colorresource.materialinputtext,
          fontSize: 14,
        },
        placeholderText: {
          color: colorresource.materialinputtext,
          fontSize: 14,
        }
      }}
      />
    )
  }
}

export default DateRangePicker