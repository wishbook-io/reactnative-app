import React, { Component } from 'react';
import { View,Header,Container,Content, Title, Button,Radio, Icon, Right, Body, Left,Footer } from "native-base";
import { Dimensions,TouchableHighlight,Alert,Text,TextInput } from 'react-native';
import Modal from 'app/components/Modal/Modal';
import { colorresource } from '../../resources/colorresource';
import {enableSellCatalogAction} from '../../actions/catalog-actions'
var moment = require('moment');
import { connect } from 'react-redux';
import {getCatalogDetailsAction} from '../../actions/catalog-actions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


 class StartSelling extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
     price_default:500,
     catalog_duration_days:30,
     expiry_date:moment(new Date(), "DD-MM-YYYY").add(30, 'days').toISOString(),
     sell_again:false
    }
  }
  goBack =()=>{
    Alert.alert('Go bAck Here')
  }

  startSellingCatalog = () =>{
   
    if(this.state.catalog_duration_days>90||this.state.catalog_duration_days<10){
      Alert.alert('Days should be in between 10-90 days')
    }
   
    else{
      var params={};
        params["expiry_date"]=this.state.expiry_date;
        this.props.dispatch(enableSellCatalogAction(params,this.props.catalogDetails.id));
        this.props.onPress()
    }

  }

  setExpiryDate=(text)=>{
    var today = new Date();
    var new_date = moment(today, "DD-MM-YYYY").add(text, 'days');
    var date = new_date.toISOString();
    // console.log('date is ',date,today)
    this.setState({catalog_duration_days:text,expiry_date:date})
  }
 

  



  
  render() {
    return (
    <Modal 
    style={{margin: 0,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignContent:'center'}}
    animationType="slide"
    transparent={true}
    visible={this.props.start_selling}
    onRequestClose={this.props.onPress}>
      <View style={{flexDirection:'column',padding:15,backgroundColor:'white',marginHorizontal:20}}>
          <Text style={{color:colorresource.liteblue,fontSize:18}}>Catalog Enable Duration</Text>
          <Text style={{color:'gray'}} >How would you like to sell catalog </Text>
          <View style={{paddingTop:10, flexDirection:'row',alignItems:'center'}}>
              <Text>Keep the product live for </Text>
              <TextInput 
              underline={true}
              style={{width:width*0.1,alignContent:'center'}}
              underlineColorAndroid={colorresource.liteblue}
              keyboardType = 'numeric'
              onChangeText={(text) => this.setExpiryDate(text)}
              value={this.state.catalog_duration_days.toString()}/>
              <Text>Days</Text>
          </View>
      <View style={{alignItems:'flex-end',flexDirection:'row',justifyContent:'flex-end',padding:10}}>  
      <Button   transparent onPress={this.startSellingCatalog}>
      {
        this.state.catalog_duration_days>90||this.state.catalog_duration_days<10?
        <Text style={{color:colorresource.gray,fontSize:18,alignSelf:'flex-end'}}>DONE</Text> 
        :
        <Text style={{color:colorresource.liteblue,fontSize:18,alignSelf:'flex-end'}}>DONE</Text> 
      }
      </Button>
      </View>
    </View>
    </Modal>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
     
  };
};

export default connect(mapStateToProps)(StartSelling);
