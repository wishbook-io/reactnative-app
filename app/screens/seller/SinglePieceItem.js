import React, { Component, PureComponent } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import Radio from 'app/components/Radio/Radio';
import { colorresource } from 'app/resources/colorresource';
import ChooseSizes from './ChooseSizes';

export default class SinglePieceItem extends PureComponent {

  hideSelling = () => {
    const callback = this.props.onSellingPress
    return !callback
  }

  onNoPress = () => {
    if(!this.props.selling) {
      return;
    }
    this.props.onSellingPress(this.props.index)
  }

  onYesPress = () => {
    if(this.props.selling) {
      return;
    }
    this.props.onSellingPress(this.props.index);
  }

  onCheckBoxPress = (subIndex) => {
    //console.log("[SinglePieceItem:onCheckBoxPress]", { subIndex })
    this.props.onCheckBoxPress(this.props.index, subIndex)
  }
  
  render() {
    const {
      data
    } = this.props

    if(!data) {
      return null;
    }

    return (
      <View>
        <View style={{flexDirection: 'row',}}>

          <View style={{flex: 1/3}}>
            <Image 
            source={{uri: data.image.thumbnail_small}}
            style={{flex: 1, height: 140}}
            resizeMode={'contain'}
            />
          </View>

          <View style={{flex: 2/3, marginLeft: 10, justifyContent: 'space-evenly'}}>

            <View>
              <Text style={styles.label}>Design number</Text>
              <Text style={styles.value}>{data.sku}</Text>
            </View>

            <View>
              <Text style={styles.label}>Price per design</Text>
              <Text style={styles.value}>{data.public_price}</Text>
            </View>

            {this.hideSelling()? null : 
              <View>
                <Text style={styles.label}>Selling</Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Radio onPress={this.onYesPress} selected={this.props.selling}/>
                    <Text style={styles.value}>Yes</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Radio onPress={this.onNoPress} selected={!this.props.selling}/>
                    <Text style={styles.value}>No</Text>
                  </View>
                </View>
              </View>
            }

          </View>
        </View>
        <ChooseSizes
          sizes={this.props.sizes}
          parentStyle={{marginHorizontal: 10}}
          onCheckBoxPress={this.onCheckBoxPress}
          hide={!this.hideSelling() && !this.props.selling}
          selected={this.props.selectedSizes}
        />
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  label: {
    fontSize: 14,
    color: colorresource.gray
  },
  value: {
    fontSize: 14,
    color: colorresource.liteblack
  }
})