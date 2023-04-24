import React, { Component } from 'react'
import { View } from 'react-native';
import RNDateRanges from 'react-native-date-ranges';

import Modal from 'app/components/Modal/Modal'
import { colorresource } from 'app/resources/colorresource'

export default class CustomDateRangePicker extends Component {

  // public methods
  show = () => {
    if(!this.dateRangeRef) {
      console.log("[CustomDateRangePicker] no ref")
      return;
    }
    this.dateRangeRef.setModalVisible(true)
  }
  // public methods end

  onConfirm=({startDate, endDate}) => {
    console.log("[CustomDateRangePicker:onConfirm]", {startDate, endDate})
    this.props.onDateRangeSelected && this.props.onDateRangeSelected(startDate, endDate)
  }

  registerDateRangeRef = (r) => {
    this.dateRangeRef = r
  }

  isDateBlocked = () => {
    return false
  }

  onDatesChange = ({startDate, endDate}) => {

  }
  
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
    }
  }
  
  render() {
    return (
      <RNDateRanges
        ref={this.registerDateRangeRef}
        mode={'range'}
        markText={'Select Date Range'}
        ButtonText={'DONE'}
        ButtonTextStyle={{color: colorresource.liteblue}}
        selectedBgColor={colorresource.liteblue}
        onConfirm={this.onConfirm}
        hideSelector={true}
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