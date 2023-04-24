import { takeEvery, put, take } from 'redux-saga/effects';

import { 
  TRIGGER_NOTIFIER_ACTION, showAlertAction, 
  SHOW_ALERT_SUCCESS_ACTION, generateSuccessActionType,
} from '../actions/notifier-actions';

export function* triggerNotifier(action) {
  if(!action.key || action.key === 'ALERT_DEFAULT_KEY') {
    console.warn("Please use a valid key")
    return;
  }

  yield put(showAlertAction({...action.alert, key: action.key}))
  const successAction = yield take(generateSuccessActionType(action.key));

  // TODO: implement a traditional approach
  // just like how error handler does it for view handled errors
  // yield put(SET_ALERT_SUCCESS_KEY(action.key, action.confirmed))
  
  return { key: action.key, confirmed: successAction.confirmed }
}

export default notifierRootSaga = [
    takeEvery(TRIGGER_NOTIFIER_ACTION, triggerNotifier),
]