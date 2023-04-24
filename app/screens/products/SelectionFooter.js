import React, { Component } from 'react'
import { View } from 'react-native';
import { Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux'

import WButton from 'app/components/Button/WButton'
import { colorresource } from 'app/resources/colorresource';

export default class SelectionFooter extends Component {

  render() {
    return (
      <View style={styles.parent}>
        <WButton style={styles.other} onPress={this.props.othersPress}>
          <Text style={styles.text}>Other</Text>
        </WButton>

        <WButton style={styles.middle} onPress={this.props.shareOnWhatsAppPress}>
          <Text style={styles.text}>Share on WhatsApp</Text>
        </WButton>

        <WButton style={styles.addToCart} onPress={this.props.addToCartPress}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </WButton>
      </View> 
    ) 
  }
}

// const mapStateToProps = (state) => {
//   return ({
//     data: state.catalogR.responsePublicCatalog,
//   })
// }

// export default connect(mapStateToProps)(SelectionFooter)

const styles = EStyleSheet.create({
  parent: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50, 
    alignItems: 'center',
    backgroundColor: 'white',
    // borderWidth: 1, 
    // borderColor: 'red'
  },
  other: {
    flex: 1, 
    height: '100%', 
    justifyContent: 'center'
  },
  text: {
    fontSize: 14, 
    color: colorresource.liteblue, 
    textAlign: 'center',
  },
  middle: {
    flex: 1, 
    justifyContent: 'center',
    height: '100%', 
    backgroundColor: 'white', 
    borderRightWidth: 0.5, 
    borderRightColor: colorresource.divider
  },
  addToCart: {
    flex: 1, 
    backgroundColor: colorresource.orange, 
    height: '100%',
    justifyContent: 'center'
  },
  addToCartText: {
    fontSize: 14, 
    color: 'white', 
    textAlign: 'center'
  }
})