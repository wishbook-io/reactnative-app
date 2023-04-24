import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';

const {
  width = 0,
  height = 0
} = Dimensions.get('window');

const styles = EStyleSheet.create({
  RegisterButton:{
    width:width*0.3,
    height:height*0.05,
    borderRadius:8,
    justifyContent:'center',
    borderColor:colorresource.liteblue,
    borderWidth:1
  },
  MyWishlistNoCatalogsScrollView: {
    backgroundColor: colorresource.grey50,
  },
  MyWishlistNoCatalogs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MyWishlistNoCatalogsText: {
    width: '100%',
    textAlign: 'center',
    color: colorresource.gray,
    fontSize: 17,
  },
});

export default styles;