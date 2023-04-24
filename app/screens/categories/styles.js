import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
    csscreenActivityIndicator: {
        margin: 10
    },
    csscreenActivityIndicatorheight: {
        height: 60
    }, csscreenActivityIndicatorlistview: {
        flex: 1
    }, Imagerendererviewtop: {
        flex: 1,
        margin: 3,
        backgroundColor: 'white',
    }, ImagerendererviewFastImage: {
        flex: 1, margin: 10
    }, Imagerendererviewtext: {
        fontSize: 24,
        padding: 5,
        textAlign: 'center',
        backgroundColor: 'white'
    },
    Viewsector:{
            height: 60,
            paddingTop: 20,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'space-around',
    }
});

export default styles;