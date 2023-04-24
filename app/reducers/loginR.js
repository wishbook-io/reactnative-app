import {
  GET_COUNTRIES_ACTION,           GET_COUNTRIES_SUCCESS,          CHANGE_COUNTRY_LABEL,
  LOGIN_AUTH_ACTION,              LOGIN_AUTH_SUCCESS,
  LOGOUT_ACTION,                  LOGOUT_SUCCESS,                 CLEAR_LOGOUT_SUCCESS,
  GUEST_USER_REGISTRATION_ACTION, GUEST_USER_REGISTRATION_SUCCESS
} from "../actions/login-actions";
import {commonErrorReducer} from './errorR';

const initialState = {
  countries: [],
  error: {},
  countryIndex: 0,
  countryLabel: '',
  isLoading: false,
  authenticationModel: {},
  response_registration:{},
  responseLogout: {},
};


const loginReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_COUNTRIES_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_COUNTRIES_SUCCESS:
    return {
      ...state,
      countries: action.countries,
      isLoading: false
    };

    case CHANGE_COUNTRY_LABEL:
    return {
      ...state,
      countryIndex: action.countryIndex
    };

    case LOGIN_AUTH_ACTION:
    return {
      ...state,
      isLoading: true
    };
    case LOGIN_AUTH_SUCCESS:
    return {
      ...state,
      authenticationModel: action.authenticationModel,
      isLoading: false
    };

    case LOGOUT_ACTION:
    return {
      ...state,
      isLoading: true
    }
    case LOGOUT_SUCCESS:
    return {
      ...state,
      responseLogout: action.responseLogout,
      isLoading: false
    }
    case CLEAR_LOGOUT_SUCCESS:
    return {
      ...state,
      responseLogout: {},
    }

    case GUEST_USER_REGISTRATION_SUCCESS:
    return{
      ...state,
      response_registration:action.response_registration
    }

    default:
    return commonErrorReducer(state, action);
  }
};


export default loginReducer;