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
  containerImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.45,
    //borderWidth: 1,
    //borderColor: 'red',
  },
  imageView: {
    alignItems: 'center',
    marginBottom: 15,
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  contentView: {
    //marginTop: 20,
    flex: 0.55,
    //borderWidth: 1,
    //borderColor: 'yellow',
  },
  $cardPaddingHorizontal: 20,
  $cardPaddingVertical: 20,
  LoginScreenCard: {
    overflow:'hidden', /* due to borderRadius */
    borderRadius: 5, 
    marginRight: 7, 
    marginLeft:7,
    paddingTop: '$cardPaddingVertical',
    paddingBottom: '$cardPaddingVertical',
    paddingLeft: '$cardPaddingHorizontal',
    paddingRight: '$cardPaddingHorizontal',
    // borderWidth: 1,
    // borderColor: 'purple',
  },
  LoginScreenMobileParent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  LoginScreenCountryParent: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  LoginScreenCountryLabel: {
    margin: 5,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 15,
    color: 'black',
  },
  LoginScreenMobileInputLabel: {
    marginLeft: 6, 
    fontSize: 13, 
    color: colorresource.liteblue,
  },
  LoginScreenMobileItem: {
    flex: 1,
    paddingTop:0,
    paddingBottom:0,
    borderColor: 'transparent',
  },
  $inputHeight: 30,
  LoginScreenMobileInput: {
    fontSize: 13, 
    height: '$inputHeight', 
    paddingTop: 0, 
    paddingBottom: 0,
  },
  LoginScreenMobileInputUnderline: {
    marginLeft: 6, 
    borderColor: colorresource.liteblue, 
    borderWidth: 1, 
  },
  LoginScreenMobileInputValidationIcon: {
    color: 'red',
    fontSize: 20,
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  $inputValidationOffset: '$cardPaddingVertical+$inputHeight',
  LoginScreenMobileInputValidationParent: {
    zIndex: 5, /* so that the button is behind input validation */
    position:'absolute',
    top: '$inputValidationOffset + 23',
    right: '$cardPaddingHorizontal',
    alignSelf: 'flex-end',
  },
  LoginScreenMobileInputValidationArrow: {
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
  LoginScreenMobileInputValidationTextParent: {
    backgroundColor:'black',
		borderTopColor: 'red',
		borderTopWidth: 3,
  },
  LoginScreenMobileInputValidationText: {
    color:'#fff',
		fontSize: 13,
    paddingLeft: 20,
    paddingRight:20,
    paddingTop: 7,
    paddingBottom: 10,
  },
  LoginScreenButtonParent: {
    zIndex: 1, /* so that the button is behind input validation */
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  $buttonHeight: 50,
  LoginScreenButton: {
    height: '$buttonHeight',
    padding: 20,
    marginTop: 20,
    backgroundColor: colorresource.darkblue,
    borderRadius: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    //flex: 1,
    margin: 5,
    textAlignVertical: "center",
    textAlign: "center"
  },
  item: {
    flex: 1,
    marginRight: 25,
    paddingTop:0,
    paddingBottom:0,
    borderColor: 'transparent',
  },
  button: {
    height: 50,
    padding: 20,
    marginTop: 20,
  },
  text: {
    textAlign: 'center'
  },
  backgroundImage: {
    width: '$ScreenWidth',
    height: '100%',
  },
  VerifyScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 10, 
    paddingBottom: 20,
    justifyContent: 'center',
  },
  $verifyScreenFontSize: 14,
  VerifyScreenItalicsLabel: {
    textAlign: 'center',
    fontStyle: 'italic', 
    alignItems: 'center',
    fontSize: '$verifyScreenFontSize',
  },
  VerifyScreenHeaderMobileNo: {
    color: colorresource.liteblack,
    fontSize: '$verifyScreenFontSize',
  },
  VerifyScreenTimer: {
    textAlign: 'center',
    color: colorresource.darkblue,
    fontSize: '$verifyScreenFontSize',
    marginBottom: 10,
  },
  VerifyScreenOtpButtonsRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 30,
    // borderColor: 'yellow',
    // borderWidth: 1
  },
  VerifyScreenResendText: {
    fontSize: 13,
    color: colorresource.liteblack,
    paddingLeft: 5,
    paddingRight: 5,
  },
  VerifyScreenResendTextDisabled: {
    fontSize: 13,
    color: colorresource.liteblack + '20',
    paddingLeft: 5,
    paddingRight: 5,
  },
  VerifyScreenWhatsappText: {
    fontSize: 13,
    color: colorresource.whatsapp_color_code,
    paddingRight: 5,
    paddingLeft: 5,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  VerifyScreenWhatsappTextDisabled: {
    fontSize: 13,
    color: colorresource.whatsapp_color_code + '20',
    paddingRight: 5,
    paddingLeft: 5,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  VerifyScreenOrParent: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 20,
  },
  VerifyScreenOrButton: {
    width: 100, 
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#777777',
    backgroundColor: 'transparent',
    elevation: 0,
    borderRadius: 30,
  },
  VerifyScreenOrText: {
    alignItems: 'center', 
    textAlign: 'center', 
    fontSize: '$verifyScreenFontSize',
    color: colorresource.liteblack,
  },
  VerifyScreenForgotRow: {
    flexDirection: 'row', 
    marginTop: 5, 
    alignItems: 'flex-end', 
    justifyContent: 'flex-end',
  },
  VerifyScreenForgotButton: {
    height: 'auto',
  },
  VerifyScreenForgotText: {
    color: colorresource.liteblack,
    fontSize: '$verifyScreenFontSize',
    paddingRight: 5,
    paddingLeft: 5,
  },
  otpheader: {
    flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'center'
  },
  otpheaderlabel: {
    textAlign: 'center',
    fontStyle: 'italic', 
    alignItems: 'center',
    fontSize: 14,
  },
  otpcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  otpresendButton: {
    flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', marginLeft: 10, marginRight: 10
  },
  otpcontent: {
    marginTop: 10,
  },
  otpfootertext: {
    textAlignVertical: 'center', color: colorresource.white
  },
  otpcardtimer: {
    textAlign: 'center', color: colorresource.darkblue
  },
  otpenter: {
    marginTop: 15, textAlign: 'center', color: colorresource.gray, fontStyle: 'italic'
  },
  forgotPwdButton: {
    flexDirection: 'row', marginTop: 5, alignItems: 'flex-end', justifyContent: 'flex-end'
  },
});

export default styles;
