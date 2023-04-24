import EStyleSheet from 'react-native-extended-stylesheet';
import color from 'color';

import { colorresource } from '../../resources/colorresource';

const bgColor = color(colorresource.materialbg).darken(0.06).rgb().string()
const radius = 5;
const trisize = 5;

const styles = EStyleSheet.create({
  ProfileScreen_Topview: {
    color: colorresource.liteblue, fontSize: 14
  },
  ProfileScreen_DropDown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileScreen_Topview: {
    marginTop: 15, color: colorresource.liteblue, marginLeft: 15
  },
  ProfileScreen_cmmntext: {
    marginLeft: 20, marginBottom: 10
  },
  ProfileScreen_mlmr: {
    marginLeft: 10
  },
  ProfileScreen_scroll: {
    backgroundColor: colorresource.white,
    padding: 20,
    flexDirection: 'column'
  },
  ProfileScreen_editTextStyle: {
    marginTop: 10,
    padding: 10
  },
  ProfileScreenMobileParent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 30,
  },
  ProfileScreenCountryParent: {
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
  },
  ProfileScreenCountryLabel: {
    margin: 5,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 15,
    color: 'black',
  },
  ProfileScreenMobileInputLabel: {
    marginLeft: 6, 
    fontSize: 13, 
    color: colorresource.liteblue,
  },
  ProfileScreenMobileItem: {
    flex: 1,
    paddingTop:0,
    paddingBottom:0,
    borderColor: 'transparent',
  },
  $inputHeight: 30,
  ProfileScreenMobileInput: {
    fontSize: 13, 
    height: '$inputHeight', 
    paddingTop: 0, 
    paddingBottom: 0,
    marginBottom: -5,
  },
  ProfileScreenMobileInputUnderline: {
    marginLeft: 6, 
    borderColor: colorresource.liteblue, 
    borderWidth: 1, 
  },
  ProfileScreenMobileInputValidationIcon: {
    color: 'red',
    fontSize: 20,
  },
  ProfileScreenPickerParent: {
    flex:1, 
    marginVertical: 10,
    backgroundColor: bgColor,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    borderBottomWidth: 1,
    borderBottomColor: '#ababab',
    overflow: 'hidden',
    paddingLeft: 12,
  },
  ProfileScreenPicker: {
    backgroundColor: bgColor,
  },
  ProfileScreenPickerArrowDown: {
    position: 'absolute',
    borderTopWidth: trisize,
    borderRightWidth: trisize,
    borderBottomWidth: 0,
    borderLeftWidth: trisize,
    borderTopColor: colorresource.thirdblack,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    right: 15,
    bottom: 20,
  }
});

export default styles;
