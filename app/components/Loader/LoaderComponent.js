import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';

import { colorresource } from 'app/resources/colorresource';
import { isIos } from 'app/utils/PlatformHelper'

const LoaderComponent = () => {
  return (
    <View style={styles.loaderBackground}>
      <View>
        <Text style={styles.loadingText}>Loading</Text>
      </View>
      <View style={styles.activityIndicatorWrapperRow}>
        <ActivityIndicator
        size="large"
        color={colorresource.liteblue}
        animating={true}
        />
        <Text style={styles.pleaseWaitText}>Please wait...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loaderBackground: {
    width: '100%', 
    padding: 25,
    justifyContent: 'space-around', 
    backgroundColor: isIos? '#cccccc' : 'white',
    borderRadius: 3,
    alignItems: 'flex-start'
  },
  loadingText: {
    fontSize: 25, 
    color: 'black'
  },
  activityIndicatorWrapperRow: {
    marginTop: 20, 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  pleaseWaitText: {
    marginLeft: 20, 
    fontSize: 15,
  }
});

export default LoaderComponent;