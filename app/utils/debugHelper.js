import { execute } from 'app/config/saga';
import UserHelper from 'app/config/userHelper'

import { getUserDetailsAction } from '../actions/user-actions';
import { getUserDetails } from '../saga/user-saga';

import { getStatistics } from '../saga/dashboard-saga';
import { getStatisticsAction } from '../actions/dashboard-actions';

import { getCatalogWiseCartDetails } from '../saga/cart-saga';
import { getCatalogWiseCartDetailsAction } from '../actions/cart-actions'

// this function resolves when userInfo is fetched
// useful for debugging, when you don't want to go to Home
export const waitTillUserInfoIsFetched = async (smartFetch = true) => {
  if(smartFetch && Object.keys(UserHelper.userInfo).length === 0) {
    const response = await execute(getUserDetails, getUserDetailsAction());
    return response;
  }
  return UserHelper.userInfo;
}

export const waitTillStatisticsIsFetched = async (smartFetch = true) => {
  if(smartFetch && !UserHelper.getLatestCartId) {
    const response = await execute(getStatistics, getStatisticsAction);
    return response;
  }
}

export const waitTillUserInfoAndStatisticsAreFetched = async () => {
  await waitTillUserInfoIsFetched();
  await waitTillStatisticsIsFetched();
}

export const waitTillCartDetailsIsFetched = async () => {
  await waitTillUserInfoAndStatisticsAreFetched();
  await execute(getCatalogWiseCartDetails, getCatalogWiseCartDetailsAction())
}
