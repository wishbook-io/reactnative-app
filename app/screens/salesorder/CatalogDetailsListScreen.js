import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Right, Left } from 'native-base';
import { strings } from '../../utils/i18n';

export default class CatalogDetailsListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: props.data.msg
        };
        this.click = this.click.bind(this);
    }

    click() {
        alert(this.props.data.nome);
    }

    render() {
        return (
            <TouchableHighlight underlayColor="#CCCCCC">
                <View>
                    <View style={styles.item}>
                        <Image source={{ uri: this.props.data.img }} style={styles.imageOne} />
                        <View style={styles.wishBookHeader}>
                            <Text style={{ marginTop: 10 }}> Shruthi </Text>
                            <Text style={{ color: 'red' }}> Only full catalog for sale</Text>
                            <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>

                                <Text style={{
                                    width: 25, height: 25, alignItems: 'center', borderRadius: 150 / 2,
                                    borderColor: '#000000', fontSize: 16, textAlign: 'center',
                                }} > - </Text>

                                <Text style={{
                                    width: 25, height: 25, alignItems: 'center', borderRadius: 150 / 2,
                                    backgroundColor: '#C9C7C7', fontSize: 16, textAlign: 'center', marginLeft: 5
                                }}> 4 </Text>

                                <Text style={{
                                    width: 25, height: 25, alignItems: 'center', borderRadius: 150 / 2,
                                    backgroundColor: '#0D80C1', fontSize: 16, textAlign: 'center', marginLeft: 5,
                                    color: 'white'
                                }}> + </Text>

                                <Text style={{ fontSize: 16, marginLeft: 2, color: '#0D80C1' }}> 4 set  </Text>

                                <Text style={{ fontSize: 16, marginLeft: 2 }}> |  </Text>

                                <Text style={{ fontSize: 16, marginLeft: 2, color: '#0D80C1' }}> 4 Pcs </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={{ color: '#0D80C1', fontSize: 18 }}> Hide Catalog Order Details  ^</Text>
                    </View>

                    <View style={styles.item}>
                        <Image source={{ uri: this.props.data.img }} style={styles.imageTwo} />
                        <View style={styles.wishBookHeader}>
                            <Text style={{ marginTop: 10 }}> 20180424163444 </Text>


                            <View style={{ flexDirection: 'row', flex: 1, marginTop: 15 }}>
                                <Text style={{ marginTop: 10 }}> ₹ 369.00 </Text>
                                <Text style={{
                                    width: 25, height: 25, alignItems: 'center', borderRadius: 150 / 2,
                                    backgroundColor: '#C9C7C7', fontSize: 16, textAlign: 'center', marginLeft: 30, marginTop: 10
                                }}> 4 </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
        flex: 1,
        flexDirection: 'row'
    },
    CircleShapeView: {
        width: 25,
        height: 25,
        alignItems: 'center',
        borderRadius: 150 / 2,
    },
    imageOne: {
        width: 80,
        height: 120,
        marginTop: 5,

    },
    imageTwo: {
        width: 120,
        height: 80,
        marginTop: 5,

    },
    info: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 20
    },
    nome: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    wishBookHeader: { margin: 10 },
});