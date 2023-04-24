import React, { Component } from 'react';
import { ScrollView,Dimensions } from 'react-native';
import {  Header,Container, Title, Button,Left,Right,Body,Icon,Card} from 'native-base';
import {getStatisticsAction} from '../../actions/dashboard-actions'
import _ from 'lodash';
import UserHelper from '../../config/userHelper';
const {width = 0,height = 0} = Dimensions.get('window');
import { colorresource } from '../../resources/colorresource';
import { connect } from 'react-redux';

import GenericHeader from 'app/components/Header/GenericHeader';
import { OrderCard } from './OrderScreen';

import {waitTillUserInfoIsFetched} from 'app/utils/debugHelper';

import { TestIdGenerator } from '../../utils/TestingHelper';
const screenName = 'MyOrders';
const buttonIdGenerator = TestIdGenerator(screenName, '', "Button")
const textIdGenerator = TestIdGenerator(screenName, '', "Text")

import styles from './styles';

class OrderTab extends Component {
  state = {
    names: [
      {'name': 'Total Sales Order', 'id': 1},
      {'name': 'Total Purchase Order', 'id': 2},
      {'name': 'Leads', 'id': 3},
      {'name': 'Enquiries', 'id': 4}
    ],
    GridListItems: [
      { key: "Pending" },
      { key: "Open" },
      { key: "Pending" },
      { key: "Open" },
      { key: "Pending" },
    ],
    companyProfile:'',
  }
  
  componentDidMount(){
    // waitTillUserInfoIsFetched().then(() => {
    
    this.props.dispatch(getStatisticsAction())
    console.log("order screen",UserHelper.getCompanyType())
    this.setState({companyProfile:UserHelper.getCompanyType()})
    // })
    
  }
  
  handelOnPress = (type,name) => {
    console.log(type,name)
    switch (type) {
      case 0://All
      this.props.navigation.navigate("OrdersListScreen", { picktype: 'all',screenName:name });
      break;
      case 1://Pending
      this.props.navigation.navigate("OrdersListScreen", { picktype: 'pending',screenName:name });
      break;
      case 2://Dispatched
      this.props.navigation.navigate("OrdersListScreen", { picktype: 'dispatch',screenName:name });
      break;
      case 3://Cancelled
      this.props.navigation.navigate("OrdersListScreen", { picktype: 'cancel',screenName:name });
      break;
      default:
      break;
    }
  }
  
  render() {
    
    if(_.isEmpty(this.props.responseStatistics)&&UserHelper.getUserIsGuest()===false){
      return null
    }
    
    return (
      <Container style={{backgroundColor:'#F0F0F0'}}> 
        <GenericHeader
        title={'My Orders'}
        />
        
          <ScrollView showsVerticalScrollIndicator={false} horizontal={false} contentContainerStyle={{padding:10,backgroundColor:'#F0F0F0',width:width}} >
          {
            this.state.companyProfile==='buyer'?
            null:
            <OrderCard 
            title='Sales' 
            onPress={this.handelOnPress}
            {...buttonIdGenerator("SalesOrder")}
            titleQuantity={this.props.responseStatistics.total_salesorder}
            pending={this.props.responseStatistics.salesorder_pending}
            dispatched={this.props.responseStatistics.salesorder_dispatched}
            cancelled={this.props.responseStatistics.salesorder_cancelled}
            />
          }
          {
            this.state.companyProfile==='seller'?
            null:    
            <OrderCard 
            title='Purchase' 
            onPress={this.handelOnPress}
            {...buttonIdGenerator("PurchaseOrder")}
            titleQuantity={this.props.responseStatistics.total_purchaseorder}
            pending={this.props.responseStatistics.purchaseorder_pending}
            dispatched={this.props.responseStatistics.purchaseorder_dispatched}
            cancelled={this.props.responseStatistics.purchaseorder_cancelled}
            />
          } 
          </ScrollView>
      
      </Container>
      )
    }
    
  }
  
  const mapStateToProps = (state) => {
    return {
      responseStatistics:state.dashboardR.responseStatistics,
    };
  };
  export default connect(mapStateToProps)(OrderTab);
  
  
  
  
  