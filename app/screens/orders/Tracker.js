import React, { Component, PureComponent } from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'

import { colorresource } from 'app/resources/colorresource'
import consts from 'app/utils/const'

const TRACKER_MAPPING = {
  [consts.SHIPMENT_READYTOSHIP]: 1,
  [consts.SHIPMENT_DISPATCHED]: 2,
  [consts.SHIPMENT_DELIVERED]: 3,
}

const TRACKER_ORDER_PLACED = 'Order placed'
const TRACKER_CANCELLED = "Cancelled"
const TRACKER_TRANSFERRED = "Transferred"

const TRACKER_STATUS = [
  TRACKER_ORDER_PLACED,
  'Ready to ship',
  'Dispatched',
  'Delivered',
]

class Tracker extends PureComponent {

  constructTrackerData = (status) => {
    let done = 0
    if([TRACKER_CANCELLED, TRACKER_TRANSFERRED].includes(status)) {
      return {done: 1, text: [TRACKER_ORDER_PLACED, status]}
    }
    
    done = TRACKER_MAPPING[status] || done
    // console.log("[constructTrackerData]", { done, status,})
    return {done, text: TRACKER_STATUS}
  }

  render() {
    const { status } = this.props
    const {done, text} = this.constructTrackerData(status)
    const total = text.length
    return (
      <View style={this.props.parentStyle}>
        <View style={styles.line}/>
        <View style={styles.wrapper}>
          {text.map((label, index) => 
            <TrackerCircle
              key={index.toString()}
              done={index<=done} 
              first={index===0} 
              last={index === total-1}
              text={label}
            />)}
        </View>
      </View>
    )
  }
}

export default Tracker

const TrackerCircle = ({done, first, last, text}) => {
  return (
    <View style={{
      flex: 1, 
      alignItems: first? 'flex-start' : last? 'flex-end' : 'center'
    }}>
      <View style={done? styles.circleOuterBlue : styles.circleOuterGray}>
        <View style={done? styles.circleInnerBlue : styles.circleInnerGray}/>
      </View>
      <View>
        <Text style={{
          fontSize: 13, 
          textAlign: first? 'left' : last? 'right' : 'center', 
          color: done? colorresource.liteblue : colorresource.gray
        }}
        >{text}</Text>
      </View>
    </View>
  )
}

const CIRCLE_SIZE = 12;

const styles = EStyleSheet.create({
  circleOuterBlue: {
    width: CIRCLE_SIZE*2,
    height: CIRCLE_SIZE*2,
    borderRadius: CIRCLE_SIZE,
    justifyContent:'center',
    borderColor:colorresource.liteblue,
    backgroundColor: 'white',
    borderWidth:1,
    alignItems:'center'
  },
  circleInnerBlue: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor:colorresource.liteblue,
  },
  circleOuterGray: {
    width: CIRCLE_SIZE*2,
    height: CIRCLE_SIZE*2,
    borderRadius: CIRCLE_SIZE,
    justifyContent:'center',
    borderColor:colorresource.gray,
    backgroundColor: 'white',
    borderWidth:1,
    alignItems:'center'
  },
  circleInnerGray: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor:colorresource.gray,
  },
  line: {
    position: 'absolute',
    left: 0, 
    right: 0,
    height: 1,
    backgroundColor: colorresource.gray,
    top: CIRCLE_SIZE
  },
  wrapper: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  }
})