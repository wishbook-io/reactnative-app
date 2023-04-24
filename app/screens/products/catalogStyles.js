import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';

const {
    width = 0,
    height = 0
} = Dimensions.get('window');



export default  CatalogStyleSheet = (flag)=> {

    
    let heightNew=null;
    let widthNew=null;
    let marginBottomNew=null;
    let marginLeft=0;
    if(flag){
        heightNew=height*0.6;
        widthNew=width;
        marginBottomNew=20;
    }
    else{
        heightNew=height*0.35;
        widthNew=width*0.46;
        marginBottomNew=8;
        marginLeft=5;

    }

    return EStyleSheet.create({        
    CatalogItemTop: {
        // flex: 1, 
        marginTop: 2, 
        marginBottom: marginBottomNew, 
        height: heightNew,
        width:widthNew,
        marginLeft:marginLeft,
        marginRight:marginLeft,
        // backgroundColor: 'white',
        // borderWidth: 1,
        // borderColor: 'purple',
    },
    CatalogItemLabelTop: {
        flexDirection: 'row',
        marginTop: 20,
        // borderColor: 'black',
        // borderWidth: 1,

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
        // borderWidth: 1,
        // borderColor: 'grey',
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
        // borderWidth: 1,
        // borderColor:'red',
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
        // marginLeft: 5, 
        color: 'white',
        fontWeight: 'bold',
    },
    CatalogItemPriceView: {
        flex: 1,
        flexDirection: 'row', 
        marginTop: 3
   
    },
    CatalogItemSellingParent: {
        backgroundColor: colorresource.darkred,
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    CatalogItemSellingText: {
        color: 'white',
        fontSize: 14,
    }
})
    }


