import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';

const {
    width = 0,
    height = 0
} = Dimensions.get('window');

const styles = EStyleSheet.create({
    $topMargin: 8,
    WbMoneyHeader: {
      backgroundColor: 'white',
      paddingTop: '$topMargin',
    },
    WbMoneyHeaderTop: {
      alignItems: 'center',
    },
    WbMoneyHeadingText: {
      fontSize: 25,
      color: colorresource.liteblue,
    },
    WbMoneySubHeadingText: {
      fontSize: 12,
      color: colorresource.liteblue,
    },
    WbMoneyHeaderRow: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
    },
    WbMoneyHeaderRowItem: {
      flex: 1/2,
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
    },
    WbMoneyHeaderReceivedAmount: {
      fontSize: 16,
      color: '$green',
    },
    WbMoneyHeaderAmountDescriptionText: {
      fontSize: 16,
      color: colorresource.liteblack,
    },
    WbMoneyHeaderRedeemedAmount: {
      fontSize: 16,
      color: colorresource.gray,
    },
    WbMoneyHeaderHistory: {
      marginLeft: 5,
      marginRight: 5,
      paddingTop: 11,
      paddingBottom: 11,
      borderTopWidth: 1.5,
      borderTopColor: colorresource.liteblue,
      alignItems: 'center',
    },
    WbMoneyHeaderHistoryText: {
      fontSize: 16,
      color: colorresource.liteblue,
    },
    WbMoneyHeaderBack: {
      position: 'absolute',
      top: '$topMargin-3',
    },
    WbMoneyTransaction: {

    },
    WbMoneyTransactionDate: {

    },
    WbMoneyTransactionDateText: {
      fontSize: 12,
      color: colorresource.liteblack,
      marginLeft: 12, 
      paddingTop: 5,
      paddingBottom: 5,
    },
    WbMoneyTransactionItemList: {
      backgroundColor: 'white',
      marginLeft: 8,
      marginRight: 8,
    },
    WbMoneyTransactionItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    WbMoneyAddedAmountText: {
      color: '$green',
      fontSize: 23,
    },
    WbMoneyRemovedAmountText: {
      color: colorresource.gray,
      fontSize: 23,
    },
    WbMoneyTransactionDescriptionText: {
      color: colorresource.gray,
      fontSize: 14,
    },
    WbMoneyTransactionDetailsIcon: {
      color: colorresource.liteblue, 
      fontSize: 14,
    }
});

export default styles;