import React, { Component } from 'react';
import { View, Platform, StyleSheet, FlatList } from 'react-native';
import ListItem from './ListItemBuyerGroupsDetails';
import { HeaderBackNativeBase2 } from '../../components/Header';
import { strings } from '../../utils/i18n';
import { Right, Button, Text } from 'native-base';
import styles from './styles';


export default class AddBuyerGroupDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [
                { key: '1', img: 'https://www.b7web.com.br/avatar1.png', nome: 'Send All', msg: '0 Members' },
                { key: '2', img: 'https://www.b7web.com.br/avatar1.png', nome: 'All Distributor', msg: '0 Members' },
                { key: '3', img: 'https://www.b7web.com.br/avatar1.png', nome: 'All wholesaler', msg: '0 Members' },
                { key: '4', img: 'https://www.b7web.com.br/avatar1.png', nome: 'All semi- Wholesaler', msg: '0 Members' },
                { key: '5', img: 'https://www.b7web.com.br/avatar1.png', nome: 'All Retailer', msg: '0 Members' },
                { key: '6', img: 'https://www.b7web.com.br/avatar1.png', nome: 'All Online-Retailer', msg: '0 Members' },
                { key: '1', img: 'https://www.b7web.com.br/avatar1.png', nome: 'All Resellers', msg: '0 Members' },
                { key: '2', img: 'https://www.b7web.com.br/avatar1.png', nome: 'All Broker', msg: '0 Members' },
                { key: '3', img: 'https://www.b7web.com.br/avatar1.png', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '4', img: 'https://www.b7web.com.br/avatar1.png', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '5', img: 'https://www.b7web.com.br/avatar1.png', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '6', img: 'https://www.b7web.com.br/avatar1.png', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '1', img: 'https://www.b7web.com.br/avatar1.png', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '2', img: 'https://www.b7web.com.br/avatar1.png', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '3', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '4', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '5', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '6', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '1', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '2', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '3', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '4', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '5', nome: 'Buyer Name', msg: 'Buyer Mobile' },
                { key: '6', nome: 'Buyer Name', msg: 'Buyer Mobile' },
            ]
        };
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.AddBuyersDetailscontainer}>

                <HeaderBackNativeBase title={strings('addBuyerGroupDetail.buyers_group')}/>

                <FlatList
                    data={this.state.list}
                    renderItem={({ item }) => <ListItem data={item} />}
                />

            </View>
        );
    }
}

