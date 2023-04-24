import React, { Component } from 'react';
import { View } from 'react-native'
import { Text, Icon, Button } from 'native-base';
import PhotoView from 'react-native-photo-view';
import EStyleSheet from 'react-native-extended-stylesheet'

import { goBack } from 'app/actions/navigation-actions'
import { isWeb } from 'app/utils/PlatformHelper'

class ProductViewer extends Component {

  onPressBack = () => {
    goBack()
  }

  toggleDetails = () => {
    this.setState({detailsVisible: !this.state.detailsVisible})
  }

  constructor(props) {
    super(props)
    this.state = {
      detailsVisible: true,
    }
  }
  
  render() {
    const {
      image,
      rate,
      sku,
    } = this.props.navigation.state.params;

    return (
      <View style={styles.parent}>
        <Button transparent onPress={this.onPressBack}>
          <Icon name='arrow-back' style={styles.backIcon}/>
        </Button>
        <PhotoView
          source={{uri: image}}
          maximumZoomScale={3}
          androidScaleType="fitCenter"
          onTap={this.toggleDetails}
          onViewTap={this.toggleDetails}
          style={styles.photoView}
          {...(isWeb? {resizeMode: 'contain'} : {})}
        />
        {this.state.detailsVisible? 
          <View style={styles.detailsParent}>
            <Text style={styles.rateText}>{'₹' + rate}</Text>
            <Text style={styles.skuText}>{'Design No: ' + sku}</Text>
          </View>
        : null }
      </View>
    )
  }
}

export default ProductViewer

const styles = EStyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'black',
  },
  backIcon: {
    color: 'white',
    // fontSize: 24,
  },
  photoView: {
    flex:1,
    // backgroundColor:'white',
  },
  detailsParent: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
  },
  rateText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
  skuText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
})