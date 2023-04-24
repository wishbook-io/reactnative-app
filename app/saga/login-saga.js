import { all, takeEvery, call, put, take } from 'redux-saga/effects';
import {
  GET_COUNTRIES_ACTION,           setCountriesSuccess,
  LOGIN_AUTH_ACTION,              setLoginAuthSuccess,
  LOGOUT_ACTION,                  logoutSuccess,
  GET_USER_COMPANY_INFO_ACTION,   getUserCompanyInfoSucess,
  GUEST_USER_REGISTRATION_ACTION, guestUserRegistrationSuccess,
} from '../actions/login-actions';
import {
  LOGIN_OTP_PASSWORD_ACTION,            loginWithOTPPasswordSuccess,
  LOGIN_OTP_FORGOT_PASSWORD_ACTION,     loginWithOTPForgotPasswordSuccess,
  LOGIN_OTP_RESEND_ACTION,              setLoginOTPAuthSuccess,
  LOGIN_OTP_USER_DETAILS_FORGOT_ACTION, setUserDetailsForgotSuccess,
  FORGOT_OTP_REQUEST_ACTION,            setResetPasswordOTPSuccess,
  FORGOT_REQUEST_ACTION,                setResetPasswordSuccess,
} from '../actions/verifyotp-actions';
import { patchCompanyProfileAction, getUserDetailsAction } from 'app/actions/user-actions'
import { patchCompanyProfile, getUserDetails } from 'app/saga/user-saga';
import { errorActionSet, errorActionHandled, STATUS_CODE_GROUP } from '../actions/error-actions';

import UserRepo from './user-repo';
import { CONSTANT_URL, URLConstants } from "../utils/URLConstants";
import LocalStorage from "../db/LocalStorage";
import consts from "../utils/const";
import UserHelper from '../config/userHelper';

// import * as ApplozicHelper from 'app/utils/ApplozicHelper'

// import { debugLog } from 'app/utils/debugVars';
const debugLog = false;

function* getListOfCountries(action) {
  try {
    
    var userResource = new UserRepo(CONSTANT_URL.COUNTRIES, model = 'Countries', true);
    
    const { response, error } = yield call(userResource.getListOfCountries.bind(userResource));
    
    debugLog? console.log("getListOfCountries call response: ", response) : null;
    debugLog? console.log("getListOfCountries call error: ", error) : null;
    
    if (response) {
      yield put(setCountriesSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* generateOTP(action) {
  try {
    
    var userResource = new UserRepo(CONSTANT_URL.AUTHENTICATION, model = 'AuthenticationModel');
    
    const { response, error } = yield call(userResource.generateOTP.bind(userResource), action);
    //debugLog? console.log('generateOTP', response, error) : null;
    if (response) {
      yield put(setLoginAuthSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* loginWithOTPPwd(action) {
  try {
    
    var userResource = new UserRepo(CONSTANT_URL.AUTHENTICATION, model = '');
    
    const { response, error } = yield call(userResource.loginWithOtpPwd.bind(userResource), action);
    
    if (response) {
      yield put(loginWithOTPPasswordSuccess(response));
    } 
    else if(action.errorKey) {
      yield put(errorActionHandled(error, action.errorKey, undefined, action.errorProcess));
    }
    else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* loginWithOTPForgotPwd(action) {
  try {
    
    var userResource = new UserRepo(CONSTANT_URL.AUTHENTICATION, model = '');
    
    const { response, error } = yield call(userResource.loginWithOtpPwd.bind(userResource), action);
    
    if (response) {
      yield put(loginWithOTPForgotPasswordSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* resendOTP(action) {
  try {
    
    var userResource = new UserRepo(CONSTANT_URL.AUTHENTICATION, model = '');
    
    const { response, error } = yield call(userResource.resendOTP.bind(userResource), action);
    debugLog? console.log(response) : null;
    if (response) {
      yield put(setLoginOTPAuthSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* getUserDetailsForgot() {
  try {
    
    var userResource = new UserRepo(CONSTANT_URL.PROFILE, model = 'UserInfo', true);
    
    const { response, error } = yield call(userResource.getUserDetailsForgot.bind(userResource));
    debugLog? console.log(response) : null;
    if (response) {
      yield put(setUserDetailsForgotSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* getResetPasswordOTP(action) {
  try {
    
    var userResource = new UserRepo(CONSTANT_URL.PASSWORD_RESET, model = '', false);
    
    const { response, error } = yield call(userResource.getResetPasswordOTP.bind(userResource), action);
    if (response) {
      yield put(setResetPasswordOTPSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* getResetPassword(action) {
  try {
    var userResource = new UserRepo(CONSTANT_URL.PASSWORD_RESET, model = '', false);
    
    const { response, error } = yield call(userResource.getResetPassword.bind(userResource), action);
    debugLog? console.log('sagaR.....', response) : null;
    debugLog? console.log('sagaE...', error) : null;
    if (response) {
      yield put(setResetPasswordSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* getUserCompanyInfo(action){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('companytype', action.id);
    let userRepo = new UserRepo(url, model = '', false);
    
    debugLog? console.log('[getUserCompanyInfo] url',url) : null;
    const { response, error } = yield call(userRepo.getUserDetails.bind(userRepo));
    
    debugLog? console.log("[getUserCompanyInfo] call response: ", response, error) : null;
    
    if (response) {
      yield put(getUserCompanyInfoSucess(response));
    }
    else {
      yield put(errorActionSet(error));
    }
    
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* guestUserRegistration(action){
  try {
    const [callOneParams, callTwoParams] = action.params
    
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('companytype', UserHelper.getCompanyGroupId());
    let userRepo = new UserRepo(url, model = '', false);
    
    debugLog? console.log('[guestUserRegistration] url, params', url, callOneParams) : null;
    const responsePatchCompany = yield call(userRepo.patchCompanyType, callOneParams);

    if(responsePatchCompany.error) {
      // there was some error
      yield put(errorActionSet(responsePatchCompany.error));
      console.log("guestUserRegistration error while patching company", responsePatchCompany.error)
      return
    }
    debugLog? console.log('[guestUserRegistration] patchCompany response', responsePatchCompany) : null;

    const responsePatchUser = yield call(patchCompanyProfile, patchCompanyProfileAction(callTwoParams));
    if(responsePatchUser.error) {
      // there was some error
      //yield put(errorActionSet(responsePatchUser.error));
      console.log("guestUserRegistration error while patching user profile", responsePatchUser.error)
      return
    }
    const resultUserDetails = yield call(getUserDetails,  getUserDetailsAction());
    const response = [responsePatchCompany, responsePatchUser]
    yield put(guestUserRegistrationSuccess(response))
    return {response}

  } catch (error) {
    yield put(errorActionSet(error));
    return { error } 
  }
}

export function* logout(action) {
  try {
    const userRepo = new UserRepo(CONSTANT_URL.LOGOUT_URL, model='', false);
    
    const { response, error } = yield call(userRepo.logout);
    
    debugLog? console.log("[logout] call response: ", response, error) : null;
    // {"detail":"Successfully logged out."}
    
    // ApplozicHelper.logout();

    if (response) {
      UserHelper.setUserInfo({})
      yield put(logoutSuccess(response));
    } else {
      yield put(errorActionHandled(error, action.errorKey, STATUS_CODE_GROUP.AUTH));
      // { detail: 'Invalid token.' }
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export default loginRootSaga = [
  takeEvery(GET_COUNTRIES_ACTION,                 getListOfCountries),
  takeEvery(LOGIN_AUTH_ACTION,                    generateOTP),
  takeEvery(LOGIN_OTP_PASSWORD_ACTION,            loginWithOTPPwd),
  takeEvery(LOGIN_OTP_FORGOT_PASSWORD_ACTION ,    loginWithOTPForgotPwd),
  takeEvery(LOGIN_OTP_RESEND_ACTION,              resendOTP),
  takeEvery(LOGIN_OTP_USER_DETAILS_FORGOT_ACTION, getUserDetailsForgot),
  takeEvery(FORGOT_OTP_REQUEST_ACTION,            getResetPasswordOTP),
  takeEvery(FORGOT_REQUEST_ACTION,                getResetPassword),
  takeEvery(GET_USER_COMPANY_INFO_ACTION,         getUserCompanyInfo),
  takeEvery(GUEST_USER_REGISTRATION_ACTION,       guestUserRegistration),
  takeEvery(LOGOUT_ACTION,                        logout),
]