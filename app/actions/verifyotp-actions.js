export const LOGIN_OTP_PASSWORD_ACTION = "LOGIN_OTP_PASSWORD_ACTION";
export const LOGIN_OTP_PASSWORD_ACTION_SUCCESS = "LOGIN_OTP_PASSWORD_ACTION_SUCCESS";

export const LOGIN_OTP_FORGOT_PASSWORD_ACTION = "LOGIN_OTP_FORGOT_PASSWORD_ACTION";
export const LOGIN_OTP_FORGOT_PASSWORD_ACTION_SUCCESS = "LOGIN_OTP_FORGOT_PASSWORD_ACTION_SUCCESS";

export const LOGIN_OTP_RESEND_ACTION = "LOGIN_OTP_RESEND_ACTION";
export const LOGIN_OTP_RESEND_ACTION_SUCCESS = "LOGIN_OTP_RESEND_ACTION_SUCCESS";

export const LOGIN_OTP_USER_DETAILS_ACTION = "LOGIN_OTP_USER_DETAILS_ACTION";
export const LOGIN_OTP_USER_DETAILS_ACTION_SUCCESS = "LOGIN_OTP_USER_DETAILS_ACTION_SUCCESS";

export const LOGIN_OTP_USER_DETAILS_FORGOT_ACTION = "LOGIN_OTP_USER_DETAILS_FORGOT_ACTION";
export const LOGIN_OTP_USER_DETAILS_ACTION_FORGOT_SUCCESS = "LOGIN_OTP_USER_DETAILS_ACTION_FORGOT_SUCCESS";

export const FORGOT_OTP_REQUEST_ACTION = "FORGOT_OTP_REQUEST_ACTION";
export const FORGOT_OTP_REQUEST_SUCCESS = "FORGOT_OTP_REQUEST_SUCCESS";

export const FORGOT_REQUEST_ACTION = "FORGOT_REQUEST_ACTION";
export const FORGOT_REQUEST_SUCCESS = "FORGOT_REQUEST_SUCCESS";

export const loginWithOTPPassword = (loginType, phone_number, country, otp, password, token, errorKey, errorProcess) => ({
    type: LOGIN_OTP_PASSWORD_ACTION,
    loginType: loginType,
    phone_number: phone_number,
    country: country,
    otp: otp,
    password: password,
    token,
    errorKey,
    errorProcess,
});

export const loginWithOTPPasswordSuccess = (responseKey) => ({
    type: LOGIN_OTP_PASSWORD_ACTION_SUCCESS,
    responseKey
});

export const loginWithOTPForgotPassword = (loginType, phone_number, country, otp, password) => ({
    type: LOGIN_OTP_FORGOT_PASSWORD_ACTION,
    loginType: loginType,
    phone_number: phone_number,
    country: country,
    otp: otp,
    password: password,
});

export const loginWithOTPForgotPasswordSuccess = (forgotresponseKey) => ({
    type: LOGIN_OTP_FORGOT_PASSWORD_ACTION_SUCCESS,
    forgotresponseKey
});

export const getLoginOTPAuthAction = (phone_number, country) => ({
    type: LOGIN_OTP_RESEND_ACTION,
    phone_number: phone_number,
    country: country
});

export const setLoginOTPAuthSuccess = (authenticationModel) => ({
    type: LOGIN_OTP_RESEND_ACTION_SUCCESS,
    authenticationModel: authenticationModel
});

export const setUserDetailsSuccess = (userInfo) => ({
    type: LOGIN_OTP_USER_DETAILS_ACTION_SUCCESS,
    userInfo: userInfo
});

export const getUserDetailsForgotAction = () => ({
    type: LOGIN_OTP_USER_DETAILS_FORGOT_ACTION
});

export const setUserDetailsForgotSuccess = (forgotpassworduserInfo) => ({
    type: LOGIN_OTP_USER_DETAILS_ACTION_FORGOT_SUCCESS,
    forgotpassworduserInfo: forgotpassworduserInfo
});

export const getResetPasswordOTPAction = (country, phone_number) => ({
    type: FORGOT_OTP_REQUEST_ACTION,
    country: country,
    phone_number: phone_number
});

export const setResetPasswordOTPSuccess = (responseForgetaction) => ({
    type: FORGOT_OTP_REQUEST_SUCCESS,
    responseForgetaction: responseForgetaction
});

export const getResetPasswordAction = (otp, password, country, phone_number) => ({
    type: FORGOT_REQUEST_ACTION,
    otp: otp,
    password, password,
    country: country,
    phone_number: phone_number
});

export const setResetPasswordSuccess = (responseForgetpassword) => ({
    type: FORGOT_REQUEST_SUCCESS,
    responseForgetpassword: responseForgetpassword
});