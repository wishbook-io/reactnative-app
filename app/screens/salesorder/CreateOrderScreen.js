import React, { Component } from 'react';
import { Platform, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';
import { Dropdown } from '../../components/Dropdown';
import ListItem from './CatalogDetailsListScreen';

import { Label, Input, View, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Row, Item } from 'native-base';

export default class CreateOrderScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [
                { key: '1', img: 'https://www.b7web.com.br/avatar1.png', nome: 'Send All', msg: '0 Members' },
                { key: '1', img: 'https://www.b7web.com.br/avatar1.png', nome: 'Send All', msg: '0 Members' },
            ]
        };
    }

    proceedToCatalog = () => {
        this.props.navigation.navigate('AddCatalog');
    }
    proceedToOrder = () => {
        this.props.navigation.navigate('OrderReceiptScreen')
    }

    render() {
        let data = [{
            value: 'Broker',
        }, {
            value: 'Distributor',
        }, {
            value: 'International',
        }, {
            value: 'Online-Retailer',
        }, {
            value: 'Other',
        }, {
            value: 'Resellers',
        }, {
            value: 'Retailer',
        }, {
            value: 'Semi-WholeSaler',
        }, {
            value: 'Wholesaler',
        }];
        return (
            <View style={styles.container}>
                <HeaderBackNativeBase title={strings('create_order_screen.new_sales_order')} onPress={this.goBack} />

                <Container>
                    <Content>
                        <ScrollView style={styles.scroll}>
                            {/* Top Content */}
                            <Card>
                                <View style={{ margin: 10 }}>
                                    <Text style={styles.styleHeading}>{strings('create_order_screen.order_details')}</Text>

                                    <Item floatingLabel>
                                        <Label style={{ color: '#0D80C1', fontSize: 14 }}>Enter Buyer Name</Label>
                                        <Input />
                                    </Item>

                                    <View style={styles.brokerageHeaderStyle}>
                                        <Left style={styles.setBrokeregeFlex}>
                                            <Text style={styles.brokerageTextStyle}>Select Broker </Text></Left>
                                    </View>

                                    <View>
                                        <Dropdown style={{ padding: 5 }}
                                            label='Select Broker'
                                            data={data}
                                        />
                                    </View>


                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                        <Text> Brokerage </Text>
                                        <Text style={{ color: '#05721c' }}> 20% </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                        <Text> Supplier Name </Text>
                                        <Text> This is Demo text </Text>
                                    </View>
                                    <View >
                                        <Item floatingLabel>
                                            <Label style={{ fontSize: 14 }}>Enter the order number</Label>
                                            <Input />
                                        </Item>
                                    </View>
                                    <Item floatingLabel>
                                        <Label style={{ fontSize: 14 }}>Enter Packing preference, kurti size etc.., </Label>
                                        <Input />
                                    </Item>
                                </View>
                            </Card>

                            <Card >
                                <View style={{ padding: 10 }}>
                                    <Text style={{ fontSize: 18, color: '#05721c', marginTop: 5 }}>Discount & Cashbacks </Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <Text> 1 Offer available </Text>
                                        <Text style={{ color: '#05721c' }}> view ^ </Text>
                                    </View>
                                </View>
                            </Card>

                            <Card>
                                <View style={{ padding: 10 }}>
                                    <Text style={{ fontSize: 18, color: '#0D80C1', marginTop: 5 }}>Catalog Details</Text>
                                </View>

                                <View style={{ padding: 10 }}>
                                    <FlatList
                                        data={this.state.list}
                                        renderItem={({ item }) => <ListItem data={item} />}
                                        numColumns={2}
                                    />

                                    <TouchableOpacity onPress={this.proceedToCatalog}
                                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                                        <Text style={{ marginTop: 10, marginBottom: 40, padding: 5, borderRadius: 5, backgroundColor: '#0D80C1', color: 'white', textAlign: "center", width: 180, }}
                                        >  + Add More Catalog </Text>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        </ScrollView>


                    </Content>

                    <View style={{
                        padding: 10, position: 'absolute', width: '100%', position: 'absolute', bottom: 0, backgroundColor: '#fff'
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 14 }}> Total Value : ₹ 1497 </Text>
                                <Text style={{ fontSize: 14 }}> ( Excluding GST & Discounts ) </Text>
                            </View>

                            <Text onPress={this.proceedToOrder} style={{
                                paddingLeft: 20, paddingRight: 20, fontSize: 16, textAlignVertical: 'center',
                                textAlign: 'center', borderRadius: 5, alignContent: 'center', justifyContent: 'center', backgroundColor: '#EF7A10', color: 'white'
                            }}> Order </Text>

                        </View>
                    </View>
                </Container>


            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    mainStyle: { flexDirection: 'row', margin: 10 },
    containers: { flexDirection: 'row', },
    styleHeading: { color: '#0D80C1', marginTop: 10, fontSize: 18, paddingLeft: 5 },
    brokerageHeaderStyle: { flexDirection: 'row', marginTop: 5, padding: 5 },
    brokerageTextStyle: { color: '#0D80C1', fontSize: 14 },

});