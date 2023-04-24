export const GET_COUNTRIES_ACTION = "GET_COUNTRIES_ACTION";
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
export const CHANGE_COUNTRY_LABEL = "CHANGE_COUNTRY_LABEL";

export const LOGIN_AUTH_ACTION = "LOGIN_AUTH_ACTION";
export const LOGIN_AUTH_SUCCESS = "LOGIN_AUTH_SUCCESS";

export const LOGOUT_ACTION = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const CLEAR_LOGOUT_SUCCESS = "CLEAR_LOGOUT_SUCCESS";

export const GET_USER_COMPANY_INFO_ACTION = "GET_USER_COMPANY_INFO_ACTION";
export const GET_USER_COMPANY_INFO_SUCCESS = "GET_USER_COMPANY_INFO_SUCCESS";

export const GUEST_USER_REGISTRATION_ACTION = "GUEST_USER_REGISTRATION_ACTION";
export const GUEST_USER_REGISTRATION_SUCCESS = "GUEST_USER_REGISTRATION_SUCCESS";

export const getCountriesAction = () => ({
  type: GET_COUNTRIES_ACTION,
});


export const setCountriesSuccess = (countries) => ({
  type: GET_COUNTRIES_SUCCESS,
  countries
});

export const changeCountryLabel = (countryIndex) => ({
  type: CHANGE_COUNTRY_LABEL,
  countryIndex
});

export const getLoginAuthAction = (phone_number, country, registration_id) => ({
  type: LOGIN_AUTH_ACTION,
  phone_number: phone_number,
  country: country,
  registration_id: registration_id
});

export const setLoginAuthSuccess = (authenticationModel) => ({
  type: LOGIN_AUTH_SUCCESS,
  authenticationModel: authenticationModel,
});

export const logoutAction = (params = {}) => ({
  type: LOGOUT_ACTION,
  ...params,
});

export const logoutSuccess = (responseLogout) => ({
  type: LOGOUT_SUCCESS,
  responseLogout,
});

export const clearLogoutSuccess = () => ({
  type: CLEAR_LOGOUT_SUCCESS,
});

export const getUserCompanyInfoAction = (id) =>({
  type:GET_USER_COMPANY_INFO_ACTION,
  id:id
})

export const getUserCompanyInfoSucess = (responseUserCompanyInfo) =>({
  type:GET_USER_COMPANY_INFO_SUCCESS,
  responseUserCompanyInfo
})

export const guestUserRegistrationAction = (params)=>({
  type:GUEST_USER_REGISTRATION_ACTION,
  params
})

export const guestUserRegistrationSuccess = (response_registration) =>({
  type:GUEST_USER_REGISTRATION_SUCCESS,
  response_registration
})