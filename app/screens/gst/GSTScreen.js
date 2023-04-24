import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Left, Content, Icon, Body, Title, Right, Form, Item, Input, Label, Button, Text } from 'native-base';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { HeaderBackNativeBase } from '../../components/Header';

class GSTScreen extends Component {

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Container>
                <HeaderBackNativeBase title={strings('gst.gst')} onPress={this.goBack} />
                <Content>
                    <Form style={styles.form}>
                        <Item floatingLabel>
                            <Label>{strings('gst.gst_no')}</Label>
                            <Input style={styles.inputfont} />
                            <Icon name='asterisk' type='FontAwesome' style={styles.asteriskIcon}></Icon>
                        </Item>
                    </Form>
                    <Button block style={styles.Button}>
                        <Text>{strings('gst.add_gst_no')}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default connect()(GSTScreen);