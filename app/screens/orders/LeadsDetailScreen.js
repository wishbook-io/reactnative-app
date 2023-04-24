import React, { Component } from "react";
import { connect } from 'react-redux';
import { Platform, Dimensions, ActivityIndicator, View } from 'react-native';
import { Container, Header, Title, Content, Icon, Right, Picker, Item, Input, Text } from "native-base";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { HeaderBackNativeBase } from '../../components/Header';
import { LeadsDetailsItemCard } from '../../components/OrderComponent';
import { strings } from '../../utils/i18n';
import styles from './styles';
import FlightData from './FlightData';
import { LayoutUtil } from '../categories/LayoutUtil';
import { colorresource } from '../../resources/colorresource';

let { height, width } = Dimensions.get('window');


class LeadsDetailScreen extends Component {

    _menu = null;

    constructor(props) {
        super(props);
        const { picktype } = props.navigation.state.params;
        this.state = {
            selected1: picktype,
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2
            }).cloneWithRows(FlightData),
            _layoutProvider: LayoutUtil.getLayoutProvider(3, 6),
            count: FlightData.length
        };

        this._renderRow = this._renderRow.bind(this);
    }

    _renderRow(type, data) {
        return <LeadsDetailsItemCard data={data} />;
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    onValueChange(value) {
        this.setState({
            selected1: value
        });
    }

    platfromSpecificPicker = () => Platform.select({
        ios: (<Picker
            style={styles.EnquiryDetailScreen_Dropdown}
            placeholder="Select"
            placeholderStyle={{ color: colorresource.black }}
            mode="dropdown"
            iosHeader={<Text style={{ color: colorresource.black }}>Select</Text>}
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this)}>
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Open" value="Open" />
            <Picker.Item label="Closed" value="Closed" />
        </Picker>),
        android: (<Picker
            mode="dropdown"
            selectedValue={this.state.selected1}
            style={styles.EnquiryDetailScreen_Dropdown}
            onValueChange={(itemValue, itemIndex) => this.setState({ selected1: itemValue })}>
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Open" value="Open" />
            <Picker.Item label="Closed" value="Closed" />
        </Picker>)
    });

    render() {
        return (
            <Container>
                <HeaderBackNativeBase title={strings('orders.leads')} onPress={this.goBack} />
                <View>
                    <Item style={styles.EnquiryDetailScreen_Itemview}>
                        {this.platfromSpecificPicker()}
                        <Right style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Icon name="search" type="MaterialIcons" style={styles.searchIcon} />
                        </Right>
                    </Item>
                    <Header searchBar rounded transparent>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search" />
                            <Icon name="close" />
                        </Item>
                    </Header>
                    {this.state.count > 0
                        ? <RecyclerListView
                            contentContainerStyle={{ margin: 3 }}
                            rowRenderer={this._renderRow}
                            dataProvider={this.state.dataProvider}
                            layoutProvider={this.state._layoutProvider}
                        />
                        : <Text style={{ textAlign: 'center' }}>No Data</Text>}
                    {/* onEndReached={this.handleListEnd} */}
                </View>
            </Container>
        );
    }
}


export default connect()(LeadsDetailScreen);