import React, { Component, Fragment } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { Icon, Text } from 'native-base';
import { Button as PButton } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';

import WButton from 'app/components/Button/WButton';
import Modal from 'app/components/Modal/Modal';
import { colorresource } from 'app/resources/colorresource'

// const ModalView = View
// const ModalStyle = (height, width) => ({
//   position: 'absolute', 
//   top: height/2, 
//   height: height/2, 
//   width, backgroundColor: 'white',
//   zIndex: 1,
// })

const ModalView = Modal
const ModalStyle = (height, width) => ({
  maxHeight: height - 24, //TODO: platform specific value here
  width: width,
  backgroundColor: 'white',
  margin: 0,
  position: 'absolute',
  bottom: 0,
})


export default class BottomSheet extends Component {

  onSelectAllPress = () => {
    const callback = this.props.onSelectAllPress
    if(callback) {
      callback()
    }
  }

  render() {

    const {
      visible,
      data,
      title,
      id,
      selected,
      onClosePress,
      onSelectAllPress,
      onItemPress,
    } = this.props;

    if(!visible) {
      //return null;
    }
    const { height, width } = Dimensions.get('window')
    return (
      <Fragment>
        <ModalView 
        style={ModalStyle(height, width)}
        isVisible={visible}
        {...{
          onBackdropPress: onClosePress,
          onBackButtonPress: onClosePress,
          useNativeDriver: true,
        }}
        >
          <View style={{
            flexDirection: 'row', 
            alignItems: 'center', 
            borderBottomWidth: EStyleSheet.hairlineWidth, 
            borderColor: colorresource.divider,
            paddingHorizontal: 10,
            height: 50
          }}>
            <Icon name='close' style={{color: colorresource.gray, marginLeft: 5}} onPress={onClosePress}/>
            <Text style={{color: colorresource.liteblack, fontSize: 18, marginLeft: 20}}>{title}</Text>
            {onSelectAllPress? 
              <PButton
              uppercase={false}
              mode='text'
              onPress={this.onSelectAllPress}
              style={{marginLeft: 'auto'}}
              >{'Select All'}</PButton> 
            : null}
          </View>
          <FlatList
          data={data}
          contentContainerStyle={{paddingBottom: 30}}
          renderItem={({item, index}) => {
            return (
              <WButton onPress={() => this.props.onItemPress({id, index})}>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                  <Radio selected={selected === item}  onPress={() => this.props.onItemPress({id, index})}/>
                  <Text style={{marginLeft: 10, fontSize: 15}}>{item}</Text>
                </View>
              </WButton>
            );
          }}
          keyExtractor={(item, id) => id.toString()}
          />

        </ModalView>
      </Fragment>
    );
  }
}