import EStyleSheet from 'react-native-extended-stylesheet';
import { colorresource } from '../../resources/colorresource';

const styles = EStyleSheet.create({
  containter: {
    alignItems: 'center',
  },
  wapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 19,
    marginRight: 11,
    paddingVertical: 20,
  },
  text: {
    color: colorresource.white,
    fontSize: 14,
    fontWeight: '300',
    paddingVertical: 20,
  },
});

export default styles;
