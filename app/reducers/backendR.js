import {
  POST_CONTACTS_ACTION,       POST_CONTACTS_SUCCESS,
  POST_LOCATION_ACTION,       POST_LOCATION_SUCCESS,
  GET_APP_VERSION_ACTION,     GET_APP_VERSION_SUCCESS,
  POST_USER_PLATFORM_ACTION,  POST_USER_PLATFORM_SUCCESS,
} from "../actions/backend-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  responsePostContacts: [],
  responsePostLocation: [],
  responseGetAppVersion: [],
  responsePostUserPlatform: {},
};

const backendReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case POST_CONTACTS_ACTION:
    return {
      ...state,
    };
    case POST_CONTACTS_SUCCESS:
    return {
      ...state,
      responsePostContacts: action.responsePostContacts,
    };

    case POST_LOCATION_ACTION:
    return {
      ...state,
    };
    case POST_LOCATION_SUCCESS:
    return {
      ...state,
      responsePostLocation: action.responsePostLocation,
    };

    case GET_APP_VERSION_ACTION:
    return {
      ...state,
    }
    case GET_APP_VERSION_SUCCESS:
    return {
      ...state,
      responseGetAppVersion: action.responseGetAppVersion,
    }

    case POST_USER_PLATFORM_ACTION:
    return {
      ...state,
    }
    case POST_USER_PLATFORM_SUCCESS:
    return {
      ...state,
      responsePostUserPlatform: action.responsePostUserPlatform,
    }

    default:
    return commonErrorReducer(state, action);
  }
};

export default backendReducer;