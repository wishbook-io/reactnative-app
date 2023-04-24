import React, { Component, PureComponent } from 'react'
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

class ShareCatalogItem extends PureComponent {

  onImagePress = () => {
    this.props.onPress(this.props.index)
  }
  
  render() {
    const {
      data,
      selected,
      index,
      onPress,
    } = this.props
    return (
      <TouchableOpacity
        onPress={onPress? this.onImagePress : undefined}
        activeOpacity={1}
        key={data.id}
        style={styles.parent}
      >
      <View style={styles.parentInternal}>
        <View style={styles.image}>
          <Image source={{uri: data.image.thumbnail_small}} resizeMode={'contain'} style={styles.image}/>
        </View>
        {selected?
          <View style={styles.overlay}>
            <View style={styles.overlayInternal}>
              <View style={styles.tickCircle}>
                <Icon name='done' type='MaterialIcons' style={styles.tickIcon}/>
              </View>
            </View>
          </View>
        : null }
        </View>
      </TouchableOpacity>
    )
  }
}

export default ShareCatalogItem

const styles = EStyleSheet.create({
  parent: {
    width: '33%', 
    height: 250,
  },
  parentInternal: {
    flex: 1, 
    padding: 10
  },
  image: {
    flex: 1,
  },
  overlay: {
    position: 'absolute', 
    top: 5, 
    bottom: 5, 
    right: 5, 
    left: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  overlayInternal: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1,
  },
  tickCircle: {
    height: 30, 
    width: 30, 
    borderRadius: 15, 
    backgroundColor: 'white'
  },
  tickIcon: {
    color: 'black',
  }
})