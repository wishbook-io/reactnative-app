import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Right, Left } from 'native-base';
import { colorresource } from '../../resources/colorresource';
import styles from './styles'
export default class ListItemBuyerGroupDetails extends Component {
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
            <TouchableHighlight onPress={this.click} underlayColor="#CCCCCC">
                <View style={styles.ListItemBuyerGroupsDetailsitem}>
                    <Image source={{ uri: this.props.data.img }} style={styles.ListItemBuyerGroupsimagem} />
                    <View style={styles.ListItemBuyerGroupsinfo}>
                        <Text numberOfLines={1} style={styles.ListItemBuyerGroupsnome}>{this.props.data.nome}</Text>
                        <Text numberOfLines={1} style={styles.msg}>{this.state.msg}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

