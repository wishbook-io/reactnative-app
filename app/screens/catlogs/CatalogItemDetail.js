import React, { Component } from "react";
import { FlatList, TouchableOpacity, ScrollView, Image, StyleSheet, LayoutAnimation, ActivityIndicator } from 'react-native';
import { Container, View, Text, ListItem, Left, Icon, Fab, Content, CardItem, Item, Right, Button, Card, Body, Thumbnail, Badge } from "native-base";
import FlightData from '../orders/FlightData';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { Seperator } from '../../components/List';
import { LayoutUtil } from '../categories/LayoutUtil';
import GridImageView from './GridImageView';
import ActionButton from 'react-native-action-button';
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';
import ImageViewer from '../../components/ImageViewer';
import { colorresource } from '../../resources/colorresource';
import styles from './styles';
import { connect } from 'react-redux';
import { getCatalogDetailsAction } from '../../actions/catalog-actions';
import Loader from '../../components/Loader/loader';

class CatalogItemDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shown: false,
            curIndex: 0,
            isActionButtonVisible: true,
            active: true,
            seeMore: false,
            seeMoreText: 'See More',
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2;
            }),
            layoutProvider: LayoutUtil.getLayoutProvider(6, 6),
            count: 0,
            enabled: true,
            imgsArr: []
        };
        _listViewOffset = 0
        _listViewHeight = 0
        _listViewContentHeight = 0
    }

    componentDidMount() {
        const { id } = this.props.navigation.state.params;
        this.props.dispatch(getCatalogDetailsAction(id));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.responseCatalogDetails !== this.props.responseCatalogDetails) {
            this.setState({
                dataProvider: this.state.dataProvider.cloneWithRows(
                    this.props.responseCatalogDetails.products
                ),
                count: this.props.responseCatalogDetails.products.length,
            });
        }
    }

    openViewer(index) {
        console.log(index);
        let arrayVal = this.props.responseCatalogDetails.products.map(function (item) {
            return item.image.thumbnail_small;
        });
        this.setState({
            shown: true,
            curIndex: index,
            imgsArr: arrayVal
        })
    }

    closeViewer() {
        this.setState({
            shown: false,
            curIndex: 0
        })
    }

    _onLayout(e) {
        const { height } = e.nativeEvent.layout
        this._listViewHeight = height
    }

    _onContentSizeChange(contentWidth, contentHeight) {
        this._listViewContentHeight = contentHeight
    }

    _onScroll = (event) => {
        // Simple fade-in / fade-out animation
        const CustomLayoutLinear = {
            duration: 100,
            create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
        }
        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const limit = this._listViewContentHeight - this._listViewHeight
        const offset = event.nativeEvent.contentOffset.y
        const currentOffset = (offset > limit) ? limit : offset

        const direction = (currentOffset > 0 && currentOffset >= this._listViewOffset)
            ? 'down'
            : 'up'
        // If the user is scrolling down (and the action-button is still visible) hide it
        const isActionButtonVisible = direction === 'up'
        if (isActionButtonVisible !== this.state.isActionButtonVisible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.setState({ isActionButtonVisible })
        }
        // Update your scroll position
        this._listViewOffset = currentOffset
    }

    _renderRow = (type, data, index) => {
        console.log(data)
        return <GridImageView onPressItem={this.openViewer.bind(this, index)} imageUrl={data.image.thumbnail_small} />
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    seeMoreToggle = () => {
        if (this.state.seeMore) {
            this.setState({ seeMore: false, seeMoreText: 'See More' })
        } else {
            this.setState({ seeMore: true, seeMoreText: 'See Less' })
        }
    }

    render() {
        const { brand, title, price_range, products } = this.props.responseCatalogDetails;
        return (
            <Container>
                {(this.props.isLoading)?<Loader loading={true} />: null}
                <HeaderBackNativeBase title={"Product Details"} onPress={this.goBack}/>
                <CardItem style={styles.catlogcarditem}>
                    <Image style={styles.catlogcardimage} resizeMode='stretch' source={{ uri: brand.image.thumbnail_small }} />
                    <Text note style={styles.catlogcardtext}>Test1{brand.name}</Text>
                </CardItem>
                <ScrollView onScroll={this._onScroll}
                    scrollEventThrottle={1}
                    onContentSizeChange={this._onContentSizeChange}
                    onLayout={this._onLayout}
                    scrollEnabled={this.state.enabled}
                    style={styles.catlogflexone}>
                    <CardItem style={styles.catlogscrollcarditem}>
                        <Item style={styles.catlogcarditemone}>
                            <Text style={styles.catlogcarditemcardtextone}>Catalog Details</Text>
                            <View style={styles.catlogcarditemcardview}>
                                <Left style={styles.catlogcarditemflexdirectionrow}>
                                    <Text note style={styles.catlogcarditemcardlefttext}>Price:</Text>
                                    <Text style={styles.catlogcarditemcardlefttext}>{'₹' + price_range + '/Pc.'}</Text>
                                </Left>
                                <Text note style={styles.catlogcarditemcardlefttext}>Total Designs:</Text>
                                <Text style={styles.catlogcarditemcardlefttext}>8</Text>
                            </View>
                            <View style={styles.catlogcarditemcardview}>
                                <Left style={styles.catlogcarditemflexdirectionrow}>
                                    <Text style={styles.catlogcarditemviewsecond}>Only full catalog</Text>
                                </Left>
                                <Text note style={styles.catlogcarditemcardlefttext}>Stitching details:</Text>
                                <Text style={styles.catlogcarditemcardStitched}>Semi-Stitched</Text>
                            </View>
                        </Item>
                        <Item style={styles.catlogcarditemflexcolumn}>
                            <View style={styles.catlogcarditemcardview}>
                                <Left style={styles.catlogcarditemflexdirectionrow}>
                                    <Text note style={styles.catlogcarditemMaterialDetails}>Material Details</Text>
                                </Left>
                                <Button small transparent onPress={this.seeMoreToggle} >
                                    <Text style={styles.catlogcarditemseemoretext}>
                                        {this.state.seeMoreText}
                                    </Text>
                                </Button>
                            </View>
                            <View style={styles.catlogcarditemcardview}>
                                <Left style={styles.catlogcarditemflexdirectionrow}>
                                    <Text note style={styles.catlogcarditemcardlefttext}>Work:</Text>
                                    <Text style={styles.catlogcarditemembroidry}>Embroidery</Text>
                                </Left>
                            </View>
                            <View style={styles.catlogcarditemcardview}>
                                <Left style={styles.catlogcarditemflexdirectionrow}>
                                    <Text note style={styles.catlogcarditemcardlefttext}>Fabric:</Text>
                                    <Text style={styles.catlogcarditemembroidry}>Cotton</Text>
                                </Left>
                            </View>
                            {this.state.seeMore ?
                                <View style={styles.catlogcarditemcardview}>
                                    <Left style={styles.catlogcarditemflexdirectionrow}>
                                        <Text note style={styles.catlogcarditemcardlefttext}>Other Details:</Text>
                                        <Text style={styles.catlogcarditemotherdetails}>Embroidery|Embroidery|Embroidery|Embroidery|Embroidedfassfafsdfsd</Text>
                                    </Left>
                                </View>
                                : null
                            }
                        </Item>
                        <View style={styles.catlogcarditemone}>
                            <View style={styles.catlogcarditemcardview}>
                                <Left style={styles.catlogcarditemleftsoldby}>
                                    <Text note style={styles.catlogcarditemcardlefttext}>Sold by:</Text>
                                    <Button transparent><Text style={styles.catlogfontsize}>Textile Export</Text></Button>
                                </Left>
                                <Thumbnail style={styles.catlogaligncenter} resizeMode='contain' source={require('../../images/ic_trusted_seller_small.png')} />
                            </View>
                            <View style={styles.catlogsellerrating}>
                                <Right style={styles.catlogsellerrating}>
                                    <Text note style={styles.catlogcarditemotherdetails}>Seller Rating:</Text>
                                    <Badge style={styles.catlogmargin}>
                                        <Text style={styles.catlogcarditemfont}>4.5</Text>
                                    </Badge>
                                </Right>
                            </View>
                            <Text note style={styles.catlogcarditemlast}>Gujarat, Surat</Text>
                            <View style={styles.catlogcarditemcardview}>
                                <Left style={styles.catlogcarditemflexdirectionrow}>
                                    <Text note style={styles.catlogcarditemcardlefttext}>Delivery time:</Text>
                                    <Text style={styles.catlogcarditemembroidry}>7-9 Days</Text>
                                </Left>
                            </View>
                        </View>
                    </CardItem>
                </ScrollView>
                {this.state.count > 0
                    ?
                    <RecyclerListView
                        style={styles.catlogflexone}
                        contentContainerStyle={{ margin: 1, backgroundColor: 'white' }}
                        dataProvider={this.state.dataProvider}
                        layoutProvider={this.state.layoutProvider}
                        rowRenderer={this._renderRow}
                    />
                    : <Text style={styles.catlognodata}>No Data</Text>}
                {/* onEndReached={this.handleListEnd} */}
                {this.state.isActionButtonVisible ?
                    (<ActionButton fixNativeFeedbackRadius={true}
                        hideShadow={true} buttonColor={colorresource.red} renderIcon={active => active ? (<Icon name='share' style={{ color: 'white' }} />) : (<Icon name='share' style={{ color: 'white' }} />)}  >
                        <ActionButton.Item fixNativeFeedbackRadius={true}
                            hideShadow={true} buttonColor={colorresource.skyblue} title="Via Link" onPress={() => { }}>
                            <Icon name="link" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item fixNativeFeedbackRadius={true}
                            hideShadow={true} buttonColor={colorresource.black} title="Others" onPress={() => console.log("notes tapped!")}>
                            <Icon name="crop" type='MaterialIcons' style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>) : null}
                {this.state.shown ? (<View style={styles.container}>
                    <ImageViewer shown={this.state.shown}
                        imageUrls={this.state.imgsArr}
                        onClose={this.closeViewer.bind(this)}
                        index={this.state.curIndex}>
                    </ImageViewer>
                </View>) : null}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('getCatalogDetailsSuccess', state.catalogR.responseCatalogDetails)
    const isLoading = state.catalogR.isLoading;
    return {
        isLoading,
        responseCatalogDetails: state.catalogR.responseCatalogDetails,
        error: state.catalogR.error,
    };
};

export default connect(mapStateToProps)(CatalogItemDetail);

