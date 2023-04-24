import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';

import { errorActionSet, errorActionHandled } from '../actions/error-actions';
import PlaygroundRepo from './repository/errorhandlerplayground-repo';
import { URLConstants } from "../utils/URLConstants";

function* testError500(action) {
  try {
    const url = "https://httpstat.us/500"
    const playgroundRepo = new PlaygroundRepo(url, model='', false)
    const { response, error } = yield call(playgroundRepo.testError);
    console.log("[testError500] response, error", response, error);
    yield put(errorActionSet(error))
  } catch(error) {
    console.log("Final catch clause, error", error)
  }
}

function* testErrorCode(action) {
  try {
    const url = "https://httpstat.us/" + action.code
    const playgroundRepo = new PlaygroundRepo(url, model='', false)
    const { response, error } = yield call(playgroundRepo.testError);
    console.log("[testErrorCode] response, error", response, error);
    yield put(errorActionSet(error))
  } catch(error) {
    console.log("Final catch clause, error", error)
  }
}

function* testError400(action) {
  try {
    const url = action.required
      ? 'http://www.mocky.io/v2/5c4068730f0000710be7b44f'
      // {"name" : "This field is required"}
      
      : 'http://www.mocky.io/v2/5c4069330f00005b0be7b45d'
      // {"mobile" : "Minimum 10 digits required"}
    
    const playgroundRepo = new PlaygroundRepo(url, model='', false)
    const { response, error } = yield call(playgroundRepo.testError);
    console.log("[testError400] response, error", response, error);
    yield put(errorActionSet(error))
  } catch(error) {
    console.log("Final catch clause, error", error)
  }
}

function* testErrorNotify(action) {
  try {
    const url = action.required? 'http://www.mocky.io/v2/5c4068730f0000710be7b44f' : 'http://www.mocky.io/v2/5c4069330f00005b0be7b45d'
    const playgroundRepo = new PlaygroundRepo(url, model='', false)
    const { response, error } = yield call(playgroundRepo.testError);
    console.log("[testErrorNotify] response, error", response, error);
    yield put(errorActionHandled(error, action.errorKey))
  } catch(error) {
    console.log("Final catch clause, error", error)
  }
}

function* testDjangoB2b500(action) {
  try {
    const url = 'http://b2b.wishbook.io/api/v2/shipping-charges/?'
    const playgroundRepo = new PlaygroundRepo(url, model='', false)
    const { response, error } = yield call(playgroundRepo.testError);
    console.log("[testDjangoB2b500] response, error", response, error);
    yield put(errorActionHandled(error, action.errorKey))
  } catch(error) {
    console.log("Final catch clause, error", error)
  }
}

function* testMultiple400(action) {
  try {
    // const url = 'http://www.mocky.io/v2/5c4166920f0000543fe7b79b'
    // {"brand_name": "Brand MMR already exists", "mobile": "User is already registered"}

    const url = 'http://b2b.wishbook.io/api/v1/brands/'
    // {"image": ["This field may not be null."],"name": ["This field may not be blank."]}

    const playgroundRepo = new PlaygroundRepo(url, model='', false)
    const { response, error } = yield call(playgroundRepo.testPostError);
    console.log("[testMultiple400] response, error", response, error);
    yield put(errorActionHandled(error, action.errorKey))
  } catch(error) {
    console.log("Final catch clause, error", error)
    yield put(errorActionHandled(error, action.errorKey))
  }
}

export default errorHandlerRootSaga = [
    takeEvery("TEST_ERROR_500", testError500),
    takeEvery("TEST_ERROR_CODE", testErrorCode),
    takeEvery("TEST_ERROR_400", testError400),
    takeEvery("TEST_ERROR_NOTIFY", testErrorNotify),
    takeEvery("TEST_DJANGO_B2B_500", testDjangoB2b500),
    takeEvery("TEST_MULTIPLE_400", testMultiple400),
]