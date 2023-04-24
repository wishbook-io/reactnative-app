import React, { Component, PureComponent } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Icon, Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux'

import Radio from 'app/components/Radio/Radio'
import { showConfirm } from 'app/utils/notifier'
import { colorresource } from 'app/resources/colorresource'

import { removeSavedFilterFromServerAction } from 'app/actions/productTab-filter-actions';

import { TestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'MyFilters';
const buttonTestId = TestIdGenerator(screenName, '', "Button")

class MyFiltersItem extends PureComponent {

  onConfirmDeleteFromMyFilter = (id) => {
    this.props.dispatch(removeSavedFilterFromServerAction(id))
  }

  onDeletePress = () => {
    const id = this.props.data.id
    showConfirm(
      screenName,
      'Confirm Delete',
      'Are you sure you want to remove this filter?',
      this.onConfirmDeleteFromMyFilter,
      id)
  }

  onApply = () => {
    this.props.onApply(this.props.data.params,)
  }
  
  render() {
    const {data, index, selected} = this.props

    return (
      <View style={styles.parent}>  
        <TouchableHighlight 
        underlayColor={'transparent'} 
        onPress={this.onApply}
        style={{
          // borderWidth: 1, 
          flex: 1,
        }}
        {...buttonTestId("MyFilterOptions"+index)}
        >   
          <View style = {styles.radioRow}>
            <Radio selected={selected} onPress={this.onApply} />
            <View style={{
              flex: 1,
              // borderWidth: 1
            }}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.subText}>{data.sub_text}</Text>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight 
        underlayColor={'transparent'} 
        onPress={this.onDeletePress}
        style={{
          // borderWidth: 1,
          padding: 10,
        }}
        >
          <Icon name='trash' style={{color: colorresource.litegray}}/>
        </TouchableHighlight>
      </View>  
    )
  }
}

export default connect()(MyFiltersItem);

const styles = EStyleSheet.create({
  parent: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  radioRow: {
    flexDirection:'row', 
    padding:10,
  },
  title: {
    marginLeft:15
  },
  subText: {
    marginLeft:15, 
    fontSize: 12, 
    color: 'grey', 
    flexWrap: 'wrap', 
    flex: 1,
  }

})