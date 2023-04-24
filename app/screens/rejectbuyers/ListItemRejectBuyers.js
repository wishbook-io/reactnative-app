import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Right, Card, CardItem, Icon, Left } from 'native-base';
import { colorresource } from '../../resources/colorresource';

export default class ListItemRejectBuyers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: props.data.msg,
            mobileNumber: props.data.mobileNumber

        };
        this.click = this.click.bind(this);
    }

    click() {
        alert(this.props.data.name);
    }

    render() {
        return (
            <TouchableHighlight onPress={this.click} underlayColor={colorresource.litebrown}>
                <View>
                    <Right>
                        <Text Buyer Type ></Text>
                    </Right>

                    <Card style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.item}>
                            <View style={styles.info}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Left>
                                        <Text numberOfLines={1} style={styles.name}>{this.props.data.name}</Text>
                                    </Left>

                                    <Right>
                                        <Text numberOfLines={1} style={styles.msg}>{this.state.msg}</Text>
                                    </Right>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="phone" type="MaterialCommunityIcons" />
                                    <Text numberOfLines={1} style={{ marginTop: 5 }}>{this.state.mobileNumber}</Text>
                                </View>

                            </View>
                        </View>
                    </Card>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderColor: colorresource.litebrown,
        flex: 1,
        flexDirection: 'row'
    },
    imagem: {
        width: 40,
        height: 40,
        marginTop: 10,
        borderRadius: 20
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colorresource.liteblue,
    }
});