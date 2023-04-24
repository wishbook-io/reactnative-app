import {
  ERROR_HANDLER,
  SET_ERROR_FOR_ERROR_KEY,  CLEAR_ERROR_FOR_ERROR_KEY
} from "../actions/error-actions";

const initialState = {
  error: {},
  isLoading: false,
  errorActionType: '',
};

const errorHandlerReducer = (state = initialState, action) => {
  switch (action.type) {

    case ERROR_HANDLER:
    // console.log("[errorHandlerReducer] error:", action.error);
    return {
      ...state,
      error: action.error,
      errorActionType: action.errorActionType,
    }

    case SET_ERROR_FOR_ERROR_KEY:
    // console.log("[errorHandlerReducer:setError] error:", action.error);
    return {
      ...state,
      [action.key]: action.error,
    }

    case CLEAR_ERROR_FOR_ERROR_KEY:
    // console.log("[errorHandlerReducer:clearError] error:", action.error);
    return {
      ...state,
      [action.key]: undefined,
    }

    default:
    return {
      ...state,
    }
  }
};

export default errorHandlerReducer;