import EStyleSheet from 'react-native-extended-stylesheet';
import { colorresource } from '../../resources/colorresource';
import {Platform } from 'react-native';

const styles = EStyleSheet.create({
    AddBuyerGroupcontainer: {
        flex: 1,
        marginTop: (Platform.OS == 'ios') ? 20 : 0
    }, AddBuyerGrouppadding: {
        padding: 10 
    },
    AddBuyerGroupmarginTop: {
        marginTop: 10 
    },
    AddBuyerGrouplabel: {
        color: colorresource.liteblue, fontSize: 14 
    }, AddBuyerGroupfinal: {
         bottom: 0, position: 'absolute', right: 0, left: 0 
    },

    BuyerGroupscontainer: {
        flex: 1,
        marginTop: (Platform.OS == 'ios') ? 20 : 0
    },

    AddBuyersDetailscontainer: {
        flex: 1,
        marginTop: (Platform.OS == 'ios') ? 20 : 0
    },

    BuyersDetailscontainer: {
        flex: 1,
        marginTop: (Platform.OS == 'ios') ? 20 : 0
    },
    BuyersDetailscontainers: {
        flexDirection: 'row',
    },
    BuyersDetailsButtonStyleCall: {
        width: 70,
        height: 30,
        marginTop: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green'
    },
    BuyersDetailsButtonStyleChat: {
        width: 70,
        height: 30,
        marginTop: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colorresource.liteblue,
        marginLeft: 10
    },
    BuyersDetailscontainersForTwo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    BuyersDetailscontainersTopview: {
        flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15
    },
    BuyersDetailscontainersImage: {
        width: 75, height: 75
    },
  
    BuyersDetailscontainersViewWidth: {
        width: 100
    },
    BuyersDetailscontainersBrokerdetailstext: {
        color: colorresource.liteblue, marginTop: 10, fontSize: 16, paddingLeft: 5

    },
    BuyersDetailscontainersBrokerdetailsview: {
        padding: 10, flexDirection: 'row'
    },
    BuyersDetailscontainersmarginTop: {
        marginTop: 10 
    },
    BuyersDetailscontainersBrokerPercentage: {

        color: colorresource.liteblue, fontSize: 14
    },
    BuyersDetailscontainersFinal: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15
    },

    ListItemBuyerGroupsDetailsitem:{
		height:60,
		marginLeft:10,
		marginRight:10,
		borderBottomWidth:1,
		borderColor:colorresource.litebrown,
		flex:1,
		flexDirection:'row'
	},
	ListItemBuyerGroupsimagem:{
		width:40,
		height:40,
		marginTop:10,
		borderRadius:20
	},
	ListItemBuyerGroupsinfo:{
		flex:1,
		flexDirection:'column',
		justifyContent:'center',
		marginLeft:20
	},
	ListItemBuyerGroupsnome:{
		fontSize:15,
		fontWeight:'bold'
    },
    
     ListItemBuyersGroupsitem: {
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderColor: colorresource.litebrown,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    ListItemBuyersGroupsinfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 10
    },
    ListItemBuyersGroupsname: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10
    }
  
   
});

export default styles;