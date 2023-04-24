import React, { Component } from "react";
import {
  Dimensions,
  TextInput,
  Linking,
  ScrollView,
  RefreshControl,
  View,
  Image,
  TouchableHighlight,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Icon, Text } from "native-base";
import { Button as PButton } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { connect } from "react-redux";
import _ from "lodash";

import OrderDetailsSection from './OrderDetailsSection';
import ShipmentAddressSection from './ShipmentAddressSection';
import Modal from "app/components/Modal/Modal";
import GenericHeader from "app/components/Header/GenericHeader";
import * as FreshchatHelper from "app/utils/freshchat";
import { colorresource } from "../../resources/colorresource";
import { formatDateFromServer } from "app/utils/formatHelper";
import { getColorFromStatus } from "./styles";
import consts from "../../utils/const";

import {
  getSalesOrderDetailAction,
  getPurchaseOrderDetailAction,
  cancelPurchaseOrderAction
} from "../../actions/order-actions";
import {
  goToInAppBrowser,
  goToResellPreferences
} from "../../actions/navigation-actions";

import { TestIdGenerator } from "../../utils/TestingHelper";
import Tracker from "./Tracker";
const buttonIdGenerator = TestIdGenerator("OrdersDetailScreen", "", "Button");
const textIdGenerator = TestIdGenerator("OrdersDetailScreen", "", "Text");

let { height, width } = Dimensions.get("window");

class OrdersDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3,
      showCancelOrderModal: false,
      data: this.props.data
    };
  }

  navigateToResellerHub = () => {
    goToResellPreferences();
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    if (this.props.orderType === "Sales") {
      this.props.dispatch(getSalesOrderDetailAction(this.props.id));
    }
    if (this.props.orderType === "Purchase") {
      this.props.dispatch(getPurchaseOrderDetailAction(this.props.id));
    }
  };

  cancelOrder = (id, text) => {
    this.props.dispatch(cancelPurchaseOrderAction(id, "Cancelled", text));
    this.setState({ showCancelOrderModal: false });
  };

  chatWbSupportHandler = () => {
    FreshchatHelper.chatWbSupport();
  };

  callWbSupportHandler = () => {
    Linking.openURL("tel:+919978618989");
  };

  componentWillReceiveProps(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: prevProps.data
      });
    }
  }

  calculateOrderSummaryAmount = () => {
    let data = new Map();
    {
      this.props.data.invoice.map((itemNew, indexNew) => {
        return itemNew.items.map((item, index) => {
          if (data.has(item.order_item.product_catalog)) {
            var fields = data.get(item.order_item.product_catalog).split("/");
            var amount = fields[0];
            var quantity = fields[1];
            // let amount =data[item.order_item.product_catalog];
            let newAmount =
              parseInt(amount) +
              item.order_item.rate * item.order_item.quantity;
            let newQuantity = parseInt(quantity) + item.order_item.quantity;
            data.set(
              item.order_item.product_catalog,
              newAmount + "/" + newQuantity
            );
          } else {
            data.set(
              item.order_item.product_catalog,
              item.order_item.rate * item.order_item.quantity +
                "/" +
                item.order_item.quantity
            );
          }
        });
      });
    }
    return data;
  };

  calculateInvoiceSummary = () => {
    let data = this.calculateOrderSummaryAmount();
    // console.log('dataf',data)
    let showData = [];
    let index = 0;
    for (const [k, v] of data) {
      index = +1;
      var fields = v.split("/");
      var amount = fields[0];
      var quantity = fields[1];
      //console.log('amount data',amount,quantity)
      showData.push(
        <View key={k} style={{ flexDirection: "column" }}>
          <View style={styles.textBox}>
            <Text
              {...textIdGenerator("ItemName")}
              style={[styles.text, { fontWeight: "bold" }]}
            >
              {k + " (" + quantity + "Pcs.)"}
            </Text>
            <Text
              {...textIdGenerator("Amount")}
              style={[styles.text, { fontWeight: "bold" }]}
            >
              {"₹" + amount}
            </Text>
          </View>
        </View>
      );
    }

    return showData;
  };

  componentWillReceiveProps(prevProps, prevState) {
    //   console.log('componentWillUpdate',prevProps.responseCatalogDetails,this.props.responseCatalogDetails)
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: prevProps.data
      });
    }
  }
  isProductSet = product => {
    return product.product_type === "set";
  };

  getDesignCount = catalog => {
    const isSet = this.isProductSet(catalog.products[0]);
    if (isSet) {
      return catalog.products[0].no_of_pcs;
    } else {
      const totalProducts = catalog.products.length;
      return totalProducts;
    }
  };

  getTotalQuantity = catalog => {
    const reducer = (total, product) => {
      if (this.isProductSet(product)) {
        const noOfPcs = Number.parseInt(product.no_of_pcs);
        const qty = Number.parseInt(product.quantity);
        return qty * noOfPcs;
      }
      return total + Number.parseInt(product.quantity);
    };
    const totalQty = _.reduce(catalog.products, reducer, 0);
    return totalQty;
  };

  getTotalPrice = catalog => {
    const reducer = (total, product) => {
      const rate = Number.parseInt(product.rate);
      const quantity = Number.parseInt(product.quantity);

      if (this.isProductSet(product)) {
        const noOfPcs = Number.parseInt(product.no_of_pcs);
        return noOfPcs * rate * quantity;
      }

      return total + rate * quantity;
    };
    const totalPrice = _.reduce(catalog.products, reducer, 0);
    return totalPrice;
  };

  textIsEmpty() {
    if (
      this.state.cancelOrderText === null ||
      this.state.cancelOrderText === "" ||
      this.state.cancelOrderText === undefined
    )
      return true;
    else return false;
  }

  returnInvoice(itemNew) {
    itemNew.items.map((item, index) => {
      return (
        <View key={"i" + index} style={{ flexDirection: "column" }}>
          <View style={styles.textBox}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>
              {index +
                1 +
                "." +
                item.order_item.product_catalog +
                "(" +
                item.order_item.quantity +
                ")"}
            </Text>
            <Text style={styles.textValues}>{"₹" + item.order_item.rate}</Text>
          </View>
          {item.discount === null ? null : (
            <View style={styles.textBox}>
              <Text style={[styles.text]}>Discount</Text>
              <Text style={styles.textValues}>
                {"-" + " " + "₹" + item.discount}
              </Text>
            </View>
          )}
          {item.tax_value_1 === null ? null : (
            <View style={styles.textBox}>
              <Text style={[styles.text]}>{item.tax_class_1.tax_name}</Text>
              <Text style={styles.textValues}>
                {"+" + " " + "₹" + item.tax_value_1}
              </Text>
            </View>
          )}
          {item.tax_value_2 === null ? null : (
            <View style={styles.textBox}>
              <Text style={[styles.text]}>{item.tax_class_2.tax_name}</Text>
              <Text style={styles.textValues}>
                {"+" + " " + "₹" + item.tax_value_2}
              </Text>
            </View>
          )}
        </View>
      );
    });
  }

  onPressTrackOrder = () => {
    const url = this.props.data.invoice[0].shipments[0].aws_url
    goToInAppBrowser('Track', url)
  }

  getTrackerStatus = () => {
    const data = this.props.data
    const orderStatus = data.processing_status
    const shipmentStatus = _.get(data, 'invoice[0].shipments[0].status')
    if(orderStatus === "Transferred" || orderStatus === "Cancelled") {
      return orderStatus
    }
    return shipmentStatus
  }

  getNote = () => {
    let note, color
    const data = this.props.data
    if(_.isEmpty(data)){
      return {note, color}
    }
    const isOrderTypePrepaid = data.order_type === consts.ORDER_TYPE_PREPAID
    const isPaymentStatusPartial = data.payment_status === consts.PAYMENT_PARTIALLY_PAID
    const isPaymentStatusPending = data.payment_status === consts.ORDER_PAYMENT_STATUS_PENDING
    const isProcessingStatusPending = data.processing_status === consts.ORDER_PROCESSING_STATUS_PENDING
    const invoice = _.get(data, 'invoice[0]', {})
    const isModeCod = _.get(invoice, "payments[0].mode") === "COD";
    const doesPaymentDetailsHaveCod = (data.payment_details || '').toLowerCase().includes('cod')
    const isResellerOrder = data.reseller_order
    const isPaidAmountLessThanOne = parseFloat(invoice.paid_amount) < 1
    const isInvoiceTypeProforma = invoice.invoice_type === 'Proforma'

    // console.log("[getNote]", {isOrderTypePrepaid, isProcessingStatusPending, isPaymentStatusPending, isPaymentStatusPartial, isModeCod})
    if(isOrderTypePrepaid && isProcessingStatusPending && isPaymentStatusPending) {
      // console.log("[getNote] 1")
      note = consts.OFFLINE_ORDER_FULL_PAYMENT_NOTE
    }
    if(isPaymentStatusPartial && doesPaymentDetailsHaveCod && isOrderTypePrepaid) {
      // console.log("[getNote] 2")
      color = colorresource.darkred
      if(isResellerOrder) {
        // console.log("[getNote] 3")
        note = consts.RESELLER_COD_ORDER_NOTE
        if(isPaidAmountLessThanOne && isInvoiceTypeProforma) {
          // console.log("[getNote] 4")
          note = null;
        }
      } else {
        // console.log("[getNote] 5")
        note = consts.BUYER_COD_ORDER_NOTE
      }
    }

    return {note, color}
  }

  render() {
    //console.log('this.prop.data',this.props.orderType,this.props.data)
    const data = this.props.data;
    const {note: noteText, color: noteColor} = this.getNote()

    return (
      <View style={{ flex: 1 }}>
        <GenericHeader title={"Order Receipt"} />
        {_.isEmpty(data) ? (
          <ActivityIndicator
            size={"large"}
            color={colorresource.liteblue}
            animating={true}
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.props.isLoading}
                onRefresh={this.fetchData}
              />
            }
          >
            <View style={styles.CardBox}>
              {noteText ? (
                <Text
                  style={{
                    fontSize: 12,
                    color: noteColor,
                    marginBottom: 10
                  }}
                >
                  {noteText}
                </Text>
              ) : null}
              <OrderDetailsSection
                data={data}
              />
            </View>
            
            <View style={styles.CardBox}>
              <ShipmentAddressSection
                shipTo={data.ship_to}
              />
            </View>

            {data.payment_status === "Pending" &&
            data.processing_status === "Pending" &&
            this.props.orderType === "Purchase" ? (
              <View>
                <View style={styles.CardBox}>
                  <PButton
                    mode={"outlined"}
                    theme={{ colors: { primary: colorresource.darkred } }}
                    {...buttonIdGenerator("Cancel")}
                    onPress={() =>
                      this.setState({ showCancelOrderModal: true })
                    }
                    icon={"cancel"}
                  >
                    {"CANCEL ORDER"}
                  </PButton>
                </View>
              </View>
            ) : null}

            {
              <View style={styles.CardBox}>
                <Text style={styles.title}>Invoice Details #1</Text>
                <View style={styles.textBox}>
                  <Text style={styles.text}>Order No</Text>
                  <Text
                    {...textIdGenerator("InvoiceOrderNumber")}
                    style={styles.text}
                  >
                    {data.order_number}
                  </Text>
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.text}>Order Date</Text>
                  <Text
                    {...textIdGenerator("InvoiceOrderDate")}
                    style={styles.text}
                  >
                    {formatDateFromServer(data.date)}
                  </Text>
                </View>
                {this.props.orderType === "Purchase" && data.invoice.length > 0
                  ? 
                  <View style={{marginTop: 10,}}>
                    <Tracker
                      status={this.getTrackerStatus()}
                    />
                    {data.processing_status === consts.SHIPMENT_DISPATCHED &&
                      data.invoice[0].shipments && 
                      data.invoice[0].shipments[0] && 
                      data.invoice[0].shipments[0].aws_url?
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
                  : null}
                <View style={styles.line} />
                {data.invoice.map((itemNew, indexNew) => {
                  return (
                    <View
                      key={"inv" + indexNew}
                      style={{ flexDirection: "column" }}
                    >
                      {_.get(itemNew, "shipments[0]") ? (
                        <View>
                          <View style={{ paddingBottom: 10 }}>
                            <Text
                              style={{
                                color: colorresource.liteblack,
                                marginBottom: 10
                              }}
                            >
                              Shipment
                            </Text>
                            <View style={styles.textBox}>
                              <Text style={[styles.text]}>
                                Items Dispatched
                              </Text>
                              <Text
                                {...textIdGenerator("ItemsDispatched")}
                                style={styles.text}
                              >{`${itemNew.total_qty} Pcs.`}</Text>
                            </View>
                            <View style={styles.textBox}>
                              <Text style={[styles.text]}>Shipment Date</Text>
                              <Text
                                {...textIdGenerator("ShipmentDate")}
                                style={styles.text}
                              >{`${formatDateFromServer(
                                itemNew.shipments[0].datetime,
                                "MMM DD, YYYY"
                              )}`}</Text>
                            </View>
                          </View>
                          <View style={styles.line} />
                        </View>
                      ) : null}
                      {this.calculateInvoiceSummary()}
                      {itemNew.seller_discount === "0.00" ? null : (
                        <View style={styles.textBox}>
                          <Text style={[styles.text]}>Discount</Text>
                          <Text
                            {...textIdGenerator("Discount")}
                            style={[
                              styles.text,
                              { color: colorresource.green }
                            ]}
                          >
                            {"-" + " " + "₹" + itemNew.seller_discount}
                          </Text>
                        </View>
                      )}
                      {itemNew.tax_class_1 === null ? null : (
                        <View style={styles.textBox}>
                          <Text style={[styles.text]}>
                            {itemNew.tax_class_1}
                          </Text>
                          <Text
                            {...textIdGenerator("SGST")}
                            style={styles.text}
                          >
                            {"+" + " " + "₹" + itemNew.total_tax_value_1}
                          </Text>
                        </View>
                      )}
                      {itemNew.tax_class_2 === null ? null : (
                        <View style={styles.textBox}>
                          <Text style={[styles.text]}>
                            {itemNew.tax_class_2}
                          </Text>
                          <Text
                            {...textIdGenerator("CGST")}
                            style={styles.text}
                          >
                            {"+" + " " + "₹" + itemNew.total_tax_value_2}
                          </Text>
                        </View>
                      )}
                      {itemNew.wbmoney_points_used ? (
                        <View style={styles.textBox}>
                          <Text
                            style={[
                              styles.text,
                              { fontWeight: "bold", color: colorresource.blue }
                            ]}
                          >
                            WB Money
                          </Text>
                          <Text
                            {...textIdGenerator("WBMoney")}
                            style={[styles.text, { color: colorresource.blue }]}
                          >
                            {"-" + " ₹" + itemNew.wbmoney_points_used}
                          </Text>
                        </View>
                      ) : null}
                      {itemNew.wbpoints_used ? (
                        <View style={styles.textBox}>
                          <Text
                            style={[
                              styles.text,
                              { fontWeight: "bold", color: colorresource.blue }
                            ]}
                          >
                            WB Rewards
                          </Text>
                          <Text
                            {...textIdGenerator("WBRewards")}
                            style={[styles.text, { color: colorresource.blue }]}
                          >
                            {"-" + " ₹" + itemNew.wbpoints_used}
                          </Text>
                        </View>
                      ) : null}
                      {itemNew.shipping_charges === "0.00" ? null : (
                        <View style={styles.textBox}>
                          <Text style={[styles.text]}>Shipping Charges</Text>
                          <Text
                            {...textIdGenerator("CGST")}
                            style={styles.text}
                          >
                            {"+" + " " + "₹" + itemNew.shipping_charges}
                          </Text>
                        </View>
                      )}
                      <View style={styles.line} />
                      {Number.parseInt(itemNew.paid_amount) ? (
                        <View style={styles.textBox}>
                          <Text style={[styles.text, { fontWeight: "bold" }]}>
                            Paid Amount
                          </Text>
                          <Text
                            {...textIdGenerator("PaidAmount")}
                            style={[styles.text, { fontWeight: "bold" }]}
                          >
                            {"₹" + itemNew.paid_amount}
                          </Text>
                        </View>
                      ) : null}
                      {data.payment_status === "Paid" ? null : (
                        <View style={styles.textBox}>
                          <Text style={[styles.text, { fontWeight: "bold" }]}>
                            Payable Amount
                          </Text>
                          <Text
                            {...textIdGenerator("PayableAmount")}
                            style={[styles.text, { fontWeight: "bold" }]}
                          >
                            {"₹" + itemNew.pending_amount}
                          </Text>
                        </View>
                      )}
                      {!data.reseller_order || !data.display_amount ? null : (
                        <>
                          <View style={styles.line} />
                          <View style={styles.textBox}>
                            <Text style={styles.resellText}>Resell Amount</Text>
                            <Text
                              {...textIdGenerator("ResellAmount")}
                              style={styles.resellText}
                            >
                              {"₹" + itemNew.display_amount}
                            </Text>
                          </View>
                        </>
                      )}
                    </View>
                  );
                })}
                {false &&
                data.payment_status === "Pending" &&
                data.processing_status === "Pending" &&
                this.props.orderType === "Purchase" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 10,
                      marginTop: 15
                    }}
                  >
                    <TouchableOpacity
                      {...buttonIdGenerator("Pay")}
                      style={{
                        flex: 0.45,
                        backgroundColor: colorresource.blue,
                        borderColor: colorresource.blue,
                        padding: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 2,
                        borderRadius: 8
                      }}
                      onPress={() => Alert.alert("Payment here")}
                    >
                      <Text
                        adjustsFontSizeToFit={true}
                        style={[styles.text, { color: colorresource.white }]}
                      >
                        Pay
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      {...buttonIdGenerator("Cancel")}
                      style={{
                        flex: 0.45,
                        borderColor: colorresource.red,
                        padding: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 2,
                        borderRadius: 8
                      }}
                      onPress={() => this.cancelOrder(data.order_number, "")}
                    >
                      <Text
                        adjustsFontSizeToFit={true}
                        adjustsfontsizetofitwidth={true}
                        style={[styles.text, { color: colorresource.red }]}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            }

            <View
              style={[
                styles.CardBox,
                { flexDirection: "column", justifyContent: "center" }
              ]}
            >
              <PButton
                mode={"outlined"}
                theme={{ colors: { primary: colorresource.green } }}
                {...buttonIdGenerator("CallWbSupport")}
                onPress={() => this.callWbSupportHandler()}
                icon={"call"}
              >
                {"Call WB Support"}
              </PButton>

              <PButton
                mode={"outlined"}
                style={{ marginTop: 20 }}
                {...buttonIdGenerator("ChatWbSupport")}
                onPress={() => this.chatWbSupportHandler()}
                icon={"chat"}
              >
                {"Chat WB Support"}
              </PButton>
            </View>
            {data.catalogs.map((item, index) => {
              return (
                <View key={"c" + index} style={styles.CardBox}>
                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.textBox}>
                      <Text
                        style={[
                          styles.text,
                          { color: colorresource.blue, fontSize: 14 }
                        ]}
                      >
                        {index +
                          1 +
                          "." +
                          item.name +
                          " " +
                          "(" +
                          this.getDesignCount(item) +
                          " Designs" +
                          ")"}
                      </Text>
                      <TouchableHighlight
                        underlayColor={"transparent"}
                        onPress={() =>
                          this.setState({
                            ["showCollapsable" + index]: !this.state[
                              "showCollapsable" + index
                            ]
                          })
                        }
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Text
                            style={[
                              styles.text,
                              { color: colorresource.blue, fontSize: 14 }
                            ]}
                          >
                            {this.getTotalQuantity(item) + " " + "Pcs."}
                          </Text>
                          <Icon
                            name={
                              this.state["showCollapsable" + index]
                                ? "ios-arrow-up"
                                : "ios-arrow-down"
                            }
                            type="Ionicons"
                            color={colorresource.blue}
                            style={{
                              marginLeft: 10,
                              color: colorresource.blue,
                              fontSize: 16
                            }}
                          />
                        </View>
                      </TouchableHighlight>
                    </View>
                    {_.get(item, "products[0].note") ? (
                      <View>
                        <Text
                          style={[
                            styles.text,
                            { color: colorresource.darkred }
                          ]}
                        >
                          {item.products[0].note}
                        </Text>
                      </View>
                    ) : null}
                    <Collapsible
                      collapsed={!this.state["showCollapsable" + index]}
                    >
                      {item.products.map((itemNew, indexNew) => {
                        return (
                          <View
                            key={"product" + index + "," + indexNew}
                            style={styles.CollapsibleBox}
                          >
                            <Image
                              resizeMode="contain"
                              style={{
                                width: 90,
                                height: 80,
                                alignSelf: "center",
                                marginRight: 15,
                                marginLeft: 5
                              }}
                              source={{ uri: itemNew.product_image }}
                            />
                            <View style={{ flexDirection: "column", flex: 1 }}>
                              <Text
                                style={[
                                  styles.textValues,
                                  { marginBottom: 20 }
                                ]}
                              >
                                {itemNew.product_title}
                              </Text>
                              <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.textValues]}>
                                  {"₹" + itemNew.rate}
                                </Text>
                                <View
                                  style={styles.CatalogCountCircle}
                                >
                                  <Text
                                    style={[
                                      styles.textValues,
                                      { marginRight: 0 }
                                    ]}
                                  >
                                    {itemNew.quantity}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </Collapsible>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
        {
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showCancelOrderModal}
            onRequestClose={() =>
              this.setState({ showCancelOrderModal: false })
            }
            style={{ margin: 0 }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)"
              }}
            >
              <View style={{ backgroundColor: "white", padding: 10 }}>
                <Text style={{ fontSize: 20, color: "black", marginBottom: 5 }}>
                  Cancel
                </Text>
                <Text style={styles.text}>Order cancel note</Text>
                <TextInput
                  style={{ color: colorresource.liteblack, paddingTop: 10 }}
                  selectionColor={colorresource.liteblue}
                  placeholderTextColor={colorresource.liteblack}
                  underline={true}
                  underlineColorAndroid={colorresource.blue}
                  onChangeText={text =>
                    this.setState({ cancelOrderText: text })
                  }
                  value={this.state.cancelOrderText}
                />
                <View
                  style={{
                    height: height * 0.05,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View
                    style={{
                      width: width * 0.3,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <TouchableHighlight
                      {...buttonIdGenerator("CancelDialog")}
                      onPress={() =>
                        this.setState({ showCancelOrderModal: false })
                      }
                    >
                      <Text style={{ fontSize: 18, color: "black" }}>
                        CANCEL
                      </Text>
                    </TouchableHighlight>
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <TouchableHighlight
                      underlayColor={"transparent"}
                      onPress={() => {
                        if (this.textIsEmpty())
                          Alert.alert("Please enter the cancel note");
                        else {
                          this.cancelOrder(
                            data.order_number,
                            this.state.cancelOrderText
                          );
                        }
                      }}
                    >
                      {this.textIsEmpty() ? (
                        <Text style={{ fontSize: 18, color: "gray" }}>OK</Text>
                      ) : (
                        <Text style={{ fontSize: 18, color: "black" }}>OK</Text>
                      )}
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        }
      </View>
    );
  }
}

const dataSelector = (state, props) => {
  if (props.navigation.state.params.orderType === "Sales")
    return state.ordersR.responseSalesOrderDetail;
  else return state.ordersR.responsePurchaseOrderDetail;
};

const mapStateToProps = (state, props) => {
  return {
    id: props.navigation.state.params.id,
    orderType: props.navigation.state.params.orderType,
    data: dataSelector(state, props),
    isLoading: state.ordersR.isLoading
  };
};
export default connect(mapStateToProps)(OrdersDetailScreen);

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  title: {
    fontSize: 19,
    color: colorresource.blue,
    marginBottom: 10
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    color: colorresource.gray
  },
  textValues: {
    fontSize: 14,
    marginRight: 10,
    color: colorresource.black
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
    //   borderWidth: 1,
    //   borderColor: 'purple',
  },
  resellText: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 15,
    color: colorresource.liteblack
  },
  activeTitle: {
    color: "red"
  },
  line: {
    borderColor: colorresource.litegray,
    borderBottomWidth: 0.5,
    marginTop: 10,
    marginBottom: 10
  },
  CatalogCountCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colorresource.gray,
    backgroundColor: colorresource.litegray,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30
  },
  CardBox: {
    flexDirection: "column",
    padding: 20,
    borderColor: colorresource.black,
    borderBottomWidth: 0.5
  },
  CollapsibleBox: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 0.5,
    //borderTopWidth:0.5,
    marginTop: 10,
    borderColor: colorresource.gray
  }
});