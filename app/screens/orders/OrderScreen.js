import React, { Component } from 'react';
import { Text, Image, View,TouchableHighlight,Alert,FlatList, StyleSheet, ScrollView,Dimensions } from 'react-native';
import {  Header,Container, Title, Button,Left,Right,Body,Icon,Card,  Badge as NBBadge,
} from 'native-base';
import {getStatisticsAction} from '../../actions/dashboard-actions'
import _ from 'lodash';
import {Badge} from '../../components/Header/GenericHeader'

import UserHelper from '../../config/userHelper';
import {goToOpenLeads, goToOpenEnquiries} from '../../actions/navigation-actions'
const {width = 0,height = 0} = Dimensions.get('window');
import { colorresource } from '../../resources/colorresource';
import { connect } from 'react-redux';
import { TestIdGenerator } from '../../utils/TestingHelper';
const buttonIdGenerator = TestIdGenerator("OrdersTab", '', "Button")
const textIdGenerator = TestIdGenerator("OrdersTab", '', "Text")

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
      quickActionData:[],
   }

  //  GetGridViewItem(item) {
  //   Alert.alert(item);
  // }



  componentDidMount(){
    this.props.dispatch(getStatisticsAction())
    console.log("order screen",UserHelper.getCompanyType())
    this.setState({companyProfile:UserHelper.getCompanyType()})

  }

  handelOnPressLeads = (type) => {
    switch (type) {
      case 0://All
      this.props.navigation.navigate("LeadsDetailScreen", { picktype: 'All' })
      break;
      case 1://Open
      this.props.navigation.navigate("LeadsDetailScreen", { picktype: 'Open' })
      break;
      case 2://Closed
      this.props.navigation.navigate("LeadsDetailScreen", { picktype: 'Closed' })
      break;
      default:
      break;
    }
  }

  handelOnPressEnquiry = (type) => {
    switch (type) {
      case 0://All
      this.props.navigation.navigate("EnquiryDetailScreen", { picktype: 'All' })
      break;
      case 1://Open
      this.props.navigation.navigate("EnquiryDetailScreen", { picktype: 'Open' })
      break;
      case 2://Closed
      this.props.navigation.navigate("EnquiryDetailScreen", { picktype: 'Closed' })
      break;
      default:
      break;
    }
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


  handleQuickAction = (type,name) =>{

    if(name!=="Leads"&&name!="Enquiries") {
      this.handelOnPress(1,name)
    } else if(name === "Leads") {
      goToOpenLeads()
    } else if(name === 'Enquiries') {
      goToOpenEnquiries()
    }
  }

componentWillReceiveProps(prevProps, prevState) {
    //console.log('prev props',prevProps.responseStatistics,this.props.responseStatistics)
    if (prevProps.responseStatistics !== this.props.responseStatistics) {
      let response =[];
      if(prevProps.responseStatistics.salesorder_pending>0&&this.state.companyProfile!=='buyer'){
        let data={};
        data["name"]="Sales"
        data["type"]="Pending"
        data["total"]=prevProps.responseStatistics.salesorder_pending
        response.push(data);
      }
      if(prevProps.responseStatistics.purchaseorder_pending>0&&this.state.companyProfile!=='seller'){
        let data={};
        data["name"]="Purchase"
        data["type"]="Pending"
        data["total"]=prevProps.responseStatistics.purchaseorder_pending
        response.push(data);
      }
      if(prevProps.responseStatistics.opened_lead>0&&this.state.companyProfile!=='buyer'){
        let data={};
        data["name"]="Leads"
        data["type"]="Open"
        data["total"]=prevProps.responseStatistics.opened_lead
        response.push(data);
      }
      if(prevProps.responseStatistics.opened_enquiry>0&&this.state.companyProfile!=='seller'){
        let data={};
        data["name"]="Enquiries"
        data["type"]="Open"
        data["total"]=prevProps.responseStatistics.opened_enquiry
        response.push(data);
      }
        // console.log('response',response)
        this.setState({quickActionData: response});
    }
}

    returnQuickActionData(){
        let response =[];
        if(this.props.responseStatistics.salesorder_pending>0&&this.state.companyProfile!=='buyer'){
          let data={};
          data["name"]="Sales"
          data["type"]="Pending"
          data["total"]=this.props.responseStatistics.salesorder_pending
          response.push(data);
        }
        if(this.props.responseStatistics.purchaseorder_pending>0&&this.state.companyProfile!=='seller'){
          let data={};
          data["name"]="Purchase"
          data["type"]="Pending"
          data["total"]=this.props.responseStatistics.purchaseorder_pending
          response.push(data);
        }
        if(this.props.responseStatistics.opened_cataloglead>0&&this.state.companyProfile!=='buyer'){
          let data={};
          data["name"]="Leads"
          data["type"]="Open"
          data["total"]=this.props.responseStatistics.opened_cataloglead
          response.push(data);
        }
        if(this.props.responseStatistics.opened_catalogenquiry>0&&this.state.companyProfile!=='seller'){
          let data={};
          data["name"]="Enquiries"
          data["type"]="Open"
          data["total"]=this.props.responseStatistics.opened_catalogenquiry
          response.push(data);
        }
          // console.log('response',response)
          return response
    }


   render() {
      let userIsGuest = UserHelper.getUserIsGuest();

    if(_.isEmpty(this.props.responseStatistics)&&UserHelper.getUserIsGuest()===false){
        return null
    }

      return (
        <View style={{flex:1,flexDirection:'column',alignItems:'center',backgroundColor:'#F0F0F0'}}>
                <Header  style={{backgroundColor: colorresource.liteblue,width:width}}>
                    <Left>
                        <Title style={{color:colorresource.white}}>Orders</Title>
                    </Left>
                    <Right>
                    {
                      userIsGuest?
                      null
                      :
                      <Button transparent onPress={() => this.props.navigation.navigate('MyCartStack')}>
                            <Icon style={{color:colorresource.white,fontSize:24}}  {...buttonIdGenerator("Cart")}  name='cart' />
                            <Badge count={this.props.cartCount}/>

                      </Button>
                    }

                    </Right>
                </Header>
                <ScrollView showsVerticalScrollIndicator={false} horizontal={false} contentContainerStyle={{padding:10,backgroundColor:'#F0F0F0',width:width}} >
                {
                    this.state.quickActionData.length<1?
                    null
                    :
                    <Text style={{marginTop:10,padding:10}}>Quick Actions Needed</Text>
                }
                    <FlatList
                        // data={ this.state.quickActionData }
                        data={this.returnQuickActionData()}
                        numColumns={2}
                        keyExtractor={item => item.name}
                        renderItem={ ({item}) =>
                        <View style={styles.GridViewContainer}>
                        <Text style={styles.textStyle} {...buttonIdGenerator("QuickActions")}>{item.total} {item.name}</Text>
                        <Text style={styles.GridViewTextLayout} onPress={()=>this.handleQuickAction(item.type,item.name)} > {item.type} </Text>
                        </View>
                        }
                    />
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
                    {/* {
                      this.state.companyProfile==='buyer'?
                      null:
                    <LeadquiryCard
                    title='Leads'
                    {...buttonIdGenerator("Leads")}
                    titleQuantity={this.props.responseStatistics.total_cataloglead}
                    open={this.props.responseStatistics.opened_cataloglead}
                    resolved={this.props.responseStatistics.closed_cataloglead}
                    />
                    }
                    {
                    this.state.companyProfile==='seller'?
                    null:
                    <LeadquiryCard
                    title='Enquiries'
                    {...buttonIdGenerator("Enquiry")}
                    onPress={this.handelOnPressEnquiry}
                    titleQuantity={this.props.responseStatistics.total_catalogenquiry}
                    open={this.props.responseStatistics.opened_catalogenquiry}
                    resolved={this.props.responseStatistics.closed_catalogenquiry}
                    />
                    }     */}
            </ScrollView>
      </View>
       )
     }

}
LeadquiryCard = ({title, titleQuantity, open, resolved,onPress}) => {
    return (
    <View  style={styles.OrdersScreenOrderCard}>
       <TouchableHighlight underlayColor={'transparent'}  onPress={()=>()=>onPress(0)}>
      <View style={{height:height*0.06,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <View style={{width:width*0.7,padding:width*0.02,alignItems:'flex-start'}}>
      <Text style={{fontSize:18,color:'black'}}>{title}</Text>
      </View>
      <View style={{width:width*0.28}}>
      <Text {...textIdGenerator(title+"Quantity")} style={styles.textStyle}>{titleQuantity}</Text>
      </View>
      </View>
      </TouchableHighlight>
      <View style={{borderBottomColor:"gray",width:width*0.92,borderBottomWidth:1,alignSelf:'center'}}/>
      <View style={{height:height*0.05,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <TouchableHighlight {...buttonIdGenerator(title+"Open")} underlayColor={'transparent'} style={{width:width*0.4,marginLeft:width*0.04,justifyContent:'center',alignItems:'center'}} onPress={()=>onPress(1)}>
      <Text style={styles.textStyle}>{open} Open</Text>
      </TouchableHighlight>
      <TouchableHighlight {...buttonIdGenerator(title+"Resolved")} underlayColor={'transparent'} style={{width:width*0.4,marginLeft:width*0.04,justifyContent:'center',alignItems:'center'}} onPress={()=>onPress(2)}>
      <Text style={styles.textStyle}>{resolved} Resolved</Text>
      </TouchableHighlight>
      </View>
      </View>
    );
  }

export const OrderCard = ({title, titleQuantity, pending, dispatched, cancelled,onPress}) => {
    return (
      <View  style={styles.OrdersScreenOrderCard}>
      <TouchableHighlight underlayColor={'transparent'}  onPress={()=>onPress(0,title)}>
      <View style={{height:height*0.06,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <View style={{width:width*0.78,padding:width*0.02,alignItems:'flex-start'}}>
      <Text style={{fontSize:18,color:'black'}}>Total {title} Orders</Text>
      </View>
      <View style={{width:width*0.2}}>
      <Text {...textIdGenerator(title+"Quantity")} style={styles.textStyle}>{titleQuantity}</Text>
      </View>
      </View>
      </TouchableHighlight>
      <View style={{borderBottomColor:"gray",width:width*0.92,borderBottomWidth:1,alignSelf:'center'}}/>
      <View style={{paddingTop: 5, paddingBottom: 5, flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <TouchableHighlight {...buttonIdGenerator(title+"Pending")}underlayColor={'transparent'} style={{flex: 1,justifyContent:'center',alignItems:'center'}} onPress={()=>onPress(1,title)}>
       <Text style={styles.textStyle}> {pending} Pending</Text>
       </TouchableHighlight>
       <TouchableHighlight {...buttonIdGenerator(title+"Dispatched")} underlayColor={'transparent'} style={{flex: 1,justifyContent:'center',alignItems:'center'}} onPress={()=>onPress(2,title)}>
       <Text style={styles.textStyle}>{dispatched} Dispatched</Text>
       </TouchableHighlight>
       <TouchableHighlight {...buttonIdGenerator(title+"Cancelled")} underlayColor={'transparent'} style={{flex: 1,justifyContent:'center',alignItems:'center'}} onPress={()=>onPress(3,title)}>
       <Text style={styles.textStyle}>{cancelled} Cancelled</Text>
       </TouchableHighlight>
       </View>
      </View>
    );
  }

const mapStateToProps = (state) => {
    return {
     responseStatistics:state.dashboardR.responseStatistics,
     cartCount: state.cartR.cartCount,
      userInfo: state.verifyotpR.userInfo
     };
};
export default connect(mapStateToProps)(OrderTab);
