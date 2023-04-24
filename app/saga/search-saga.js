import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';

import {
    GET_SUGGESTION_ACTION,      setSuggestionSuccess,
    GET_SEARCH_CATALOG_ACTION,  setSearchCatalogSuccess,
    GET_COMPANY_LIST_SUGGESTIONS_ACTIONS,setCompanyListSuggestionsSuccess
} from '../actions/search-actions';
import { errorActionSet } from '../actions/error-actions';
import CatalogRepo from './repository/catalog-repo';
import { URLConstants } from "../utils/URLConstants";

function* getAutoSuggestionList(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs_suggestion', '');

    // console.log("[getAutoSuggestionList] url obj", url);

    var catalogRepo = new CatalogRepo(url, model = '', false);

    const { response, error } = yield call(catalogRepo.getAutoSuggestionList.bind(catalogRepo),
      action.text);

    // console.log("[getAutoSuggestionList] call response: ", response, error);

    if (response) {
      yield put(setSuggestionSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch(error) {
    yield put(errorActionSet(error));
  }
}

function* getSearchCatalog(actions) {
  try {
      let urlObj = new URLConstants();
      let url = yield urlObj.companyUrl('catalogs', '');

    //   console.log("[getSearchCatalog] url obj", url);

      var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);

      const { response, error } = yield call(catalogRepo.getPublicCatalogList.bind(catalogRepo),
          actions.offset, actions.limit, actions.filters, actions.listType);

    //   console.log("[getSearchCatalog] call response: ", response, error);

      if (response) {
          yield put(setSearchCatalogSuccess(response));
      } else {
          yield put(errorActionSet(error));
      }
  } catch (error) {
      yield put(errorActionSet(error));
  }
}

function* getCompanyListSuggestionsList(actions){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('companylist', '');

    // console.log("[getCompanyListSuggestionsList] url obj", url);

    var catalogRepo = new CatalogRepo(url, model = '', false);

    const { response, error } = yield call(catalogRepo.getCompanyList.bind(catalogRepo),
        actions.name);

    // console.log("[getCompanyListSuggestionsList] call response: ", response, error);

    if (response) {
        yield put(setCompanyListSuggestionsSuccess(response));
    } else {
        yield put(errorActionSet(error));
    }
} catch (error) {
    yield put(errorActionSet(error));
}
}


export default searchRootSaga = [
    takeLatest(GET_SUGGESTION_ACTION, getAutoSuggestionList),
    takeEvery(GET_SEARCH_CATALOG_ACTION, getSearchCatalog),
    takeEvery(GET_COMPANY_LIST_SUGGESTIONS_ACTIONS,getCompanyListSuggestionsList)
]