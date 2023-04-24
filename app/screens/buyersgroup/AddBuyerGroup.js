import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToolbarAndroid, View, StyleSheet, Platform, Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, Item, Label, Input, Footer } from 'native-base';
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';
import Modal from "react-native-modal";
import { colorresource } from '../../resources/colorresource';
import styles from './styles';

class AddBuyerGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            value: 1,
            onClicked: true,
            onClicked1: false
        }
    }

    ShowAlertDialog = () => {
        this.setState({ value: 1 })
        this.setState({ onClicked: true });
        this.setState({ onClicked1: false });
    }

    ShowAlertDialog2 = () => {
        this.setState({ value: 2 })
        this.setState({ onClicked1: true });
        this.setState({ onClicked: false });
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        var _style;
        if (this.state.onClicked) {
            _style = { borderColor: colorresource.liteblue, backgroundColor: colorresource.liteblue, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }
        }
        else {
            _style = { borderColor: colorresource.liteblue, color: colorresource.liteblue, backgroundColor: colorresource.white, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }
        }

        var _style1;
        if (this.state.onClicked1) {
            _style1 = { borderColor: colorresource.liteblue, backgroundColor: colorresource.liteblue, borderBottomRightRadius: 10, borderTopRightRadius: 10 }
        }
        else {
            _style1 = { borderColor: colorresource.liteblue, color: colorresource.liteblue, backgroundColor: colorresource.white, borderBottomRightRadius: 10, borderTopRightRadius: 10 }
        }


        return (
            <View style={styles.container}>
                <HeaderBackNativeBase title={strings('addbuyergroup.addbuyergroup')} />

                <View>
                    <Segment style={{ backgroundColor: 'transparent', borderColor: colorresource.liteblue, padding: 30, marginTop: 20 }}>
                        <Button bordered light

                            style={_style}
                            onPress={this.ShowAlertDialog} >
                            <Text uppercase={false} style={_style}> {strings('addbuyergroup.locationwise')} </Text>
                        </Button>
                        <Button bordered light

                            style={_style1}
                            onPress={this.ShowAlertDialog2}>
                            <Text uppercase={false} style={_style1}>{strings('addbuyergroup.custom')} </Text>
                        </Button>
                    </Segment>
                    {
                        this.state.value == 1 ?
                            <View style={styles.AddBuyerGrouppadding}>

                                <Item floatingLabel style={styles.AddBuyerGroupmarginTop} >
                                    <Label style={styles.AddBuyerGrouplabel}>{strings('addbuyergroup.enter_group_name')}</Label>
                                    <Input />
                                </Item>

                                <Item floatingLabel style={styles.AddBuyerGroupmarginTop}>
                                    <Label style={styles.AddBuyerGrouplabel}>{strings('addbuyergroup.select_buyer_type')}</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel style={styles.AddBuyerGroupmarginTop}>
                                    <Label style={styles.AddBuyerGrouplabel}>{strings('addbuyergroup.select_state')}</Label>
                                    <Input />
                                </Item>

                                <Item floatingLabel style={styles.AddBuyerGroupmarginTop}>
                                    <Label style={styles.AddBuyerGrouplabel}>{strings('addbuyergroup.select_city')}</Label>
                                    <Input />
                                </Item>

                                <Item floatingLabel style={styles.AddBuyerGroupmarginTop}>
                                    <Label style={styles.AddBuyerGrouplabel}>{strings('addbuyergroup.select_category')}</Label>
                                    <Input />
                                </Item>
                            </View> : null
                    }
                    {
                        this.state.value == 2 ?
                            <View style={styles.AddBuyerGrouppadding}>


                                <Item floatingLabel style={styles.AddBuyerGroupmarginTop}>
                                    <Label style={styles.AddBuyerGrouplabel}>{strings('addbuyergroup.enter_group_name')}</Label>
                                    <Input />
                                </Item>

                                <Item floatingLabel style={styles.AddBuyerGroupmarginTop}>
                                    <Label style={styles.AddBuyerGrouplabel}>{strings('addbuyergroup.select_buyers')}</Label>
                                    <Input />
                                </Item>
                            </View> : null
                    }

                </View>
                <View style={styles.AddBuyerGroupfinal}>
                    <Button full info
                        onPress={() => this._toggleModal}
                    >
                        <Text style={{ color: colorresource.white }}>{strings('addbuyergroup.create')}</Text>
                    </Button>
                </View>
            </View >
        );
    }
}



export default connect()(AddBuyerGroup)
