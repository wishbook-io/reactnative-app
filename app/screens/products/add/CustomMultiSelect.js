import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Text, Icon } from 'native-base';
import _ from 'lodash';
import { Chip as PChip } from 'react-native-paper'

import * as formatHelper from 'app/utils/formatHelper'
import Chip from 'app/components/Chip/Chip'
import AddChip from 'app/components/Chip/AddChip'
import assets from 'app/utils/assetsObject';
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';

export default class CustomMultiSelect extends Component {

  onCrossPress = (index) => {
    const updatedSelectedItems = _.cloneDeep(this.props.selectedItems);
    updatedSelectedItems.splice(index, 1)
    this.props.onSelectedItemsChange({selectedItems: updatedSelectedItems, enumType: this.props.enumType});
  }

  onAddPress = () => {
    const params = {
      enumType: this.props.enumType,
    }
    this.props.onAdd(params);
  }
  getSelectedChips = () => {
    return this.props.selectedItems.map((item, index) => <Chip text={item.value} key={item.id} onCrossPress={this.onCrossPress} index={index}/>)
  }
  renderChips = () => {
    let selectedChips = this.getSelectedChips()
    selectedChips.push(<AddChip key={0} text={'+ Add ' + formatHelper.formatSlugString(this.props.enumType)} onPress={this.onAddPress} testId={this.props.testId}/>);
    return selectedChips;
  }

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {data, selectedItems, onSelectedItemsChange, enumType, heading} = this.props;
    if(!data || (data.length && data.length === 0) || Object.keys(data).length === 0) {
      return null;
    }
    // console.log("selected items", selectedItems, data)

    return (
      <View style={styles.AddProductsSubSection}>
        <Text style={styles.AddProductsSubHeading}>{heading}</Text>
        <View style={{flexDirection: 'row'}}>

          <View style={localStyles.ChipsContainer}>
            {this.renderChips()}
          </View>

          </View>
      </View>
    );
  }
}

// local styles: they should not be defined in global styles
const localStyles = EStyleSheet.create({
  ChipsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ChipsParent: {
    height: 40,           // necessary to add padding at top and bottom, WITHOUT messing up vertical alignment
    flexDirection: 'row', // necessary to make aligning work in center, otherwise AddChips and SelectedChips won't be centered
    alignItems: 'center',
    paddingRight: 5,      // change this to increase spacing between chips on same row
    // borderWidth: 1,
  },
  SelectedChips: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    borderRadius: 5,
    height: 32,                 // got this value from https://github.com/fiskurgit/ChipCloud/blob/master/library/src/main/res/values/dimens.xml
  },
  ChipText: {
    marginLeft: 7,
    fontSize: 13,
    textAlign: 'center',
  },
  Cross: {
    margin: 5,
    width: 16,
    height: 16
  },
  AddChips: {
    borderWidth: 1,
    borderColor: colorresource.liteblue,
    borderRadius: 5,
    height: 30,
    justifyContent: 'center',
  },
  AddChipsText: {
    color: colorresource.liteblue,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 12,
  }
});
