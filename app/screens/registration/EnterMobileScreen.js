import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet, View, StatusBar, Input, Text, ScrollView, TextInput, Container, ToastAndroid, Image, TouchableOpacity,
    Linking,
} from 'react-native';
import { Header, Left, Button, Icon, Right, CheckBox, Body, ListItem, Form, Item, Label, Card, Title } from 'native-base';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import { colorresource } from '../../resources/colorresource';


class EnterMobileScreen extends Component {

    onSuccess(e) {
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err));
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Register</Title>
                    </Body>
                    <Right />
                </Header>


                <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>Enter supplier number or Scan QR code from the pamplet/poster(optional)
                    Pamphlet/poster supplier number QR code scan (optional) </Text>


                {/* <QRCodeScanner
                    onRead={this.onSuccess.bind(this)}
                    topContent={
                        <Text style={styles.centerText}>
                            Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
          </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity>
                    }
                /> */}


                <View style={{ flexDirection: 'row' }}>
                    <Text India > </Text>

                    <Item floatingLabel>
                        <Label style={{ color: colorresource.liteblue, fontSize: 14 }}>Enter Supplier mobile number</Label>
                        <Input />
                    </Item>

                    <Text OK > </Text>

                </View>


                <Button rounded>
                    <Text>style={{ color: colorresource.white }}>Primary</Text>
                </Button>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: colorresource.white,
        padding: 20,
        flexDirection: 'column'
    },
});

export default connect()(EnterMobileScreen);