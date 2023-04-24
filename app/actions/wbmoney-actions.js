export const GET_WB_MONEY_DASHBOARD_ACTION = "GET_WB_MONEY_DASHBOARD_ACTION";
export const GET_WB_MONEY_DASHBOARD_SUCCESS = "GET_WB_MONEY_DASHBOARD_SUCCESS";

export const GET_WB_MONEY_HISTORY_ACTION = "GET_WB_MONEY_HISTORY_ACTION";
export const GET_WB_MONEY_HISTORY_SUCCESS = "GET_WB_MONEY_HISTORY_SUCCESS"; 

export const GET_WB_REWARDS_DASHBOARD_ACTION = 'GET_WB_REWARDS_DASHBOARD_ACTION';
export const GET_WB_REWARDS_DASHBOARD_SUCCESS = 'GET_WB_REWARDS_DASHBOARD_SUCCESS';

export const GET_WB_REWARDS_HISTORY_ACTION = 'GET_WB_REWARDS_HISTORY_ACTION';
export const GET_WB_REWARDS_HISTORY_SUCCESS = 'GET_WB_REWARDS_HISTORY_SUCCESS';

export const GET_RESETTLEMENT_DASHBOARD_ACTION = 'GET_RESETTLEMENT_DASHBOARD_ACTION';
export const GET_RESETTLEMENT_DASHBOARD_SUCCESS = 'GET_RESETTLEMENT_DASHBOARD_SUCCESS';

export const GET_RESETTLEMENT_HISTORY_ACTION = 'GET_RESETTLEMENT_HISTORY_ACTION';
export const GET_RESETTLEMENT_HISTORY_SUCCESS = 'GET_RESETTLEMENT_HISTORY_SUCCESS';

export const GET_INCENTIVE_TIERS_ACTION = 'GET_INCENTIVE_TIERS_ACTION';
export const GET_INCENTIVE_TIERS_SUCCESS = 'GET_INCENTIVE_TIERS_SUCCESS';

export const GET_INCENTIVE_HISTORY_ACTION = 'GET_INCENTIVE_HISTORY_ACTION';
export const GET_INCENTIVE_HISTORY_SUCCESS = 'GET_INCENTIVE_HISTORY_SUCCESS';

export const GET_INCENTIVE_DASHBOARD_ACTION = 'GET_INCENTIVE_DASHBOARD_ACTION';
export const GET_INCENTIVE_DASHBOARD_SUCCESS = 'GET_INCENTIVE_DASHBOARD_SUCCESS';

export const getWbMoneyDashboardAction = () => ({
  type: GET_WB_MONEY_DASHBOARD_ACTION,
});

export const getWbMoneyDashboardSuccess = (responseWbMoneyDashboard) => ({
  type: GET_WB_MONEY_DASHBOARD_SUCCESS,
  responseWbMoneyDashboard,
});

export const getWbMoneyHistoryAction = () => ({
  type: GET_WB_MONEY_HISTORY_ACTION,
});

export const getWbMoneyHistorySuccess = (responseWbMoneyHistory) => ({
  type: GET_WB_MONEY_HISTORY_SUCCESS,
  responseWbMoneyHistory,
});

export const getWbRewardsDashboardAction = (params) => ({
  type: GET_WB_REWARDS_DASHBOARD_ACTION,
  params,
});

export const getWbRewardsDashboardSuccess = (responseGetWbRewardsDashboard) => ({
  type: GET_WB_REWARDS_DASHBOARD_SUCCESS,
  responseGetWbRewardsDashboard,
});

export const getWbRewardsHistoryAction = (params) => ({
  type: GET_WB_REWARDS_HISTORY_ACTION,
  params,
});

export const getWbRewardsHistorySuccess = (responseGetWbRewardsHistory) => ({
  type: GET_WB_REWARDS_HISTORY_SUCCESS,
  responseGetWbRewardsHistory,
});


export const getResettlementDashboardAction = (params) => ({
  type: GET_RESETTLEMENT_DASHBOARD_ACTION,
  params,
});

export const getResettlementDashboardSuccess = (responseGetResettlementDashboard) => ({
  type: GET_RESETTLEMENT_DASHBOARD_SUCCESS,
  responseGetResettlementDashboard,
});

export const getResettlementHistoryAction = (params) => ({
  type: GET_RESETTLEMENT_HISTORY_ACTION,
  params,
});

export const getResettlementHistorySuccess = (responseGetResettlementHistory) => ({
  type: GET_RESETTLEMENT_HISTORY_SUCCESS,
  responseGetResettlementHistory,
});

export const getIncentiveTiersAction = (params) => ({
  type: GET_INCENTIVE_TIERS_ACTION,
  params,
});

export const getIncentiveTiersSuccess = (responseGetIncentiveTiers) => ({
  type: GET_INCENTIVE_TIERS_SUCCESS,
  responseGetIncentiveTiers,
});

export const getIncentiveHistoryAction = (params) => ({
  type: GET_INCENTIVE_HISTORY_ACTION,
  params,
});

export const getIncentiveHistorySuccess = (responseGetIncentiveHistory) => ({
  type: GET_INCENTIVE_HISTORY_SUCCESS,
  responseGetIncentiveHistory,
});

export const getIncentiveDashboardAction = (params) => ({
  type: GET_INCENTIVE_DASHBOARD_ACTION,
  params,
});

export const getIncentiveDashboardSuccess = (responseGetIncentiveDashboard) => ({
  type: GET_INCENTIVE_DASHBOARD_SUCCESS,
  responseGetIncentiveDashboard,
});