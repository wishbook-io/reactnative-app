import { takeEvery, call, put ,take } from 'redux-saga/effects';
import _ from 'lodash';
import {
  SET_FILTER_SCREEN_STATE ,               setFilterScreenStateSuccess,
  GET_PRE_DEFINED_FILTER_LIST_ACTION,     setPreDefinedFIlterListSuccess,
  GET_PRE_DEFINED_SUB_FILTER_LIST_ACTION, setPreDefinedSubFilterSuccess,
  SAVE_FILTER_SERVER_ACTION,              saveFilterServerSuccess,
  GET_SAVED_FILTER_FROM_SERVER_ACTION,    getSavedFilterFromServerSuccess,
  REMOVE_SAVED_FILTER_FROM_SERVER_ACTION, removeSavedFilterFromServerSuccess,
  getSavedFilterFromServerAction      
  
} from '../actions/productTab-filter-actions';
import { errorActionSet } from '../actions/error-actions';
import CategoryRepo from './repository/category-repo'
import { URLConstants,CONSTANT_URL } from "../utils/URLConstants";
import MyFilterRepo from './repository/productTab-filter-repo';

import { debugLog } from 'app/utils/debugVars';

//add local db store code in it 
function * setFilterScreenState(actions) {
  try {
    // const response = yield actions.filterScreenState,actions.filterState
    let responseObj =[];
    responseObj[0]=actions.filterScreenState;
    responseObj[1]=actions.filterState;
    const response = responseObj
    debugLog? console.log("setFilterScreenState call response: ", response) : null;
    
    if (response!=undefined) {
      yield put(setFilterScreenStateSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function * setPreDefinedFilterList(){
  try {
    
    var categoryRepo = new CategoryRepo(CONSTANT_URL.PREDEFINED_FILTER_URL, model = 'CategoryTree', true);
    const { response, error } = yield call(categoryRepo.getAllCategory.bind(categoryRepo));
    
    debugLog? console.log("setPreDefinedFIlterList call response, error: ", response, error) : null;
    
    if (response) {
      yield put(setPreDefinedFIlterListSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function *setPreDefinedSubFilter(action) {
  try {
    
    var categoryRepo = new CategoryRepo(CONSTANT_URL.PREDEFINED_SUB_FILTER_URL, model = 'SubFilterObj', true);
    const { response, error } = yield call(categoryRepo.getEavCategory.bind(categoryRepo),action.id);
    
    debugLog? console.log("setPreDefinedFIlterList call response, error: ", response, error) : null;
    
    if (response) {
      yield put(setPreDefinedSubFilterSuccess(response, action.id));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}


function *saveFilterServer(action){
  try {
    
    var myFilterRepo = new MyFilterRepo(CONSTANT_URL.USER_SAVE_FILER, model = '', false);
    const { response, error } = yield call(myFilterRepo.saveToMyFilterlist.bind(myFilterRepo),action.title,action.sub_text,action.params);
    
    debugLog? console.log("saveFilterServer call response: ", response) : null;
    debugLog? console.log("saveFilterServer call error: ", error) : null;
    
    if (response) {
      yield put(saveFilterServerSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}    

export function *getSavedFilterFromServer(action){
  try {
    
    var myFilterRepo = new MyFilterRepo(CONSTANT_URL.USER_SAVE_FILER, model = '', false);
    const { response, error } = yield call(myFilterRepo.getMyFilterlist.bind(myFilterRepo));
    
    debugLog? console.log("getSavedFilterFromServer call response: ", response) : null;
    debugLog? console.log("getSavedFilterFromServer call error: ", error) : null;
    
    if (response) {
      yield put(getSavedFilterFromServerSuccess(response, action.refreshing));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function *removeSavedFilterFromServer(action){
  try {
    //console.log("[removesavedfilterfromserver saga] action", action)
    var url = CONSTANT_URL.USER_SAVE_FILER +action.id +'/';
    var myFilterRepo = new MyFilterRepo(url, model = '', false);
    
    const { response, error } = yield call(myFilterRepo.removeFromMyFilterlist.bind(myFilterRepo));
    yield(call(getSavedFilterFromServer,getSavedFilterFromServerAction()));
    debugLog? console.log("removeSavedFilterFromServer call response: ", response) : null;
    debugLog? console.log("removeSavedFilterFromServer call error: ", error) : null;
    
    if (response) {
      yield put(removeSavedFilterFromServerSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export default productFilterRootSaga = [
  takeEvery(SET_FILTER_SCREEN_STATE,                setFilterScreenState),
  takeEvery(GET_PRE_DEFINED_FILTER_LIST_ACTION,     setPreDefinedFilterList),
  takeEvery(GET_PRE_DEFINED_SUB_FILTER_LIST_ACTION, setPreDefinedSubFilter),
  takeEvery(SAVE_FILTER_SERVER_ACTION,              saveFilterServer),
  takeEvery(GET_SAVED_FILTER_FROM_SERVER_ACTION,    getSavedFilterFromServer),
  takeEvery(REMOVE_SAVED_FILTER_FROM_SERVER_ACTION, removeSavedFilterFromServer)
]