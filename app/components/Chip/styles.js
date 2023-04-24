import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from 'app/resources/colorresource';

const {
  width = 0,
  height = 0
} = Dimensions.get('window');

const styles = EStyleSheet.create({
  ChipsParent: {
    height: 40,           // necessary to add padding at top and bottom, WITHOUT messing up vertical alignment
    flexDirection: 'row', // necessary to make aligning work in center, otherwise AddChips and SelectedChips won't be centered
    alignItems: 'center',
    paddingRight: 5,      // change this to increase spacing between chips on same row
    // borderWidth: 1,
  },
});

export default styles;