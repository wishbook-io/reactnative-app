import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Item, Label, Input, ListItem, CheckBox } from 'native-base';
import { HeaderBackNativeBase } from '../../components/Header';
import { Dropdown } from '../../components/Dropdown';
import { strings } from '../../utils/i18n';
import { colorresource } from '../../resources/colorresource';

export default class RegisterNewUserScreen extends Component {

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        let data = [{
            value: 'Colan Infotech PVT',
        }, {
            value: 'Colan Infotech LTd',
        }, {
            value: 'Colan Info',
        }];

        let stateData = [{
            value: 'Tamil Nadu',
        }, {
            value: 'Andhra Pradesh',
        }, {
            value: 'Karnataka',
        }];

        let cityData = [{
            value: 'Chennai',
        }, {
            value: 'Nellur',
        }, {
            value: 'Karnataka',
        }];
        let inviteUsData = [{
            value: 'Buyer',
        }, {
            value: 'Supplier',
        }, {
            value: 'None',
        }];
        let groupTypeData = [{
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
            value: 'Semi-WHolesaler',
        }, {
            value: 'wholesaler'
        }
        ];
        return (
            <View style={styles.container}>
                <HeaderBackNativeBase title="New Registration" onPress={this.goBack} />
                <Container>

                    <Content>
                        <Card>
                            <View>
                                <Text style={{ color: colorresource.liteblue, marginTop: 10, fontSize: 16, paddingLeft: 5 }}>Personal Details</Text>

                                <View style={{ padding: 10 }} >
                                    <Item floatingLabel>
                                        <Label style={{ color: colorresource.liteblue, fontSize: 14 }}>Enter Name</Label>
                                        <Input />
                                    </Item>


                                    <Item floatingLabel>
                                        <Label style={{ color: colorresource.liteblue, fontSize: 14 }}>Enter Mobile Number</Label>
                                        <Input />
                                    </Item>

                                    <Item floatingLabel>
                                        <Label style={{ color: colorresource.liteblue, fontSize: 14 }}>Enter Mail ID</Label>
                                        <Input />
                                    </Item>
                                </View>
                            </View>
                        </Card>
                        <Card>
                            <View>
                                <Text style={{ color: colorresource.liteblue, marginTop: 10, fontSize: 16, paddingLeft: 5 }}> {strings('registration.companydetails')} </Text>


                                <View style={{ padding: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15 }}>
                                        <View style={{
                                            width: 100
                                        }}>
                                            <Dropdown
                                                label='Select state'
                                                data={stateData}
                                            />
                                        </View>
                                        <View style={{
                                            width: 100

                                        }}>
                                            <Dropdown
                                                label='Select City'
                                                data={cityData}
                                            />
                                        </View>
                                    </View>
                                    <Item floatingLabel>
                                        <Label style={{ color: colorresource.liteblue, fontSize: 14 }}>Enter Company Name</Label>
                                        <Input />
                                    </Item>

                                    <Item floatingLabel>
                                        <Label style={{ color: colorresource.liteblue, fontSize: 14 }}>Select Compnay Type</Label>
                                        <Input />
                                    </Item>
                                </View>
                            </View>
                        </Card>
                        <Card>
                            <View>
                                <Text style={{ color: colorresource.liteblue, marginTop: 10, fontSize: 16, paddingLeft: 5 }}> Other Details </Text>

                                <View style={{ padding: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15 }}>
                                        <View style={{
                                            width: 100
                                        }}>
                                            <Dropdown
                                                label='Invite as'
                                                data={inviteUsData}
                                            />
                                        </View>
                                        <View style={{
                                            width: 100

                                        }}>
                                            <Dropdown
                                                label='Select '
                                                data={groupTypeData}
                                            />
                                        </View>
                                    </View>

                                    <ListItem>
                                        <CheckBox
                                            checked={false} style={{ marginTop: 10, marginBottom: 10 }} />

                                        <Text style={{ marginLeft: 5 }}>Please agree  <Text style={{ color: colorresource.liteblue }}>
                                            Terms & conditions
                                             </Text>
                                        </Text>

                                    </ListItem>

                                </View>
                            </View>
                        </Card>
                    </Content>
                </Container>
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