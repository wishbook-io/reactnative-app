import React,  { Component } from 'react';
import { View } from 'react-native';
import { Text, Card, Button } from 'native-base';

import TextInputLegacy from 'app/components/MaterialTextInput/TextInputLegacy';
import { colorresource } from 'app/resources/colorresource';
import { strings } from '../../utils/i18n';
import styles from './styles';

import { TestIdGenerator } from '../../utils/TestingHelper';
const buttonTestId = TestIdGenerator("VerifyOtpScreen", '', "Button");

export default class LoginWithPassword extends Component {

  changePwdVisible = () => {
    this.setState(state => ({pwdVisible: !state.pwdVisible}))
  }

  constructor(props) {
    super(props);
    this.state = {
      pwdVisible: false,
    }
  }

  render() {
    const  {
      visible,
      passwordError,
      password,
      onChangeText,
      onSubmitEditing,
      onForgotPasswordPress,
    } = this.props

    if(!visible) {
      return null;
    }

    return (
      <View>
        
        <View style={styles.VerifyScreenOrParent}>
          <View style={styles.VerifyScreenOrButton}>
            <Text style={styles.VerifyScreenOrText}>OR</Text>
          </View>
        </View>

        <Card style={styles.LoginScreenCard}>
          <View>
            <TextInputLegacy
            fontSize={this.state.pwdVisible? 13 : 14}
            label={'Enter Password'}
            labelHeight={16}
            tintColor={colorresource.liteblue}
            title={'Minimum 6 characters'}
            error={passwordError}
            secureTextEntry={!this.state.pwdVisible}
            autoFocus={true}
            value={password}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            trailingProps={{
              name: this.state.pwdVisible? 'visibility' : 'visibility-off',
              type: "MaterialIcons",
              onPress: this.changePwdVisible,
            }}
            trailingStyle={{
              position: 'absolute',
              right: 5,
              fontSize: 24,
              top: 17
            }}
            inputTestId = {buttonTestId("Password",'Input')}
            trailingTestId = {buttonTestId("Eye", 'Icon')}
            />
          </View>
          
          <View style={styles.VerifyScreenForgotRow}>
            <Button 
            style={styles.VerifyScreenForgotButton} 
            transparent
            onPress={onForgotPasswordPress} 
            {...buttonTestId("Forgot")}>
              <Text uppercase={false} style={styles.VerifyScreenForgotText}>{strings('login.forgot_password')}</Text>
            </Button>
          </View>

        </Card>
      </View>
    );
  }
}