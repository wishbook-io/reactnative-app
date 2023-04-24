import EStyleSheet from 'react-native-extended-stylesheet';

import { colorresource } from '../../resources/colorresource';
const styles = EStyleSheet.create({
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    btnwhite: {
        borderTopColor: colorresource.btnblue,
        borderTopWidth: 1,
        backgroundColor: 'white',
        height: 50,
        flex: 1
    },
    btnblue: {
        backgroundColor: colorresource.btnblue,
        height: 50,
        flex: 1
    },
    btntextblue: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    btntextwhite: {
        color: colorresource.btnblue,
        fontWeight: 'bold',
        fontSize: 16
    },
    textheadergreen: {
        paddingLeft: 10,
        paddingTop: 10,
        // textAlign: "auto",
        color: colorresource.green,
        fontSize: 10
    },
    textheadergreensecond: {
        paddingLeft: 10,
        paddingTop: 2,
        // textAlign: "auto",
        color: colorresource.green,
        fontSize: 10
    },
    textheaderBlack: {
        paddingTop: 10,
        // textAlign: "auto",
        color: colorresource.black,
        fontSize: 15
    },
    viewbox: {
        height: 180,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        
        borderBottomColor: colorresource.litegray,
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
    viewinnerleftbox: {
        height: 135,
        flex: 1,
        marginRight: 10,
        marginLeft: 5,
    },
    viewinnecenterbox: {
        height: 100,
        width: 0.5,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: colorresource.litebrownsecond
    },
    editfontsize: {
        fontSize: 13,
    },
    inputtexttop: {
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor:colorresource.white,
    }
});

export default styles;