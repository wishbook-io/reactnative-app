import { all, takeEvery, call, put } from 'redux-saga/effects';
import _ from 'lodash'

import {
  GET_BUYER_DASHBOARD_ACTION,           setBuyerDashboardSuccess,
  GET_SELLER_DASHBOARD_ACTION,          setSellerDashboardSuccess,
  GET_ORDER_ENQUIRY_STATISTICS_ACTION,  setStatisticsSuccess,
  GET_CONFIG_ACTION,                    getConfigSuccess,
  SET_UNREAD_NOTIFICATIONS_ACTION,      setUnreadNotificationsSuccess,
} from '../actions/dashboard-actions';
import { updateBrandsIFollowCount } from '../actions/brand-actions'
import { errorActionSet } from '../actions/error-actions';
import DashboardRepo from './repository/dashboard-repo';
import { URLConstants, CONSTANT_URL } from "../utils/URLConstants";
import UserHelper from 'app/config/userHelper';
// import { debugLog } from '../utils/debugVars';
debugLog = false;

export function* getBuyerDashboard() {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('buyer_dashboard', '');
    
    debugLog? console.log("[getBuyerDashboard] url obj", url) : null;
    if(url===undefined) {
      debugLog? console.log("[getBuyerDashboard] returning from saga, received an undefined URL") : null;
      return;
    }
    
    var dashboardRepo = new DashboardRepo(url, model = '', false);
    
    const { response, error } = yield call(dashboardRepo.getBuyerDashboard.bind(dashboardRepo));
    
    debugLog? console.log("[getBuyerDashboard] call response: ", response, error) : null;
    
    if (response) {
      yield put(setBuyerDashboardSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getSellerDashboard() {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('seller_dashboard', '');
    
    debugLog? console.log("[getSellerDashboard] url obj", url) : null;
    if(url===undefined) {
      debugLog? console.log("[getSellerDashboard] returning from saga, received an undefined URL") : null;
      return;
    }
    
    var dashboardRepo = new DashboardRepo(url, model = '', false);
    
    const { response, error } = yield call(dashboardRepo.getSellerDashboard.bind(dashboardRepo));
    
    debugLog? console.log("[getSellerDashboard] call response: ", response, error) : null;
    UserHelper.setUserApprovalStatus(_.get(response, 'profile.company_seller_detail'))
    
    if (response) {
      yield put(setSellerDashboardSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getStatistics(){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('statistics', '');
    
    debugLog? console.log("[getStatistics] url obj", url) : null;
    if(url===undefined) {
      debugLog? console.log("[getStatistics] returning from saga, received an undefined URL") : null;
      return;
    }
    
    var dashboardRepo = new DashboardRepo(url, model = '', false);
    
    const { response, error } = yield call(dashboardRepo.getStatistics.bind(dashboardRepo));
    /*
    {
      brand_i_follow: 3
      brokerorder_cancelled: 0
      brokerorder_dispatched: 0
      brokerorder_pending: 0
      closed_catalogenquiry: 0
      closed_cataloglead: 9
      closed_enquiry: 15
      closed_lead: 11
      latest_cart_id: 1948
      my_followers: 5
      my_viewers: 0
      opened_catalogenquiry: 49
      opened_cataloglead: 3
      opened_enquiry: 2
      opened_lead: 0
      purchaseorder_cancelled: 0
      purchaseorder_dispatched: 8
      purchaseorder_pending: 27
      salesorder_cancelled: 2
      salesorder_dispatched: 6
      salesorder_pending: 18
      total_brokerorder: 0
      total_cart_items: 4
      total_catalogenquiry: 49
      total_cataloglead: 12
      total_enquiry: 17
      total_lead: 11
      total_purchaseorder: 35
      total_salesorder: 26
      wishlist: 12
    }
    */
    debugLog? console.log("[getStatistics] call response: ", response, error) : null;
    if (response) {
      yield put(setStatisticsSuccess(response));
      UserHelper.setLatestCartId(response.latest_cart_id);
      if(response.brand_i_follow) {
        yield put(updateBrandsIFollowCount({set: response.brand_i_follow}))
      }
      return response;
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getConfig(action) {
  try {
    const url = CONSTANT_URL.CONFIG_URL;
    debugLog? console.log("[getConfig] url, action", url, action) : null;
    
    var dashboardRepo = new DashboardRepo(url, model = '', false);
    const { response, error } = yield call(dashboardRepo.getConfig);
    if (response) {
      yield put(getConfigSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* setUnreadNotifications(action) {
  yield put(setUnreadNotificationsSuccess(action.count))
}

export default dashboardRootSaga = [
  takeEvery(GET_BUYER_DASHBOARD_ACTION,           getBuyerDashboard),
  takeEvery(GET_SELLER_DASHBOARD_ACTION,          getSellerDashboard),
  takeEvery(GET_ORDER_ENQUIRY_STATISTICS_ACTION,  getStatistics),
  takeEvery(GET_CONFIG_ACTION,                    getConfig),
  takeEvery(SET_UNREAD_NOTIFICATIONS_ACTION,      setUnreadNotifications),
]