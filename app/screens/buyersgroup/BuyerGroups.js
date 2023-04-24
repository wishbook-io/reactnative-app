import React, { Component } from 'react';
import { View, Platform, StyleSheet, FlatList } from 'react-native';
import ListItem from './ListItemBuyersGroups';
import { HeaderBackNativeBase2 } from '../../components/Header';
import { strings } from '../../utils/i18n';
import { Right, Button, Text, Left } from 'native-base';
import styles from './styles';


export default class BuyerGroups extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [
                { key: '1', name: 'Send All', members: '0 Members' },
                { key: '2', name: 'All Distributor', members: '0 Members' },
                { key: '3', name: 'All wholesaler', members: '0 Members' },
                { key: '4', name: 'All semi- Wholesaler', members: '0 Members' },
                { key: '5', name: 'All Retailer', members: '0 Members' },
                { key: '6', name: 'All Online-Retailer', members: '0 Members' },
                { key: '1', name: 'All Resellers', members: '0 Members' },
                { key: '2', name: 'All Broker', members: '0 Members' },
                { key: '3', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '4', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '5', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '6', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '1', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '2', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '3', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '4', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '5', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '6', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '1', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '2', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '3', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '4', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '5', name: 'Buyer Name', members: 'Buyer Mobile' },
                { key: '6', name: 'Buyer Name', members: 'Buyer Mobile' },
            ]
        };
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.BuyerGroupscontainer}>


                <HeaderBackNativeBase2 title={strings('buyer_group.buyer_group')} onPress={this.goBack} icon="arrow-back" titleTwo="NEW GROUP"  />

                <FlatList
                    data={this.state.list}
                    renderItem={({ item }) => <ListItem data={item} />}
                />

            </View >
        );
    }
}

