import React, { Component } from 'react';
import { 
    StyleSheet,
	Alert,
	View,
	PermissionsAndroid,
	TouchableOpacity,
	Input,
	Text,
	ScrollView,
	TouchableHighlight,
	TextInput,
	Container,
	ToastAndroid,
    Image
} from 'react-native';
import { 
    Header,
	Left,
	Button,
	Icon,
	Right,
	CheckBox,
	Body,
	ListItem,
	Form,
	Item,
	Label,
	Card,
    Title 
} from 'native-base';
import { connect } from 'react-redux';

import { Dropdown } from '../../components/Dropdown';
import { HeaderBackNativeBase } from '../../components/Header';
import Modal from 'app/components/Modal/Modal'
import { strings } from '../../utils/i18n';
import { colorresource } from '../../resources/colorresource';
import LocalStorage from "../../db/LocalStorage";
import styles from './styles';
import consts from "../../utils/const";

import {getStatesAction,getCititesAction} from '../../actions/state-actions';
import {getCompanyListSuggestionsAction} from '../../actions/search-actions';
import {guestUserRegistrationAction} from '../../actions/login-actions';
import {goToHomeTab,goBack} from '../../actions/navigation-actions'

const selectedCompanyType={};
const companyType= [{'option': 'Manufacturer', 'id': 1,'value':'manufacturer'},
                    {'option': 'Wholesaler/Distributer', 'id': 2,'value':'wholesaler_distributor'},
                    {'option': 'Retailer', 'id': 3,'value':'retailer'},
                    {'option': 'Online Retailer/Reseller', 'id': 4,'value':'online_retailer_reseller'},
                    {'option': 'Broker', 'id': 5,'value':'broker'}
                    ] ;


class RegistrationScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showSelectCompanyTypeModal:false,
            selectedState:null,
            selectedCity:null,
            companyId:null,
            companyName:null,
            email:null,
            phone_number:null,
            name:null,
            lastName: null,
            agreeToTerms:false,
            userInfo: null,
            error: null,




        }
      }



    async getMobileNumber(){
        var phone_number = await LocalStorage.getItem(consts.MOBILE_NO);
        this.setState({phone_number:phone_number})
    }

    async getCountryId(){
        var country = await LocalStorage.getItem(consts.COUNTRYID);
        this.setState({country:country})
    }


async componentDidMount() {

    this.getMobileNumber()
    this.getCountryId()
    this.props.dispatch(getStatesAction())
 const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'Enable Location Tracking',
      message: 'Use your location to find nearby things',
    },
  );
   if (granted === true || granted === PermissionsAndroid.RESULTS.GRANTED)
{
    return true;
}


        // this._configureGoogleSignIn();
        // await this._getCurrentUser();

    }

    signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.setState({ userInfo });
        console.log('googleinfo',userInfo)
    } catch (error) {
        console.log('error',error)
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        } else {
        // some other error happened
        }
    }
    };

    changeCompanyName(text){
        this.setState({companyName:text})
        this.props.dispatch(getCompanyListSuggestionsAction(text))
    }


    toggleCompanyTypeModal(visible) {
        console.log('on foxu called')
        this.setState({showSelectCompanyTypeModal: visible});
      }

    companyTypeisAdded(index,value){
        if(selectedCompanyType.hasOwnProperty(index)){
            return true
        }
        else
        return false
    }

    addCompanyType(index,value){
        if(selectedCompanyType.hasOwnProperty(index)){
            console.log('selected1',selectedCompanyType)
            delete selectedCompanyType[index]
            this.setState({})
        }
        else{
            console.log('selected2',selectedCompanyType)
            selectedCompanyType[index]=value
            this.setState({})

        }
    }

    saveCompanyType(){
        let companyId='';
        for (var key in selectedCompanyType) {
            if (selectedCompanyType.hasOwnProperty(key)) {
                console.log(key + " -> " + selectedCompanyType[key]);
                companyId+=selectedCompanyType[key]
            }
        }
        this.setState({companyId:companyId,showSelectCompanyTypeModal:false},
        ()=> this.refs.myInput.blur())
       
    }



    componentWillReceiveProps(prevProps,prevState) {
        if (prevProps.response_registration !== this.props.response_registration) {
            Alert.alert(
                'Successfully registered',
                'Welcome to Wishbook!',
                [
                  {text: 'OK', onPress: () => goToHomeTab()},
                  // {text: 'OK', onPress: () => this.props.dispatch(removeSavedFilterFromServerAction(id))},
                ],
                { cancelable: false }
              )
            // Alert.alert( 'Registered Successfully')
            // goToHomeTab();
        }
    }




    signUp(){
        // console.log('state',this.state)
        if(this.state.companyId===null||this.state.selectedState===null||this.state.selectedCity===null||this.state.companyName===null||this.state.name===null||this.state.agreeToTerms===false||this.state.lastName===null){
            Alert.alert('Please enter all the values')
        }
        else{

            [{'option': 'Manufacturer', 'id': 1,'value':'manufacturer'},
            {'option': 'Wholesaler/Distributer', 'id': 2,'value':'wholesaler_distributor'},
            {'option': 'Retailer', 'id': 3,'value':'retailer'},
            {'option': 'Online Retailer/Reseller', 'id': 4,'value':'online_retailer_reseller'},
            {'option': 'Broker', 'id': 5,'value':'broker'}
            ] ;

            let params={}
            params["phone_number"]=this.state.phone_number;
            params["first_name"]=this.state.name
            params["last_name"]=this.state.lastName
            params["state"]=this.state.selectedState;
            params["city"]=this.state.selectedCity;
            params["country"]=this.state.country;
            params["company_name"]=this.state.companyName;
            params["online_retailer_reseller"]=selectedCompanyType.hasOwnProperty("3")?true:false
            params["broker"]=selectedCompanyType.hasOwnProperty("4")?true:false
            params["wholesaler_distributor"]=selectedCompanyType.hasOwnProperty("1")?true:false
            params["is_guest_user_registration"]=true
            params["manufacturer"]=selectedCompanyType.hasOwnProperty("0")?true:false
            params["retailer"]=selectedCompanyType.hasOwnProperty("2")?true:false
            
            const patchCompanyType = {
                "online_retailer_reseller": selectedCompanyType.hasOwnProperty("3")?true:false,
                "broker": selectedCompanyType.hasOwnProperty("4")?true:false,
                "wholesaler_distributor": selectedCompanyType.hasOwnProperty("1")?true:false,
                "is_guest_user_registration": true,
                "manufacturer": selectedCompanyType.hasOwnProperty("0")?true:false,
                "retailer": selectedCompanyType.hasOwnProperty("2")?true:false,
            }
            const patchProfile = {
                "phone_number": this.state.phone_number,
                "first_name": this.state.name,
                "last_name": this.state.lastName,
                "state": this.state.selectedState,
                "city": this.state.selectedCity,
                "country": this.state.country,
                "name": this.state.companyName,
            }
            let newParams = [patchCompanyType, patchProfile]
            console.log('object is',newParams)
            this.props.dispatch(guestUserRegistrationAction(newParams))
        }
    }

    changeState(item){
        this.setState({selectedState:item})
        this.props.dispatch(getCititesAction(item))
    }

    changeCity(item){
        this.setState({selectedCity:item})
    }

    companyTypeSelected(){


        return(
                companyType.map((item, index) => (
              <TouchableHighlight key = {item.id} underlayColor={'transparent'} >
                  <View style = {styles.BodySortFilterModalWhiteSpace}>
                      <CheckBox color="gray" checked={selectedCompanyType.hasOwnProperty(index)?true:false} onPress={()=>{this.addCompanyType(index,item.value)}} />
                      <Text style={{marginLeft:25,color:'black',fontSize:12}}>{item.option}</Text>
                  </View>
              </TouchableHighlight>
            ))

        )

    }
    blurTextInput(){
        this.refs.myInput.blur()
     }
    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {

return (
<View style={{ flex: 1 }}>
    <HeaderBackNativeBase title={strings('registration.registration')} />
        <ScrollView style={styles.scroll}>

        <Text style={{ fontStyle: 'italic', textAlign: 'center',marginTop:10,marginBottom:10 }}>Please complete your registration to access all the feature of wishbook</Text>
            {/* <TouchableHighlight style={{ flex: 0.8, flexDirection: 'row',borderColor:'#F0F0F0',elevation:1,padding:10,marginTop:10 }}>
                            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                                <Image style={{ marginLeft: 10,alignSelf:'flex-start' }} resizeMode="contain" source={require('../../images/search.png')}                    />
                                <Text style={{   alignSelf:'center' }}>{strings('registration.registerwithgoogle')}</Text>
                            </View>
            </TouchableHighlight> */}

        {/* <GoogleSigninButton
        style={{ flex:0.8, height: 48 }}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.signIn}
        disabled={this.state.isSigninInProgress} /> */}

        <Text style={{ color: colorresource.liteblue,marginTop:20, fontSize: 16}}> {strings('registration.companydetails')} </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15 }}>
                <View style={{ flex:0.4,flexDirection:'column'}}>
                    <Dropdown
                    onChangeText={(text)=>this.changeState(text)}
                    valueExtractor={(item)=>item.id}
                    labelExtractor={(item)=>item.state_name}
                    label='Select State' data={this.props.response_states} />
                </View>
                <View style={{ flexDirection:'column',flex:0.4}}>
                    <Dropdown
                     valueExtractor={(item)=>item.id}
                     labelExtractor={(item)=>item.city_name}
                     onChangeText={(text)=>this.changeCity(text)}
                     label='Select City' data={this.props.response_cities}/>
                </View>
            </View>
        <Text style={{ color: colorresource.liteblue, marginTop: 10, fontSize: 12 }}> Enter Company/Shop name </Text>
            <TextInput style = {styles.input} value={this.state.companyName}  placeholderTextColor = "gray" autoCapitalize = "none" onChangeText = {(text)=>this.changeCompanyName(text)}/>
            <TouchableOpacity activeOpacity={1} onPress={()=>this.toggleCompanyTypeModal(!this.state.showSelectCompanyTypeModal)}>
            <View pointerEvents='none'>
            <TextInput style = {styles.input} value={this.state.companyId}
                // onFocus={()=>this.toggleCompanyTypeModal(!this.state.showSelectCompanyTypeModal)}
                editable={false}
                ref="myInput"
                onLayout={()=>{console.log('onlayout called')}}
                onKeyPress={()=>{console.log('onkeypress called')}}
                placeholder = "Select company Type" placeholderTextColor = "gray" autoCapitalize = "none" />
            </View>
            </TouchableOpacity>
            <View>
                    <Text style={{ color: colorresource.liteblue, marginTop: 10, fontSize: 16, paddingLeft: 5 }}>User Details</Text>
                    <TextInput style = {styles.input}  placeholder = "Enter First Name" placeholderTextColor = "gray" autoCapitalize = "none" onChangeText = {(text)=>this.setState({name:text})}/>
                    <TextInput style = {styles.input}  placeholder = "Enter Last Name" placeholderTextColor = "gray" autoCapitalize = "none" onChangeText = {(text)=>this.setState({lastName:text})}/>
                    <TextInput style = {styles.input}  placeholder = "Enter mail ID (optional)"  placeholderTextColor = "gray"  autoCapitalize = "none"  onChangeText = {(text)=>this.setState({email:text})}/>
            </View>
        {/* <Text style={{ marginTop: 10, fontSize: 12}} >If you were referred by a seller,<Text style={{ color: colorresource.liteblue }}> enter his number here.</Text> </Text>  */}
        <View style={{flexDirection:'row',justifyContent:'flex-start', marginBottom:40,marginTop:20}}>
            <CheckBox checked={this.state.agreeToTerms} style={{marginRight:10}} onPress={()=>this.setState({agreeToTerms:!this.state.agreeToTerms})} />
            <Text style={{ marginLeft: 5 }}>I agree to the
            <Text style={{ color: colorresource.liteblue }}> Terms & conditions</Text> </Text>
        </View>
        </ScrollView>
        <Modal
              style={{margin: 0}}
              animationType="slide"
              transparent={true}
              visible={this.state.showSelectCompanyTypeModal}
              onRequestClose={() => {
                      this.toggleCompanyTypeModal(!this.state.showSelectCompanyTypeModal);
          }}>
              <View  style={styles.SortFilterModalTransparentSpace}>
                    <TouchableOpacity style={styles.SortFilterModalTransparentSpace} onPress={()=>{this.toggleCompanyTypeModal(!this.state.showSelectCompanyTypeModal)}}>
                    </TouchableOpacity>
              </View>
              <View style={styles.SortFilterModalWhiteSpace}>
              <View style={styles.HeaderSortFilterModalWhiteSpace}>
              <TouchableOpacity style={{flexDirection:'row',justifyContent:'center'}}  onPress={()=>{this.toggleCompanyTypeModal(!this.state.showSelectCompanyTypeModal)}}>
                <Icon name='close' />
                <Text style={{marginLeft:15,fontSize:18}}>Select Company Type</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{alignSelf:'flex-start'}} onPress={()=>this.saveCompanyType()}>
              <Text style={{fontSize:18,color:colorresource.blue}}>OK</Text>
              </TouchableOpacity>
              </View>
              <ScrollView>
                {
                   this.companyTypeSelected()
                }
              </ScrollView>
          </View>
      </Modal>

        <Button full info onPress={()=>this.signUp()}>
            <Text style={{ color: colorresource.white }}>DONE</Text>
        </Button>
    </View>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        response_cities:state.stateR.response_cities,
        response_states:state.stateR.states,
        responseCompanyList:state.stateR.responseCompanyList,
        response_registration:state.loginR.response_registration

     };
   };

   export default connect(mapStateToProps)(RegistrationScreen);



//onFocus ={()=> this.toggleCompanyTypeModal(!this.state.showSelectCompanyTypeModal)}
