import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Right, Left } from 'native-base';
import { colorresource } from '../../resources/colorresource';
export default class ListItemRejectBuyers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: props.data.members
        };
        this.click = this.click.bind(this);
    }

    click() {
        alert(this.props.data.name);
    }

    render() {
        return (
            <TouchableHighlight onPress={this.click} underlayColor="#CCCCCC">
                <View>
                    <View style={styles.ListItemBuyersGroupsitem}>
                        <View style={styles.ListItemBuyersGroupsinfo}>
                            <Left>
                                <Text numberOfLines={1} style={styles.ListItemBuyersGroupsname}>{this.props.data.name}</Text>
                            </Left>

                            <Right>
                                <Text numberOfLines={1} >{this.state.members}</Text>
                            </Right>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

