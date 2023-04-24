import EStyleSheet from 'react-native-extended-stylesheet';
import { colorresource } from '../../resources/colorresource';
import { fontresource } from 'app/resources/fontresource';
const styles = EStyleSheet.create({
  smallText: {
    color: colorresource.white,
    fontSize: 12,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colorresource.white,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sideBarNotBoldContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    // justifyContent:'center',
    margin: 5,
    padding: 5,
  },
  mediumText: {
    fontSize: 12.5,
    color: colorresource.black,
    fontFamily: fontresource.medium,
    marginLeft: 30,
  },
  largeText: {
    fontSize: 17,
    color: colorresource.liteblue,
    marginLeft: 15,
    fontFamily: fontresource.medium,
  },
});

export default styles;
