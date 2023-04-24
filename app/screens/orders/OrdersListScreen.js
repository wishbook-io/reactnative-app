import React, { Component } from "react";
import {
  Platform,
  Dimensions,
  View,
  Image,
  FlatList
} from "react-native";
import {
  Container,
  Picker,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Text
} from "native-base";
import { TouchableRipple } from "react-native-paper";
import { connect } from "react-redux";

import GenericHeader from "app/components/Header/GenericHeader";
import OrderListHeader, { 
  ORDER_STATUS, 
  ORDER_STATUS_ALL, 
  ORDER_STATUS_PLACED, 
  ORDER_STATUS_DISPATCHED, 
  ORDER_STATUS_CANCELLED 
} from "./OrderListHeader";
import OrderListItem from "./OrderListItem"
import { checkForCodReconfirm } from 'app/screens/orders/CodReconfirm'
import { formatDateForServer } from 'app/utils/dateHelper'
import styles, { getColorFromStatus } from "./styles";
import { colorresource } from "app/resources/colorresource";

import {
  getSalesOrdersAction,
  getPurchaseOrdersAction
} from "../../actions/order-actions";
import { goToOrderDetailsScreen } from "../../actions/navigation-actions";

import { TestIdGenerator } from "app/utils/TestingHelper";
const buttonIdGenerator = TestIdGenerator("OrdersListScreen", "", "Button");
const textIdGenerator = TestIdGenerator("OrdersListScreen", "", "Text");

let { height, width } = Dimensions.get("window");

const PROCESSING_STATUS_MAPPING = {
  all: ORDER_STATUS_ALL,
  total: ORDER_STATUS_ALL,

  pending: ORDER_STATUS_PLACED,

  dispatched: ORDER_STATUS_DISPATCHED,
  dispatch: ORDER_STATUS_DISPATCHED,

  cancelled: ORDER_STATUS_CANCELLED,
  cancel: ORDER_STATUS_CANCELLED,
}

const ORDER_STATUS_MAPPING = {
  [ORDER_STATUS_ALL]: 'placed',
  [ORDER_STATUS_PLACED]: 'pending',
  [ORDER_STATUS_DISPATCHED]: 'dispatch',
  [ORDER_STATUS_CANCELLED]: 'cancel',
}

class OrdersListScreen extends Component {

  isSalesOrder = () => {
    const screen = this.state.screenName
    return screen === 'Sales'
  }
  
  isPurchaseOrder = () => {
    const screen = this.state.screenName
    return screen === 'Purchase'
  }

  onSearchTextChange = (searchText) => {
    this.setState({searchText}, () => this.fetchData(true))
  }

  hideSearch = () => {
    this.setState({searchVisible: false, searchText: ''})
  }

  onSearchPress = () => {
    this.setState({searchVisible: true})
  }

  onOrderStatusChange = (status) => {
    this.setState({orderStatus: status}, this.fetchData)
  }

  onDateRangeChange = (start, end) => {
    // console.log("[OrderListScreen:onDateRangeChange]", {start, end})
    this.setState({dateRangeStart: start, dateRangeEnd: end}, this.fetchData)
  }
  
  keyExtractor = (item, index) => {
    return item.id.toString()
  }

  onRefresh = () => {
    this.fetchData(true)
  }

  getDateParams = () => {
    const startDate = this.state.dateRangeStart
    if(!startDate) {
      return {}
    }
    const endDate = this.state.dateRangeEnd
    if(!endDate) {
      return {};
    }
    const dateParams = {
      from_date: formatDateForServer(startDate),
      to_date: formatDateForServer(endDate)
    }
    return dateParams
  }

  fetchData = (isRefreshing) => {
    let actionCreator;
    const screen = this.state.screenName
    if(screen === 'Sales') {
      actionCreator = getSalesOrdersAction
    }
    else if(screen === 'Purchase') {
      actionCreator = getPurchaseOrdersAction
    }

    if(!screen || !actionCreator) {
      console.warn('[OrderListScreen] fetchData doesn\'t have a valid screen or action creator');
      return
    }

    let params = {}
    if(this.state.searchVisible) {
      params = {
        processing_status: ORDER_STATUS_ALL,
        search: this.state.searchText
      }
    } else {
      const dateParams = this.getDateParams()
      params = {
        processing_status: ORDER_STATUS_MAPPING[this.state.orderStatus],
        ...dateParams,
      }
    }
    this.props.dispatch(actionCreator(params, isRefreshing));
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  searchFilterFunction = text => {
    // console.log('text changed',text)
    if (!text || text === "") {
      this.setState({ data: this.props.data, searchText: null });
    } else {
      const newData = this.props.data.filter(item => {
        const itemData = `${item.order_number.toUpperCase()}   
                ${item.order_number.toUpperCase()} ${item.order_number.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ data: newData, searchText: text });
    }
  };

  renderListEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            color: colorresource.gray,
            fontSize: 17
          }}
        >
          No items to display
        </Text>
      </View>
    );
  };

  constructor(props) {
    super(props);
    // const { picktype,screenName } = props.navigation.state.params;
    // console.log(picktype);
    this.state = {
      orderStatus: PROCESSING_STATUS_MAPPING[this.props.picktype],
      dateRangeStart: null,
      dateRangeEnd: null,
      screenName: this.props.screenName,
      data: [],
      searchText: null,
      showSearch: false,
      newOrders: props.navigation.getParam('newOrders', 0),
      searchVisible: false,
      searchText: '',
    };
    this.haveToCheckCodReconfirm = true;
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data
      });
      if(this.isPurchaseOrder()) {
        checkForCodReconfirm(nextProps.data, this.fetchData)
      }
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#F6F6F6", paddingBottom: 10 }}>
        <GenericHeader 
          title={this.state.screenName + " Orders"} 
          otherRightConfigs={[{
            visible: true,
            onPress: this.onSearchPress,
            icon: 'magnify',
            testId: {}
          }]}
        />
        <OrderListHeader
          orderStatus={this.state.orderStatus}
          dateRangeStart={this.state.dateRangeStart}
          dateRangeEnd={this.state.dateRangeEnd}
          onDateRangeChange={this.onDateRangeChange}
          onOrderStatusChange={this.onOrderStatusChange}
          searchVisible={this.state.searchVisible}
          searchText={this.state.searchText}
          hideSearch={this.hideSearch}
          onSearchTextChange={this.onSearchTextChange}
        />
        <FlatList
          data={this.state.data}
          contentContainerStyle={{
            marginLeft: 10,
            marginRight: 10,
            flexGrow: 1,
            paddingTop: 5,
          }}
          renderItem={({ item, index }) => {
            return (
              <OrderListItem
                key={item.id}
                onPress={goToOrderDetailsScreen}
                item={item}
                title={this.props.screenName}
                isNew={index < this.state.newOrders}
              />
            );
          }}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.renderListEmptyComponent}
          onRefresh={this.onRefresh}
          refreshing={this.props.isRefreshing}
        />

      </Container>
    );
  }
}

const dataSelector = (state, props) => {
  if (props.navigation.state.params.screenName === "Sales")
    return state.ordersR.responseSalesOrders;
  else return state.ordersR.responsePurchaseOrders;
};

const mapStateToProps = (state, props) => {
  return {
    picktype: props.navigation.state.params.picktype,
    screenName: props.navigation.state.params.screenName,
    data: dataSelector(state, props), //.slice(0, 1),
    isRefreshing: state.ordersR.isRefreshing
  };
};
export default connect(mapStateToProps)(OrdersListScreen);