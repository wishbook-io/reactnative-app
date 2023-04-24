export const GET_BUYER_DASHBOARD_ACTION = "GET_BUYER_DASHBOARD_ACTION";
export const GET_BUYER_DASHBOARD_SUCCESS = "GET_BUYER_DASHBOARD_SUCCESS";

export const GET_SELLER_DASHBOARD_ACTION = "GET_SELLER_DASHBOARD_ACTION";
export const GET_SELLER_DASHBOARD_SUCCESS = "GET_SELLER_DASHBOARD_SUCCESS";

export const GET_ORDER_ENQUIRY_STATISTICS_ACTION ='GET_ORDER_ENQUIRY_STATISTICS_ACTION'
export const GET_ORDER_ENQUIRY_STATISTICS_SUCCESS = 'GET_ORDER_ENQUIRY_STATISTICS_SUCCESS'

export const GET_CONFIG_ACTION = 'GET_CONFIG_ACTION';
export const GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS';

export const SET_UNREAD_NOTIFICATIONS_ACTION = 'SET_UNREAD_NOTIFICATIONS_ACTION';
export const SET_UNREAD_NOTIFICATIONS_SUCCESS = 'SET_UNREAD_NOTIFICATIONS_SUCCESS';

export const getBuyerDashboardAction = () => ({
  type: GET_BUYER_DASHBOARD_ACTION,
});

export const setBuyerDashboardSuccess = (responseBuyerDashboard) => ({
  type: GET_BUYER_DASHBOARD_SUCCESS,
  responseBuyerDashboard,
});

export const getSellerDashboardAction = () => ({
  type: GET_SELLER_DASHBOARD_ACTION,
});

export const setSellerDashboardSuccess = (responseSellerDashboard) => ({
  type: GET_SELLER_DASHBOARD_SUCCESS,
  responseSellerDashboard,
});

export const getStatisticsAction = () =>({
  type:GET_ORDER_ENQUIRY_STATISTICS_ACTION
})

export const setStatisticsSuccess = (responseStatistics)=>({
  type:GET_ORDER_ENQUIRY_STATISTICS_SUCCESS,
  responseStatistics
})

export const getConfigAction = (params) => ({
  type: GET_CONFIG_ACTION,
  params,
});

export const getConfigSuccess = (responseGetConfig) => ({
  type: GET_CONFIG_SUCCESS,
  responseGetConfig,
});

export const setUnreadNotificationsAction = (count) => ({
  type: SET_UNREAD_NOTIFICATIONS_ACTION,
  count,
});

export const setUnreadNotificationsSuccess = (count) => ({
  type: SET_UNREAD_NOTIFICATIONS_SUCCESS,
  count,
});