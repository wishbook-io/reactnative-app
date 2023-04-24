export const GET_USER_DETAILS_ACTION = 'GET_USER_DETAILS_ACTION';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';

export const SET_PLATFORM_INFO_ACTION = "SET_PLATFORM_INFO_ACTION";
export const SET_PLATFORM_INFO_SUCCESS = "SET_PLATFORM_INFO_SUCCESS";

export const REGISTER_APNS_ACTION="REGISTER_APNS_ACTION";
export const REGISTER_APNS_SUCCESS="REGISTER_APNS_SUCCESS";

export const PATCH_USER_PROFILE_ACTION = 'PATCH_USER_PROFILE_ACTION';
export const PATCH_USER_PROFILE_SUCCESS = 'PATCH_USER_PROFILE_SUCCESS';

export const PATCH_COMPANY_PROFILE_ACTION = 'PATCH_COMPANY_PROFILE_ACTION';
export const PATCH_COMPANY_PROFILE_SUCCESS = 'PATCH_COMPANY_PROFILE_SUCCESS';

export const PATCH_PROFILE_ACTION = 'PATCH_PROFILE_ACTION';
export const PATCH_PROFILE_SUCCESS = 'PATCH_PROFILE_SUCCESS';

export const CHANGE_PASSWORD_ACTION = 'CHANGE_PASSWORD_ACTION';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';

export const GET_KYC_ACTION = 'GET_KYC_ACTION';
export const GET_KYC_SUCCESS = 'GET_KYC_SUCCESS';

export const UPDATE_KYC_ACTION = 'UPDATE_KYC_ACTION';
export const UPDATE_KYC_SUCCESS = 'UPDATE_KYC_SUCCESS';

export const GET_BANK_DETAILS_ACTION = 'GET_BANK_DETAILS_ACTION';
export const GET_BANK_DETAILS_SUCCESS = 'GET_BANK_DETAILS_SUCCESS';

export const UPDATE_BANK_DETAILS_ACTION = 'UPDATE_BANK_DETAILS_ACTION';
export const UPDATE_BANK_DETAILS_SUCCESS = 'UPDATE_BANK_DETAILS_SUCCESS';

export const PATCH_RESELL_COMPANY_TYPE_ACTION = 'PATCH_RESELL_COMPANY_TYPE_ACTION';
export const PATCH_RESELL_COMPANY_TYPE_SUCCESS = 'PATCH_RESELL_COMPANY_TYPE_SUCCESS';

export const GET_NOTIFICATION_PREFERENCES_ACTION = 'GET_NOTIFICATION_PREFERENCES_ACTION';
export const GET_NOTIFICATION_PREFERENCES_SUCCESS = 'GET_NOTIFICATION_PREFERENCES_SUCCESS';

export const POST_NOTIFICATION_PREFERENCES_ACTION = 'POST_NOTIFICATION_PREFERENCES_ACTION';
export const POST_NOTIFICATION_PREFERENCES_SUCCESS = 'POST_NOTIFICATION_PREFERENCES_SUCCESS';

export const INITIAL_REGISTER_ACTION = 'INITIAL_REGISTER_ACTION';
export const INITIAL_REGISTER_SUCCESS = 'INITIAL_REGISTER_SUCCESS';

export const getUserDetailsAction = (showLoading = true) => ({
  type: GET_USER_DETAILS_ACTION,
  showLoading,
});

export const getUserDetailsSuccess = (responseGetUserDetails, hideLoading) => ({
  type: GET_USER_DETAILS_SUCCESS,
  responseGetUserDetails,
  hideLoading,
});

export const setPlatformInfoAction = () => ({
  type: SET_PLATFORM_INFO_ACTION,
});

export const setPlatformInfoSuccess = (responsePlatformInfo) => ({
  type: SET_PLATFORM_INFO_SUCCESS,
  responsePlatformInfo,
});

export const registerApnsAction = () =>({
    type:REGISTER_APNS_ACTION,
})

export const registerApnsSuccess = (responseApns) =>({
    type:REGISTER_APNS_SUCCESS,
    responseApns
})
export const patchProfileAction = (params) => ({
  type: PATCH_PROFILE_ACTION,
  params,
});

export const patchProfileSuccess = (responsePatchProfile) => ({
  type: PATCH_PROFILE_SUCCESS,
  responsePatchProfile,
});

export const patchUserProfileAction = (params) => ({
  type: PATCH_USER_PROFILE_ACTION,
  params,
});

export const patchUserProfileSuccess = (responsePatchUserProfile) => ({
  type: PATCH_USER_PROFILE_SUCCESS,
  responsePatchUserProfile,
});

export const patchCompanyProfileAction = (params) => ({
  type: PATCH_COMPANY_PROFILE_ACTION,
  params,
});

export const patchCompanyProfileSuccess = (responsePatchCompanyProfile) => ({
  type: PATCH_COMPANY_PROFILE_SUCCESS,
  responsePatchCompanyProfile,
})

export const changePasswordAction = (params) => ({
  type: CHANGE_PASSWORD_ACTION,
  params,
});

export const changePasswordSuccess = (responseChangePassword) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  responseChangePassword,
});

export const getKycAction = (params) => ({
  type: GET_KYC_ACTION,
  params,
});

export const getKycSuccess = (responseGetKyc) => ({
  type: GET_KYC_SUCCESS,
  responseGetKyc,
});

export const updateKycAction = (params, id) => ({
  type: UPDATE_KYC_ACTION,
  params,
  id,
});

export const updateKycSuccess = (responseUpdateKyc) => ({
  type: UPDATE_KYC_SUCCESS,
  responseUpdateKyc,
});

export const getBankDetailsAction = (params) => ({
  type: GET_BANK_DETAILS_ACTION,
  params,
});

export const getBankDetailsSuccess = (responseGetBankDetails) => ({
  type: GET_BANK_DETAILS_SUCCESS,
  responseGetBankDetails,
});

export const updateBankDetailsAction = (params, id) => ({
  type: UPDATE_BANK_DETAILS_ACTION,
  params,
  id,
});

export const updateBankDetailsSuccess = (responseUpdateBankDetails) => ({
  type: UPDATE_BANK_DETAILS_SUCCESS,
  responseUpdateBankDetails,
});

export const patchResellCompanyTypeAction = (params) => ({
  type: PATCH_RESELL_COMPANY_TYPE_ACTION,
  params,
});

export const patchResellCompanyTypeSuccess = (responsePatchResellCompanyType) => ({
  type: PATCH_RESELL_COMPANY_TYPE_SUCCESS,
  responsePatchResellCompanyType,
});

export const getNotificationPreferencesAction = (params) => ({
  type: GET_NOTIFICATION_PREFERENCES_ACTION,
  params,
});

export const getNotificationPreferencesSuccess = (responseGetNotificationPreferences) => ({
  type: GET_NOTIFICATION_PREFERENCES_SUCCESS,
  responseGetNotificationPreferences,
});

export const postNotificationPreferencesAction = (params) => ({
  type: POST_NOTIFICATION_PREFERENCES_ACTION,
  params,
});

export const postNotificationPreferencesSuccess = (responsePostNotificationPreferences) => ({
  type: POST_NOTIFICATION_PREFERENCES_SUCCESS,
  responsePostNotificationPreferences,
});

export const initialRegisterAction = (params={}) => ({
  type: INITIAL_REGISTER_ACTION,
  ...params,
});

export const initialRegisterSuccess = (responseInitialRegister) => ({
  type: INITIAL_REGISTER_SUCCESS,
  responseInitialRegister,
});