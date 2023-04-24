import {
  GET_USER_DETAILS_ACTION,              GET_USER_DETAILS_SUCCESS,
  SET_PLATFORM_INFO_ACTION,             SET_PLATFORM_INFO_SUCCESS,
  PATCH_USER_PROFILE_ACTION,            PATCH_USER_PROFILE_SUCCESS,
  PATCH_COMPANY_PROFILE_ACTION,         PATCH_COMPANY_PROFILE_SUCCESS,
  PATCH_PROFILE_ACTION,                 PATCH_PROFILE_SUCCESS,
  CHANGE_PASSWORD_ACTION,               CHANGE_PASSWORD_SUCCESS,
  GET_KYC_ACTION,                       GET_KYC_SUCCESS,
  UPDATE_KYC_ACTION,                    UPDATE_KYC_SUCCESS,
  GET_BANK_DETAILS_ACTION,              GET_BANK_DETAILS_SUCCESS,
  UPDATE_BANK_DETAILS_ACTION,           UPDATE_BANK_DETAILS_SUCCESS,
  PATCH_RESELL_COMPANY_TYPE_ACTION,     PATCH_RESELL_COMPANY_TYPE_SUCCESS,
  GET_NOTIFICATION_PREFERENCES_ACTION,  GET_NOTIFICATION_PREFERENCES_SUCCESS,
  POST_NOTIFICATION_PREFERENCES_ACTION, POST_NOTIFICATION_PREFERENCES_SUCCESS,
  INITIAL_REGISTER_ACTION,              INITIAL_REGISTER_SUCCESS,
} from "../actions/user-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  responseGetUserDetails: {},
  responsePlatformInfo: {},
  responsePatchUserProfile: {},
  responsePatchCompanyProfile: {},
  responsePatchProfile: {},
  responseGetKyc: [],
  responseUpdateKyc: [],
  responseGetBankDetails: [],
  responseUpdateBankDetails: [],
  responsePatchResellCompanyType: {},
  responseGetNotificationPreferences: [],
  responseInitialRegister: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_USER_DETAILS_ACTION:
    return {
      ...state,
      isLoading: action.showLoading? true : state.isLoading,
    }
    case GET_USER_DETAILS_SUCCESS:
    return {
      ...state,
      responseGetUserDetails: action.responseGetUserDetails,
      isLoading: action.hideLoading? false : state.isLoading,
    }
    
    case SET_PLATFORM_INFO_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case SET_PLATFORM_INFO_SUCCESS:
    return {
      ...state,
      isLoading: false,
      responsePlatformInfo: action.responsePlatformInfo,
    };

    case PATCH_USER_PROFILE_ACTION:
    return {
      ...state,
    }
    case PATCH_USER_PROFILE_SUCCESS:
    return {
      ...state,
      responsePatchUserProfile: action.responsePatchUserProfile
    }

    case PATCH_COMPANY_PROFILE_ACTION:
    return {
      ...state,
    }
    case PATCH_COMPANY_PROFILE_SUCCESS:
    return {
      ...state,
      responsePatchCompanyProfile: action.responsePatchCompanyProfile
    }

    case PATCH_PROFILE_ACTION:
    return {
      ...state,
    }
    case PATCH_PROFILE_SUCCESS:
    return {
      ...state,
      responsePatchProfile: action.responsePatchProfile
    }

    case CHANGE_PASSWORD_ACTION:
    return {
      ...state,
    }
    case CHANGE_PASSWORD_SUCCESS:
    return {
      ...state,
      responseChangePassword: action.responseChangePassword
    }

    case GET_KYC_ACTION:
    return {
      ...state,
    }
    case GET_KYC_SUCCESS:
    return {
      ...state,
      responseGetKyc: action.responseGetKyc
    }

    case UPDATE_KYC_ACTION:
    return {
      ...state,
    }
    case UPDATE_KYC_SUCCESS:
    return {
      ...state,
      responseUpdateKyc: action.responseUpdateKyc
    }

    case GET_BANK_DETAILS_ACTION:
    return {
      ...state,
    }
    case GET_BANK_DETAILS_SUCCESS:
    return {
      ...state,
      responseGetBankDetails: action.responseGetBankDetails
    }

    case UPDATE_BANK_DETAILS_ACTION:
    return {
      ...state,
    }
    case UPDATE_BANK_DETAILS_SUCCESS:
    return {
      ...state,
      responseUpdateBankDetails: action.responseUpdateBankDetails
    }

    case PATCH_RESELL_COMPANY_TYPE_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case PATCH_RESELL_COMPANY_TYPE_SUCCESS:
    return {
      ...state,
      responsePatchResellCompanyType: action.responsePatchResellCompanyType,
      isLoading: false,
    }
    
    case GET_NOTIFICATION_PREFERENCES_ACTION:
    return {
      ...state,
    }
    case GET_NOTIFICATION_PREFERENCES_SUCCESS:
    return {
      ...state,
      responseGetNotificationPreferences: action.responseGetNotificationPreferences
    }

    case POST_NOTIFICATION_PREFERENCES_ACTION:
    return {
      ...state,
    }
    case POST_NOTIFICATION_PREFERENCES_SUCCESS:
    return {
      ...state,
      responsePostNotificationPreferences: action.responsePostNotificationPreferences
    }

    case INITIAL_REGISTER_ACTION:
    return {
      ...state,
    }
    case INITIAL_REGISTER_SUCCESS:
    return {
      ...state,
      responseInitialRegister: action.responseInitialRegister
    }

    default:
    return commonErrorReducer(state, action);
  }
};

export default userReducer;