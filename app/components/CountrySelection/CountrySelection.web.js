import React, { Component } from 'react';
import {View} from 'react-native';
import Select, { components } from 'react-select';

export default class CountrySelection extends Component {

  getCountryName = () => {
    const countryIndex = this.props.countryIndex;
    let countryName = '';
    if(this.props.countries && this.props.countries.length > 0) {
      countryName = this.props.countries[countryIndex].name;
    }
    return countryName;
  }

  constructOptions = () => {
    let options = [
      {value: "India", label: "India", id: 1}
    ]
    if(this.props.countries && this.props.countries.length > 0) {
      options = this.props.countries.map((item) => ({value: item.name, label: item.name, id: item.id}))
    }
    return options;
  }

  dropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
      <div/>
      </components.DropdownIndicator>
    );
  }

  render() {
    return (
      <Select 
      isSearchable={false}
      isClearable={false}
      options={this.constructOptions()} 
      menuPortalTarget={document.body}
      components = {{DropdownIndicator: this.dropdownIndicator}}
      onChange = {(item) => this.props.onPress(item.id)}
      defaultValue={{value: "India", label: "India", id: 1}}
      styles={{ 
        menuPortal: base => ({ ...base, width: base.width > 140? base.width: 140, zIndex: 9999 }),
        dropdownIndicator: base => ({...base, padding: 0}),
        input: base => ({...base, padding: 0, margin: 0}),
        indicatorSeparator: base => ({dislay:'none'}),
        control: base => ({ ...base, border: 0, boxShadow: 0}),
        singleValue: base => ({ ...base, position: 'relative', marginTop:20, marginRight: 5}),
      }}/>
    );
  }
}