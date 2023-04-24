import { all, takeEvery, call, put } from 'redux-saga/effects';
import { 
  GET_STATES_ACTION,          setStatesSuccess,
  GET_CITIES_ACTION,          setCitiesSuccess,
  GET_ORDERED_STATES_ACTION,  getOrderedStatesSuccess,
} from '../actions/state-actions';
import { errorActionSet } from '../actions/error-actions';
import StateRepo from './repository/state-repo';
import { URLConstants } from "../utils/URLConstants";
import UserRepo from './user-repo';

import {debugLog} from 'app/utils/debugVars';

export function* getListOfStates(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('state', '');
    
    var stateRepo = new StateRepo(url, model = 'Response_State', false);
    debugLog? console.log("url obj", url,stateRepo) : null;
    
    const { response, error } = yield call(stateRepo.getData.bind(stateRepo));
    
    debugLog? console.log("getListOfStates call response, error: ", response, error) : null;
    
    if (response) {
      yield put(setStatesSuccess(response));
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

export function* getListOfCities(actions){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('city', actions.id);
    
    var stateRepo = new StateRepo(url, model = '', false);
    debugLog? console.log("getListOfCities url", url,stateRepo) : null;
    
    const { response, error } = yield call(stateRepo.getData.bind(stateRepo));
    
    debugLog? console.log("getListOfCities call response: ", response, error) : null;
    
    if (response) {
      yield put(setCitiesSuccess(response, actions.loadingParam));
      return { response };
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* getOrderedStates(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('state', '');
    
    var stateRepo = new StateRepo(url, model = 'Response_State', false);
    debugLog? console.log("url obj", url,stateRepo) : null;
    
    const { response, error } = yield call(stateRepo.getOrderedStates, action.params);
    debugLog? console.log("getListOfStates call response, error: ", response, error) : null;
    
    if (response) {
      yield put(getOrderedStatesSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export default stateRootSaga = [
  takeEvery(GET_STATES_ACTION,          getListOfStates),
  takeEvery(GET_CITIES_ACTION,          getListOfCities),
  takeEvery(GET_ORDERED_STATES_ACTION,  getOrderedStates),
]