import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width / 2;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = EStyleSheet.create({
  $ScreenWidth: screenWidth,
  $ScreenHeight: screenHeight,
  $largeContainerSize: imageWidth,
  $largeImageSize: imageWidth / 2,
  $smallContainerSize: imageWidth / 2,
  $smallImageSize: imageWidth / 4,
  $OTPContainer: screenHeight / 3,
  
  container: {
    width: '$ScreenWidth',
  },
  contentView: {
    marginTop: 150,
  },
  backgroundImage: {
    flex: 1,
    // width: '$ScreenWidth',
    // height: '100%',
    // height: '$ScreenHeight',
  },
  $paddingHorizontal: 30,
  ForgotScreenMobileParent: {
    paddingRight: '$paddingHorizontal', 
    paddingLeft: '$paddingHorizontal',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  ForgotScreenMobileIcon: {
    fontSize: 30, 
    marginRight: 5,
  },
  ForgotScreenCountryLabel: {
    textAlignVertical: "center",
    textAlign: "center",
    color: 'black',
    fontSize: 18,
  },
  ForgotScreenMobileInputParent: {
    flex: 1, 
    marginBottom: 5,
    // alignItems: 'center', 
    //justifyContent: 'center',
    // borderWidth: 1, 
    // borderColor: 'yellow'
  },
  ForgotScreenMobileInputItem: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 0,
    borderBottomWidth: 0,
    alignItems: 'center',
    height: '100%',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  $inputHeight: 45,
  ForgotScreenMobileInput: {
    width: '100%',
    fontSize: 14, 
    height: '$inputHeight', 
    color: colorresource.grey900, 
    paddingBottom: 0, 
    paddingTop: 0, 
    // borderWidth: 1, 
    // borderColor: 'black',
  },
  ForgotScreenMobileInputParentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ForgotScreenUnderlineParent: {
    width: '100%', 
    paddingLeft: 5, 
    paddingRight: 0,
  },
  ForgotScreenUnderlineIdle: {
    height: 1,
    backgroundColor: 'black',
  },
  ForgotScreenUnderlineFocussed: {
    height: 2,
    backgroundColor: colorresource.liteblue,
  },
  ForgotScreenIconIdle: {
    fontSize:13, 
    color:'red', 
  },
  ForgotScreenIconError: {
    fontSize: 18,
    top: 23,
    right: 7,
    color: 'red',
  },
  ForgotScreenRequestOtpParent: {
    marginTop: 25,
    zIndex: 1,
  },
  ForgotScreenRequestOtpButton: {
    // marginTop: 20,
    // height: 50,
    // padding: 10,
    // width: '100%',
    // backgroundColor: colorresource.liteblue,
  },
  $inputValidationOffset: '$inputHeight',
  ForgotScreenMobileInputValidationParent: {
    zIndex: 5, /* so that the button is behind input validation */
    position:'absolute',
    top: '$inputValidationOffset+8',
    right: '$paddingHorizontal-3',
    alignSelf: 'flex-end',
  },
  ForgotScreenMobileInputValidationArrow: {
    width: 0,
    height: 0,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderRightWidth:6,
    borderBottomColor: 'red',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginRight: 13,
  },
  ForgotScreenMobileInputValidationTextParent: {
    backgroundColor:'black',
    borderTopColor: 'red',
    borderTopWidth: 3,
  },
  ForgotScreenMobileInputValidationText: {
    color:'#fff',
    fontSize: 13,
    paddingLeft: 20,
    paddingRight:20,
    paddingTop: 7,
    paddingBottom: 10,
  },
  forgotPwdButton: {
    flexDirection: 'row', marginTop: 5, alignItems: 'flex-end', justifyContent: 'flex-end'
  },
  modalContent:{
    backgroundColor: 'white',
    padding: 22,
    marginLeft:15,
    marginRight:15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default styles;
