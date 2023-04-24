import EStyleSheet from 'react-native-extended-stylesheet';

import { colorresource } from '../../resources/colorresource';

const styles = EStyleSheet.create({

  MyViewItemTopview: {
    flexDirection: 'row', height: 120, margin: 5
  },
  MyViewItemCatalogimg: {
    width: 100,
    height: 120,
  },
  MyViewItemLeftview: {
    flexDirection: 'column', margin: 10, flex: 1
  },
  MyViewItemLeftinnerview: {
    flex: 1, alignItems: 'flex-start'
  },
  MyViewItemCatelogname: {
    color: colorresource.Verydarkgrayishblue,
    justifyContent: 'center',
    color: 'black',
    fontSize: 14
  },
  MyViewItemCatelogviewed: {
    color: colorresource.Verydarkgrayishblue,
    justifyContent: 'center',
    fontSize: 12
  },
  MyViewItemFinalview: {
    flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end',
  },
  MyViewItemViewButton: {
    color: colorresource.liteblue,
    fontSize: 16,
    textAlign: 'right'
  },

  // MyViewListItem

  MyViewListItemTopview: {
    flexDirection: 'row', height: 70
  },
  MyViewListItemCirclelogoview: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'center', margin: 5
  },
  MyViewListItemCircletextview: {
    fontSize: 25, color: 'white', textAlign: 'center'
  },
  MyViewListItemBuyercompanyTopview: {
    flex: 1, flexDirection: 'column'
  },
  MyViewListItemBuyercompanytextview: {
    fontSize: 16, color: 'black', textAlign: 'left', marginTop: 10
  },
  MyViewListItemlocationtext: {
    fontSize: 16, color: 'gray', textAlign: 'left', marginTop: 10
  },
  MyViewListItembooleanactiveview: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center'
  },
  MyViewListItemActivebutton: {
    flex: 1, margin: 5, backgroundColor: colorresource.liteblue
  },
  MyViewListItemActivebuttonText: {
    color: 'white', fontSize: 13, fontWeight: 'bold'
  },
  MyViewListItemInActiveButton: {
    flex: 1, margin: 5, borderColor: 'gray', justifyContent: 'center'
  },
  MyViewListItemInActiveText: {
    color: 'gray', fontSize: 13, textAlign: 'center', fontWeight: 'bold'
  },
});

export default styles;