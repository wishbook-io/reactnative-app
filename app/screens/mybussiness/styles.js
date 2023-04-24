import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native'
import { colorresource } from '../../resources/colorresource';
const {width = 0,height = 0} = Dimensions.get('window');

const headerLeftPadding = 23;
const headerRightPadding = 12;

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f6f6f6',
    },
    headerContainer: {
        backgroundColor: colorresource.liteblue,
        paddingTop: Platform.select({ios: 44, android: 20, web: 20}),
        paddingBottom: 16,
       
    },
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: headerLeftPadding,
        paddingRight: headerRightPadding,
       
    },
    leftContainer: {
       
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    centerContainer: {
        flex: 6.7,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 24,
    },
    rightContainer: {
        flex: 0.3,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    profileText: {
        color: 'white',
        fontSize: 14,
        
    },
    usernameText: {
        color: 'white',
        fontSize: 18,
    },
    manufacturerText: {
        color: 'white',
        fontSize: 12,
    },
    companyText: {
        color: 'white',
        fontSize: 16,
    },
    myBusinessHeaderRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginTop: 8,
        paddingLeft: headerLeftPadding,
        paddingRight: headerRightPadding,
    },
    myBusinessText: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 28,
    },
    scanText: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 14,
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    userMenuContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 16,
        // borderWidth: 1,
        // borderColor: 'black'
    },
    columnContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 16,
    },
    RegisterButton:{
        width:width*0.3,
        height:height*0.05,
        borderRadius:8,
        justifyContent:'center',
        borderColor:colorresource.liteblue,
        borderWidth:1
      },
    resellerHeading: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    }
});
export default styles;
