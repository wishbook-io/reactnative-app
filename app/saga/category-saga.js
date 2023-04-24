import { takeEvery, call, put, all } from 'redux-saga/effects';

import {
  GET_CATEGORIES_ACTION,            setCategoriesSuccess,                              // TODO: remove this
  GET_EAV_CATEGORIES_ACTION,        setEavCategoriesSuccess,                           // TODO: remove this
  GET_CATEGORY_TOP_ACTION,          getCategoryTopSuccess,      getCategoryTopAction,
  GET_CATEGORY_CHILD_ACTION,        getCategoryChildSuccess,    getCategoryChildAction,
  GET_CATEGORY_EAV_ACTION,          getCategoryEavSuccess,      getCategoryEavAction,
  cacheSizeEavForCategory, 
} from '../actions/category-actions';
import { errorActionSet } from '../actions/error-actions';
import CategoryRepo from './repository/category-repo'
import { URLConstants,CONSTANT_URL } from "../utils/URLConstants";

import { debugLog } from 'app/utils/debugVars';

// only used by filters screen
function* getAllCategories(action) {
  try {
    const response = yield call(getCategoryChild, {id: 10});
    
    debugLog? console.log("getAllCategories call response: ", response) : null;
    
    if (response) {
      yield put(setCategoriesSuccess(response));
    } else {
      yield put(errorActionSet({}));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

// TODO: remove this
export function* getEavCategories(actions){
  try {
    
    
    var categoryRepo = new CategoryRepo(CONSTANT_URL.CATEGORY_EVP, model = 'Eavdata', false);
    
    const { response, error } = yield call(categoryRepo.getEavCategory.bind(categoryRepo),actions.filter);
    
    debugLog? console.log("getEnumGroupFabricsCatalog call response: " + response, error) : null;
    
    if (response) {
      yield put(setEavCategoriesSuccess(response));
      return {response}
    } else {
      yield put(errorActionSet(error));
      return {error}
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return {error}
  }
}

export function* getCategoryTop(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('categoryV2', '');
    // debugLog? console.log("[getCategoryTop] url, action", url, action) : null;
    
    var categoryRepo = new CategoryRepo(url, model = '', false);
    const { response, error } = yield call(categoryRepo.getCategoryTop, action.params);
    // debugLog? console.log("[getCategoryTop] responseLength, error: ", response.length, error) : null;

    if (response) {
      yield put(getCategoryTopSuccess(response));
      return response;
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getCategoryChild(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('categoryV2', '');
    // debugLog? console.log("[getCategoryChild] url, action", url, action) : null;
    
    var categoryRepo = new CategoryRepo(url, model = '', false);
    const { response, error } = yield call(categoryRepo.getCategoryChild, action.id);
    // debugLog? console.log("[getCategoryChild] responseLength, error: ", response && response.length, error) : null;

    if (response) {
      yield put(getCategoryChildSuccess(response, action.id));
      return response;
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getCategoryEav(action) {
  try {
    const url = CONSTANT_URL.CATEGORY_EAV
    // debugLog? console.log("[getCategoryEav] url, action", url, action) : null;
    
    var categoryRepo = new CategoryRepo(url, model = '', false);
    const { response, error } = yield call(categoryRepo.getCategoryEav, action.id, action.slug);
    // debugLog? console.log("[getCategoryEav] responseLength, error: ", response && response.length, error) : null;
    
    if (response) {
      yield put(getCategoryEavSuccess(response));
      if(action.slug === 'size') {
        yield put(cacheSizeEavForCategory(action.id, response))
      }
      return response;
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* initializeCategories() {
  try {
    //const responseCategoryTop = yield call(getCategoryTop, getCategoryTopAction());
    /*
    [ { id: 5,
       image: 
        { full_size: 'http://b2b.wishbook.io/media/__placeholder__/logo-single.png',
          thumbnail_small: 'http://b2b.wishbook.io/media/__sized__/__placeholder__/logo-single-thumbnail-150x150.png' },
       category_name: 'Menswear',
       sort_order: 0,
       is_home_display: false,
       is_active: true,
       created: '2018-07-12T12:46:47.525732Z',
       modified: '2018-12-03T18:57:30.920943Z',
       parent_category: 1 },
     { id: 4,
       image: 
        { full_size: 'http://b2b.wishbook.io/media/__placeholder__/logo-single.png',
          thumbnail_small: 'http://b2b.wishbook.io/media/__sized__/__placeholder__/logo-single-thumbnail-150x150.png' },
       category_name: 'Womenswear',
       sort_order: 0,
       is_home_display: false,
       is_active: true,
       created: '2018-07-12T12:46:47.525732Z',
       modified: '2018-12-03T18:57:37.272053Z',
       parent_category: 1 } ]
    */
    const responseCategoryTop = [{id: 10}]

    const responseCategoryChild = 
      yield all(responseCategoryTop.map(
        (topCategory) => call(getCategoryChild, getCategoryChildAction(topCategory.id))
      ))
      const responseCategoryEav = yield call(getCategoryEav, getCategoryEavAction(''));
      debugLog? console.log("[initializeCategories] yield all done") : null;
    return [responseCategoryTop, responseCategoryChild, responseCategoryEav]
  }catch(error) {
    debugLog? console.log("[initializeCategories] error", error) : null;
  }
}

export default categoryRootSaga = [
  takeEvery(GET_CATEGORIES_ACTION,            getAllCategories),
  takeEvery(GET_EAV_CATEGORIES_ACTION,        getEavCategories),
  takeEvery(GET_CATEGORY_TOP_ACTION,          getCategoryTop),
  takeEvery(GET_CATEGORY_CHILD_ACTION,        getCategoryChild),
  takeEvery(GET_CATEGORY_EAV_ACTION,          getCategoryEav),
]