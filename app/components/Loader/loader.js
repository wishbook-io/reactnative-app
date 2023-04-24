import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';

import { colorresource } from '../../resources/colorresource';

import Modal from '../Modal/Modal';
import LoaderComponent from './LoaderComponent';

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  if(!loading) {
    return null;
  }

  return (
    <Modal
    transparent={true}
    animationIn={'zoomIn'}
    isVisible={loading}
    onRequestClose={()=>{}}
    style={{margin: 0}}
    hideModalContentWhileAnimating={true}
    useNativeDriver={true}
    >
      <View style={styles.modalBackground}>
        <LoaderComponent/>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex:1,
    justifyContent: 'space-around', 
    alignItems: 'center',
    backgroundColor: '#00000040',
    paddingLeft:40,
    paddingRight: 40,
  },
});

export default Loader;