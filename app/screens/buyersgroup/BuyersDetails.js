import React, { Component } from 'react';
import { Platform, StyleSheet, FlatList, Image } from 'react-native';
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';
import { Dropdown } from '../../components/Dropdown';
import styles from './styles';

import { Label, Input, View, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Row, Item } from 'native-base';
import { colorresource } from '../../resources/colorresource';

export default class BuyersDetails extends Component {

    goBack = () => {
        this.props.navigation.goBack()
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
            <View style={styles.BuyersDetailscontainer}>
                <HeaderBackNativeBase title={strings('buyers_details.buyers_details')} onPress={this.goBack} />
                <Container>
                    <Content>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Image style={styles.BuyersDetailscontainersImage} source={require('../../images/applogo.png')} />
                                    <Body>
                                        <Text>wishbook support(Wishbook)</Text>
                                        <Text note>Ahmedabad, Gujarat</Text>

                                        <View style={styles.BuyersDetailscontainers}>
                                            <Button style={styles.BuyersDetailsButtonStyleCall} bordered success>
                                                <Text>CALL</Text>
                                            </Button>
                                            <Button style={styles.BuyersDetailsButtonStyleChat} bordered success>
                                                <Text style={{ color: colorresource.liteblue }}>CHAT</Text>
                                            </Button>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15 }}>
                                            <View style={styles.BuyersDetailscontainersViewWidth}>
                                                <Text>Select </Text>
                                            </View>
                                            <View style={styles.BuyersDetailscontainersViewWidth}>
                                                <Dropdown
                                                    label='Broker'
                                                    data={data}
                                                />
                                            </View>
                                        </View>
                                    </Body>
                                </Left>

                            </CardItem>
                        </Card>
                        <Card>
                            <View>
                                <Text style={styles.BuyersDetailscontainersBrokerdetailstext}>Broker Details</Text>

                                <View style={styles.BuyersDetailscontainersBrokerdetailsview} >

                                    <Text> Set Brokerage </Text>

                                    <Item floatingLabel>
                                        <Label style={styles.BuyersDetailscontainersBrokerPercentage}></Label>
                                        <Input />
                                    </Item>

                                    <Text> % </Text>
                                </View>
                            </View>
                        </Card>
                        <Card>
                            <View >
                                <Text style={styles.BuyersDetailscontainersBrokerdetailstext}>Set Discount</Text>

                                <View style={styles.BuyersDetailscontainersBrokerdetailsview} >

                                    <Text style={styles.BuyersDetailscontainersmarginTop}> Discount on Credit Payment mode </Text>

                                    <Item floatingLabel>
                                        <Label style={styles.BuyersDetailscontainersBrokerPercentage}></Label>
                                        <Input />
                                    </Item>

                                    <Text> % </Text>
                                </View>
                                <View style={styles.BuyersDetailscontainersBrokerdetailsview} >

                                    <Text> Discount on cash Payment mode </Text>

                                    <Item floatingLabel>
                                        <Label style={styles.BuyersDetailscontainersBrokerPercentage}></Label>
                                        <Input />
                                    </Item>

                                    <Text> % </Text>
                                </View>
                            </View>
                        </Card>
                        <Card>
                            <View style={styles.BuyersDetailscontainersFinal}>
                                <View>
                                    <Text>Add Credit Details </Text>
                                </View>


                            </View>
                        </Card>
                        <Card>
                            <View style={styles.BuyersDetailscontainersFinal}>
                                <View>
                                    <Text>Order Details </Text>
                                </View>

                            </View>
                        </Card>
                        <Card>
                            <View style={styles.BuyersDetailscontainersFinal}>

                            </View>
                        </Card>
                    </Content>
                </Container>
            </View>
        );
    }
}


