import { takeEvery, call, put } from 'redux-saga/effects';

import {
  GET_LANGUAGE, getLanguageSuccess,
  SET_LANGUAGE, setLanguageSuccess
} from '../actions/language-actions';
import { errorActionSet } from '../actions/error-actions';
import LanguageRepo from './language-repo';
import { CONSTANT_URL } from "../utils/URLConstants";

export function* getSupportedLanguages(action) {
  try {
    var language = new LanguageRepo(CONSTANT_URL.LANGUAGE, model = 'ResponseLanguages', true);
    
    const { response, error } = yield call(language.getSupportedLanguages.bind(language));
    
    if (response) {
      yield put(getLanguageSuccess(response));
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

export function* setUserLanguage(action) {
  try {
    var languageResource = new LanguageRepo(CONSTANT_URL.PROFILE, model = '', false);
    const { response, error } = yield call(languageResource.setUserLanguage.bind(languageResource), action);
    
    // console.log('languageResource', response)
    // console.log('languageResourceError' + error)
    
    if (response) {
      yield put(setLanguageSuccess(response));
      return { response };
    } else {
      yield put(errorActionSet(error));
      return { error };
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error };
  }
}

export default LanguagesSaga = [
  takeEvery(GET_LANGUAGE, getSupportedLanguages),
  takeEvery(SET_LANGUAGE, setUserLanguage)
]