import React, { Component } from 'react'
import { View, Text,Dimensions,ScrollView,TextInput,Alert,FlatList,StyleSheet,Image,TouchableHighlight, } from 'react-native'
import {Icon,Container,CheckBox,Radio} from "native-base";
import Modal from 'app/components/Modal/Modal';
const{height,width}=Dimensions.get('window');
const staticEnquiryFields= ['Price & Discounts','Fabric & Material','Dispath & Delivery'];
import UserHelper from '../../config/userHelper';
const columns = 3;

let checkBoxesText = {};

import { TestIdGenerator } from '../../utils/TestingHelper';
const buttonIdGenerator = TestIdGenerator("SendEnquiry", '', "Button")
export default class SendEnquiryForm extends Component {
   
constructor(props) {
        super(props);
        this.state = {
        text:'',
        data:this.props.data,
        item_type:"Sets", 
        item_quantity_sets:null,
        item_quantity_pieces:null
        };
     }   
    
     componentDidMount() {
        checkBoxesText = {}
     }
     
send=()=>{
 
 if(this.buttonDisabled()){
     Alert.alert("Please Enter the quantity")
 }   
 else if(!this.state.text){
     Alert.alert("Please select atleast one option")
 }   
 else{
 var obj={};
 obj["selling_company"]=this.state.data.supplier;
 obj["product"]=this.state.data.id;
 obj["enquiry_type"]="Text";  
 obj["item_type"] =this.state.item_type;
 obj["buying_company"]=UserHelper.getUsercompany_id();
 obj["item_quantity"]=this.state.item_type==='Sets'?this.state.item_quantity_sets:this.state.item_quantity_pieces;
 obj["text"]=this.state.text;
 this.props.sendEnquiry(obj);
}
}

setText = (index) =>{
    checkBoxesText[index] = !checkBoxesText[index]
    const textStringArray = staticEnquiryFields.filter((item, index) => checkBoxesText[index])
    let text = textStringArray.join(', ')
    this.setState({text:text})
    console.log(checkBoxesText)
    
}


buttonDisabled(){
   if(this.state.item_type==="Sets"){
      if(this.state.item_quantity_sets===undefined||this.state.item_quantity_sets===null||this.state.item_quantity_sets==='') 
      return true
      else 
        return false
   }
  if (this.state.item_type==='Pieces'){
       if(this.state.item_quantity_pieces===undefined||this.state.item_quantity_pieces===null||this.state.item_quantity_pieces==='')
       return true
       else 
        return false
   }
   
}

setItemQuantity = (text) =>{
    if(this.state.item_type==='Sets')
    this.setState({item_quantity_sets:text})
    if(this.state.item_type==='Pieces')
    this.setState({item_quantity_pieces:text})
}
     
render(){
    //console.log('data on enquiry',this.state.item_quantity_sets,this.state.item_type,this.state.item_quantity_pieces)
    return (
        <Modal
            style={{margin: 0}}
            animationType="slide"
            transparent={true}
            visible={this.props.sendEnquiryModalVisibilty}
            onRequestClose={this.props.onPress}>
                <View  style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
                        <View style={{backgroundColor:'white',alignSelf:'center',elevation:5,padding:10}}>
                            <View style={{paddingBottom:10}}>
                                <Text style={{fontSize: 18,color:'black'}}>Enquiry Details</Text>
                            </View>
                            <View style={{paddingBottom:5}}>
                                <Text >Enter Quantity </Text>
                            </View>
                            <View style={{height:height*0.08,flexDirection:'row'}}>
                                <View style={{flex:0.5,flexDirection:'row',alignItems:'center'}}>
                                    <CheckBox {...buttonIdGenerator("Sets")}  checked={this.state.item_type==="Sets"?true:false} style={{marginRight:15}} onPress={()=>{this.setState({item_type:"Sets",item_quantity_pieces:''})}}/>
                                        <TextInput
                                        underline={true}
                                        underlineColorAndroid={"black"}
                                        keyboardType = 'numeric'
                                        returnKeyType='done'
                                        placeholder = 'Sets'
                                        onChangeText={(text) => this.setItemQuantity(text)}
                                        value={this.state.item_quantity_sets}
                                        />   
                                </View>
                                {
                                    this.props.data.full_catalog_orders_only?
                                        null
                                        :          
                                <View  style={{flex:0.5,flexDirection:'row',alignItems:'center'}}>
                                            <CheckBox {...buttonIdGenerator("Pcs")} checked={this.state.item_type==="Pieces"?true:false} style={{marginRight:15}} onPress={()=>{this.setState({item_type:"Pieces",item_quantity_sets:''})}}/>
                                            <TextInput
                                            underline={true}
                                            underlineColorAndroid={"black"}
                                            keyboardType = 'numeric'
                                            returnKeyType='done'
                                            placeholder = 'Pcs.'
                                            onChangeText={(text) => this.setItemQuantity(text)}
                                            value={this.state.item_quantity_pieces}
                                            />              
                                </View>
                                    }
                            </View>
                            <View style={{padding:5}}>
                                     <Text>What would you like to ask about ?</Text>
                            </View>
                            {
                            staticEnquiryFields.map((item, index) => (
                                <View  key = {index}  style={{flexDirection:'row',height:height*0.05}}>
                                    <CheckBox {...buttonIdGenerator('Checkbox' + item)} checked={checkBoxesText[index]?true:false} onPress={()=>this.setText(index)} />
                                    <Text style={{marginLeft:width*0.1}} >{item}</Text>
                                </View>
                            ))
                            } 
                            <View style ={{height:height*0.05,flexDirection:'row',justifyContent:'flex-end'}}>
                                <View style={{width:width*0.2,justifyContent:'center',alignItems:'center'}}>
                                    <TouchableHighlight {...buttonIdGenerator("Cancel")}onPress={this.props.onPress}>
                                        <Text style={{fontSize: 16,color:'black'}}>CANCEL</Text>
                                    </TouchableHighlight>
                            </View>
                            <View style={{width:width*0.2,justifyContent:'center',alignItems:'center'}}>
                                    <TouchableHighlight underlayColor= {'transparent'} {...buttonIdGenerator("Send")} onPress={this.send}>
                                        
                                        {
                                            this.buttonDisabled()?
                                        <Text style={{fontSize: 16,color:'gray'}}>SEND</Text>
                                        :
                                        <Text style={{fontSize: 16,color:'black'}}>SEND</Text>

                                        }
                                    </TouchableHighlight>                 
                            </View>
                    </View>
             </View>    
        </View>
    </Modal>
    )
}

}