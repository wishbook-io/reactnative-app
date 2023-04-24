import EStyleSheet from 'react-native-extended-stylesheet';
import { colorresource } from '../../resources/colorresource';

const styles = EStyleSheet.create({
  cardLeftText: {
    color: 'black',fontSize:20
  },
  cardRightText: {
    color: colorresource.liteblue,fontSize:20
  },
  seperatorView: {
    height: 2, marginLeft: 10, marginRight: 10
  },
  statusView: {
    flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5
  },
  cardItem: {
    flexDirection: 'column'
  },
  pendingTextPoints: {
    color: 'red',fontSize:20
  },
  cardItemText: {
    color: colorresource.liteblue
  },
  openTextPoints:{
    color: 'green',
    fontSize:20
  }
});

export default styles;
