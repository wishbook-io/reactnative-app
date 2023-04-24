import React, { Component } from "react";
import { FlatList, View, Platform } from 'react-native';
import { Container, Text, Picker, Icon, Header, Input, Item, Right } from "native-base";
import FlightData from '../orders/FlightData';
import { Seperator, styles } from '../../components/List';
import CatlogItem from './CatlogItem';
import { colorresource } from '../../resources/colorresource';

export default class MyCatalogTab extends Component {

    constructor(props) {
        super(props);
        const { picktype } = 'Enabled';
        this.state = {
            selected1: picktype,
            dataProvider: FlightData,
            count: FlightData.length
        };
    }

    handlePress = (item) => {
        console.log("Hellog ");
    };

    _renderRow = ({ item }) => (
        <CatlogItem data={item} onPress={() => this.handlePress(item)} />
    )

    onValueChange(value) {
        this.setState({
            selected1: value
        });
    }

    platfromSpecificPicker = () => Platform.select({
        ios: (<Picker
            style={styles.Mycatalogtab}
            placeholder="Select"
            placeholderStyle={{ color: colorresource.black }}
            mode="dropdown"
            iosHeader={<Text style={{ color: colorresource.black }}>Select</Text>}
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this)}>
            <Picker.Item label="Enabled" value="Enabled" />
            <Picker.Item label="Disabled by me" value="Disabled by me" />
            <Picker.Item label="Disabled by supplier" value="Disabled by supplier" />
        </Picker>),
        android: (<Picker
            mode="dropdown"
            selectedValue={this.state.selected1}
            style={styles.Mycatalogtab}
            onValueChange={(itemValue, itemIndex) => this.setState({ selected1: itemValue })}>
            <Picker.Item label="Enabled" value="Enabled" />
            <Picker.Item label="Disabled by me" value="Disabled by me" />
            <Picker.Item label="Disabled by supplier" value="Disabled by supplier" />
        </Picker>)
    });

    render() {
        return (
            <Container>
                <View style={styles.Mycatalogtabpicker}>
                    {this.platfromSpecificPicker()}
                    <Right style={styles.Mycatalogtabright}><Icon name="ios-search" /></Right>
                </View>
                <Header searchBar rounded transparent>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="close" />
                    </Item>
                </Header>
                {this.state.count > 0
                    ?
                    <FlatList
                        data={this.state.dataProvider}
                        renderItem={this._renderRow}
                        ItemSeparatorComponent={Seperator}
                    />
                    : <Text style={{ textAlign: 'center' }}>No catalogs to display</Text>}
                {/* onEndReached={this.handleListEnd} */}
            </Container>
        );
    }
}