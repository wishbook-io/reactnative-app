import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';

const {
  width = 0,
  height = 0
} = Dimensions.get('window');

const styles = EStyleSheet.create({
  
  FilterHeaderIcon: {
    fontSize: 20,
    color: colorresource.liteblue,
    textAlign:'center',
  },
  FilterHeaderIconText: {
    color: colorresource.liteblue,
    textAlign:'center',
    textAlignVertical: "center",
    fontSize: 13,
  },
});

export default styles;