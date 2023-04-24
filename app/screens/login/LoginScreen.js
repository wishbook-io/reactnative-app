import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Platform, ImageBackground } from 'react-native';
import { Container, Content, View, Card, CardItem, Text, Button, Label, Input, Item, Icon, ActionSheet } from 'native-base';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import firebase from '../../firebase';
import _ from 'lodash';

// local imports
import styles from './styles';
import { strings } from '../../utils/i18n';
import LocalStorage from '../../db/LocalStorage';
import consts from '../../utils/const';
import CountrySelection from '../../components/CountrySelection/CountrySelection';
import {NBRoot} from '../../components/Root/NBRoot';
import {TextField} from 'react-native-materialui-textfield';

import TextInputLegacy from 'app/components/MaterialTextInput/TextInputLegacy';
import { colorresource } from '../../resources/colorresource';
import { isWeb } from '../../utils/PlatformHelper';

//actions
import { getCountriesAction, changeCountryLabel, getLoginAuthAction } from '../../actions/login-actions';
import { showToastAction } from 'app/actions/toast-actions'

import { TestIdGenerator } from '../../utils/TestingHelper';
const testId = TestIdGenerator("LoginScreen");

class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: "",
            token: "",
            tokenCopyFeedback: "",
            mobileNumber: undefined,
            mobileError: 'mobile',
            buttonEnable: false,
            validation: false,
            countryId: 1
        };
    }

    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        isLoading: PropTypes.bool,
        countries: PropTypes.array,
        countryLabel: PropTypes.string,
        error: PropTypes.object,
        primaryColor: PropTypes.string,
        countryIndex: PropTypes.number,
        authenticationModel: PropTypes.object
    };

    componentWillMount() {
        if(!this.props.countries || this.props.countries.length === 0) {
            this.props.dispatch(getCountriesAction());
        }
    }


    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps country', nextProps.countries)
        if (nextProps.error && nextProps.error !== this.props.error) {
            alert(`${nextProps.error.statusText}`);
        }

        if (nextProps.authenticationModel && nextProps.authenticationModel !== this.props.authenticationModel) {
            // console.log('componentWillReceiveProps 1', nextProps.authenticationModel)
            this.moveToOTPScreen(nextProps.authenticationModel);
        }
    }

    onBackPress = () => {
        if(this.shouldExit) {
            return false;
        }
        this.shouldExit = true;
        this.timer = setTimeout(() => this.shouldExit = false, 2000)
        this.props.dispatch(showToastAction("Press BACK again to exit", 1000))
        return true
    }

    onChangeText = (text) => {
        let value = text.trim().replace(/[^0-9]/g, '');
        if(value.length > 10) {
            value = value.slice(0, 10)
        }
        this.setState({ 
            error: '', 
            validation:false, 
            mobileError: 'mobile', 
            buttonEnable: false, 
            mobileNumber: value 
        });
    }

    validateLogin = () => {
        // this.setState({mobileNumber: '8412806235', countryId: '1'}, () => this.moveToOTPScreen({is_password_set: 1}))
        // return;
        var IndNum = /^[0]?[6789]\d{9}$/;
        if (!IndNum.test(this.state.mobileNumber)) {
            this.setState({ 
                error: _.isEmpty(this.state.mobileNumber) ? 'Please enter mobile number' : 'Invalid Mobile Number',
                mobileError: 'exclamation-circle', 
                buttonEnable: true, 
                validation: true,
            })
        } else {
            this.setState({ mobileError: 'check-circle', buttonEnable: false, validation: false });

            firebase.messaging().getToken()
                .then(fcmToken => {
                    if (fcmToken) {
                        // user has a device token
                        this.setState({ token: fcmToken || "" });
                        this.generateOtp(fcmToken);
                    } else {
                        console.warn("----------------------///////////////////user doesn't have device token", fcmToken);
                        // user doesn't have a device token yet
                        alert("Device token couldn't be generated, please try again");
                    } 
                });
        }
    }

    generateOtp = (token) => {
        const { mobileNumber, countryId } = this.state;
        // console.log("TOKEN -----------------------------------------------------------------------------(getFCMToken)", token, mobileNumber, countryId);
        if (token != "") {
            LocalStorage.setItem(consts.FCMTOKEN, token);
            this.props.dispatch(getLoginAuthAction(mobileNumber, countryId, token));
        } else {
            alert('Token not generate try again later!');
        }
    }

    moveToOTPScreen = (authenticationModel) => {
        // console.log("generateOtp method", authenticationModel);
        if (authenticationModel) {
            // console.log("generateOtp method 1", authenticationModel);
            const { mobileNumber, countryId } = this.state
            this.props.navigation.navigate('VerifyotpScreen', {
                'mobile_number': mobileNumber, 'is_password_set': authenticationModel.is_password_set,
                'countryId': countryId, token: this.state.token,
            });
        }
    }

    onCountryChanged = (buttonIndex) => {
        this.setState({ countryId: this.props.countries[buttonIndex].id })
        this.props.dispatch(changeCountryLabel(buttonIndex));
    }

    render() {
        const { mobileError, buttonEnable } = this.state
        return (
            <NBRoot style={{flex: 1}}>
                <Container style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={require('../../images/intro_bg.png')}>
                    <View style={styles.containerImageView}>
                        <Image style={styles.imageView}
                            source={require('../../images/intro_home_1_new.png')}
                        />
                    </View>
                    <Content padder style={styles.contentView}>
                        <Card style={styles.LoginScreenCard}>
                            
                            <View style={styles.LoginScreenMobileParent}>
                                <View style={styles.LoginScreenCountryParent}>
                                    <CountrySelection countries={this.props.countries} countryIndex={this.props.countryIndex} onPress={this.onCountryChanged}/>
                                </View>
                                <View style={{flex: 1}}>

                                    <TextInputLegacy
                                    label={'Enter mobile number'}
                                    labelHeight={16}
                                    inputContainerPadding={10}
                                    tintColor={this.state.validation? colorresource.darkred : colorresource.liteblue}
                                    containerStyle={{marginBottom: -8}}
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    onSubmitEditing={this.validateLogin}
                                    value={this.state.mobileNumber}
                                    onChangeText={this.onChangeText}
                                    baseColor={this.state.validation? colorresource.darkred : undefined}
                                    fontSize={13}
                                    inputContainerStyle={{marginLeft: 5}}
                                    autoFocus={true}
                                    selectionColor={colorresource.liteblue}
                                    inputTestId = {testId("Mobile","Input")}
                                    />

                                    { this.state.validation
                                        ? <Icon type="FontAwesome" style={styles.LoginScreenMobileInputValidationIcon} name={mobileError} /> 
                                        : null 
                                    }
                                </View>
                            </View>
                            { this.state.validation
                                ? <View style={styles.LoginScreenMobileInputValidationParent}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 1}}/>
                                        <View style={styles.LoginScreenMobileInputValidationArrow}/>
                                    </View>
                                    <View style={styles.LoginScreenMobileInputValidationTextParent}>
                                        <Text style={styles.LoginScreenMobileInputValidationText}>{this.state.error}</Text>
                                    </View>
                                </View>
                                : null
                            }
                            <View style={styles.LoginScreenButtonParent}>
                                <Button primary success disabled={buttonEnable} borderRadius={20}
                                    onPress={() => {
                                        this.validateLogin();
                                    }}
                                    style={styles.LoginScreenButton}
                                    {...testId("Proceed","Button")}
                                    >
                                    <Text style={styles.text}>{strings('login.proceed').toUpperCase()}</Text>
                                </Button>
                            </View>
                            
                        </Card>
                    </Content>
                </ImageBackground>
                <AndroidBackHandler onBackPress={this.onBackPress}/>
                </Container>
            </NBRoot>
        );
    }
}

const mapStateToProps = (state) => {
    let countryIndex = state.loginR.countryIndex;
    let countryLabel = '';
    if (state.loginR.countries.length > 0) {
        countryLabel = state.loginR.countries[countryIndex].name;
    }
    return {
        countryLabel,
        countryIndex,
        countries: state.loginR.countries,
        error: state.loginR.error,
        authenticationModel: state.loginR.authenticationModel
    };
};



export default connect(mapStateToProps)(LoginScreen);