import React, { Component, PureComponent } from 'react'
import { View, Image, Dimensions } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { Text } from 'native-base'
import { Button as PButton } from 'react-native-paper'
import EStyleSheet from 'react-native-extended-stylesheet'

import Tracker from './Tracker'
import consts from 'app/utils/const'
import { formatDate } from 'app/utils/dateHelper'
import { goToInAppBrowser } from 'app/actions/navigation-actions'
import { colorresource } from 'app/resources/colorresource'
import { getColorFromStatus } from './styles'

import { TestIdGenerator } from "app/utils/TestingHelper";
const buttonIdGenerator = TestIdGenerator("OrdersListScreen", "", "Button");
const textIdGenerator = TestIdGenerator("OrdersListScreen", "", "Text");

class OrderListItem extends PureComponent {

  onPressTrackOrder = () => {
    const url = this.props.item.lastest_shipment.aws_url
    goToInAppBrowser('Track', url)
  }

  onPress = () => {
    const {item, title} = this.props
    this.props.onPress(title, item.id)
  }
  
  render() {
    const { item, onPress, title, marginRight = 0, isNew } = this.props
    let { height, width } = Dimensions.get("window");

    return (
      <TouchableRipple
        {...buttonIdGenerator("OrderList")}
        style={styles.card}
        onPress={this.onPress}
      >
        <View>
          {isNew?
            <View style={styles.newParent}>
              <View>
                <Text style={styles.newText}>New!</Text>
              </View>
            </View>
          : null }
          <View style={{padding: 10,}}>
            <View
              style={styles.itemHeader}
            >
              <Text {...textIdGenerator("OrderNumber")}>
                Order #{item.order_number}
              </Text>
              <Text {...textIdGenerator("OrderDate")} style={{ fontSize: 12 }}>
                {formatDate(item.date, "YYYY-MM-DD", "MMMM DD, YYYY")}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5, }}>
              <Image
                resizeMode="contain"
                style={{
                  width: width * 0.16,
                  height: height * 0.1,
                  alignSelf: "center",
                  marginRight: height * 0.01,
                  marginLeft: height * 0.01
                }}
                source={{ uri: item.images[0] }}
              />
              <View style={{ flexDirection: "column", flex: 1 }}>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.infoLabelText}>
                    Order Value
                  </Text>
                  <Text {...textIdGenerator("OrderValue")} style={{ fontSize: 14 }}>
                    {"₹" + item.total_rate}
                  </Text>
                </View>
                <View style={styles.statusParent}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.infoLabelText}>
                      Payment Status
                    </Text>
                    <Text
                      {...textIdGenerator("PaymentStatus")}
                      style={{
                        color: getColorFromStatus(item.payment_status),
                        fontSize: 12
                      }}
                    >
                      {item.payment_status}
                    </Text>
                  </View>
                  <View
                    style={styles.orderStatusParent}
                  >
                    <Text style={styles.infoLabelText}>
                      Order Status
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        {...textIdGenerator("OrderStatus")}
                        style={{
                          color: getColorFromStatus(item.processing_status),
                          fontSize: 12,
                          flex: 1,
                          flexWrap: "wrap"
                        }}
                      >
                        {item.processing_status === "Pending"
                          ? "Order Placed"
                          : item.processing_status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>



            <Tracker
              status={item.processing_status}
              parentStyle={{marginTop: 10,}}
            />

            {item.processing_status === consts.SHIPMENT_DISPATCHED &&
              item.lastest_shipment && 
              item.lastest_shipment.aws_url?
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <PButton
                mode={'contained'}
                style={{marginTop: 10}}
                onPress={this.onPressTrackOrder}
              >
                {'Track your order'}
              </PButton>
              </View>
            : null }




          </View>
        </View>
      </TouchableRipple>
    );
  }
};

export default OrderListItem

const styles = EStyleSheet.create({
  card: {
    // alignSelf:'center',
    // height:height*0.16,
    justifyContent:'center',
    borderRadius:4,
    // width:width*0.96,
    flexDirection:'row',
    elevation:2,
    backgroundColor:'white',
    // marginBottom:height*0.015
    marginBottom: 15,
    flexDirection: 'column',
    overflow: "hidden",
  },
  newParent: {
    // position: 'absolute', 
    // height: 5, 
    backgroundColor: colorresource.darkgreen,
    width: '100%',
    justifyContent: 'center',
    justifyContent: 'center',
  },
  newText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 5
  },
  infoLabelText: {
    color: colorresource.gray, 
    fontSize: 10,
  },
  statusParent: {
    marginTop: 10, 
    flexDirection: "row", 
    flex: 1,
  },
  orderStatusParent: {
    flexDirection: "column",
    marginBottom: 10,
    marginLeft: 15,
    flex: 1
  },
})