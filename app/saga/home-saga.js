import { call, put, takeEvery, all } from 'redux-saga/effects';
import { SETUP_HOME_ACTION, setupHomeSuccess } from '../actions/home-actions';

// actions
import {
  getReadyToShipCatalogAction,
  getPreOrderCatalogAction,
  getNonCatalogAction,
  getSingleCatalogAction,
  getMostSoldCatalogAction,
  getMostViewedCatalogAction,
  getFollowedBrandsCatalogAction,
  getRecentlyViewedCatalogAction,
} from '../actions/catalog-actions';

import {
  getReadyToShipCatalog,
  getPreOrderCatalog,
  getNonCatalog,
  getSingleCatalog,
  getMostSoldCatalog,
  getMostViewedCatalog,
  getFollowedBrandsCatalogList,
  getRecentlyViewedCatalog,
} from './catalog-saga';

import { getCategoryAction } from '../actions/masterlist-actions';
import { getCategory } from './masterlist-saga';

import { 
  getBannersAction, 
  getHomePromotionalTagsAction,
  getUserReviewBannersAction,
  getUserVideoReviewsAction,
} from '../actions/promotions-actions';
import { 
  getBannersList, 
  getHomePromotionalTags, 
  getUserReviewBanners,
  getUserVideoReviews, 
} from './promotions-saga';

import { getWishlistAction } from '../actions/wishlist-actions';
import { getWishlist } from './wishlist-saga';

import { 
  getBuyerDashboardAction, 
  getSellerDashboardAction, 
  getStatisticsAction, 
  setUnreadNotificationsSuccess 
} from '../actions/dashboard-actions';
import { getBuyerDashboard, getSellerDashboard, getStatistics } from './dashboard-saga';

import { getBrandsAction } from "../actions/brand-actions";
import { getBrands } from './brands-saga';

import { 
  getPostContactsAction, 
  getPostLocationAction, 
  getAppVersionAction,
  postUserPlatformAction,
} from '../actions/backend-actions';
import { getAppVersion, postUserPlatform } from 'app/saga/backend-saga';
import { getUserDetailsAction } from "../actions/user-actions";
import { getUserDetails } from './user-saga';

import { getCatalogWiseCartDetailsAction } from '../actions/cart-actions';
import { getCatalogWiseCartDetails } from './cart-saga';

import { getCodReconfirmableOrder } from './order-saga';
import { getCodReconfirmableOrderAction } from '../actions/order-actions';

import UserHelper from '../config/userHelper';
import { requestBackendTasksPermission } from '../utils/AndroidPermissionHelper';
// import * as ApplozicHelper from 'app/utils/ApplozicHelper';

import LocalStorage from 'app/db/LocalStorage';
import { ASYNC_STORAGE } from 'app/utils/const';
import { isWeb } from 'app/utils/PlatformHelper';
import { isDev, debugLog } from 'app/utils/debugVars'

function* setupHome() {
  try {
    yield call(getStatistics,   getStatisticsAction());
    // console.log("[setupHome] getUserDetails completed");
    const companyType = UserHelper.helperCompanyType(); 
    const isSeller = companyType !== 'buyer';
    // console.log("[setupHome] isSeller: ", isSeller);

    const notificationKey = ASYNC_STORAGE.UNREAD_NOTIFICATIONS(UserHelper.getUserMobile())
    let count = yield LocalStorage.getItem(notificationKey)
    // console.log("UNREAD_NOTIFICATIONS", count)
    count = Number.parseInt(count)
    if(Number.isNaN(count)) {
      LocalStorage.setItem(notificationKey, 0)
      count = 0
    }
    yield put(setUnreadNotificationsSuccess(count))

    // ApplozicHelper.login(UserHelper.getUserName()).then(setTimeout(() => ApplozicHelper.logout(), 10000))
    // ApplozicHelper.login(UserHelper.getUserName()).then(setTimeout(() => ApplozicHelper.updateToken(), 5000))
    // ApplozicHelper.initialize(UserHelper.getUserName(), UserHelper.getUserFirstName() + " " + UserHelper.getUserLastName())
    // ApplozicHelper.updateToken();

    // debug
    // yield call(getWishlist,                   getWishlistAction());
    // yield call(getCatalogWiseCartDetails,                getCatalogWiseCartDetailsAction())
    // yield call(getCategory,      getCategoryAction());
    // yield call(getUserVideoReviews,      getUserVideoReviewsAction()),
    // debug end
    if(!isWeb) {
      yield call(getAppVersion, getAppVersionAction())
    }
    yield call(getCodReconfirmableOrder, getCodReconfirmableOrderAction({processing_status: 'cod_verification_pending'}))
    yield put(setupHomeSuccess(true));
    let tasks =  [
      call(postUserPlatform,              postUserPlatformAction()),
      call(getCategory,                   getCategoryAction()),
      call(getBannersList,                getBannersAction()),
      call(getHomePromotionalTags,        getHomePromotionalTagsAction()),
      call(getReadyToShipCatalog,         getReadyToShipCatalogAction()),
      call(getPreOrderCatalog,            getPreOrderCatalogAction()),
      call(getNonCatalog,                 getNonCatalogAction()),
      call(getSingleCatalog,              getSingleCatalogAction()),
      call(getBrands,                     getBrandsAction({limit: 10, offset: 0, type: 'public', has_catalog: true})),
      call(getMostSoldCatalog,            getMostSoldCatalogAction()),
      call(getMostViewedCatalog,          getMostViewedCatalogAction()),
      call(getUserReviewBanners,          getUserReviewBannersAction()),
      call(getWishlist,                   getWishlistAction()),
      call(getCatalogWiseCartDetails,     getCatalogWiseCartDetailsAction()),
      call(getFollowedBrandsCatalogList,  getFollowedBrandsCatalogAction()),
      call(getRecentlyViewedCatalog,      getRecentlyViewedCatalogAction()),
      call(getBuyerDashboard,             getBuyerDashboardAction()),
      call(getUserVideoReviews,           getUserVideoReviewsAction()), 
    ]
    // console.log("[setupHome] default tasks populated")
    if(isSeller) {
      tasks.push(call(getSellerDashboard, getSellerDashboardAction()))
    }
    debugLog? console.log("[setupHome] home setup tasks completed") : null;
    isDev? null : yield all(tasks);  
    debugLog? console.log("[setupHome] all calls were completed") : null;
    // yield put(setupHomeSuccess());

    if (!isDev && !isWeb) {
      const {locationPermission, contactsPermission } = yield call(requestBackendTasksPermission)
      if(contactsPermission) {
        yield put(getPostContactsAction());
      }
      if(locationPermission) {
        yield put(getPostLocationAction());
      }
    }
  } catch(error) {
    yield put(setupHomeSuccess());
    console.log("[setupHome] error: ", error)
    if (isDev) {
      throw error;
    }
  }
}

export default homeRootSaga = [
  takeEvery(SETUP_HOME_ACTION, setupHome)
];