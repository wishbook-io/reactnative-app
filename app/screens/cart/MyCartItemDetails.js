import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Text, CardItem } from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';

import MyCartItemToggleDetails from './MyCartItemToggleDetails';
import MyCartItemDetailsEntry from './MyCartItemDetailsEntry';

export default class MyCartItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { activeSections: [] };
  }
  render() {
    return (
      <Accordion
      activeSections={this.state.activeSections}
      sections={['Section 1']}
      renderSectionTitle={(content, index, isActive) => {
        return (
        null
        );
      }}
      renderHeader={(content, index, isActive, sections) => {
        return (
          <MyCartItemToggleDetails/>
        );
      }}
      renderContent={(content, index, isActive, sections) => {
        /*
        Previously I was using MyCartItemDetailsList to display a list of products
        when user clicked on more details, but due to some bug 
        https://github.com/oblador/react-native-collapsible/issues/91,
        I am not relying on FlatList anymore and using a simple map array
        */
        return ['Cart 1', 'Cart 2', 'Cart 3', 'Cart 4'].map((rowData, index) => <MyCartItemDetailsEntry key={index} rowData={rowData}/>);
      }}
      onChange={(activeSections) => {
        this.setState({activeSections})
      }}
      expandFromBottom={true}
      />
    );
  }
}