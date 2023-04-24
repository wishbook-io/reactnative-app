import { all, takeEvery, call, put } from 'redux-saga/effects';

import {
  LIST_DISCOUNT_ACTION,       listDiscountSuccess,      listDiscountAction,
  GET_DISCOUNT_ACTION,        getDiscountSuccess,
  UPDATE_DISCOUNT_ACTION,     updateDiscountSuccess,
  LIST_USED_DISCOUNT_ACTION,  listUsedDiscountSuccess,
  CHECK_DISCOUNT_ACTION,      
} from '../actions/discount-actions';
import { errorActionSet } from '../actions/error-actions';
import DiscountRepo from './repository/discount-repo';
import { URLConstants, CONSTANT_URL } from "../utils/URLConstants";
import consts from '../utils/const';
import UserHelper from '../config/userHelper';
import { debugLog } from '../utils/debugVars';

export function* listDiscount(action) {
  try {
    let url = CONSTANT_URL.DISCOUNT_RULE
    debugLog? console.log("[listDiscount] url, action", url, action) : null;

    const discountRepo = new DiscountRepo(url, model='', false);
    const { response, error } = yield call(discountRepo.listDiscount);
    debugLog? console.log("[listDiscount] response, error", response, error) : null;

    if (response) {
      yield put(listDiscountSuccess(response, action.refresh));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getDiscount(action) {
  try {
    let url = CONSTANT_URL.DISCOUNT_RULE
    if(!action.id) {
      console.warn("[getDiscount] id not found")
      return;
    }
    url += '/' + action.id + '/'
    debugLog? console.log("[getDiscount] url, action", url, action) : null;

    const discountRepo = new DiscountRepo(url, model='', false);
    const { response, error } = yield call(discountRepo.getDiscount);
    debugLog? console.log("[getDiscount] response, error", response, error) : null;

    if (response) {
      yield put(getDiscountSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* checkDiscount(action) {
  try{
    let url = CONSTANT_URL.DISCOUNT_RULE    
    debugLog? console.log("[checkDiscount] url, action", url, action) : null;
    
    const discountRepo = new DiscountRepo(url, model='', false);
    const { response, error } = yield call(discountRepo.checkDiscount, action.brandId);
    debugLog? console.log("[checkDiscount] response, error", response, error) : null;
    
    if(response){
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
    }    
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* updateDiscount(action) {
  try {
    let url = CONSTANT_URL.DISCOUNT_RULE
    let repoKey;
    if(action.id) {
      url += action.id + '/'
      repoKey = 'patchDiscount'
    } else {
      repoKey = 'postDiscount'
    }
    debugLog? console.log("[updateDiscount] url, action", url, action) : null;

    const discountRepo = new DiscountRepo(url, model='', false);
    const { response, error } = yield call(discountRepo[repoKey], action.params);
    debugLog? console.log("[updateDiscount] response, error", response, error) : null;
    if (response) {
      if(action.listDiscount) {
        yield call(listDiscount, listDiscountAction())
      }
      yield put(updateDiscountSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* listUsedDiscount(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('brands', '');
    debugLog? console.log("[listUsedDiscount] url, action", url, action) : null;

    const discountRepo = new DiscountRepo(url, model='', false);
    const { response, error } = yield call(discountRepo.listUsedDiscount);
    debugLog? console.log("[listUsedDiscount] response, error", response, error) : null;

    if (response) {
      yield put(listUsedDiscountSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export default discountRootSaga = [
  takeEvery(LIST_DISCOUNT_ACTION,       listDiscount),
  takeEvery(GET_DISCOUNT_ACTION,        getDiscount),
  takeEvery(UPDATE_DISCOUNT_ACTION,     updateDiscount),
  takeEvery(LIST_USED_DISCOUNT_ACTION,  listUsedDiscount),
]
