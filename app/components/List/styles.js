import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';
import { colorresource } from '../../resources/colorresource';

const styles = EStyleSheet.create({
  $underlayColor: colorresource.verylitebrown,
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colorresource.white,
  },
  text: {
    fontSize: 16,
    color: colorresource.verydarkgray,
  },
  seperatorMarginLeft: {
    marginLeft: 20,
    backgroundColor: colorresource.verylitebrown,
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  seperator: {
    backgroundColor: colorresource.verylitebrown,
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  icon: {
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconVisible: {
    backgroundColor: colorresource.liteblue,
  },
  checkIcon: {
    width: 18,
  },
});

export default styles;
