import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';
import { fontresource } from 'app/resources/fontresource';

const {
    width = 0,
    height = 0
} = Dimensions.get('window');

const styles = EStyleSheet.create({
    ParentContainer: {
        //borderWidth: 1,
        //borderColor: 'magenta',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        marginBottom: 10,
    },
    SectionHeading: {
        color: colorresource.liteblue,
        fontSize: 18,
    },
    ShippingAddressButtonParent: {
        //borderWidth: 1, 
        //borderColor: 'black', 
        // paddingLeft: 5, 
        // paddingRight: 5,
    },
    ShippingAddressButton: {
        //borderWidth: 1, 
        //borderColor: 'yellow',
        // paddingLeft:3, 
        // paddingRight: 3,
    },
    ShippingAddressRadio: {
        alignSelf:'center', 
        //borderWidth: 1, 
        //borderColor: 'red', 
        marginRight: 10
    },
    ShippingAddressViewerButtonView: {
        width:'100%', 
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    ShippingTransportCharges: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingTop: 10, 
        paddingBottom:10,
    },
    InvoiceSummaryParent: {
        backgroundColor: 'white',
        paddingTop: 0,
        paddingBottom: 10,
        //paddingRight: 5,
        //paddingLeft: 5,
    },
    InvoiceSummaryEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 4,
        // paddingBottom: 3,
    },
    InvoiceSummaryEntryDetailsText: {
        fontSize: 14,
    },
    InvoiceSummaryEntryTotalText: {
        fontSize: 16,
        // fontWeight: 'bold',
        fontFamily: fontresource.medium,
        color: colorresource.liteblack,
    },
    InvoiceDetailsSeparator: {
        height: 0.5,
        backgroundColor: colorresource.darkgray,
        marginTop: 5,
        marginBottom: 5,
    },
    InvoiceBreakupParent: {
        //borderWidth: 1,
        //borderColor: 'magenta',
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,

        marginBottom: 10,
    },
    InvoiceBreakupItemParent: {
        backgroundColor: 'white',
        marginTop: 10,
        //paddingRight: 5,
        //paddingLeft: 5,
    },
    InvoiceBreakupItemEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    InvoiceBreakupItemEntryText: {
        fontSize: 14,
    },
    InvoiceBreakupItemRightEntry: {
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    InvoiceBreakupItemRightEntryEmpty: {
        // flex:4, 
        // borderWidth: 1, 
        // borderColor: 'yellow',
    },
    InvoiceBreakupItemRightEntryGST: {
        // flex:3,  
        borderWidth: 1, 
        borderColor: 'red',
    },
    InvoiceBreakupPercentItemEntry: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    InvoiceBreakupPercentItemLeft: {
        flex: 7/10,
        // marginRight: 30,
        // borderWidth: 1, 
        // borderColor: 'blue',
    },
    InvoiceBreakupPercentItemRight: {
        flex: 3/10,  
        // borderWidth: 1, 
        // borderColor: 'red',
    },
    InvoiceBreakupItemRightEntryTotal: {
        flex:3,
    },
    PaymentModeHelpText: {
        color: 'green',
        fontSize: 10,
    },
    PaymentModeCategoryText: {
        color: 'grey',
        marginTop: 5,
        fontSize: 14,
    },
    PaymentModeMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 7,
    },
    PaymentModeMethodText: {
        flex: 1,
        flexWrap:'wrap',
        marginLeft: 10,
        fontSize: 14,
    },
    PaymentModeMethodHelpText: {
        color: 'grey',
        fontSize: 14,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 20,
    },
    PaymentModeCreditText: {
        fontSize: 14,
        color: colorresource.liteblack,
    },
    LinkText: {
        color: colorresource.liteblue,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    CODModalParent: {
        backgroundColor: 'white',
        height: 'auto',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 3,
    },
    CODModalButton: {
        paddingTop: 20,
    },
    CODModalButtonText: {
        fontSize: 14,
        textAlign: 'right',
        color: colorresource.liteblue,
    },
    ShippingDetailsShippingParent: {
        marginLeft: 5, 
        marginTop: 10,
    },
    ShippingDetailsShippingMethod: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    ShippingDetailsShippingInfo: {
        marginLeft: 30,
    },
    ShippingDetailsShippingRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginTop: 10,
    },
    ShippingDetailsInfoName: {
        fontSize: 14,
        color: colorresource.gray,
    },
    ShippingDetailsInfoValue: {
        fontSize: 14,
        color: colorresource.liteblack,
    }
});

export default styles;