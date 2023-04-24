import {
  LOGIN_OTP_PASSWORD_ACTION,
  LOGIN_OTP_PASSWORD_ACTION_SUCCESS,
  LOGIN_OTP_FORGOT_PASSWORD_ACTION,
  LOGIN_OTP_FORGOT_PASSWORD_ACTION_SUCCESS,
  LOGIN_OTP_RESEND_ACTION,
  LOGIN_OTP_RESEND_ACTION_SUCCESS,
  LOGIN_OTP_USER_DETAILS_ACTION,
  LOGIN_OTP_USER_DETAILS_ACTION_SUCCESS,
  FORGOT_OTP_REQUEST_ACTION,
  FORGOT_OTP_REQUEST_SUCCESS,
  FORGOT_REQUEST_ACTION,
  FORGOT_REQUEST_SUCCESS
} from '../actions/verifyotp-actions';
import { commonErrorReducer } from './errorR';

const initialState = {
  responseKey: {},
  forgotresponseKey:{},
  isLoading: false,
  error: {},
  authenticationModel: {},
  userInfo: {},
  responseForgetaction: {},
  responseForgetpassword:{}
}

const verifyotpReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_OTP_PASSWORD_ACTION:
    return {
      ...state,
      isLoading: true
    };
    case LOGIN_OTP_PASSWORD_ACTION_SUCCESS:
    return {
      ...state,
      responseKey: action.responseKey,
      isLoading: false,
    };

    case LOGIN_OTP_FORGOT_PASSWORD_ACTION:
    return {
      ...state,
      isLoading: true
    };
    case LOGIN_OTP_FORGOT_PASSWORD_ACTION_SUCCESS:
    return {
      ...state,
      forgotresponseKey: action.forgotresponseKey,
      isLoading: true
    };

    case LOGIN_OTP_RESEND_ACTION:
    return {
      ...state,
      isLoading: true
    };
    case LOGIN_OTP_RESEND_ACTION_SUCCESS:
    return {
      ...state,
      authenticationModel: action.authenticationModel,
      isLoading: false
    };

    case LOGIN_OTP_USER_DETAILS_ACTION:
    return {
      ...state,
      isLoading: true
    };
    case LOGIN_OTP_USER_DETAILS_ACTION_SUCCESS:
    return {
      ...state,
      userInfo: action.userInfo,
      isLoading: false
    };

    case FORGOT_OTP_REQUEST_ACTION:
    return {
      ...state,
      isLoading: true
    };
    case FORGOT_OTP_REQUEST_SUCCESS:
    return {
      ...state,
      responseForgetaction: action.responseForgetaction,
      isLoading: false
    }

    case FORGOT_REQUEST_ACTION:
    return {
      ...state,
      isLoading: true
    };
    case FORGOT_REQUEST_SUCCESS:
    return {
      ...state,
      responseForgetpassword: action.responseForgetpassword,
      isLoading: false
    }
    
    default:
    return commonErrorReducer(state, action);
  }
};

export default verifyotpReducer;