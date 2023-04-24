import { all, takeEvery, call, put } from 'redux-saga/effects';

import {
  GET_CREDIT_LINE_ACTION, getCreditLineSuccess,
  GET_CREDIT_RATING_ACTION, getCreditRatingSuccess,
} from '../actions/credit-actions';
import { errorActionSet } from '../actions/error-actions';

import CreditRepo from './repository/credit-repo';
import { URLConstants, CONSTANT_URL } from "../utils/URLConstants";
import consts from '../utils/const';
import UserHelper from '../config/userHelper';
import { debugLog } from '../utils/debugVars';

export function* getCreditLine(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('credit-approved-line', '');

    debugLog? console.log("[getCreditLine] url, action", url, action) : null;

    const creditRepo = new CreditRepo(url, model = '', false);
    const { response, error } = yield call(creditRepo.getCreditLine, action.params);
    debugLog? console.log("[getCreditLine] call response: ", response, error) : null;

    /*
    [ { id: 25,
        company: 4269,
        nbfc_partner: 'Indifi',
        approved_line: '1000000.00',
        available_line: '1000000.00',
        used_line: '0.00',
        lms_creditline_id: null,
        lms_app_id: null,
        is_active: true,
        created: '2018-12-26T16:27:37.780214Z',
        modified: '2018-12-26T16:27:37.780241Z' } ]
    */
   if (response) {
    
      yield put(getCreditLineSuccess(response));
      return response;
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getCreditRating(action) {
  try {

    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('solo-propreitorship-kyc', '');

    debugLog? console.log("[getCreditRating] url, action", url, action) : null;

    const creditRepo = new CreditRepo(url, model = '', false);
    const { response, error } = yield call(creditRepo.getCreditRating, action.params);
    debugLog? console.log("[getCreditRating] call response: ", response, error) : null;

    if (response) {
      yield put(getCreditRatingSuccess(response));
      return response;
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export default creditRootSaga = [
  takeEvery(GET_CREDIT_LINE_ACTION, getCreditLine),
  takeEvery(GET_CREDIT_RATING_ACTION, getCreditRating),
]
