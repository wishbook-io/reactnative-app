import React, { Component } from 'react';
import { Platform, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import { CheckBox } from 'native-base';
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';
import { View } from 'native-base';

export default class AddCatalog extends Component {

    proceedToCreateOrder = () => { this.props.navigation.navigate('CreateOrderScreen') }
    goBack = () => { this.props.navigation.goBack() }

    constructor(props) {
        super(props);
        this.state = {
            GridViewItems: [
                { key: 'One' },
                { key: 'Two' },
                { key: 'One' },
                { key: 'Two' },
            ]
        }
    }
    GetGridViewItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <HeaderBackNativeBase title="Catalog" onPress={this.goBack} />
                <FlatList
                    data={this.state.GridViewItems}
                    renderItem={({ item }) =>
                        <View style={styles.GridViewBlockStyle}>
                            <View style={{ flexDirection: 'column', position: 'absolute', width: '100%', position: 'absolute', bottom: 0, marginTop: 10 }}>
                                <Image source={{ uri: 'https://www.b7web.com.br/avatar1.png' }} style={styles.imageOne} />

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 14 }}> Product Name</Text>
                                        <Text style={{ fontSize: 14 }}> Rs 1255/pc. </Text>
                                    </View>

                                    <CheckBox
                                        checked={true} style={{ marginTop: 10, marginBottom: 10, marginRight: 20 }} />
                                </View>
                            </View>

                        </View>}

                    numColumns={2}
                />

                <TouchableOpacity onPress={this.proceedToCreateOrder} style={{

                    position: 'absolute', width: '100%', position: 'absolute', bottom: 0, marginTop: 10
                }}>

                    <Text style={{ padding: 10, fontSize: 16, textAlignVertical: 'center', textAlign: 'center', alignContent: 'center', justifyContent: 'center', backgroundColor: '#EF7A10', color: 'white' }}> Add </Text>

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    },

    GridViewBlockStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 220,
        margin: 5,
        backgroundColor: '#fff'
    },

    GridViewInsideTextItemStyle: {
        color: '#fff',
        padding: 10,
        fontSize: 18,
        justifyContent: 'center',
    },
    imageOne: {
        width: 120,
        height: 200,
        marginLeft: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
});