import { all, takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_USER_DETAILS_ACTION,              getUserDetailsSuccess,      getUserDetailsAction,
  SET_PLATFORM_INFO_ACTION,             setPlatformInfoSuccess,
  PATCH_USER_PROFILE_ACTION,            patchUserProfileSuccess,    patchUserProfileAction,
  PATCH_COMPANY_PROFILE_ACTION,         patchCompanyProfileSuccess, patchCompanyProfileAction,
  PATCH_PROFILE_ACTION,                 patchProfileSuccess,
  REGISTER_APNS_ACTION,                 registerApnsSuccess,
  CHANGE_PASSWORD_ACTION,               changePasswordSuccess,
  GET_KYC_ACTION,                       getKycSuccess,
  UPDATE_KYC_ACTION,                    updateKycSuccess,
  GET_BANK_DETAILS_ACTION,              getBankDetailsSuccess,
  UPDATE_BANK_DETAILS_ACTION,           updateBankDetailsSuccess,
  PATCH_RESELL_COMPANY_TYPE_ACTION,     patchResellCompanyTypeSuccess,
  GET_NOTIFICATION_PREFERENCES_ACTION,  getNotificationPreferencesSuccess,
  POST_NOTIFICATION_PREFERENCES_ACTION, postNotificationPreferencesSuccess,
  INITIAL_REGISTER_ACTION,              initialRegisterSuccess,
} from '../actions/user-actions';
import { errorActionSet } from '../actions/error-actions';
import UserRepo from './user-repo';
import { CONSTANT_URL, URLConstants } from "../utils/URLConstants";
import LocalStorage from "../db/LocalStorage";
import consts from "../utils/const";
import DeviceId from '../utils/DeviceInfo';

import UserHelper from '../config/userHelper';
import { getSupportedLanguages, setUserLanguage } from './language-saga';
import { getLanguageAction, setLanguageAction } from '../actions/language-actions';

import { debugLog, isDev, isSimulator } from 'app/utils/debugVars';

export function* getUserDetails(action) {
  try {
    
    let urlObj = new URLConstants();
    
    var userResource = new UserRepo(CONSTANT_URL.PROFILE, model = 'UserInfo', false);
    debugLog? console.log('getUserDetails',CONSTANT_URL.PROFILE) : null;
    const { response, error } = yield call(userResource.getUserDetails.bind(userResource));
    // debugLog? console.log('getUserDetails url',response) : null;
    
    if (response) {
      
      let url = yield urlObj.companyUrl('companyProfile', response.companyuser.company);
      debugLog? console.log('companyProfile Url',url) : null;
      
      let userRepo = new UserRepo(url, model = '', false);
      const responseNew = yield call(userRepo.getUserCompany.bind(userRepo));
      
      response["company"]=responseNew.response;
      // const fcmToken = yield LocalStorage.setItem(consts.userInfo,response);
      debugLog? console.log('companyProfile+userDetails Details',response) : null;
      
      UserHelper.setUserInfo(response);
      
      yield put(getUserDetailsSuccess(response, action.showLoading));
      return { response };
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

function* setPlatformInfo() {
  try {
    const userRepo = new UserRepo(CONSTANT_URL.GCM, model='', false);
    
    const deviceId = yield DeviceId.getDeviceId();
    
    const fcmToken = yield LocalStorage.getItem(consts.FCMTOKEN)
    if(!fcmToken) {
      console.log("FCM token unavailable to post. Aborting saga silently", fcmToken);
      return;
    }
    
    console.log("fcm token: ", fcmToken);
    console.log("device id" , deviceId);
    
    const { response, error } = yield call(userRepo.setPlatformInfo.bind(userRepo), deviceId, fcmToken);
    
    console.log("[setPlatformInfo] call response: ", response, error);
    
    if (response) {
      yield put(setPlatformInfoSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
    
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* patchUserProfile(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.userUrl('', '');
    // url = 
    debugLog? console.log("[patchUserProfile] url, action", url, action) : null;

    const userRepo = new UserRepo(url, model = '', false);
    const { response, error } = yield call(userRepo.patchUserProfile, action.params);
    
    debugLog? console.log("[patchUserProfile] call response,  error", {response, error}) : null;
    if (response) {
      yield put(patchUserProfileSuccess(response));
      UserHelper.updateUserProfile(response)
      return { response };
    } else {
      yield put(errorActionSet(error));
      return { error: error.errorResponse };
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error };
  }
}

export function* patchCompanyProfile(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('', '');
    // url = 
    debugLog? console.log("[patchCompanyProfile] url, action", url, action) : null;

    const userRepo = new UserRepo(url, model = '', false);
    const { response, error } = yield call(userRepo.patchCompanyProfile, action.params);
    
    debugLog? console.log("[patchCompanyProfile] call response,  error", {response, error}) : null;
    if (response) {
      yield put(patchCompanyProfileSuccess(response));
      UserHelper.updateUserCompany(response)
      return { response };
    } else {
      yield put(errorActionSet(error));
      return { error: error.errorResponse };
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error };
  }
}

export function* patchProfile(action) {
  try {
    const [callOneParams, callTwoParams] = action.params
    const [responsePatchUser, responsePatchCompany] = yield all([
      call(patchUserProfile, patchUserProfileAction(callOneParams)),
      call(patchCompanyProfile, patchCompanyProfileAction(callTwoParams)),
    ])

    const result = {
      response: [responsePatchUser.response, responsePatchCompany.response].filter((res) => !!res),
      error: [responsePatchUser.error, responsePatchUser.error].filter((res) => !!res),
    }

    debugLog? console.log("[patchProfile] call result", result) : null;

    yield put(patchProfileSuccess(result));
    return result;
  } catch (error) {
    yield put(errorActionSet(error));
    return { error } 
  }
}

function* registerAPNS(){
    try {
        const userRepo = new UserRepo(CONSTANT_URL.APNS, model='', false);

        const deviceId = yield DeviceId.getDeviceId();
        const registration_id = yield LocalStorage.getItem(consts.REGISTRATION_ID)
        if(isSimulator && !registration_id) {
          return;
        }
        let active =true;
        const { response, error } = yield call(userRepo.registerApns.bind(userRepo),registration_id, deviceId, active);

        console.log("[registerAPNS] call response: ", response, error);

        if (response) {
            yield put(registerApnsSuccess(response));
        } else {
            yield put(errorActionSet(error));
        }

    } catch (error) {
        yield put(errorActionSet(error));
    }
}

export function* changePassword(action) {
  try {
    const url = CONSTANT_URL.CHANGE_PASSWORD;
    debugLog? console.log("[changePassword] url, action", url, action) : null;

    const userRepo = new UserRepo(url, model = '', false);
    const { response, error } = yield call(userRepo.changePassword, action.params);
    debugLog? console.log("[changePassword] call response,  error", response, error) : null;

    if (response) {
      yield put(changePasswordSuccess(response));
      return { response };
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* getKyc(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('company_kyc', '');
    debugLog? console.log("[getKyc] url, action", url, action) : null;

    const userRepo = new UserRepo(url, model = '', false);
    const { response, error } = yield call(userRepo.getKyc, action.params);
    
    debugLog? console.log("[getKyc] call response,  error", {response, error}) : null;
    if (response) {
      yield put(getKycSuccess(response));
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* updateKyc(action) {
  try {
    let repo = 'postKyc'
    let urlKey = 'company_kyc'
    if(action.id) {
      urlKey = 'company_kyc_id'
      repo = 'patchKyc'
    }
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl(urlKey, action.id);
    debugLog? console.log("[updateKyc] url, action", url, action) : null;

    const userRepo = new UserRepo(url, model = '', false);
    const { response, error } = yield call(userRepo[repo], action.params);
    
    debugLog? console.log("[updateKyc] call response,  error", {response, error}) : null;
    if (response) {
      yield put(updateKycSuccess(response));
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* getBankDetails(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('bank_details', '');
    debugLog? console.log("[getBankDetails] url, action", url, action) : null;

    const userRepo = new UserRepo(url, model = '', false);
    const { response, error } = yield call(userRepo.getBankDetails, action.params);
    debugLog? console.log("[getBankDetails] call response,  error", {response, error}) : null;

    if (response) {
      yield put(getBankDetailsSuccess(response));
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* updateBankDetails(action) {
  try {
    let repo = 'postBankDetails'
    let urlKey = 'bank_details'
    if(action.id) {
      urlKey = 'bank_details_id'
      repo = 'patchBankDetails'
    }
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl(urlKey, action.id);
    debugLog? console.log("[updateBankDetails] url, action", url, action) : null;

    const userRepo = new UserRepo(url, model = '', false);
    const { response, error } = yield call(userRepo[repo], action.params);
    
    debugLog? console.log("[updateBankDetails] call response,  error", {response, error}) : null;
    if (response) {
      yield put(updateBankDetailsSuccess(response));
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* patchResellCompanyType(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('companytype', UserHelper.getCompanyGroupId());
    let userRepo = new UserRepo(url, model = '', false);
    
    debugLog? console.log('[patchResellCompanyType] url, action', url, action) : null;
    const responsePatchCompany = yield call(userRepo.patchCompanyType, action.params);

    if(responsePatchCompany.error) {
      // there was some error
      yield put(errorActionSet(responsePatchCompany.error));
      console.log("[patchResellCompanyType] error while patching company", responsePatchCompany.error)
      return
    }
    debugLog? console.log('[patchResellCompanyType] patchCompany response', responsePatchCompany) : null;
    
    const resultUserDetails = yield call(getUserDetails,  getUserDetailsAction());
    yield put(patchResellCompanyTypeSuccess(responsePatchCompany.response));

  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getNotificationPreferences(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.userUrl('notification-preference', '');

    debugLog? console.log("[getNotificationPreferences] url, action", url, action) : null;

    const userRepo = new UserRepo(url, model = '', false);
    const { response, error } = yield call(userRepo.getNotificationPreferences, action.params);
    
    debugLog? console.log("[getNotificationPreferences] call response,  error", {response, error}) : null;
    if (response) {
      yield put(getNotificationPreferencesSuccess(response));
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* postNotificationPreferences(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.userUrl('notification-preference', '');

    debugLog? console.log("[postNotificationPreferences] url, action", url, action) : null;

    const userRepo = new UserRepo(url, model = '', false);
    const { response, error } = yield call(userRepo.postNotificationPreferences, action.params);
    
    debugLog? console.log("[postNotificationPreferences] call response,  error", {response, error}) : null;
    if (response) {
      yield put(postNotificationPreferencesSuccess(response));
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* initialRegister(action) {
  const languageId = action.languageId;
  const companyType = action.companyType;
  
  let urlObj = new URLConstants();
  let url = yield urlObj.companyUrl('companytype', UserHelper.getCompanyGroupId());
  let userRepo = new UserRepo(url, model = '', false);
    
  debugLog? console.log('[initialRegister] url, params', url, companyType) : null;

  const result = yield all([
    call(setUserLanguage, setLanguageAction(languageId)),
    call(userRepo.patchCompanyType, companyType),
  ])

  if(result[1] && result[1].response) {
    UserHelper.updateCompanyGroupFlag(result[1].response)
  }

  // patchCompanyTypeResponse
  //{"id":4513,"name":"","city":"-","phone_number":"8418418410","manufacturer":false,"wholesaler_distributor":true,"retailer":true,"online_retailer_reseller":true,"broker":false,"created":"2019-05-03T17:22:48.294161Z","modified":"2019-05-03T17:22:57.695524Z","company":4749}

  const response = result.map(r => r.response)
  const error = result.map(r => r.error)

  yield put(initialRegisterSuccess(response));
}

export default userRootSaga = [
  takeEvery(SET_PLATFORM_INFO_ACTION,             setPlatformInfo),
  takeEvery(PATCH_USER_PROFILE_ACTION,            patchUserProfile),
  takeEvery(PATCH_COMPANY_PROFILE_ACTION,         patchCompanyProfile),
  takeEvery(PATCH_PROFILE_ACTION,                 patchProfile),
  takeEvery(REGISTER_APNS_ACTION,                 registerAPNS),
  takeEvery(CHANGE_PASSWORD_ACTION,               changePassword),
  takeEvery(GET_KYC_ACTION,                       getKyc),
  takeEvery(UPDATE_KYC_ACTION,                    updateKyc),
  takeEvery(GET_BANK_DETAILS_ACTION,              getBankDetails),
  takeEvery(UPDATE_BANK_DETAILS_ACTION,           updateBankDetails),
  takeEvery(PATCH_RESELL_COMPANY_TYPE_ACTION,     patchResellCompanyType),
  takeEvery(GET_NOTIFICATION_PREFERENCES_ACTION,  getNotificationPreferences),
  takeEvery(POST_NOTIFICATION_PREFERENCES_ACTION, postNotificationPreferences),
  takeEvery(INITIAL_REGISTER_ACTION,              initialRegister),
  takeEvery(GET_USER_DETAILS_ACTION,              getUserDetails),
]