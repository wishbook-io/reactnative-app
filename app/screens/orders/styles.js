import EStyleSheet from 'react-native-extended-stylesheet';
import { colorresource } from '../../resources/colorresource';
import {Dimensions} from 'react-native';
const {width = 0,height = 0} = Dimensions.get('window');

const styles = EStyleSheet.create({
  form: {
    margin: 20,
  },
  Card: {
    // alignSelf:'center',
    // height:height*0.16,
    justifyContent:'center',
    borderRadius:4,
    // width:width*0.96,
    flexDirection:'row',
    padding: 10,
    elevation:2,
    backgroundColor:'white',
    // marginBottom:height*0.015
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 5,
    color: colorresource.liteblue
  },
  EnquiryDetailScreen_Dropdown:{
    height: 50, width: 100 
  },
  EnquiryDetailScreen_Itemview:{
    marginLeft: 20, marginRight: 20 
  },
  OrdersScreenOrderCard: {
    alignSelf:'center',
    height:height*0.11,
    width:width*0.96,
    flexDirection:'column',
    elevation:2,
    backgroundColor:colorresource.white,
    marginBottom:height*0.02
  },
  OrdersScreenOrderCardRow: {
    flex:1, 
    flexDirection:'row',
  },
  OrdersScreenOrderCardHeadingText: {
    fontSize:20, 
    color:colorresource.liteblack,
  },
  OrdersScreenOrderCardHeadingQuantityText: {
    fontSize:20, 
    color:colorresource.liteblue,
  },
  OrdersScreenOrderCardSeparatorParent: {
    marginTop: 7, 
    marginBottom: 2,
  },
  OrdersScreenOrderCardSeparator: {
    backgroundColor: '#c9c9c9', 
    height: 1,
  },
  OrdersScreenOrderCardButtonText: {
    fontSize: 14, 
    color: colorresource.liteblue,
  },
  textStyle: {
    color: colorresource.liteblue,
    fontSize: 12,
  },
  GridViewContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height*0.1,
    margin: width*0.01,
    elevation:2,
    backgroundColor: 'white'
  },
  GridViewTextLayout: {
    fontSize: 20,
    justifyContent: 'center',
    color: colorresource.liteblue,
  },
  RegisterButton:{
    width:width*0.3,
    height:height*0.05,
    borderRadius:8,
    justifyContent:'center',
    borderColor:colorresource.liteblue,
    borderWidth:1
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
  textBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
    //   borderWidth: 1,
    //   borderColor: 'purple',
  },
});

export default styles;

export const getColorFromStatus = (status) => {
  const color = ['Draft', 'Pending', 'Cancelled', 'Partially Paid'].includes(status)? colorresource.red : colorresource.green
  return color
}