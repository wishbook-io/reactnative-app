import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Text, Icon, DatePicker } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TextInput as PTextInput, HelperText } from 'react-native-paper';
import { TextField } from 'react-native-materialui-textfield'

import { colorresource } from '../../../resources/colorresource';
import styles from './styles';

export default class ProductAvailability extends Component {

  handleDatePicked = (date) => {
    this.hideDatePicker()
    this.setDate(date)
  }

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false})
  }

  onDatePickerPress = () => {
    this.setState({isDatePickerVisible: true})
  }

  getDispatchDateString = () => {
    const {year, month, day} = this.props.dispatchDate;
    const dateArray = [day, month+1, year].map(String);
    return dateArray.join('-');
  }

  setDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    // console.log("year, month, day", year, month, day)
    this.props.onDispatchDateChange({year, month, day})
  }

  formatChosenDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dateArray = [day, month+1, year].map(String);
    return dateArray.join('-');
  }


  constructor(props) {
    super(props)
    this.state = {
      isDatePickerVisible: false,
    }
  }

  render() {
    return (
      <Fragment>
        <Text style={styles.AddProductsHeading}>Product Availability</Text>
        <View style={styles.AddProductsSubSection}>
          
          <View style={{marginTop: 0}}>
            <PTextInput
              render={() => 
                <TouchableOpacity 
                activeOpacity={1} 
                onPress={this.onDatePickerPress} 
                style={{paddingTop: 17, paddingLeft: 12, flexDirection: 'row', flex: 1}}
                {...this.props.testIds.date}
                >
                  <Icon type={'MaterialCommunityIcons'} name="calendar-blank" style={{color: colorresource.liteblue, marginRight: 12, marginTop: -3}}/>
                  <Text style={{fontSize: 16, color: colorresource.materialinputtext, }}>{this.props.dispatchDate? this.getDispatchDateString() : 'Select a dispatch date'}</Text>
                </TouchableOpacity>
              }
            />
            <HelperText>
              {'Your catalog will get disabled automatically after the period mentioned above'}
            </HelperText>

          </View>

        </View>

        <View style={styles.AddProductsSubSection}>
          <View style={localStyles.LiveRow}>
            <View>
              <Text style={styles.AddProductsSubHeading}>Keep the product live for</Text>
            </View>
            <View>
              <View style={[localStyles.LiveTextInputParent, this.props.expiryPeriod.error? {borderColor: 'red'} : {} ]}>
                <TextInput
                keyboardType={'numeric'}
                maxLength={3}
                style={localStyles.LiveTextInput}
                selectionColor={colorresource.liteblue}
                value={this.props.expiryPeriod.text}
                onChangeText={this.props.onExpiryPeriodChange}
                {...this.props.testIds.live}
                />
                {this.props.expiryPeriod.error? <Icon type='FontAwesome' name="exclamation-circle" style={{color: 'red', fontSize: 20, alignSelf: 'center'}}/> : null}

              </View>
              {this.props.expiryPeriod.error? <View style={{flexDirection:'row'}}><Text multiline={true} style={{fontSize: 9, flexWrap: 'wrap', flex: 1, color: 'red', textAlign: 'center'}}>{this.props.expiryPeriod.error}</Text></View> : null}
            </View>
            <View>
            <Text style={styles.AddProductsSubHeading}>Days</Text>
            </View>
          </View>
        </View>
        <DateTimePicker
        isVisible={this.state.isDatePickerVisible}
        onConfirm={this.handleDatePicked}
        onCancel={this.hideDatePicker}
        minimumDate={new Date()}
        date={this.props.dispatchDate? new Date(this.props.dispatchDate.year, this.props.dispatchDate.month, this.props.dispatchDate.day) : undefined}
        />
      </Fragment>
    );
  }
}


// local styles: they should not be defined in global styles
const localStyles = EStyleSheet.create({
  DateSelector: {
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  DateSelectorText: {
      fontSize: 14,
      color: colorresource.liteblue,
      marginLeft: 10,
  },
  DateSelectorRow: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  LiveRow: {
    flexDirection: 'row', 
    alignItems:'center',
  },
  LiveTextInputParent: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colorresource.materialinputbg,
    overflow: 'hidden',
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 4,
    paddingRight: 4,
    flexDirection: 'row',
  },
  LiveTextInput: {
    textAlign: 'center', 
    minWidth: 50, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    color: colorresource.grey900,
  }
});
