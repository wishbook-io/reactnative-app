import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';

const {
    width = 0,
    height = 0
} = Dimensions.get('window');

const styles = EStyleSheet.create({
    NotificationItemParent: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    NotificationItemHeadingText: {
        color: colorresource.liteblue,
        fontWeight: 'bold',
        textAlign:'center', 
        flex:1,
        fontSize: 19,
    },
    NotificationItemImage: {
        width: '100%',
        height: 200,
        borderWidth:1,
        borderColor:'black'
    },
    NotificationItemDescriptionText: {
        color: 'purple',
        fontSize: 18,
    }
});

export default styles;