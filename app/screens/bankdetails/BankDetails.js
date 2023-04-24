import React, { Component } from 'react';
import { View, Clipboard, Share } from 'react-native';
import {
  Text,
  Container,
  Content
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux'

import GenericHeader from 'app/components/Header/GenericHeader';
import { colorresource } from 'app/resources/colorresource';
import { showToastAction } from 'app/actions/toast-actions'
import consts from 'app/utils/const';

class BankDetails extends Component {

  onSharePress = () => {
    if(this.shareThrottled) {
      // console.log("returning")
      return;
    }
    // console.log("sharing")
    this.shareThrottled = setTimeout(() => {
      this.shareThrottled && clearTimeout(this.shareThrottled)
      this.shareThrottled = null
      // console.log("nullifying")
    }, 1000);

    Share.share({
      message: consts.PAYMENT_DETAILS,
    }).then((result) => {
      // console.log("result", result)
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
      return result;
    })
  };

  onCopyPress = () => {
    Clipboard.setString(consts.PAYMENT_DETAILS);
    this.showToast("Copied to clipboard")
  }

  showToast = (message, duration=1000) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  render() {
    return (
      <Container>
        <GenericHeader
        title={'Wishbook Bank Details'}
        />
        <Content>
        <View style={{padding: 20}}>
          
            <View>
              <Text style={localStyles.paymentText}>{consts.PAYMENT_DETAILS}</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
              <View>
                <Text uppercase style={localStyles.detailsButtonText} onPress={this.onCopyPress}>copy details</Text>
              </View>
              <View style={{marginLeft: 5}}>
                <Text uppercase style={localStyles.detailsButtonText} onPress={this.onSharePress}>share details</Text>
              </View>
            </View>
            </View>
        </Content>
      </Container>
    );
  }
}

const localStyles = EStyleSheet.create({
  paymentText: {
    fontSize: 16,
    color: colorresource.liteblack,
  },
  detailsButtonText: {
    color: colorresource.liteblue,
    fontSize: 14,
    padding: 10,
  }
})

export default connect()(BankDetails);