import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showConfirm } from 'app/utils/notifier';
import LocalStorage from 'app/db/LocalStorage';
import consts from 'app/utils/const';

import { logoutAction, clearLogoutSuccess } from 'app/actions/login-actions';
import { clearErrorForErrorKey } from 'app/actions/error-actions'
import { goToLoginScreen } from 'app/actions/navigation-actions';

const ERROR_LOGOUT_KEY = "ERROR_LOGOUT_KEY"
const CONFIRM_LOGOUT_KEY = 'CONFIRM_LOGOUT_KEY'

class Logout extends Component {

  // public methods start
  logout() {
    showConfirm(
      CONFIRM_LOGOUT_KEY,
      'Confirm Logout',
      'Do you wish to logout from current account?',
      this.onConfirmLogoutPress,
    )
  }
  // public methods end

  onServerLogoutDone = async () => {
    await LocalStorage.deleteItem(consts.AUTHKEY);
    this.props.dispatch(clearLogoutSuccess())
    setTimeout(() => goToLoginScreen(), 1000) // to wait for loading modal to disappear, causes issues with iOS
  }

  onConfirmLogoutPress = async () => {
    this.props.dispatch(logoutAction({errorKey: ERROR_LOGOUT_KEY}));
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.errorLogout && this.props.errorLogout !== prevProps.errorLogout) {
      this.props.dispatch(clearErrorForErrorKey(ERROR_LOGOUT_KEY))
      this.onServerLogoutDone();
    }

    if(this.props.responseLogout !== prevProps.responseLogout && this.props.responseLogout.detail) {
      this.props.dispatch(clearLogoutSuccess())
      this.onServerLogoutDone();
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return ({
    responseLogout: state.loginR.responseLogout,
    errorLogout: state.errorHandlerR[ERROR_LOGOUT_KEY],
  })
}

export default connect(mapStateToProps, null, null, { withRef: true })(Logout);