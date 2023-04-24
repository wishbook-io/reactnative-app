import { all, takeEvery, call, put } from 'redux-saga/effects';

import {
  GET_CART_BANNER_ACTION,               getCartBannerSuccess,
  GET_CATALOG_WISE_CART_DETAILS_ACTION, getCatalogWiseCartDetailsSuccess,   getCatalogWiseCartDetailsAction,
  DELETE_CART_ITEM_ACTION,              deleteCartItemSuccess,
  PATCH_CART_QUANTITY_ACTION,           patchCartQuantitySuccess,
  PATCH_CART_WB_MONEY_ACTION,           patchCartWbMoneySuccess,
  ADD_TO_CART_ACTION,                   addToCartSuccess,
} from '../actions/cart-actions';

import { getStatisticsAction } from '../actions/dashboard-actions';
import { getStatistics } from '../saga/dashboard-saga';

import { errorActionSet } from '../actions/error-actions';
import CartRepo from './repository/cart-repo';
import { URLConstants, CONSTANT_URL } from "../utils/URLConstants";
import consts from '../utils/const';
import UserHelper from '../config/userHelper';
import { debugLog } from '../utils/debugVars';

export function* getCartBanner(action) {
  try {
    const url = CONSTANT_URL.BANNER_URL;
    debugLog? console.log("[getCartBanner] url", url) : null;
    
    const cartRepo = new CartRepo(url, model = '', false);
    const { response, error } = yield call(cartRepo.getCartBanner, action.params);
    debugLog? console.log("[getCartBanner] call response: ", response, error) : null;
    
    if (response) {
      yield put(getCartBannerSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getCatalogWiseCartDetails(action) {
  try {
    let cartId = UserHelper.getLatestCartId();
    if(!cartId) {
      console.log("TODO: returning from saga as there is no cart")
      const responseStatistics = yield call(getStatistics, getStatisticsAction())
      const cartId = UserHelper.getLatestCartId();
      if(!cartId) {
        yield put(getCatalogWiseCartDetailsSuccess({})); // loading state
        return;
      }
    }
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('cart-catalogwise', '');
    // url = 'http://b2b.wishbook.io/api/v2/companies/4269/carts/2901/catalogwise/' 
    // http://b2b.wishbook.io/api/v2/companies/4269/carts/2901/catalogwise/

    debugLog? console.log("[getCatalogWiseCartDetails] url, action", url, action) : null;

    const cartRepo = new CartRepo(url, model = '', false);
    const { response, error } = yield call(cartRepo.getCatalogWiseCartDetails, action.params);
    debugLog? console.log("[getCatalogWiseCartDetails] call response: ", response, error) : null;
    
    if (response) {
      yield put(getCatalogWiseCartDetailsSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* deleteCartItem(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('cart-delete', '');
    // url = 'http://b2b.wishbook.io/api/v2/companies/4269/carts/2901/cart-delete/' 
    // http://b2b.wishbook.io/api/v2/companies/4269/carts/2901/cart-delete/

    debugLog? console.log("[deleteCartItem] url, action", url, action) : null;

    const cartRepo = new CartRepo(url, model = '', false);
    const { response, error } = yield call(cartRepo.deleteCartItem, action.params);
    debugLog? console.log("[deleteCartItem] call response: ", response, error) : null;

    const fetchCartDetails = action.updateCatalogWiseCartDetails;
    if (!fetchCartDetails) {
      yield put(deleteCartItemSuccess(response));
      return;
    }
    
    yield call(getCatalogWiseCartDetails, getCatalogWiseCartDetailsAction());

  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* patchCartQuantity(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('cart-id', '');
    // url = 'http://b2b.wishbook.io/api/v2/companies/4269/carts/2901/'
    // http://b2b.wishbook.io/api/v2/companies/4269/carts/2901/

    debugLog? console.log("[patchCartQuantity] url, action", url, action) : null;

    const cartRepo = new CartRepo(url, model = '', false);
    const { response, error } = yield call(cartRepo.patchCartQuantity, action.params);
    debugLog? console.log("[patchCartQuantity] call response: ", response, error) : null;

    const fetchCartDetails = action.updateCatalogWiseCartDetails;
    if (!fetchCartDetails) {
      yield put(patchCartQuantitySuccess(response));
      return;
    }
    
    yield call(getCatalogWiseCartDetails, getCatalogWiseCartDetailsAction());
    
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* patchCartWbMoney(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('cart-id', '');
    // url = 'http://b2b.wishbook.io/api/v2/companies/4269/carts/2901/'

    debugLog? console.log("[patchCartWbMoney] url, action", url, action) : null;

    const cartRepo = new CartRepo(url, model = '', false);
    const { response, error } = yield call(cartRepo.patchCartWbMoney, action.params);
    debugLog? console.log("[patchCartWbMoney] call response: ", response, error) : null;

    const fetchCartDetails = action.updateCatalogWiseCartDetails;
    if (!fetchCartDetails) {
      yield put(patchCartWbMoneySuccess(response));
      return response;
    }
    
    yield call(getCatalogWiseCartDetails, getCatalogWiseCartDetailsAction());

  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* addToCart(action) {
  try {
    const cartId = UserHelper.getLatestCartId();
    let urlKey = ''
    let repo = null
    if(cartId) {
      urlKey = 'cart-id'
      repo = 'addToCartPatch'
    } else {
      urlKey = 'cart'
      repo = 'addToCartPost'
    }

    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl(urlKey, '');
    // url = 'http://b2b.wishbook.io/api/v2/companies/4269/carts/2901/'
    // http://b2b.wishbook.io/api/v2/companies/4269/carts/2901/

    debugLog? console.log("[addToCart] url, action", url, action) : null;

    const cartRepo = new CartRepo(url, model = '', false);
    const { response, error } = yield call(cartRepo[repo], action.params);
    debugLog? console.log("[addToCart] call response: ", response, error) : null;

    if(error) {
      yield put(errorActionSet(error));
      return;
    }

    if(!cartId) {
      UserHelper.setLatestCartId(response.id) // so that cart id is updated
    }

    const fetchCartDetails = action.updateCatalogWiseCartDetails;
    if (!fetchCartDetails) {
      yield put(addToCartSuccess(response));
      return;
    }
    
    yield call(getCatalogWiseCartDetails, getCatalogWiseCartDetailsAction());

  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export default cartRootSaga = [
  takeEvery(GET_CART_BANNER_ACTION, getCartBanner),
  takeEvery(GET_CATALOG_WISE_CART_DETAILS_ACTION, getCatalogWiseCartDetails),
  takeEvery(DELETE_CART_ITEM_ACTION, deleteCartItem),
  takeEvery(PATCH_CART_QUANTITY_ACTION, patchCartQuantity),
  takeEvery(PATCH_CART_WB_MONEY_ACTION, patchCartWbMoney),
  takeEvery(ADD_TO_CART_ACTION, addToCart),
]
