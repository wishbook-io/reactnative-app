
import React, { Component } from 'react';
import {
    Text, View, Image, FlatList
} from 'react-native';
import { Container, Card } from 'native-base';
import { MyViewListItem } from '../../components/MyViwerComponent';
import styles from './styles'
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';


const data = [
    {
        imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
        title1: "Pheonix Trends",
        title2: "Chennai,Tamilnadu",
        btnVisibility: true
    },
    {
        imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
        title1: "Reliance Trends",
        title2: "Chennai,Tamilnadu",
        btnVisibility: false
    },
    {
        imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
        title1: "Trends",
        title2: "Erode,Tamilnadu",
        btnVisibility: true
    },
    {
        imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
        title1: "Heonixends",
        title2: "Chennai,Tamilnadu",
        btnVisibility: true
    },
    {
        imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
        title1: "Eonixtrends",
        title2: "Chennai,Tamilnadu",
        btnVisibility: false
    },
];

export default class MyViewersDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: this.props.rowData,
            data: data
        };
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        console.log(this.state.rowData);
        return (
            <Container>
                <HeaderBackNativeBase title={strings('myviewer.my_viewers')} onPress={this.goBack} />
                <View style={styles.MyViewersDetailsViewtop}>

                    <Card style={styles.MyViewersDetailsCardview}>
                        <Image style={styles.MyViewersDetailsBrandImage} resizeMode='stretch'
                            source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} />
                        <View style={styles.MyViewersDetailsDetailsTopView} >
                            <View style={styles.MyViewersDetailsDetailsView} >
                                <Text style={styles.MyViewersDetailsTextBrand}>{strings('myviewer.brand')}</Text>
                                <Text numberOfLines={2} style={styles.MyViewersDetailsTextBrandDetails}>
                                    *Colourful Cone Saree * Material:- Silks</Text>
                            </View>
                            <View style={styles.MyViewersDetailsUploadDetailsView} >
                                <Text style={styles.MyViewersDetailsUploadText}>{strings('myviewer.upload')}</Text>
                                <Text numberOfLines={2} style={styles.MyViewersDetailsUploadDetailsText}>
                                    5 days</Text>
                            </View>
                            <View style={styles.MyViewersDetailsUploadDetailsView} >
                                <Text style={styles.MyViewersDetailsUploadText}>{strings('myviewer.total')}</Text>
                                <Text numberOfLines={2} style={styles.MyViewersDetailsUploadDetailsText}>
                                    1 Designs</Text>
                            </View>
                            <View style={styles.MyViewersDetailsUploadDetailsView} >
                                <Text style={styles.MyViewersDetailsUploadText}>{strings('myviewer.price')}</Text>
                                <Text numberOfLines={2} style={styles.MyViewersDetailsUploadDetailsText}>
                                    $200/Pc</Text>
                            </View>
                        </View>
                    </Card>
                    <View style={styles.MyViewersDetailsStateTopview}>
                        <Card style={styles.MyViewersDetailsStateCardview}>
                            <Text style={styles.MyViewersDetailsCatelogText}>{strings('myviewer.catalog_viewers_state_only')}</Text>
                        </Card>
                    </View>
                    <View style={styles.MyViewersDetailsFlatListTopview}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item: rowData }) =>
                                (<MyViewListItem rowData={rowData}>
                                </MyViewListItem>)
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </Container>
        );
    }
};


