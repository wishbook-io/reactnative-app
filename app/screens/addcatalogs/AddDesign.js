import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, Image, ScrollView, TouchableOpacity, PixelRatio } from 'react-native';
import { Container, Header, Content, ListItem, Body, Button, CardItem, CheckBox, Icon, Title, Card, Text, Footer, Switch, Right, Form, Left, Item, Input, Spinner, Label } from 'native-base';
import { strings } from '../../utils/i18n';
var ImagePicker = require('react-native-image-picker');
import { HeaderBackNativeBase } from '../../components/Header';
import { colorresource } from '../../resources/colorresource';
import  styles from './styles';

export default class AddDesign extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ImageSource: null,
        }
    }

    _onItemClick(type) {
        this.props.navigation.navigate(type);
    }

    goBack = () => {
        this.props.navigation.goBack()
    }


    render() {
        const gotoCamera = () => {
            if (this.state.status == true) {
                this.setState({ status: false })
            }
            else {
                this.setState({ status: true })
            }

            const options = {
                title: 'Select Design',
                quality: 1.0,
                maxWidth: 500,
                maxHeight: 500,
                storageOptions: {
                    skipBackup: true,
                }
            }

            ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                }
                else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                }
                else {
                    let source = { uri: response.uri };


                    this.setState({

                        ImageSource: source

                    });
                }
            });
        }
        return (
            <Container>
                <HeaderBackNativeBase title={strings('addCatalog.add_design')} />
                <ScrollView style={styles.AddDesignscrollviewtop}>
                    <Card>

                        <TouchableOpacity onPress={gotoCamera} style={styles.AddDesignscrollviewtop}>
                            <View style={styles.AddDesignSelectcatelog}>
                                <Icon style={styles.AddDesignSelectcatelogicon} type="FontAwesome" name="camera" />
                                <Text style={styles.AddDesignSelectcatelogtext}>Select catalog designs</Text>
                            </View>
                            <Text style={styles.AddDesignPleaseUploadone}>Please Upload only 1 image per design</Text>
                        </TouchableOpacity>

                    </Card>


                    <Card style={styles.AddDesignImageContainer}>



                        {this.state.ImageSource === null ? <Image /> :
                            <Image style={styles.AddDesignImageDisplay} source={this.state.ImageSource} />
                        }
                        {
                            this.state.status ?
                                <Item floatingLabel style={styles.AdddDesignrupeeview}>

                                    <Icon type="FontAwesome" name="rupee" />

                                    <Label style={styles.AdddDesignrupeelabel}>Enter price</Label>

                                </Item> : null
                        }
                    </Card>
                </ScrollView>
                <TouchableOpacity>
                    <Footer style={styles.AddDesignfooter}>
                        <Text style={styles.AddDesignfooter}>UPLOAD</Text>
                    </Footer>
                </TouchableOpacity>
            </Container>

        );
    }
}
