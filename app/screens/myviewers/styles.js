import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    MyViewersTopview: {
        flexDirection: 'row',
        flex: 1,
        margin: 10,
    },
    //MyViewersDetails
    MyViewersDetailsViewtop: {
        flexDirection: 'column',
        margin: 10,
        flex: 1,
    },
    MyViewersDetailsCardview: {
        flexDirection: 'row', flex: 0.9
    },
    MyViewersDetailsBrandImage: {
        flex: 0.5, margin: 5
    },
    MyViewersDetailsDetailsTopView: {
        flex: 1, flexDirection: 'column', margin: 5
    },
    MyViewersDetailsDetailsView: {
        flex: 1, flexDirection: 'row', alignItems: 'flex-start'
    },
    MyViewersDetailsTextBrand: {
        fontSize: 15, color: 'black', textAlign: 'left',
    },
    MyViewersDetailsTextBrandDetails: {
        fontSize: 15, color: 'black', textAlign: 'left', flex: 1.2
    },
    MyViewersDetailsUploadDetailsView: {
        flex: 1, flexDirection: 'row', alignItems: 'center'
    },
    MyViewersDetailsUploadText: {
        fontSize: 15, color: 'gray', textAlign: 'left'
    },
    MyViewersDetailsUploadDetailsText: {
        fontSize: 15, color: 'black', textAlign: 'left', flex: 1
    },
    MyViewersDetailsStateTopview: {
        flex: 0.4,
        justifyContent: 'center'
    },
    MyViewersDetailsStateCardview: {
        flex: 1,
        justifyContent: 'center'
    },
    MyViewersDetailsCatelogText: {
        fontSize: 15, color: 'black', textAlign: 'center'
    },
    MyViewersDetailsFlatListTopview: {
        flex: 1.9
    },
});

export default styles;