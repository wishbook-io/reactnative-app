import React, { Component, PureComponent } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet'

import CheckBox from 'app/components/CheckBox/CheckBox';
import { colorresource } from 'app/resources/colorresource';

class SizedMultiSelectionItem extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.data !== nextProps.data) {
      return true;
    }

    const oldSelected = this.props.selected;
    const newSelected = nextProps.selected;
    // console.log({index: this.props.index, oldSelected, newSelected})
    if(!oldSelected) {
      if(!newSelected) {
        return false;
      }
      return true
    }
    if(oldSelected.length !== newSelected.length) {
      return true;
    }
    // if(nextProps.selected != this.props.selected) {
    //   console.log('scu: selected doesnt match', this.props.selected, nextProps.selected)
    // }

    // if(nextProps.selected !== this.props.selected) {
    //   console.log('scu: selected doesnt strongly match', this.props.selected, nextProps.selected)
    // }

    return false;
  }

  onCheckBoxPress = (subIndex) => {
    this.props.onCheckBoxPress(this.props.index, subIndex)
  }

  render() {
    const {
      data,
      selected,
      index,
    } = this.props
    
    // console.log("sizedmultiselectionitem", index, selected)

    return (
      <View style={{marginLeft: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{
            flex: 1/3,
            // borderWidth: 1,
            height: 140,
          }}>
            <Image source={{uri: data.image.thumbnail_small}} style={{flex: 1, backgroundColor: colorresource.grey50}} resizeMode={'contain'}/>
          </View>
          <View style={{
            flex: 2/3,
            marginLeft: 10
            // borderWidth: 1,
          }}>
            <View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabelText}>Design number:</Text>
                <Text style={styles.infoValueText}>{data.title}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabelText}>Collection:</Text>
                <Text style={styles.infoValueText}>{data.catalog_title}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabelText}>Select sizes:</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {data.available_sizes.split(',').map((size, index) => 
                    <SizeItem 
                    key={size} 
                    data={size} 
                    selected={selected && selected.includes(index)} 
                    index={index}
                    onCheckBoxPress={this.onCheckBoxPress}
                    />
                  )}
                </View>
              </View>


            </View>
          </View>
        </View>
      </View>
    )
  }
}

export class SizeItem extends PureComponent {

  onCheckBoxPress = () => {
    this.props.onCheckBoxPress(this.props.index)
  }

  render() {
    const {
      data,
      selected
    } = this.props
    return (
      <View key={data} style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}> 
        <Text style={{fontSize: 14, color: colorresource.liteblack}}>{data}</Text>
        <CheckBox selected={selected} onPress={this.onCheckBoxPress}/>
      </View>
    )
  }
}

export default SizedMultiSelectionItem

const styles = EStyleSheet.create({
  infoItem: {
    marginBottom: 10
  },
  infoLabelText: {
    fontSize: 14,
    color: colorresource.gray,
  },
  infoValueText: {
    fontSize: 14,
    color: colorresource.liteblack,
  }
})