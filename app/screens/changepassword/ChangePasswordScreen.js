import React, { Component } from 'react';
import { Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import { 
  Container, 
  Content,
} from 'native-base';
import { Button as PButton } from 'react-native-paper'

import GenericHeader from 'app/components/Header/GenericHeader';
import TextInputKeyed from 'app/components/MaterialTextInput/TextInputKeyed';
import { showAlert } from 'app/utils/notifier';
import { strings } from '../../utils/i18n';
import { colorresource } from 'app/resources/colorresource/'
import styles from './styles';

import { execute } from 'app/config/saga';
import {goBack} from 'app/actions/navigation-actions';
import * as userActions from 'app/actions/user-actions';
import * as userSaga from 'app/saga/user-saga';
import { showToastAction } from 'app/actions/toast-actions'
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';

import { TestIdGenerator } from '../../utils/TestingHelper';
const screenName = 'ChangePassword'
const buttonIdGenerator = TestIdGenerator(screenName, '', "Button")

const FORM_FIELD_KEYS = {
  NEW_PASSWORD: 'NewPassword',
  REPEAT_PASSWORD: 'RepeatPassword',
}

class ChangePasswordScreen extends Component {

  onVisibilityChange = ({key}) => {
    // console.log("onVisibilityChange")
    const currentVisibility = this.state[key].visible;
    this.setState({[key]: {...this.state[key], visible: !currentVisibility}})
  }

  showSuccessfulUI = () => {
    showAlert(
      screenName,
      'Change Password',
      'Successfully changed the password.',
      goBack,
    )
  }

  onChangePasswordComplete = (result) => {
    this.props.dispatch(requestHideLoaderAction(screenName))
    
    if(result.error) {
      return;  
    }
    
    setTimeout(this.showSuccessfulUI, 1000)
  }

  onChangePasswordPress = () => {
    Keyboard.dismiss();

    const newPassword = this.state[FORM_FIELD_KEYS.NEW_PASSWORD].text;
    if(!newPassword) {
      this.setState({[FORM_FIELD_KEYS.NEW_PASSWORD]: {error: "New Password cannot be empty"}})
      return;
    }
    if(newPassword.length < 6) {
      this.setState({[FORM_FIELD_KEYS.NEW_PASSWORD]: {text: newPassword, error: "Password cannot be less than 6 digits"}})
      return;
    }

    const repeatPassword = this.state[FORM_FIELD_KEYS.REPEAT_PASSWORD].text;
    if(newPassword !== repeatPassword) {
      this.showToast("Passwords do not match");
      return;
    }
    this.props.dispatch(requestShowLoaderAction(screenName))
    execute(userSaga.changePassword, userActions.changePasswordAction(newPassword)).then(this.onChangePasswordComplete)

  }

  onTextInputChange = ({key, text}) => {
    // console.log("[onTextInputChange] key, text", key, text)
    this.setState({[key]: {...this.state[key], text, error: ''}})
  }

  showToast = (message, duration=1000) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  constructor(props) {
    super(props)
    this.state = {

      [FORM_FIELD_KEYS.NEW_PASSWORD] : {
        text: '',
        error: null,
        visible: false,
      },

      [FORM_FIELD_KEYS.REPEAT_PASSWORD] : {
        text: '',
        error: null,
        visible: false,
      },
    }
  }

  render() {
    return (
      <Container>
        <GenericHeader title={strings('homeNavigationDrawer.change_password')} />
        <Content contentContainerStyle={{margin: 20}}>
          
          <TextInputKeyed
          label={strings('changepassword.new_password')}
          testId={buttonIdGenerator("NewPasswordInput")}
          error={this.state[FORM_FIELD_KEYS.NEW_PASSWORD].error}
          inputKey={FORM_FIELD_KEYS.NEW_PASSWORD}
          onChange={this.onTextInputChange}
          value={this.state[FORM_FIELD_KEYS.NEW_PASSWORD].text}
          textInputProps={{secureTextEntry: !this.state[FORM_FIELD_KEYS.NEW_PASSWORD].visible}}
          trailing={this.state[FORM_FIELD_KEYS.NEW_PASSWORD].visible? 'visibility' : 'visibility-off'}
          trailingPress={this.onVisibilityChange}
          />

          <TextInputKeyed
          label={strings('changepassword.repeat_password')}
          testId={buttonIdGenerator("ConfirmPasswordInput")}
          error={this.state[FORM_FIELD_KEYS.REPEAT_PASSWORD].error}
          inputKey={FORM_FIELD_KEYS.REPEAT_PASSWORD}
          onChange={this.onTextInputChange}
          value={this.state[FORM_FIELD_KEYS.REPEAT_PASSWORD].text}
          textInputProps={{secureTextEntry: !this.state[FORM_FIELD_KEYS.REPEAT_PASSWORD].visible}}
          trailing={this.state[FORM_FIELD_KEYS.REPEAT_PASSWORD].visible? 'visibility' : 'visibility-off'}
          trailingPress={this.onVisibilityChange}
          />
          
          {/* <Button block style={{backgroundColor: colorresource.liteblue, marginTop: 40}} {...buttonIdGenerator("ChangePassword")} onPress={this.onChangePasswordPress}>
            <Text>{strings('changepassword.change_password')}</Text>
          </Button> */}

          <PButton
          mode='contained'
          style={{marginTop: 10}}
          {...buttonIdGenerator("ChangePassword")}
          onPress={this.onChangePasswordPress}
          >
            {strings('changepassword.change_password')}
          </PButton>

        </Content>
      </Container>
    );
  }
}


export default connect()(ChangePasswordScreen);