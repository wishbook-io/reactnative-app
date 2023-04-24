import React, { Component } from "react";
import { FlatList, View, Platform } from 'react-native';
import { Container, Text, Picker, Icon, Header, Input, Item, Right } from "native-base";
import FlightData from '../orders/FlightData';
import { Seperator } from '../../components/List';
import ShareStatusItem from './ShareStatusItem';

export default class ShareByMeTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProvider: FlightData,
            count: FlightData.length
        };
    }

    handlePress = (item) => {
        console.log("Hellog ");
    };

    _renderRow = ({ item }) => (
        <ShareStatusItem onPress={() => this.handlePress(item)} />
    )

    render() {
        return (
            <Container style={{ justifyContent: 'center' }}>
                {this.state.count > 0
                    ?
                    <FlatList
                        data={this.state.dataProvider}
                        renderItem={this._renderRow}
                        ItemSeparatorComponent={Seperator}
                    />
                    : <Text style={{ textAlign: 'center', fontSize: 18 }}>No catalogs to display</Text>}
                {/* onEndReached={this.handleListEnd} */}
            </Container>
        );
    }
}