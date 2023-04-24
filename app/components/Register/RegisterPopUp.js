import React, { Component } from 'react'
import { View, Text,Dimensions,Alert,Image,TouchableHighlight, } from 'react-native'
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { colorresource } from '../../resources/colorresource';
import consts from '../../utils/const';
import {goToRegisterNewUserScreen} from '../../actions/navigation-actions'
const {width = 0,height = 0} = Dimensions.get('window');

const RegisterPopUp = ({
    registerPopUpModalVisibilty,
    onPress
}) => (
    <Modal
        style={{margin: 0}}
        animationType="slide"
        transparent={true}
        visible={registerPopUpModalVisibilty}
        onRequestClose={onPress}>
    <View  style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
    <View style={{flexDirection:'column',backgroundColor:'white',alignItems:'center',padding:10}}>
    <Image style={{height:height*0.1,alignSelf:'center',width:height*0.1,marginTop:10}}  source={require('../../images/register.png')}/> 
    <View style={{width:width*0.8,alignItems:'center',justifyContent:'center', marginBottom:20,marginTop:20}}>
    <Text style={{color:'black',fontSize:12,textAlign:'center'}}>{consts.REGISTER_STRING}</Text>   
    </View>
    <View style={{alignItems:'center',paddingVertical:10,justifyContent:'space-between',flexDirection:'row'}}>
    <View style={{flex:0.5,justifyContent:'center'}}>
    <TouchableHighlight onPress={onPress} underlayColor={'white'} >
    <Text>Later</Text>
    </TouchableHighlight>
    </View>
    <View>
    <TouchableHighlight underlayColor="transparent" style={{borderRadius:8,justifyContent:'center',borderColor:colorresource.liteblue,borderWidth:1,padding:10}} 
     onPress={()=>
    {
        onPress()
        goToRegisterNewUserScreen()}}>
       <Text style={{fontSize: 14,color:colorresource.liteblue,alignSelf:'center'}}>Register Now</Text>
    </TouchableHighlight>
    </View>
    </View>
    </View>
    </View>
    </Modal>

    );

RegisterPopUp.propTypes = {
    registerPopUpModalVisibilty: PropTypes.bool,
    onPress: PropTypes.func
};

export default RegisterPopUp;