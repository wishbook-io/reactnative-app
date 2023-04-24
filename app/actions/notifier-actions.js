export const TRIGGER_NOTIFIER_ACTION = 'TRIGGER_NOTIFIER_ACTION';

export const SHOW_ALERT_ACTION = 'SHOW_ALERT_ACTION'
export const SHOW_ALERT_SUCCESS_ACTION = 'SHOW_ALERT_SUCCESS_ACTION'

export const POP_ALERT_ACTION = 'POP_ALERT_ACTION'
export const CLEAR_ALERT_ACTION = 'CLEAR_ALERT_ACTION'

const ALERT_DEFAULT_KEY = 'ALERT_DEFAULT_KEY'

const defaultAlertParams = {
  yesText: 'YES',
  noText: 'NO',
  title: 'Alert',
  description: 'Are you sure?',
}

export const generateSuccessActionType = (key) => {
  if(!key || key === ALERT_DEFAULT_KEY) {
    console.warn("Supply a valid key for the Alert")
  }
  return SHOW_ALERT_SUCCESS_ACTION + '_' + key
}

export const triggerNotifierAction = (params = defaultAlertParams, key = ALERT_DEFAULT_KEY) => ({
  type: TRIGGER_NOTIFIER_ACTION,
  alert: params,
  key,
})

export const showAlertAction = (params = defaultAlertParams) => ({
  type: SHOW_ALERT_ACTION,
  alert: params,
})

export const showAlertSuccessAction = ({confirmed, key}) => ({
  type: generateSuccessActionType(key),
  confirmed,
  key,
})

export const popAlertAction = () => ({
  type: POP_ALERT_ACTION,
})

export const clearAlertAction = () => ({
  type: CLEAR_ALERT_ACTION,
})
