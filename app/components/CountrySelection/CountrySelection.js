import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Label, ActionSheet } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class CountrySelection extends Component {

  showCountryList = (countries) => {
    let nameList = countries.map(function (item) {
      return item['name'];
    });
    nameList.push("Cancel")
    let CANCEL_INDEX = nameList.length - 1
    Platform.select({
      // ios:(ActionSheetIOS.showActionSheetWithOptions(
      //     {
      //         options: nameList,
      //         cancelButtonIndex: CANCEL_INDEX,
      //         title: "Countries"
      //     },
      //     buttonIndex => {
      //         if (buttonIndex < countries.length - 1) {
      //             this.props.dispatch(changeCountryLabel(buttonIndex));
      //         }
      //     }
      // )),
      android: (ActionSheet.show(
        {
          options: nameList,
          cancelButtonIndex: CANCEL_INDEX,
          title: "Countries"
        },
        buttonIndex => {
          if (buttonIndex < countries.length - 1) {
            this.props.onPress(buttonIndex);
          }
        }
      ))
    });
  }

    getCountryName = () => {
      const countryIndex = this.props.countryIndex;
      let countryName = '';
      if(this.props.countries && this.props.countries.length > 0) {
        countryName = this.props.countries[countryIndex].name;
      }
      return countryName;
    }


  render() {
    return (
      <Label
      bordered 
      adjustsFontSizeToFit={true}
      style={[styles.LoginScreenCountryLabel, this.props.labelStyle]} 
      onPress={() => {this.showCountryList(this.props.countries)}}
      >
          { this.getCountryName() }
      </Label>
    );
  }
}

const styles = EStyleSheet.create({
  LoginScreenCountryLabel: {
    margin: 5,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 15,
    color: 'black',
  }
})
