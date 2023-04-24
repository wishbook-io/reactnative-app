import * as errorHandlerPlaygroundActions from "../actions/errorhandlerplayground-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
};

const errorHandlerReducer = (state = initialState, action) => {
  switch (action.type) {

    case "TEST_ERROR_500":
    case "TEST_ERROR_CODE":
    case "TEST_ERROR_400":
    case "TEST_ERROR_NOTIFY":
    case "TEST_DJANGO_B2B_500":
    case "TEST_MULTIPLE_400":
    return {
      ...state,
      isLoading: true,
    }

    default:
    return commonErrorReducer(state, action);
  }
};

export default errorHandlerReducer;