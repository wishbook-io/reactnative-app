import React, { Component } from 'react';
import { Platform, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import { CheckBox } from 'native-base';
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';
import { View } from 'native-base';

export default class OrderReceiptScreen extends Component {

    goBack = () => { this.props.navigation.goBack() }

    render() {
        return (
            <View>
                <HeaderBackNativeBase title="Order Receipt" onPress={this.goBack} />

                <ScrollView>
                    <View style={{ margin: 10 }}>

                        <Text style={styles.styleHeading}> Order Details </Text>

                        <View style={styles.textCommonStyle}>
                            <Text> Order No </Text>
                            <Text> 239745 </Text>
                        </View>

                        <View style={styles.textCommonStyle}>
                            <Text style={{ color: '#000000' }}> Buyer Name </Text>
                            <Text style={{ color: '#000000' }}> Lavish Designer creations</Text>
                        </View>

                        <View style={styles.textCommonStyle}>
                            <Text> Order Date </Text>
                            <Text> June 05 </Text>
                        </View>

                        <View style={styles.textCommonStyle}>
                            <Text> Order Status </Text>
                            <Text style={{ color: 'green' }}> Accepted </Text>
                        </View>

                        <View style={styles.textCommonStyle}>
                            <Text> Payment status </Text>
                            <Text style={{ color: 'red' }}> Pending </Text>
                        </View>
                        <View style={styles.textCommonStyle}>
                            <Text> Additional Note </Text>
                            <Text> </Text>
                        </View>
                    </View>


                    <View style={{ margin: 10 }}>
                        <Text style={styles.styleHeading}> Order Receipt </Text>

                        <View style={styles.textCommonStyle}>
                            <Text style={{ color: '#000000' }}> Buyers Credit Rating </Text>
                            <Text> NOT AVAILABLE </Text>
                        </View>


                        <TouchableOpacity style={{ alignContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 15, paddingLeft: 15, borderColor: 'green', color: 'green', borderRadius: 5 }}> CALL BUYER</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ margin: 10 }} >
                        <Text style={styles.styleHeading}> Order Value Summary </Text>

                        <View style={styles.textCommonStyle}>
                            <Text style={{ color: '#000000' }}> 1. Sruti( 1 pcs). </Text>
                            <Text style={{ color: '#000000' }}> ₹ 369.0 </Text>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>

                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontSize: 14, color: '#000000' }}> Amount </Text>
                                <Text style={{ fontSize: 14 }}> ( Excluding GST & Discounts ) </Text>
                            </View>
                            <Text style={{ color: '#000000' }}>₹ 369.0 </Text>
                        </View>
                    </View>


                    <View style={{ margin: 10 }} >
                        <Text style={styles.styleHeading}> Attachments </Text>
                        <Text style={{ marginLeft: 10, color: 'green', fontSize: 10 }}> You can attach an image of paper order form,invoice,challan etc.</Text>
                    </View>

                    <View style={styles.imageOne}>

                        <Text style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', fontSize: 20 }}> + </Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity>
                            <Text> Dispach </Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text> Cancel Orders</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: { justifyContent: 'center', flex: 1, paddingTop: (Platform.OS) === 'ios' ? 20 : 0 },
    styleHeading: { color: '#0D80C1', marginTop: 10, fontSize: 18, paddingLeft: 5 },
    textCommonStyle: { flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, marginRight: 10, marginTop: 5 },
    imageOne: { width: 80, height: 100, marginLeft: 30, marginBottom: 10, backgroundColor: '#0D80C1', borderRadius: 5 },
}
);