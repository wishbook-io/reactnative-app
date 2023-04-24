import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from 'app/resources/colorresource';
import { isIos } from 'app/utils/PlatformHelper';

const {
    width = 0,
    height = 0
} = Dimensions.get('window');

const styles = EStyleSheet.create({
    MyProductsHeader: {
        backgroundColor: 'white',
        elevation: 3,
        height: 50,
    },
    MyProductsHeaderIconParent: {
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    MyProductsHeaderIcon: {
        color: colorresource.liteblue,
        fontSize: 23,
    },
    MyProductsHeaderCrossIcon: {
        color: colorresource.gray,
        fontSize: 19,
        padding: 5,
        paddingRight: 10,
    },
    MyProductsHeaderIconText: {
        color: colorresource.liteblue,
        fontSize: 12,
        marginRight: 5,
        marginLeft: isIos? -20 : 0
    },
    MyProductsContent: {
        backgroundColor: 'white',
    },
    MyProductsNoCatalogsScrollView: {
        backgroundColor: colorresource.grey50,
    },
    MyProductsNoCatalogs: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    MyProductsNoCatalogsText: {
        width: '100%',
        textAlign: 'center',
        color: colorresource.gray,
        fontSize: 17,
    },
    MyProductsFilterMenu: {
        position: 'absolute', 
        backgroundColor: colorresource.grey50, 
        right: 0,
        top: 105,
        elevation: 3,
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
    },
    MyProductsFilterMenuRow: {
        width: 200,
        padding: 10,
    },
    MyProductsFilterMenuText: {
        fontSize: 16,
        width: '100%',
        color: colorresource.grey900,
    }
});

export default styles;
