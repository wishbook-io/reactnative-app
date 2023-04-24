import {
  GET_BUYER_DASHBOARD_ACTION,           GET_BUYER_DASHBOARD_SUCCESS,
  GET_SELLER_DASHBOARD_ACTION,          GET_SELLER_DASHBOARD_SUCCESS,
  GET_ORDER_ENQUIRY_STATISTICS_ACTION,  GET_ORDER_ENQUIRY_STATISTICS_SUCCESS,
  GET_CONFIG_ACTION,                    GET_CONFIG_SUCCESS,
  SET_UNREAD_NOTIFICATIONS_ACTION,      SET_UNREAD_NOTIFICATIONS_SUCCESS,
} from "../actions/dashboard-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  responseBuyerDashboard: [],
  responseSellerDashboard: [],
  responseStatistics: {},
  responseGetConfig: [],
  notificationCount: 0,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUYER_DASHBOARD_ACTION:
    return {
      ...state,
    };
    case GET_BUYER_DASHBOARD_SUCCESS:
    return {
      ...state,
      responseBuyerDashboard: action.responseBuyerDashboard,
    };
    case GET_SELLER_DASHBOARD_ACTION:
    return {
      ...state,
    };
    case GET_SELLER_DASHBOARD_SUCCESS:
    return {
      ...state,
      responseSellerDashboard: action.responseSellerDashboard,
    };
    case GET_ORDER_ENQUIRY_STATISTICS_ACTION:
    return {
      ...state,
    }    
    case GET_ORDER_ENQUIRY_STATISTICS_SUCCESS:
    return {
      ...state,
      responseStatistics: action.responseStatistics
    }

    case GET_CONFIG_ACTION:
    return {
      ...state,
    }
    case GET_CONFIG_SUCCESS:
    return {
      ...state,
      responseGetConfig: action.responseGetConfig
    }

    case SET_UNREAD_NOTIFICATIONS_ACTION:
    return {
      ...state,
    }
    case SET_UNREAD_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      notificationCount: action.count
    }

    default:
    return commonErrorReducer(state, action);
  }
};

export default dashboardReducer;