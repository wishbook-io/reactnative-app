import {
  GET_CREDIT_LINE_ACTION, GET_CREDIT_LINE_SUCCESS,
  GET_CREDIT_RATING_ACTION, GET_CREDIT_RATING_SUCCESS,
} from "../actions/credit-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  responseGetCreditLine: [],
  responseGetCreditRating: [],
};

const creditReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_CREDIT_LINE_ACTION:
    return {
      ...state,
    }
    case GET_CREDIT_LINE_SUCCESS:
    return {
      ...state,
      responseGetCreditLine: action.responseGetCreditLine
    }
    
    case GET_CREDIT_RATING_ACTION:
    return {
      ...state,
    }
    case GET_CREDIT_RATING_SUCCESS:
    return {
      ...state,
      responseGetCreditRating: action.responseGetCreditRating
    }

    default:
    return commonErrorReducer(state, action);
  }
};



export default creditReducer;