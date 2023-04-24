import EStyleSheet from 'react-native-extended-stylesheet';
import { colorresource } from '../../resources/colorresource';

const styles = EStyleSheet.create({
    imageContainer: {
        flex: 2/5,
        flexDirection: 'column',
        backgroundColor: colorresource.white,
        width: null,
        height: null,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorresource.white,
        paddingTop: 40,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    detailsContainer: {
        flex: 3/5,
        flexDirection: 'column',
        backgroundColor: colorresource.white,
        alignItems: 'center',
        marginLeft: 14,
        marginRight: 14,
        // borderWidth: 1,
    },
    header: {
        color: colorresource.black,
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 25,
        textAlign: 'center',
    },
    info: {
        color: colorresource.black,
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 25,
        textAlign: 'center',
    },
    buttonParent: {
        marginTop: 10, 
        flex: 1,
        justifyContent: 'center',
        marginBottom: 25,
        // borderWidth: 1, 
    },
    // Button container
    button: {
        borderRadius: 5,         // Rounded border
        paddingHorizontal: 30,    // Horizontal padding
        paddingVertical: 10,      // Vertical padding

    },
    // Button text
    text: {
        color: colorresource.white,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
    },
});

export default styles;