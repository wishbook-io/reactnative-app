import React, { Component } from 'react';
import { View } from 'react-native';
import { 
  Text,
  Container,
  Content,
  Footer,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import _ from 'lodash'

import OrderDetailsSection from 'app/screens/orders/OrderDetailsSection'
import ShipmentAddressSection from 'app/screens/orders/ShipmentAddressSection'
import { colorresource } from 'app/resources/colorresource';

import { goBack, goToCodReconfirm } from 'app/actions/navigation-actions';
import { getPurchaseOrderDetailAction, patchPurchaseOrderAction } from '../../actions/order-actions';

export const checkForCodReconfirm = (orderList, callbackPositive, callbackNegative) => {
  const codPendingList = orderList.filter(order => order.processing_status === 'COD Verification Pending')
  if(codPendingList.length === 0) {
    callbackNegative && callbackNegative()
    return;
  }
  goToCodReconfirm(codPendingList, callbackPositive)
}

class CodReconfirm extends Component {

  goToNextOrDismiss = () => {
    this.currentOrderIndex++
    if(this.orderList.length <= this.currentOrderIndex) {
      goBack()
      const callback = this.props.navigation.getParam("callback")
      callback && callback()
    } else {
      const orderId = this.getCurrentOrderId()
      this.props.dispatch(getPurchaseOrderDetailAction(orderId))
    }
  }

  onReconfirmPress = () => {
    const id = this.getCurrentOrderId()
    const params = {
      processing_status: 'Pending',
      processing_note: 'COD order has been re-verified by Customer from App'
    }
    this.props.dispatch(patchPurchaseOrderAction(id, params))
  }

  onCancelPress = () => {
    const id = this.getCurrentOrderId()
    const params = {
      processing_status: 'Cancelled',
      buyer_cancel: 'COD order has been cancelled by Customer from App',
    }
    this.props.dispatch(patchPurchaseOrderAction(id, params))
  }

  getCurrentOrderId = () => {
    return this.orderList[this.currentOrderIndex].id
  }

  constructor(props) {
    super(props)
    this.state = {
    }
    this.orderList = this.props.navigation.getParam("orderList", [])
    this.currentOrderIndex = -1;
  }

  componentDidMount() {
    this.goToNextOrDismiss()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.responsePatch !== this.props.responsePatch) {
      this.goToNextOrDismiss()
    }
  }

  render() {
    const data = this.props.data
    if(!data) {
      return null
    }
    const isResellerOrder = data.reseller_order
    const pendingAmount = Number.parseFloat(_.get(data, 'invoice[0].pending_amount'))
    const totalAmount = Number.parseFloat(_.get(data, 'invoice[0].total_amount'))
    const displayAmount = Number.parseFloat(_.get(data, 'invoice[0].display_amount'))
    
    const collectableAmount = isResellerOrder? displayAmount : pendingAmount
    const marginAmount = isResellerOrder? displayAmount - totalAmount : NaN


    return (
      <Container>
        <Content style={{backgroundColor: colorresource.materialbg}}>

          <View style={styles.header}>
            <Text style={styles.headerText}>{'Thanks for placing the order\nPlease verify and reconfirm the order'}</Text>
          </View>

          <View style={styles.section}>
            <OrderDetailsSection data={data} marginAmount={marginAmount}/>
          </View>

          <View style={styles.section}>
            <ShipmentAddressSection shipTo={data.ship_to}/>
          </View>

          <View style={styles.section}>
            <Text style={styles.totalHeading}>{'Total amount to be collected'}</Text>
            <View style={styles.totalAmountWrapper}>
              <Text style={styles.totalAmountText}>{'₹' + collectableAmount}</Text>
            </View>
          </View>
        </Content>
        <Footer>
          <View style={styles.footerRow}>
            <View style={styles.footerLeft}>
              <Text style={styles.footerLeftText} onPress={this.onCancelPress}>{'Cancel COD order'}</Text>
            </View>
            <View style={styles.footerRight}>
              <Text style={styles.footerRightText} onPress={this.onReconfirmPress}>{'Reconfirm COD order'}</Text>
            </View>
          </View>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.ordersR.responsePurchaseOrderDetail,
    responsePatch: state.ordersR.responsePatchPurchaseOrder,
  }
}

export default connect(mapStateToProps)(CodReconfirm)

const styles = EStyleSheet.create({
  header: {
    height: 140,
    backgroundColor: colorresource.liteblue,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white', 
    padding: 16, 
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: 'row',
    flex: 1,
  },
  footerLeft: {
    flex: 1,
    backgroundColor: colorresource.litegray,
    justifyContent: 'center',
  },
  footerLeftText: {
    color: colorresource.liteblack,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerRight: {
    flex: 1,
    backgroundColor: colorresource.liteblue,
    justifyContent: 'center',
  },
  footerRightText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalHeading: {
    color: colorresource.liteblue,
    fontSize: 17,
  },
  totalAmountWrapper: {
    borderWidth: 1, 
    borderColor: colorresource.litegray,
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 5,
  },
  totalAmountText: {
    fontSize: 18,
    color: colorresource.darkgreen,
    paddingVertical: 7,
    textAlign: 'center',
  }
})