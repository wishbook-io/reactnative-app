import { all } from 'redux-saga/effects';

import loginRootSaga from './login-saga';
import promotionsRootSaga from './promotions-saga';
import catalogRootSaga from './catalog-saga';
import masterListRootSaga from './masterlist-saga';
import languageSaga from './language-saga';
import brandsSaga from './brands-saga';
import enumgroupRootSaga from './enumgroup-saga';
import wishlistRootSaga from './wishlist-saga';
import dashboardRootSaga from './dashboard-saga';
import userRootSaga from './user-saga';
import productFilterRootSaga from './productTab-filter-saga';
import stateRootSaga from './state-saga';
import categoryRootSaga from './category-saga';
import searchRootSaga from './search-saga';
import backendRootSaga from './backend-saga';
import wbMoneyRootSaga from './wbmoney-saga';
import orderTabRootSaga from './order-saga';
import homeRootSaga from './home-saga';
import cartRootSaga from './cart-saga';
import shipayRootSaga from './shipay-saga';
import creditRootSaga from './credit-saga';
// import errorHandlerPlaygroundSaga from './errorhandlerplayground-saga';
import notifierRootSaga from './notifier-saga';
import discountRootSaga from './discount-saga';

export default function* rootSaga() {
  yield all([
    ...loginRootSaga,
    ...promotionsRootSaga,
    ...catalogRootSaga,
    ...masterListRootSaga,
    ...languageSaga,
    ...brandsSaga,
    ...enumgroupRootSaga,
    ...wishlistRootSaga,
    ...dashboardRootSaga,
    ...userRootSaga,
    ...productFilterRootSaga,
    ...stateRootSaga,
    ...categoryRootSaga,
    ...searchRootSaga,
    ...backendRootSaga,
    ...wbMoneyRootSaga,
    ...orderTabRootSaga,
    ...homeRootSaga,
    ...cartRootSaga,
    ...shipayRootSaga,
    ...creditRootSaga,
    // ...errorHandlerPlaygroundSaga,
    ...notifierRootSaga,
    ...discountRootSaga,
  ])
}
