import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native'
import { colorresource } from '../../resources/colorresource';
import { fontresource } from '../../resources/fontresource';

const {
    width = 0,
    height = 0
} = Dimensions.get('window');

const actualImageWidth = 130
const actualImageHeight = 180
const imageHeightToWidthRatio = actualImageHeight/actualImageWidth
const imageWidth = Math.min(actualImageWidth, width*0.35)
const imageHeight = imageWidth * imageHeightToWidthRatio
const imageCardAspectRatio = 150/115
const marginWidth = 20
const imageCardWidth = (width-marginWidth)/3.1
 const styles = EStyleSheet.create({

  CatalogDetailView:{
    flex: 1,
    flexDirection:'column',
    minHeight: imageHeight + 20,
    backgroundColor: 'white',
    // borderWidth: 0.5,
    // borderColor: 'red',
  },
  CatalogDetailTextDetailView:{
    marginLeft: imageWidth + 20,
    marginTop: 10,
    paddingBottom: 10,
    flex: 1,
    // borderWidth: 0.5,
    // borderColor: 'blue',
  },
  CatalogDetailBasicDesignPieces: {
    fontSize: 14,
    color: colorresource.liteblack,
    fontWeight: 'bold',
  },
  CatalogDetailBasicOriginalPrice:{
    color: colorresource.gray,
    fontSize: 14,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  CatalogDetailBasicRow: {
    flexDirection: 'row', 
    // flex: 1,
    padding: 3,
    // borderWidth: 3, 
    // borderColor: 'red'
  },
  CatalogDetailBasicLeftText: {
    fontSize: 14,
    color: colorresource.gray,
    // marginTop: 3,
    width: 100,
  },
  
  CatalogDetailBasicRightText: {
    fontSize: 14,
    color: colorresource.liteblack,
    // marginTop: 3,
    flex: 1,
    flexWrap: 'wrap'
  },
  CatalogDetailBasicLeftMediumText: {
    fontSize: 14,
    color: colorresource.gray,
    fontFamily: fontresource.medium,
    // marginTop: 3,
    width: 100,
  },
  CatalogDetailBasicRightMediumText: {
    fontSize: 14,
    fontFamily: fontresource.medium,
    color: colorresource.liteblack,
    // marginTop: 3,
    flex: 1,
    flexWrap: 'wrap'
  },
  CatalogDetailBasicDiscountText: {
    color: colorresource.darkgreen,
    fontSize: 14,
  },
  CatalogDetailImageView:{
    width: imageWidth,
    height: imageHeight,
    // marginLeft: 10,
    // marginTop: 10,
    borderRadius:5,
    // position: 'absolute'
  },
  CatalogDetailTextView:{
    flexDirection:'row',
    backgroundColor:"#F0F0F0",
    // borderWidth: 0.5,
    // borderColor: 'green',
  },
  CatalogDetailButtonView:{
    marginLeft: 150,
    flexDirection:'row',
    justifyContent: 'center',
    // borderWidth: 0.5,
    // borderColor: 'purple',
  },
  CatalogDetailButtonDetailView:{
    justifyContent:'space-around',
    flexDirection:'row',
    flex: 1,
    // borderWidth: 1,
  },
  BrandDetailView:{
    padding:5,
    flexDirection:'row',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  BrandDetailThumbnail:{
    width: 45,
    height: 45,
  },
  BrandDetailTextView:{
    marginLeft: 5,
    flexDirection:'row', // sort of req
    flex: 1, // req
    flexGrow: 1, // req
    // borderWidth: 1,
    // borderColor: 'black',
  },
  BrandDetailFollowButtonView:{
    justifyContent: 'center',
    marginRight: 10,
    // borderWidth: 1,
    // borderColor: 'black'
  },
  BrandDetailFollowButton:{
    // paddingHorizontal:5,
    padding:5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight:5,
    borderRadius:8,
    justifyContent:'center',
    borderColor:colorresource.liteblue,
    borderWidth:1
  },
  ProductImagesScrollView:{
    // height:height*0.26,
    flexDirection:'row',
    alignItems:'center',
    alignItems:'flex-start',
    padding: 10,
  },
  ProductImagesScrollViewCards:{
    // height:height*0.22,
    // width:width*0.3,
    borderRadius:4,
    elevation:2,
    marginBottom:20,
    marginLeft:width*0.01,
    justifyContent:'center',
    backgroundColor:'white'
  },
  ProductImagesScrollViewCardsImage:{
    height: imageCardWidth * imageCardAspectRatio,
    width: imageCardWidth
  },
  CircleIcon: {
    width: 35,
    height: 35,
    marginTop:5,
    borderRadius: 35/2,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center',
    borderColor:colorresource.liteblue,
    borderWidth:1
  },
  TextLineView:{
    marginLeft: 10, 
    marginTop:5,
    marginBottom:5,
    padding:height*0.001,
    flexDirection:'row',
 },
  TextLineViewTitle:{
   width:width*0.25, 
   justifyContent:'center'
  },
  TextLineViewValue:{
   width:width*0.71, 
   justifyContent:'center'
  },
  Emptyitem: {
    alignItems: "center",
    backgroundColor: "#dcda48",
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    padding: 20
  },
  itemEmpty: {
    backgroundColor: "transparent"
  },
  CartButton: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    backgroundColor:colorresource.orange  
  },
  CartButtonText:{
    color:'white',
    fontWeight: 'bold',

  },
  EnquiryButton:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  },
  EnquiryButtonText:{
    color:colorresource.liteblue,
    fontWeight: 'bold',

  },
  CatalogItemLabel: {
    //backgroundColor: colorresource.orange,
    alignSelf:'flex-end',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius:5,
    alignItems:'center',
    paddingHorizontal: 5,
    marginTop:5,
    marginRight:10
    // paddingRight: 15,
    // paddingTop: 3,
    // paddingBottom: 3,
 },
  CatalogItemLabelEmpty: {
      flex: 1,
      //backgroundColor: 'white',
  },
  CatalogItemLabelText: {
      fontSize: 12,
      color: 'white',
  },
  CatalogItemLabelIcon: {
      fontSize: 18,
      color: 'white',
      marginRight: 5,
  },
  header:{
    backgroundColor:colorresource.liteblue
  }

});
export default styles;
