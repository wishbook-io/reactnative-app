import { all, takeEvery, call, put } from 'redux-saga/effects';

import {
  GET_WISHLIST_ACTION,          setWishlistSuccess,       getWishlistAction,
  ADD_T0_WISHLIST_ACTION,       addToWishlistSuccess,
  DELETE_FROM_WISHLIST_ACTION,  deleteFromWishlistSuccess,
} from '../actions/wishlist-actions';
import { errorActionSet } from '../actions/error-actions';
import WishlistRepo from './repository/wishlist-repo';
import { URLConstants } from "../utils/URLConstants";
import {getCatalogDetailsAction} from '../actions/catalog-actions';
import { debugLog } from 'app/utils/debugVars';

export function* getWishlist() {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.userUrl('wishlist-catalog', '');
    
    debugLog? console.log("[getWishlist] url obj", url) : null;
    if(url===undefined) {
      debugLog? console.log("returning from saga, received an undefined URL") : null;
      return;
    }
    debugLog? console.log("[getWishlist] initing repo") : null;
    
    var wishlistRepo = new WishlistRepo(url, model = '', false);
    debugLog? console.log("[getWishlist] calling repo getwishlist") : null;
    
    const { response, error } = yield call(wishlistRepo.getWishlist.bind(wishlistRepo));
    
    debugLog? console.log("[getWishlist] call response: ", response, error) : null;
    
    if (response) {
      yield put(setWishlistSuccess(response));
    } else {
      debugLog? console.log("[getWishlist] error 1", error) : null;
      yield put(errorActionSet(error));
    }
  } catch (error) {
    debugLog? console.log("[getWishlist] error 2", error) : null;
    
    yield put(errorActionSet(error));
  }
}

export function* addToWishlist(actions){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.userUrl('wishlist-catalog', '');
    
    debugLog? console.log("[addToWishlist] url obj", url) : null;
    if(url===undefined) {
      debugLog? console.log("returning from saga, received an undefined URL") : null;
      return;
    }
    
    var wishlistRepo = new WishlistRepo(url, model = '', false);
    
    const { response, error } = yield call(wishlistRepo.addToWishList.bind(wishlistRepo),actions.params);
    
    debugLog? console.log("[addToWishlist] call response: ", response, error) : null;
    
    if (response) {
      if(actions.updateCatalogDetails) {
        yield put (getCatalogDetailsAction(actions.params.product));
      }
      
      if(actions.updateWishlist) {
        yield put(getWishlistAction())
      }
      yield put(addToWishlistSuccess(response, actions.params.product));
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* deleteFromWishlist(action) {
  try {
    const urlObj = new URLConstants();
    const url = yield urlObj.userUrl('wishlist-delete');
    debugLog? console.log("[deleteFromWishlist] url, action", url, action) : null;
    
    var wishlistRepo = new WishlistRepo(url, model = '', false);
    
    const { response, error } = yield call(wishlistRepo.deleteFromWishlist, action.params);
    
    debugLog? console.log("[deleteFromWishlist] call response: ", response, error) : null;
    if (response) {
      yield put(deleteFromWishlistSuccess(response, action.params.product));
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export default wishlistRootSaga = [
  takeEvery(GET_WISHLIST_ACTION,          getWishlist),
  takeEvery(ADD_T0_WISHLIST_ACTION,       addToWishlist),
  takeEvery(DELETE_FROM_WISHLIST_ACTION,  deleteFromWishlist),
]