import { all, takeEvery, call, put } from 'redux-saga/effects';

import {
  GET_WB_MONEY_DASHBOARD_ACTION,      getWbMoneyDashboardSuccess,
  GET_WB_MONEY_HISTORY_ACTION,        getWbMoneyHistorySuccess,
  GET_WB_REWARDS_DASHBOARD_ACTION,    getWbRewardsDashboardSuccess,
  GET_WB_REWARDS_HISTORY_ACTION,      getWbRewardsHistorySuccess,
  GET_RESETTLEMENT_DASHBOARD_ACTION,  getResettlementDashboardSuccess,
  GET_RESETTLEMENT_HISTORY_ACTION,    getResettlementHistorySuccess,
  GET_INCENTIVE_TIERS_ACTION,         getIncentiveTiersSuccess,
  GET_INCENTIVE_HISTORY_ACTION,       getIncentiveHistorySuccess,
  GET_INCENTIVE_DASHBOARD_ACTION,     getIncentiveDashboardSuccess,
} from '../actions/wbmoney-actions';
import { errorActionSet } from '../actions/error-actions';
import WbMoneyRepo from './repository/wbmoney-repo';
import { URLConstants } from "../utils/URLConstants";

import { debugLog } from 'app/utils/debugVars';

// TODO: find a better way to name this file et al.

function* getWbMoneyDashboard() {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('wbmoney-log-dashboard', '');
    debugLog? console.log("[getWbMoneyDashboard] url obj", url) : null;
    
    const wbMoneyRepo = new WbMoneyRepo(url, model = '', false);
    
    const { response, error } = yield call(wbMoneyRepo.getWbMoneyData.bind(wbMoneyRepo));
    
    debugLog? console.log("[getWbMoneyDashboard] call response: ", response, error) : null;
    
    if (response) {
      /*
      {
        total_available: 66
        total_received: 1324
        total_redeemed: 1258
      }
      */
      yield put(getWbMoneyDashboardSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* getWbMoneyHistory() {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('wbmoney-log', '');
    debugLog? console.log("[getWbMoneyHistory] url obj", url) : null;
    
    const wbMoneyRepo = new WbMoneyRepo(url, model = '', false);
    
    const { response, error } = yield call(wbMoneyRepo.getWbMoneyData.bind(wbMoneyRepo));
    
    debugLog? console.log("[getWbMoneyHistory] call response: ", response, error) : null;
    
    if (response) {
      /*
      [
        {
          company: "Laxmi Emporium"
          content_type: 28
          created: "2018-10-20T15:13:23.771926Z"
          deep_link_log: "http://app.wishbooks.io/?type=purchase&id=4337"
          display_text_log: "2% Cashback credited for Order 4337"
          id: 1669
          object_id: 4337
          points: 66
          wb_money_rule: {
            cashback_type: "Percentage"
            condition: ""
            content_type: 28
            created: "2018-09-11T13:13:37.476819Z"
            deep_link: "http://app.wishbooks.io/?type=purchase"
            details: ""
            display_text: "2% Cashback credited for Order {{order_number}}"
            id: 9
            is_disable: false
            label: "any_prepaid_order"
            log_type: "Positive"
            modified: "2018-10-15T17:40:56.502221Z"
            points: 2
          }
        }
      ]
      */
      yield put(getWbMoneyHistorySuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getWbRewardsDashboard(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('wbpoint-log-dashboard', '');
    debugLog? console.log("[getWbRewardsDashboard] url, action", url, action) : null;
    
    const wbMoneyRepo = new WbMoneyRepo(url, model = '', false);
    const { response, error } = yield call(wbMoneyRepo.getWbMoneyData);
    debugLog? console.log("[getWbRewardsDashboard] call response: ", response, error) : null;

    if (response) {
      yield put(getWbRewardsDashboardSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getWbRewardsHistory(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('wbpoint-log', '');
    debugLog? console.log("[getWbRewardsHistory] url, action", url, action) : null;
    
    const wbMoneyRepo = new WbMoneyRepo(url, model = '', false);
    const { response, error } = yield call(wbMoneyRepo.getWbMoneyData);
    debugLog? console.log("[getWbRewardsHistory] call response: ", response, error) : null;

    if (response) {
      yield put(getWbRewardsHistorySuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getResettlementDashboard(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('reseller-settlement-dashboard', '');
    debugLog? console.log("[getResettlementDashboard] url, action", url, action) : null;
    
    const wbMoneyRepo = new WbMoneyRepo(url, model = '', false);
    const { response, error } = yield call(wbMoneyRepo.getWbMoneyData);
    debugLog? console.log("[getResettlementDashboard] call response: ", response, error) : null;
    if (response) {
      yield put(getResettlementDashboardSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getResettlementHistory(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('reseller-settlement', '');
    debugLog? console.log("[getResettlementHistory] url, action", url, action) : null;
    
    const wbMoneyRepo = new WbMoneyRepo(url, model = '', false);
    const { response, error } = yield call(wbMoneyRepo.getWbMoneyData);
    debugLog? console.log("[getResettlementHistory] call response: ", response, error) : null;
    if (response) {
      yield put(getResettlementHistorySuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getIncentiveTiers(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('incentive-tiers', '');
    debugLog? console.log("[getIncentiveTiers] url, action", url, action) : null;
    
    const wbMoneyRepo = new WbMoneyRepo(url, model = '', false);
    const { response, error } = yield call(wbMoneyRepo.getWbMoneyData);
    debugLog? console.log("[getIncentiveTiers] call response: ", response, error) : null;
    if (response) {
      yield put(getIncentiveTiersSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getIncentiveHistory(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('incentive-history', '');
    debugLog? console.log("[getIncentiveHistory] url, action", url, action) : null;
    
    const wbMoneyRepo = new WbMoneyRepo(url, model = '', false);
    const { response, error } = yield call(wbMoneyRepo.getWbMoneyData);
    debugLog? console.log("[getIncentiveHistory] call response: ", response, error) : null;
    if (response) {
      yield put(getIncentiveHistorySuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getIncentiveDashboard(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('incentive-dashboard', '');
    debugLog? console.log("[getIncentiveDashboard] url, action", url, action) : null;
    
    const wbMoneyRepo = new WbMoneyRepo(url, model = '', false);
    const { response, error } = yield call(wbMoneyRepo.getWbMoneyData);
    debugLog? console.log("[getIncentiveDashboard] call response: ", response, error) : null;
    if (response) {
      yield put(getIncentiveDashboardSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export default wbMoneyRootSaga = [
  takeEvery(GET_WB_MONEY_DASHBOARD_ACTION,      getWbMoneyDashboard),
  takeEvery(GET_WB_MONEY_HISTORY_ACTION,        getWbMoneyHistory),
  takeEvery(GET_WB_REWARDS_DASHBOARD_ACTION,    getWbRewardsDashboard),
  takeEvery(GET_WB_REWARDS_HISTORY_ACTION,      getWbRewardsHistory),
  takeEvery(GET_RESETTLEMENT_DASHBOARD_ACTION,  getResettlementDashboard),
  takeEvery(GET_RESETTLEMENT_HISTORY_ACTION,    getResettlementHistory),
  takeEvery(GET_INCENTIVE_TIERS_ACTION,         getIncentiveTiers),
  takeEvery(GET_INCENTIVE_HISTORY_ACTION,       getIncentiveHistory),
  takeEvery(GET_INCENTIVE_DASHBOARD_ACTION,     getIncentiveDashboard),
]