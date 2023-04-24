import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width / 2;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import { colorresource } from '../../resources/colorresource';

const styles = EStyleSheet.create({
  $ScreenWidth: screenWidth,
  $ScreenHeight: screenHeight,
  $largeContainerSize: imageWidth,
  $largeImageSize: imageWidth / 2,
  $smallContainerSize: imageWidth / 2,
  $smallImageSize: imageWidth / 4,
  $OTPContainer: screenHeight/3,
  container: {
    width: '$ScreenWidth',
  },
  containerImageView: {
    alignItems: 'center',
  },
  imageView: {
    alignItems: 'center',
    marginTop: 20,
    width: '$largeContainerSize-10',
    height: '$largeContainerSize-10',
    resizeMode: 'contain'
  },
  contentView: {
    marginTop: 26
  },
  shareappText:{
    textAlign: 'center', color: colorresource.darkblue, fontSize: 18
  },
  body:{
    justifyContent: 'center', marginTop:10
  },
  whatsappButton:{
    width: 150, marginTop: 16, justifyContent: 'flex-start', borderColor: colorresource.darkgreen
  },
  whatsappIcon:{
    color: colorresource.darkgreen
  },
  whatsappText:{
    flex: 1, textAlign: 'center', color: colorresource.darkgreen
  },
  smsButton:{
    width: 150, marginTop: 16, justifyContent: 'flex-start', borderColor: colorresource.liteblue
  },
  smsIcon:{
    color: colorresource.liteblue
  },
  smsText:{
    flex: 1, textAlign: 'center', color: colorresource.liteblue
  },
  otherButton:{
    width: 150, marginTop: 16, justifyContent: 'flex-start', borderColor: colorresource.liteblue
  },
  otherIcon:{
    color: colorresource.liteblue
  },
  otherText:{
    flex: 1, textAlign: 'center', color: colorresource.liteblue
  },
});

export default styles;
