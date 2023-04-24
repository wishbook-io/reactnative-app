import {
  LIST_DISCOUNT_ACTION,       LIST_DISCOUNT_SUCCESS,
  GET_DISCOUNT_ACTION,        GET_DISCOUNT_SUCCESS,
  UPDATE_DISCOUNT_ACTION,      UPDATE_DISCOUNT_SUCCESS,
  LIST_USED_DISCOUNT_ACTION,  LIST_USED_DISCOUNT_SUCCESS,
} from "../actions/discount-actions";
import { ERROR_HANDLER } from '../actions/error-actions';

const initialState = {
  error: {},
  isLoading: false,
  isRefreshing: false,
  responseListDiscount: [],
  responseGetDiscount: {},
  responseUpdateDiscount: {},
  responseListUsedDiscount: [],
};

const discountReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case LIST_DISCOUNT_ACTION:
    return {
      ...state,
      [action.refresh? 'isRefreshing' : 'isLoading']: true,
    }
    case LIST_DISCOUNT_SUCCESS:
    return {
      ...state,
      responseListDiscount: action.responseListDiscount,
      [action.refresh? 'isRefreshing' : 'isLoading']: false,
    }

    case GET_DISCOUNT_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case GET_DISCOUNT_SUCCESS:
    return {
      ...state,
      responseGetDiscount: action.responseGetDiscount,
      isLoading: false,
    }

    case UPDATE_DISCOUNT_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case UPDATE_DISCOUNT_SUCCESS:
    return {
      ...state,
      responseUpdateDiscount: action.responseUpdateDiscount,
      isLoading: false,
    }

    case LIST_USED_DISCOUNT_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case LIST_USED_DISCOUNT_SUCCESS:
    return {
      ...state,
      responseListUsedDiscount: action.responseListUsedDiscount,
      isLoading: false,
    }

    case ERROR_HANDLER:
    return {
      ...state,
      isLoading: false,
      isRefreshing: false,
    }
    
    default:
    return state;
  }
};

export default discountReducer;