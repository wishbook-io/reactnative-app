import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../../resources/colorresource';

const {
  width = 0,
  height = 0
} = Dimensions.get('window');

const styles = EStyleSheet.create({
  AddProductsSection: {
    backgroundColor: 'white',
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  AddProductsSubSection: {
    paddingTop: 10,
    paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderWidth: 0.5,
    // borderColor: 'red',
  },
  AddProductsHeading: {
    color: colorresource.liteblack,
    fontSize: 16,
  },
  AddProductsSubHeading: {
    color: colorresource.liteblack,
    fontSize: 14,
  },
  AddProductsDefaultText: {
    fontSize: 14,
  },
  AddProductsPickerParent: {
    
  },
  AddProductsPicker: {
  },
  AddProductsHint: {
    paddingTop: 3,
    paddingHorizontal: 12, // material spec
  },
  AddProductsHintText: {
    fontSize: 12,
    color: colorresource.materialinputhint,
  },
  AddProductsHintLinkText: {
    fontSize: 12,
    color: colorresource.liteblue,
    textDecorationLine: 'underline',
  },
  AddProductsProductNameInputParent: {
    flex: 1,
    flexDirection: 'row',
  },
  AddProductsProductNameUnderline: {
    height: 1,
    backgroundColor: colorresource.litegray,
  },
  AddProductsProductNameUnderlineActive: {
    height: 2,
    backgroundColor: colorresource.liteblue,
  },
  LiveRow: {
    flexDirection: 'row', 
    alignItems:'center',
  },
  LiveTextInputParent: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colorresource.materialinputbg,
    overflow: 'hidden',
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 4,
    paddingRight: 4,
    flexDirection: 'row',
  },
  LiveTextInput: {
    textAlign: 'center', 
    // width: 40, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    color: colorresource.grey900,
  }
});

export default styles;