import EStyleSheet from 'react-native-extended-stylesheet';


const styles = EStyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingTop: 16,
        paddingBottom: 16,
        // borderWidth: 1, 
        // borderColor: 'purple',
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
    },
    itemrootContainer: {
        backgroundColor: 'white',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
    },
    itemcontainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemtitle: {
        marginLeft: 16,
        marginRight: 16,
    }
});

export default styles;