import {
  GET_PURCHASE_ORDERS_ACTIONS,        GET_PURCHASE_ORDERS_SUCCESS,
  GET_SALES_ORDERS_ACTIONS,           GET_SALES_ORDERS_SUCCESS,
  GET_PURCHASE_ORDER_DETAIL_ACTION,   GET_PURCHASE_ORDER_DETAIL_SUCCESS,
  GET_SALES_ORDER_DETAIL_ACTION,      GET_SALES_ORDER_DETAIL_SUCCESS,
  CANCEL_PURCHASE_ORDER_ACTION,       CANCEL_PURCHASE_ORDER_SUCCESS,
  GET_LEADQUIRY_ACTION,               GET_LEADQUIRY_SUCCESS,
  GET_GROUPED_LEADS_ACTION,           GET_GROUPED_LEADS_SUCCESS,
  GET_COD_RECONFIRMABLE_ORDER_ACTION, GET_COD_RECONFIRMABLE_ORDER_SUCCESS,
  PATCH_PURCHASE_ORDER_ACTION,        PATCH_PURCHASE_ORDER_SUCCESS,
} from "../actions/order-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  isRefreshing: false,
  responseSalesOrders: [],
  responsePurchaseOrders: [],
  responsePurchaseOrderDetail:{},
  responseSalesOrderDetail:{},
  responseGetLeadquiry: [],
  responseGetGroupedLeads: [],
  responseGetCodReconfirmableOrder: [],
  responsePatchPurchaseOrder: {},
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PURCHASE_ORDERS_ACTIONS:
    return {
      ...state,
      [action.isRefreshing? 'isRefreshing' : 'isLoading']: true
    };
    case GET_PURCHASE_ORDERS_SUCCESS:
    return {
      ...state,
      [action.isRefreshing? 'isRefreshing' : 'isLoading']: false,
      responsePurchaseOrders: action.responsePurchaseOrders,
    };
    case GET_SALES_ORDERS_ACTIONS:
    return {
      ...state,
      [action.isRefreshing? 'isRefreshing' : 'isLoading']: true
      
    };
    case GET_SALES_ORDERS_SUCCESS:
    return {
      ...state,
      [action.isRefreshing? 'isRefreshing' : 'isLoading']: false,
      responseSalesOrders: action.responseSalesOrders,
    };
    case GET_PURCHASE_ORDER_DETAIL_ACTION:
    return {
      ...state,
      isLoading:true
    };
    case GET_PURCHASE_ORDER_DETAIL_SUCCESS:
    return {
      ...state,
      isLoading:false,
      responsePurchaseOrderDetail: action.responsePurchaseOrderDetail,
    };
    case GET_SALES_ORDER_DETAIL_ACTION:
    return {
      ...state,
      isLoading:true
    };
    case GET_SALES_ORDER_DETAIL_SUCCESS:
    return {
      ...state,
      isLoading:false,
      responseSalesOrderDetail: action.responseSalesOrderDetail,
    };
    case CANCEL_PURCHASE_ORDER_ACTION:
    return{
      ...state,
      isLoading:true
    };
    case CANCEL_PURCHASE_ORDER_SUCCESS:
    return{
      ...state,
      isLoading:false
    }

    case GET_LEADQUIRY_ACTION:
    return {
      ...state,
    }
    case GET_LEADQUIRY_SUCCESS:
    return {
      ...state,
      responseGetLeadquiry: action.responseGetLeadquiry
    }

    case GET_GROUPED_LEADS_ACTION:
    return {
      ...state,
    }
    case GET_GROUPED_LEADS_SUCCESS:
    return {
      ...state,
      responseGetGroupedLeads: action.responseGetGroupedLeads
    }

    case GET_COD_RECONFIRMABLE_ORDER_ACTION:
    return {
      ...state,
    }
    case GET_COD_RECONFIRMABLE_ORDER_SUCCESS:
    return {
      ...state,
      responseGetCodReconfirmableOrder: action.responseGetCodReconfirmableOrder,
    }

    case PATCH_PURCHASE_ORDER_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case PATCH_PURCHASE_ORDER_SUCCESS:
    return {
      ...state,
      responsePatchPurchaseOrder: action.responsePatchPurchaseOrder,
      isLoading: false,
    }

    default:
    return commonErrorReducer(state, action);
  }
};

export default ordersReducer;