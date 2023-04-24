import EStyleSheet from 'react-native-extended-stylesheet';
import { colorresource } from '../../resources/colorresource';

const styles = EStyleSheet.create({
  SearchScreenInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18, 
    paddingTop: 0, 
    paddingBottom: 0,
    // borderWidth: 0.5,
    // borderColor: 'yellow',
  },
  SearchScreenCenteringContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  SearchScreenLoadingText: {
    fontSize: 15, 
    color: colorresource.liteblue,
  },
  SearchScreenNoDataText: {
    fontSize: 20,
    color: colorresource.liteblack,
  },
  SearchScreenSuggestionParent: {
    position:'absolute', 
    marginTop: 2, 
    width: '100%', 
  },
  SearchScreenSuggestion: {
    backgroundColor: 'white', 
    flex: 1,
  },
  SearchScreenSuggestionText: {
    fontSize: 14, 
    color: colorresource.liteblack,
  },

});

export default styles;
