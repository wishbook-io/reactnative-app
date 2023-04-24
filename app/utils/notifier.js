import { execute } from 'app/config/saga'
import { triggerNotifierAction } from 'app/actions/notifier-actions';
import { triggerNotifier } from 'app/saga/notifier-saga';

export const trigger = async (params, key) => {
  const result = await execute(triggerNotifier, triggerNotifierAction(params, key))
  return result;
}

export const showConfirm = async (key, title, description, onYes, payload, onNo) => {
  const result = await trigger({title, description, onYes, onNo, yesText: 'YES', noText: 'NO'}, key)
  return returnResult(result, onYes, payload, onNo);
  
}

export const showAlert = async (key, title, description, onYes, payload) => {
  const result = await trigger({title, description, onYes, yesText: 'OK', noText: ''}, key)
  return returnResult(result, onYes, payload, onYes);
}

const returnResult = (result, onYes, payload, onNo) => {
  if(result && result.confirmed) {
    if(onYes && typeof onYes === 'function') {
      onYes(payload)
    }
    return true;
  }

  if(onNo && typeof onNo === 'function') {
    onNo(payload)
  }
  return false;
}