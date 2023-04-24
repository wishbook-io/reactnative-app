import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';
import { fontresource } from 'app/resources/fontresource';

const {
    width = 0,
    height = 0
} = Dimensions.get('window');

const myCartItemSmallFontSize = 12;
const myCartItemMediumFontSize = 14;
const myCartItemLargeFontSize = 16;

const whitePadding = 10

const imageWidthOriginal = 130
const imageHeightOriginal = 180
const imageHeightToWidthRatio = imageHeightOriginal/imageWidthOriginal

const imageWidth = Math.min(width/3.5, imageWidthOriginal);

const imageHeight = imageWidth * imageHeightToWidthRatio;

const styles = EStyleSheet.create({
    MyCartItem: {
        marginLeft: 10,
        marginRight: 10,
        // padding: 10,
        // backgroundColor: 'white',
        // overflow: 'hidden'
        // borderWidth: 1,
        // borderColor: 'magenta',
    },
    MyCartItemTop: {
        // flex: 1,
        padding: whitePadding,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 10,
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    MyCartItemImage: {
        width: imageWidth,
        height: imageHeight,
        borderRadius: 3,
        // borderColor: 'red',
        // borderWidth: 1,
    },
    MyCartItemRightParent: {
        // flexGrow: 1,
        flex: 1,
        // height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 12, /* space between image and text */
        paddingTop: 3,
        paddingBottom: 3,
        // borderWidth: 1,
        // borderColor: 'gray',
    },
    MyCartItemRightRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: 'black',
    },
    MyCartItemTrashParent: {
        justifyContent: 'space-between',
        // height: '100%',
        alignItems: 'flex-end',
        position: 'absolute',
        right: 0,
        // borderWidth: 1,
        // borderColor: 'purple',
    },
    MyCartItemTrashButton: {
        alignSelf: 'flex-end',
        // borderWidth: 1,
        // borderColor:'yellow',
    },
    MyCartItemTrashIcon: {
        color: colorresource.litegray,
        fontSize: 25,
        width: 'auto',
        // marginLeft: 5,
        // marginRight: 5,
        // marginTop: 5,
        // marginBottom: 5,
        //borderWidth: 1,
        //borderColor: 'red',
    },
    MyCartItemDetailsParentTextView: {
        flex: 1,
        //height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: 25, /* space between image and text */
        paddingRight: 15,
        //borderWidth: 1,
        //borderColor: 'gray',
    },
    MyCartItemPricePerPieceText: {
        fontSize: myCartItemMediumFontSize,
        color: colorresource.liteblack,
        // fontWeight: 'bold',
    },
    MyCartItemSingleDiscountParent: {
        backgroundColor: colorresource.darkgreen,
        paddingHorizontal: 3,
        borderRadius: 3,
    },
    MyCartItemSingleDiscountText: {
        fontSize: myCartItemMediumFontSize,
        color: 'white',
    },
    MyCartItemTopText: {
        fontSize: myCartItemSmallFontSize,
        color: colorresource.gray,
    },
    MyCartItemSubTitleText: {
        fontSize: myCartItemSmallFontSize,
        color: colorresource.liteblack,
    },
    MyCartItemNoOfSetsText: {
        fontSize: myCartItemMediumFontSize,
        color: colorresource.liteblack,
    },
    MyCartItemSmallText: {
        fontSize: myCartItemSmallFontSize,
    },
    MyCartItemNoteText: {
        fontSize: 13,
        color: 'red',
    },
    MyCartItemBigText: {
        fontSize: 16,
    },
    MyCartItemQtyButton: {
        alignItems:'center',
        justifyContent:'center',
        width:32,
        height:32,
        borderRadius:32,
        marginLeft: 5,
    },
    MyCartItemQtyButtonText: {
        fontSize: 20,
        paddingTop: 0,
        paddingBottom: 0,
    },
    MyCartItemQtyText: {
        fontSize: 12,
    },
    MyCartItemLabel: {
        //backgroundColor: colorresource.orange,
        // flexBasis: 'auto',
        borderTopRightRadius: 5,
        borderBottomRightRadius:5,
        paddingLeft: 10,
        paddingRight: 7,
        paddingTop: 2,
        paddingBottom: 2,
    },
    MyCartItemLabelEmpty: {
        flex: 1,
        //backgroundColor: 'white',
    },
    MyCartItemLabelText: {
    //  flex: 1,
        textAlignVertical: 'center',
        fontSize: 10,
        paddingTop:0,
        paddingBottom: 0,
        paddingLeft:0,
        marginLeft: 10,
        color: 'white',
    },
    MyCartItemLabelIcon: {
        fontSize: 18,
        color: 'white',
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0,
        width: undefined,
    //  borderWidth: 1,
    //  borderColor: 'yellow',
    },
    MyCartItemPreLabel: {
        borderTopRightRadius: 5,
        borderBottomRightRadius:5,
        paddingLeft: 3,
        paddingRight: 7,
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: colorresource.liteblue,
    },
    MyCartItemPreLabelText: {
        textAlignVertical: 'center',
        fontSize: 12,
        paddingTop:0,
        paddingBottom: 0,
        paddingLeft:0,
        marginLeft: 4,
        color: 'white',
    },
    MyCartItemFooterDiscountPercent: {
        color: colorresource.darkgreen,
        fontSize: myCartItemMediumFontSize,
    },
    MyCartItemFooterUndiscountedPrice: {
        fontSize: myCartItemSmallFontSize,
        color: colorresource.litegray,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    MyCartItemFooterDiscountedPrice: {
        fontSize: myCartItemSmallFontSize,
        color: colorresource.liteblack,
        marginLeft: 10,
    },
    MyCartItemFooterPriceText: {
        color: colorresource.liteblack,
        fontSize: 16,
        fontFamily: fontresource.medium,
        textAlign: 'right',
    },
    MyCartItemFooterGSTText: {
        color: colorresource.grey46,
        fontSize: 12,
        textAlign: 'right',
    },
    MyCartCashbackItem: {
        paddingRight:5,
        paddingLeft:5,
        paddingTop:5,
        paddingBottom:5,
    },
    MyCartCashbackTitle: {
        //fontWeight: 'bold',
        fontSize: 19,
        color: 'green',
    },
    MyCartCashbackDescription: {
        fontSize: 13,
    },
});

export default styles;
