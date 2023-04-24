import React, { Component } from 'react';
import { View, Platform, StyleSheet, FlatList } from 'react-native';
import ListItem from './ListItemRejectBuyers';
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';

export default class RejectBuyers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [
                { key: '1', name: 'Lavish Designer', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '2', name: 'WishBook Support', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '3', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '4', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '5', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '6', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '1', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '2', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '3', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '4', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '5', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '6', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '1', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '2', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '3', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '4', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '5', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '6', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '1', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '2', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '3', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '4', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '5', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
                { key: '6', name: 'Buyer Name', msg: 'Rejected', mobileNumber: '9876543210' },
            ]
        };
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBackNativeBase title={strings('rejectbuyers.reject_buyers')} onPress={this.goBack} />

                <FlatList
                    data={this.state.list}
                    renderItem={({ item }) => <ListItem data={item} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS == 'ios') ? 20 : 0
    }
});