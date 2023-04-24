import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';

const {
  width = 0,
  height = 0
} = Dimensions.get('window');

const filterBadgeSize = 7;
const footerHeight = 50;

const styles = EStyleSheet.create({
  Header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
    overflow: 'hidden',
  },
  HeaderLeft: {
    padding: 8, 
    alignItems: 'center', 
    elevation: 2, 
    borderTopWidth: 0, 
    marginTop: -2,
    marginBottom: -2,
  },
  HeaderFilterBadge: {
    position: 'absolute',
    right: 5,
    top: 5,
    height: filterBadgeSize*2, 
    width: filterBadgeSize*2, 
    borderRadius: filterBadgeSize, 
    backgroundColor: colorresource.liteblue,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  CatalogItemTop: {
    flex: 1, 
    marginTop: 2, 
    marginBottom: 2, 
    height: 400,
    //borderWidth: 1,
    //borderColor: 'purple',
  },
  CatalogItemLabelTop: {
    flexDirection: 'row',
    marginTop: 20,
  },
  CatalogItemLabel: {
    //backgroundColor: colorresource.orange,
    borderTopRightRadius: 5,
    borderBottomRightRadius:5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,
    paddingBottom: 3,
  },
  CatalogItemLabelEmpty: {
    flex: 1,
    //backgroundColor: 'white',
  },
  CatalogItemLabelText: {
    fontSize: 13,
    color: 'white',
  },
  CatalogItemLabelIcon: {
    fontSize: 18,
    color: 'white',
    marginRight: 5,
  },
  CatalogItemViewTop: {
    flexDirection:'column',
    padding: 5,
    //borderWidth: 1,
    //borderColor: 'grey',
  },
  CatalogItemInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  CatalogItemThumbnail: {
    flex: .8, 
    height: 70, 
    marginLeft: 5
  },
  CatalogItemThumbnailcoloumn: {
    flex: 2, 
    flexDirection: 'column',
    //borderWidth: 1,
    //borderColor:'red',
  },
  CatalogItemRow: {
    flexDirection: 'row'
  },
  CatalogItemCatalogRow: {
    marginLeft: 5, 
    flexDirection: 'row'
  },
  CatalogItemBrandText: {
    color: 'white',
    fontSize: 13,
  },
  CatalogItemCatalogText: {
    fontSize: 13, 
    color: 'white',
    fontWeight: 'bold',
  },
  CatalogItemPriceText: {
    fontSize: 13, 
    marginLeft: 5, 
    color: 'white',
    fontWeight: 'bold',
  },
  CatalogItemPriceView: {
    flexDirection: 'row', 
    marginTop: 3
  },
  Emptyitem: {
    alignItems: "center",
    backgroundColor: "#dcda48",
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    padding: 20
  },
  itemEmpty: {
    backgroundColor: "transparent"
  },
  ProductList: {
    marginBottom: footerHeight,
  },
  ProductListFooter: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  Footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    // flex: 1,
    width: '100%',
    height: footerHeight,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  FooterText: {
    color: colorresource.gray,
    textAlign: 'center',
    fontSize: 14,
  }
});

export default styles;