import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../../resources/colorresource';

const {
    width = 0,
    height = 0
} = Dimensions.get('window');

const styles = EStyleSheet.create({
    Header: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    FilterTypeButton: {
        padding: 20,
    },
    FilterTypeButtonIdle: {
        backgroundColor: colorresource.Verylightgray,
    },
    FilterTypeButtonSelected: {
        backgroundColor: 'white',
    },
    FilterTypeRow: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    FilterTypeText: {
        fontSize: 16,
    },
    FilterTypeTextIdle: {
        color: colorresource.liteblack,
    },
    FilterTypeTextSelected: {
        color: colorresource.liteblue,
    },
    FilterTypeNumberText: {
        fontSize: 12
    },
    FilterTypeCategoryOptionText: {
        fontSize: 10,
    },
    FilterOption: {
        paddingTop: 5,
        paddingBottom: 5,
        //borderWidth: 1,
        //borderColor: 'purple',
    },
    FilterOptionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        //borderWidth: 1,
        //borderColor: 'red',
    },
    FilterOptionListText: {
        color: colorresource.liteblack,
        fontSize: 14,
        flex: 1,
    },
    FooterLeft: {
        flex: 0.35, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: colorresource.liteblue,
    },
    FooterRight: {
        flex: 0.65, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'white'
    },
    
});

export default styles;