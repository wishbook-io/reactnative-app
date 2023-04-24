import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';

const {
  width = 0,
  height = 0
} = Dimensions.get('window');

const styles = EStyleSheet.create({
  SortFilterModalTransparentSpace:{
    height:height*0.6,
    width:width,
    backgroundColor:'rgba(0,0,0,0.5)',
    flex:1
  },
  SortFilterModalWhiteSpace:{
    // height:height*0.4,
    width:width,
    padding:20,
    flexDirection:'column',
    backgroundColor:'white'
  },
  HeaderSortFilterModalWhiteSpace:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:'grey'
  },
  BodySortFilterModalWhiteSpace:{
    flexDirection:'row',
    marginTop:15,
    marginBottom:15
  },
  scroll: {
    backgroundColor: colorresource.white,
    padding: 20,
    flexDirection: 'column'
  },
  input: {
    margin: 15,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },  
});

export default styles;