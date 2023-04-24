import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import {colorresource} from 'app/resources/colorresource';
import { strings } from 'app/utils/i18n';

import Modal from 'app/components/Modal/Modal';

export default class StartSelling extends Component {

  onDonePress = () => {
    const {error, value} = this.validateLiveText(this.state.liveText)
    if(error) {
      return;
    }
    let expiryDate = new Date(new Date().getTime()+(value*24*60*60*1000));
    expiryDate = expiryDate.toISOString();
    this.props.onDonePress(expiryDate);
  }

  validateLiveText = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, '')
    const value = parseInt(cleanedText);
    let error = null;
    if(Number.isNaN(value)) {
      error = "Duration can't be empty"
    } else if(value < 10) {
      error = "Minimum enable duration should be 10"
    } else if(value > 90) {
      error = "Maximum enable duration should be 90"
    }
    if(error) {
      return {error}
    }
    return {value}
  }

  onLiveTextChange = (text) => {
    console.log("[onLiveTextChange] text:" ,text);
    const cleanedText = text.replace(/[^0-9]/g, '')
    this.setState({liveText: cleanedText})

    // also validate at the same time
    const {error} = this.validateLiveText(cleanedText)
    
    this.setState({liveTextError: error});
  }
  
  constructor(props) {
    super(props)
    this.state = {
      liveText: '30',
      liveTextError: null,
      visible: true,
    }
  }

  render() {
    if(!this.props.show) {
      return null;
    }
    return (
      <Modal
      isVisible={this.state.visible}
      onBackdropPress={this.props.onCancelPress}
      >
        <View style={{
          backgroundColor: 'white',
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 3,
          paddingTop: 10,
          paddingBottom: 5,
        }}>
          <View>
            <Text style={{
              color: colorresource.liteblue,
              fontSize: 18,
            }}>Catalog Enable Duration</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{
              fontSize: 10,
              color: colorresource.darkgray,
            }}>Your catalog will get disabled automatically after the period mentioned below</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            // borderWidth: 1,
            // borderColor: 'red',
          }}>
            <View>
              <Text style={{
                fontSize: 13,
              }}
              >Keep the product live for</Text>
            </View>
            <View style={{
              // width: 60,
              marginLeft: 8,
              marginRight: 8,
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
              style={{
                // color: colorresource.litegray,
                width: 60,
                textAlign: 'center',
                paddingTop: 0,
                paddingBottom: 0,
              }}
              maxLength={2}
              keyboardType={'number-pad'}
              defaultValue={'30'}
              value={this.state.liveText}
              placeholderTextColor={colorresource.litegray}
              selectionColor={colorresource.liteblue}
              autoFocus={true}
              onChangeText={this.onLiveTextChange}
              />
              {this.state.liveTextError? <Icon type='FontAwesome' name="exclamation-circle" style={{color: 'red', fontSize: 20, alignSelf: 'center'}}/> : null}
              
              </View>
              <View style={{
                backgroundColor: colorresource.liteblue,
                height: 2,
              }}/>
                {this.state.liveTextError? <View style={{flexDirection:'row'}}><Text multiline={true} style={{fontSize: 9, flexWrap: 'wrap', flex: 1, color: 'red', textAlign: 'center'}}>{this.state.liveTextError}</Text></View> : null}
            </View>
            <View>
              <Text style={{
                fontSize: 13,
              }}>Days</Text>
            </View>
          </View>

          <View style={{alignSelf: 'flex-end', marginTop: 20,}}>
            <Button transparent onPress={this.onDonePress}>
              <Text style={{color:colorresource.liteblue}}>DONE</Text>
            </Button>
          </View>


        </View>
      </Modal>
    );
  }
}

const localStyles = EStyleSheet.create({

})