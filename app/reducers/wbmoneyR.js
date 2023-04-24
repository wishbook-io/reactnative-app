import {
  GET_WB_MONEY_DASHBOARD_ACTION,      GET_WB_MONEY_DASHBOARD_SUCCESS,
  GET_WB_MONEY_HISTORY_ACTION,        GET_WB_MONEY_HISTORY_SUCCESS,
  GET_WB_REWARDS_DASHBOARD_ACTION,    GET_WB_REWARDS_DASHBOARD_SUCCESS,
  GET_WB_REWARDS_HISTORY_ACTION,      GET_WB_REWARDS_HISTORY_SUCCESS,
  GET_RESETTLEMENT_DASHBOARD_ACTION,  GET_RESETTLEMENT_DASHBOARD_SUCCESS,
  GET_RESETTLEMENT_HISTORY_ACTION,    GET_RESETTLEMENT_HISTORY_SUCCESS,
  GET_INCENTIVE_TIERS_ACTION,         GET_INCENTIVE_TIERS_SUCCESS,
  GET_INCENTIVE_HISTORY_ACTION,       GET_INCENTIVE_HISTORY_SUCCESS,
  GET_INCENTIVE_DASHBOARD_ACTION,     GET_INCENTIVE_DASHBOARD_SUCCESS,
} from "../actions/wbmoney-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  responseWbMoneyDashboard: {},
  responseWbMoneyHistory: [],
  responseGetWbRewardsDashboard: {},
  responseGetWbRewardsHistory: [],
  responseGetResettlementDashboard: {},
  responseGetResettlementHistory: [],
  responseGetIncentiveTiers: [],
  responseGetIncentiveHistory: [],
  responseGetIncentiveDashboard: [],
};

const wbMoneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WB_MONEY_DASHBOARD_ACTION:
    return {
      ...state,
    };
    case GET_WB_MONEY_DASHBOARD_SUCCESS:
    return {
      ...state,
      responseWbMoneyDashboard: action.responseWbMoneyDashboard,
    };
    case GET_WB_MONEY_HISTORY_ACTION:
    return {
      ...state,
    };
    case GET_WB_MONEY_HISTORY_SUCCESS:
    return {
      ...state,
      responseWbMoneyHistory: action.responseWbMoneyHistory,
    };

    case GET_WB_REWARDS_DASHBOARD_ACTION:
    return {
      ...state,
    }
    case GET_WB_REWARDS_DASHBOARD_SUCCESS:
    return {
      ...state,
      responseGetWbRewardsDashboard: action.responseGetWbRewardsDashboard
    }

    case GET_WB_REWARDS_HISTORY_ACTION:
    return {
      ...state,
    }
    case GET_WB_REWARDS_HISTORY_SUCCESS:
    return {
      ...state,
      responseGetWbRewardsHistory: action.responseGetWbRewardsHistory
    }

    case GET_RESETTLEMENT_DASHBOARD_ACTION:
    return {
      ...state,
    }
    case GET_RESETTLEMENT_DASHBOARD_SUCCESS:
    return {
      ...state,
      responseGetResettlementDashboard: action.responseGetResettlementDashboard
    }

    case GET_RESETTLEMENT_HISTORY_ACTION:
    return {
      ...state,
    }
    case GET_RESETTLEMENT_HISTORY_SUCCESS:
    return {
      ...state,
      responseGetResettlementHistory: action.responseGetResettlementHistory
    }

    case GET_INCENTIVE_TIERS_ACTION:
    return {
      ...state,
    }
    case GET_INCENTIVE_TIERS_SUCCESS:
    return {
      ...state,
      responseGetIncentiveTiers: action.responseGetIncentiveTiers
    }

    case GET_INCENTIVE_HISTORY_ACTION:
    return {
      ...state,
    }
    case GET_INCENTIVE_HISTORY_SUCCESS:
    return {
      ...state,
      responseGetIncentiveHistory: action.responseGetIncentiveHistory
    }

    case GET_INCENTIVE_DASHBOARD_ACTION:
    return {
      ...state,
    }
    case GET_INCENTIVE_DASHBOARD_SUCCESS:
    return {
      ...state,
      responseGetIncentiveDashboard: action.responseGetIncentiveDashboard
    }

    default:
    return commonErrorReducer(state, action);
  }
};

export default wbMoneyReducer;