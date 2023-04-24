import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserHelper from 'app/config/userHelper';
import LocalStorage from 'app/db/LocalStorage';
import consts from 'app/utils/const';
import { isWeb } from 'app/utils/PlatformHelper';

import * as navigationActions from 'app/actions/navigation-actions';
import { loginWithOTPPassword } from 'app/actions/verifyotp-actions'
import { getUserDetailsAction } from 'app/actions/user-actions';

const LOGIN_FLOW_ERROR_KEY = 'LOGIN_FLOW_ERROR_KEY'
/*

This component decides how to proceed after 
1. Splash
2. Verify Otp screen

since, a lot of code is duplicated, this component will
try to reduce it.

*/
class LoginFlow extends Component {

  // public methods start
  startLoginFlow = () => {
    this.startLoginFlowInternal();
  }
  // public methods end

  startLoginFlowInternal = () => {
    if(this.props.skipKeyCheck) {
      this.checkUserRegistration();
      return;
    }

    if(isWeb) {
      const path = window.location.search;
      console.log("[LoginFlow: startLoginFlowInternal] path", path)
      const params = navigationActions.getUrlParams(path)
      console.log("[LoginFlow: startLoginFlowInternal] params", params)
      const mobile = params.m
      const otp = params.o
      const password = params.p
      if(mobile) {
        if(otp) {
          // login with otp
          this.loginWithOtpPassword(mobile, otp)
          return;
        } else if(password){
          // login with password
          this.loginWithOtpPassword(mobile, undefined, password)
          return;
        }
      }
    }
    
    LocalStorage.getItem(consts.AUTHKEY).then((key) => {
      if(!key) {
        navigationActions.goToLoginScreen();
      } else {
        this.checkUserRegistration();
      }
    });
  }

  loginWithOtpPassword = async (mobile, otp, password) => {
    // clear key first, if exists
    await LocalStorage.deleteItem(consts.AUTHKEY);
    let loginConstant = consts.LOGIN_OTP
    if(password) {
      loginConstant = consts.LOGIN_PASSWORD
    }
    this.props.dispatch(loginWithOTPPassword(loginConstant, mobile, 1, otp, password, undefined, LOGIN_FLOW_ERROR_KEY, true))
  }

  onLoginError = () => {
    navigationActions.goToLoginScreen();
  }

  onLoginSuccess = () => {
    LocalStorage.setItem(consts.AUTHKEY, this.props.responseKey.key).then(() => this.checkUserRegistration())
  }

  checkUserRegistration = () => {
    this.props.dispatch(getUserDetailsAction(this.props.showLoading))
    // () => this.onUserDetailsFetched()
  }

  onUserDetailsFetched = () => {
    // console.log("responseuserdetails", this.props.responseUserDetails);
    const showRegistration = !(UserHelper.isUserCompanyTypeFilled())
    // console.log("showRegistration", showRegistration);
    if(showRegistration) {
      navigationActions.goToInitialRegistration();
    } else {
      navigationActions.goToMainStack();
      // navigationActions.navigateToScreen("DebugStack", null, null);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.responseUserDetails !== this.props.responseUserDetails) {
      this.onUserDetailsFetched();
    }

    if(prevProps[LOGIN_FLOW_ERROR_KEY] !== this.props[LOGIN_FLOW_ERROR_KEY]) {
      this.onLoginError()
    }

    if(prevProps.responseKey !== this.props.responseKey) {
      this.onLoginSuccess()
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return ({
    responseUserDetails: state.userR.responseGetUserDetails,
    [LOGIN_FLOW_ERROR_KEY]: state.errorHandlerR[LOGIN_FLOW_ERROR_KEY],
    responseKey: state.verifyotpR.responseKey,
  })
}

export default connect(mapStateToProps, null, null, { withRef: true })(LoginFlow);