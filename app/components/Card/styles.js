import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colorresource } from 'app/resources/colorresource';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = EStyleSheet.create({
  Card: {
    margin: 5,
    overflow: 'hidden',
  },
  CardContent: {
    // borderWidth: 0.5,
    // borderColor: 'purple',
  }
});

export default styles;
