import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';

const screenHeight = Dimensions.get('window').height / 2;
const screenWidth = Dimensions.get('window').width;

const styles = EStyleSheet.create({
  $ScreenHeight: screenHeight,
  $ScreenWidth: screenWidth,
  catlogstabtopview: {
    flexDirection: 'row', alignItems: 'center', padding: 5, margin: 5, backgroundColor: 'white'
  },
  catlogstab: {
    marginLeft: 5
  },
  catlogstabtext: {
    marginLeft: 15, fontSize: 18
  },
  modalContent: {
    height: '$ScreenHeight',
    width: '$ScreenWidth',
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalButton: {
    padding: 5, margin: 5, flexDirection: 'row', justifyContent: 'flex-start',
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  footer: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: colorresource.white,
  },
  autocompletecontainer: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 18,
    marginRight: 18,
  },
  autocomplete: {
    flex: 1,
    margin: 5
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  paragraphview: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: colorresource.liteblue,
  },
  hints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colorresource.liteblue,
    flex: 1,
    textAlign: 'right'
  },
  category: {
    fontSize: 14,
    color: colorresource.liteblue,
  },
  dropdown: {
    marginLeft: 20,
    marginRight: 20,
  },
  ImageContainer: {
    borderRadius: 4,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageDisplay: {
    borderRadius: 4,
    width: 100, height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }, brandtext: {
    fontSize: 12,
    textAlign: 'center'
  }, entercatelog: {
    marginRight: 10
  }, sellfullview: {
    flexDirection: 'row',
    margin: 10
  }, sellfulltext: {
    marginLeft: 12,
    color: colorresource.black,
    fontSize: 15
  }, dntselecttext: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 15
  }, card: {
    marginTop: 1
  }, showhints: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20
  }, gotocamerawidth: {
    width: 150, height: 150
  }, uploadcoverbtn: {
    backgroundColor: colorresource.liteblue,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 6
  },

  AddDesignfooter: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 15,
    color: colorresource.white,
  },
  AddDesignImageContainer: {
    borderRadius: 4,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddDesignImageDisplay: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }, AddDesignscrollviewtop: {
    margin: 10
  }, AddDesignSelectcatelog: {
    flex: 1, flexDirection: 'row'
  }, AddDesignSelectcatelogicon: {
    paddingLeft: 10, paddingVertical: 10, fontSize: 20
  }, AddDesignSelectcatelogtext: {
    paddingLeft: 10, marginTop: 5, fontSize: 22
  }, AddDesignPleaseUploadone: {
    fontSize: 10, color: 'green', marginHorizontal: 45, marginBottom: 20
  }, AdddDesignrupeeview: {
    marginLeft: 10, flexDirection: 'row', marginRight: 10
  }, AdddDesignrupeelabel: {
    fontSize: 14, color: colorresource.liteblue
  }, AdddDesignfooter: {
    backgroundColor: colorresource.liteblue, margin: 5
  },

  ProductDetailsfooter: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: colorresource.white,
  },
  ProductDetailscontainer: {
    marginRight: 10,
  },
  ProductDetailsflextext: {
    color: colorresource.liteblue, fontSize: 18, margin: 10
  },
  ProductDetailsflextop: {
    marginLeft: 10
  },
  ProductDetailsflexlabel: {
    color: colorresource.liteblue, fontSize: 16, margin: 10
  },
  ProductDetailsworkview: {
    marginLeft: 10, marginBottom: 20
  },
  ProductDetailsworklabel: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  ProductDetailscard: {
    color: colorresource.liteblue, marginTop: 10
  },
  ProductDetailsenterotherlabel: {
    margin: 5, marginLeft: 10, marginBottom: 10
  },
  ProductDetailsenterotherview: {
    fontSize: 14, color: colorresource.black
  },
  ProductDetailscardproductview: {
    flexDirection: 'row', margin: 10
  },
  ProductDetailscardproducttext: {
    marginLeft: 15, color: colorresource.black, fontSize: 15, marginBottom: 15
  },

  ProductDetailsfont: {
    fontSize: 11
  },
  ProductDetailsdurationview: {
    flexDirection: 'row', marginTop: 5, padding: 5
  }, ProductDetailsdurationlabel: {
    color: 'black', marginTop: 10
  },
  ProductDetailsdurationitem: {
    flex: 0.3
  },
  ProductDetailsdayslabel: {
    textAlign: 'center'
  },
  ProductDetailsdaystext: {
    color: 'black', marginTop: 10
  },


  ProductDetailsPricefooter: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: colorresource.white,
  },
  ProductDetailsPriceCatelogvisible: {
    color: colorresource.liteblue,
    margin: 10
  },
  ProductDetailsPriceRadiogroup: {
    marginLeft: 30
  },
  ProductDetailsPricePublic: {
    fontSize: 15
  },
  ProductDetailsPriceyourbrand: {
    fontSize: 11, marginTop: 10
  },
  ProductDetailsPriceEnterprice: {
    margin: 5, marginLeft: 10, marginBottom: 10
  },
  ProductDetailsPriceEnterPriceLabel: {
    fontSize: 14, color: colorresource.black
  },


});

export default styles;