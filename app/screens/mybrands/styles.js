import EStyleSheet from 'react-native-extended-stylesheet';

import { colorresource } from '../../resources/colorresource';


const styles = EStyleSheet.create({

    Addbrandsflexone: {
        flex: 1
    },
    Addbrandaddbrandstopview: {
        flex: 1,
        flexDirection: 'column',
        margin: 15
    },
    Addbrandfirstview: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    Addbrandimageviewcamera: {
        flex: 1, 
        alignItems: 'center',
        margin: 10, 
    },
    Addbrandimagesource: {
        width: 100, 
        height: 100, 
        padding: 5, 
        alignItems: 'center'
    },
    Addbrandsecondview: {
        flex: 1, 
        alignItems: 'center',
    },
    Addbrandbtnblue: {
        backgroundColor: colorresource.liteblue,
    },
    Addbrandbtntextblue: {
        color: colorresource.white,
        fontWeight: 'bold',
        fontSize: 16
    },
    AddbrandfloatingAddbrandsecondview: {
        flex: 2, 
        flexDirection: 'column', 
        marginTop: 20,
    },
    Addbrandfloatingborderlabel: {
        borderBottomColor: colorresource.liteblue,
    },
    Addbrandfloatinglabel: {
        borderBottomColor: colorresource.liteblue,
        color: colorresource.liteblue
    },
    Addbrandsfontonefour: {
        fontSize: 14
    },
    Addbrandsmt: {
        marginTop: 30
    },
    MyBrandsParent: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        // backgroundColor: '#e7e7e7',
    }, 
    MyBrandsShowcaseParent: {
        marginBottom: 25,
    },
    MyBrandsShowcaseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#aaaaaa',
        marginBottom: 20,
    },
    MyBrandsShowcaseHeaderText: {
        fontSize: 25,
        color: '#6a6a6a',
    },
    MyBrandsShowcaseHeaderAdd: {
        width: 27,
        height: 27,
    },
    MyBrandsShowcaseScrollerParent: {
        //flex: 1,
    },

    $showcaseImageHeight: 120,
    $showcaseImageWidth: 120,
    $showcaseCardHorizontalMargin: 10,

    MyBrandsShowcaseCardParent: {
        flexDirection: 'column',
        marginLeft: '$showcaseCardHorizontalMargin',
        marginRight: '$showcaseCardHorizontalMargin',
        justifyContent: 'center',
        alignItems: 'center',
        width: '$showcaseImageWidth',
    },
    MyBrandsShowcaseImage: {
        width: '$showcaseImageWidth',
        height: '$showcaseImageHeight',
    },
    MyBrandsShowcaseCardTextParent: {
        height: 50, 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    MyBrandsShowcaseCardText: {
        color: '#757575',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        padding: 4,
    },
    BrandsISellModalParent: {
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        alignItems:'center', 
        justifyContent:'center',
        padding: 15,
    },

    $whitePadding: 15,

    BrandsISellViewParent: {
        backgroundColor: 'white', 
        width: '100%', 
        borderRadius: 3,
        paddingTop: '$whitePadding',
        paddingLeft: '$whitePadding',
        paddingRight: '$whitePadding',
        paddingBottom: 10,
    },
    BrandsISellHeaderText: {
        fontSize: 25
    },
    BrandsISellItem: {
        borderBottomWidth: 0,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: 0,
    },
    BrandsISellItemText: {
        marginLeft: 10,
        color: '#757575',
        fontSize: 18,
    },
    BrandsISellButtonRow: {
        flexDirection:'row', 
        justifyContent:'flex-end',
    },
    BrandsISellButtonText: {
        color:colorresource.liteblue,
        fontSize: 14,
    }
});

export default styles;
