import _ from 'lodash';

import {
  GET_ADDRESS_ACTION,                 GET_ADDRESS_SUCCESS,
  ADD_ADDRESS_ACTION,                 ADD_ADDRESS_SUCCESS,
  INITIALIZE_SHIPPING_DETAILS_ACTION, INITIALIZE_SHIPPING_DETAILS_SUCCESS,
  UPDATE_ADDRESS_ACTION,               UPDATE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_ACTION,              DELETE_ADDRESS_SUCCESS,
  GET_SHIPPING_CHARGES_ACTION,        GET_SHIPPING_CHARGES_SUCCESS,
  SELECT_SHIPPING_ADDRESS_ACTION,     SELECT_SHIPPING_ADDRESS_SUCCESS,
  PATCH_SHIPPING_CHARGES_ACTION,      PATCH_SHIPPING_CHARGES_SUCCESS,
  GET_PAYMENT_MODES_ACTION,           GET_PAYMENT_MODES_SUCCESS,
  OFFLINE_PAYMENT_ACTION,             OFFLINE_PAYMENT_SUCCESS,
  GET_CASHFREE_TOKEN_DATA_ACTION,     GET_CASHFREE_TOKEN_DATA_SUCCESS,
  PATCH_DISPLAY_AMOUNT_ACTION,        PATCH_DISPLAY_AMOUNT_SUCCESS,
  PATCH_RESELLER_TOTAL_AMOUNT_ACTION, PATCH_RESELLER_TOTAL_AMOUNT_SUCCESS,
  GET_PINCODES_ACTION,                GET_PINCODES_SUCCESS,
  GET_DELIVERY_INFO_ACTION,           GET_DELIVERY_INFO_SUCCESS,            GET_DELIVERY_INFO_FAILURE
} from "../actions/shipay-actions";
import { commonErrorReducer } from './errorR';
import { ERROR_HANDLER } from '../actions/error-actions';

const initialState = {
  error: {},
  isLoading: false,
  responseInitializeShippingDetails: [],
  responseGetAddress: [],
  responseUpdateAddress: [],
  responseDeleteAddress: [],
  responseGetShippingCharges: [],
  responseSelectShippingAddress: [],
  responseGetPaymentModes: [],
  responseGetPincodes: [],
  responsePatchResellerTotalAmount: {},
  responseGetDeliveryInfo: {},
  loadingDeliveryInfo: false,
};

const shipayReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case INITIALIZE_SHIPPING_DETAILS_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case INITIALIZE_SHIPPING_DETAILS_SUCCESS:
    return {
      ...state,
      responseInitializeShippingDetails: action.responseInitializeShippingDetails,
      isLoading: false,
    }

    case GET_ADDRESS_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case GET_ADDRESS_SUCCESS:
    return {
      ...state,
      responseGetAddress: action.responseGetAddress,
      isLoading: false,
    }

    case UPDATE_ADDRESS_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case UPDATE_ADDRESS_SUCCESS:
    return {
      ...state,
      responseUpdateAddress: action.responseUpdateAddress,
      isLoading: false,
    }

    case DELETE_ADDRESS_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case DELETE_ADDRESS_SUCCESS:
    return {
      ...state,
      responseDeleteAddress: action.responseDeleteAddress,
      isLoading: false,
    }

    case GET_SHIPPING_CHARGES_ACTION:
    return {
      ...state,
    }
    case GET_SHIPPING_CHARGES_SUCCESS:
    return {
      ...state,
      responseGetShippingCharges: action.responseGetShippingCharges
    }

    case SELECT_SHIPPING_ADDRESS_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case SELECT_SHIPPING_ADDRESS_SUCCESS:
    return {
      ...state,
      responseSelectShippingAddress: action.responseSelectShippingAddress,
      isLoading: false,
    }

    case PATCH_SHIPPING_CHARGES_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case PATCH_SHIPPING_CHARGES_SUCCESS:
    return {
      ...state,
      responsePatchShippingCharges: action.responsePatchShippingCharges,
      isLoading: false,
    }
    
    case GET_PAYMENT_MODES_ACTION:
    return {
      ...state,
    }
    case GET_PAYMENT_MODES_SUCCESS:
    return {
      ...state,
      responseGetPaymentModes: action.responseGetPaymentModes
    }

    case OFFLINE_PAYMENT_ACTION:
    return {
      ...state,
    }
    case OFFLINE_PAYMENT_SUCCESS:
    return {
      ...state,
      responseOfflinePayment: action.responseOfflinePayment
    }

    case GET_CASHFREE_TOKEN_DATA_ACTION:
    return {
      ...state,
    }
    case GET_CASHFREE_TOKEN_DATA_SUCCESS:
    return {
      ...state,
      responseGetCashfreeTokenData: action.responseGetCashfreeTokenData
    }
    
    case PATCH_DISPLAY_AMOUNT_ACTION:
    return {
      ...state,
    }
    case PATCH_DISPLAY_AMOUNT_SUCCESS:
    return {
      ...state,
      responsePatchDisplayAmount: action.responsePatchDisplayAmount
    }

    case PATCH_RESELLER_TOTAL_AMOUNT_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case PATCH_RESELLER_TOTAL_AMOUNT_SUCCESS:
    return {
      ...state,
      responsePatchResellerTotalAmount: action.responsePatchResellerTotalAmount,
      isLoading: false,
    }

    case GET_PINCODES_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case GET_PINCODES_SUCCESS:
    return {
      ...state,
      responseGetPincodes: action.responseGetPincodes,
      isLoading: false,
    }

    case GET_DELIVERY_INFO_ACTION:
    return {
      ...state,
      loadingDeliveryInfo: true,
    }
    case GET_DELIVERY_INFO_SUCCESS:
    return {
      ...state,
      responseGetDeliveryInfo: action.responseGetDeliveryInfo,
      loadingDeliveryInfo: false,
    }
    case GET_DELIVERY_INFO_FAILURE:
    return {
      ...state,
      loadingDeliveryInfo: false,
    }

    case ERROR_HANDLER:
    return {
      ...state,
      isLoading: false,
      loadingDeliveryInfo: false,
    }

    default:
    return state
  }
};

export default shipayReducer;