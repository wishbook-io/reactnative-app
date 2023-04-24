import React, { Component } from 'react'
import { View, Text, ScrollView, PanResponder } from 'react-native';

export default class Test extends Component {
  
  registerSheetRef = (r) => {
    this.sheetRef = r
  }

  unHighlight = () => {
    if(!this.headerRef) return
    this.headerRef.setNativeProps({style: {backgroundColor: 'lightblue'}})
  }

  highlight = () => {
    if(!this.headerRef) return
    this.headerRef.setNativeProps({style: {backgroundColor: 'green'}})
  }

  registerHeaderRef = (r) => {
    this.headerRef = r
  }

  constructor(props) {
    super(props)
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
      this.highlight()
    },
    onPanResponderMove: (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      const y = Math.floor(gestureState.dy)
      // console.log("[PR:Move]", {y})
      if(!this.sheetRef) return
      this.sheetRef.setNativeProps({style: {bottom: -1 * y}})
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      console.log("[PR:Release]")
      this.unHighlight()
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  });
  }

  componentDidMount() {
    if(!this.sheetRef)  return
    // this.sheetRef.setNativeProps({style: {bottom: 0}})
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Hi</Text>
        {/* <View ref={this.registerSheetRef} style={{position: 'absolute', flex: 1, left: 0, right: 0, borderWidth: 1, backgroundColor: 'yellow'}}> */}
          <View ref={this.registerHeaderRef} style={{height: 40, backgroundColor: 'lightblue'}}></View>
        <ScrollView style={{
          // top: 0, bottom: 0, 
          // position: 'absolute', left: 0, right: 0,
          // height: '50%'
          }} contentContainerStyle={{}}>
            {Array.from({length: 11}, (_, index) => <View key={index+''} style={{justifyContent: 'center', alignItems: 'center', height: 60, marginVertical: 5, backgroundColor: 'lightgray'}}><Text>{index}</Text></View>)}
          </ScrollView>
            <View style={{backgroundColor: 'pink', height: 5, marginTop: 'auto', borderWidth: 0.5, borderColor: 'red'}}></View>
        {/* </View> */}
      </View>
    )
  }
}