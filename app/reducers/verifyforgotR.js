import {
    LOGIN_OTP_USER_DETAILS_FORGOT_ACTION,
    LOGIN_OTP_USER_DETAILS_ACTION_FORGOT_SUCCESS,
} from '../actions/verifyotp-actions';
import { commonErrorReducer } from './errorR';

const initialState = {
    isLoading: false,
    error: {},
    forgotpassworduserInfo: {},
}

const verifyforgotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_OTP_USER_DETAILS_FORGOT_ACTION:
            return {
                ...state,
                isLoading: true
            };
        case LOGIN_OTP_USER_DETAILS_ACTION_FORGOT_SUCCESS:
            return {
                ...state,
                forgotpassworduserInfo: action.forgotpassworduserInfo,
                isLoading: false
            };
        default:
            return commonErrorReducer(state, action);
    }
};

export default verifyforgotReducer;