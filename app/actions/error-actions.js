export const ERROR_HANDLER = 'ERROR_HANDLER';
export const SET_ERROR_FOR_ERROR_KEY = "SET_ERROR_FOR_ERROR_KEY";
export const CLEAR_ERROR_FOR_ERROR_KEY = "CLEAR_ERROR_FOR_ERROR_KEY"; 

export const STATUS_CODE_GROUP = {
  AUTH: [401, 403],
  SERVER: [500],
  GATEWAY: [502],
  NOT_FOUND: [404],
  INVALID: [400],
}

export const errorHandler = (error, errorActionType,) => ({
  type: ERROR_HANDLER,
  error,
  errorActionType
})

export const setErrorForErrorKey = (key, error) => ({
  type: SET_ERROR_FOR_ERROR_KEY,
  key,
  error,
})

export const clearErrorForErrorKey = (key) => ({
  type: CLEAR_ERROR_FOR_ERROR_KEY,
  key,
})

export function errorActionSet(error, errorActionType) {
  console.log("in errorActionSet", error);
  return errorHandler(error, errorActionType);
}

export function errorActionHandled(error, errorKey, errorCodesHandled = STATUS_CODE_GROUP.INVALID, errorProcess) {
  console.log("in errorActionHandled", {error, errorKey, errorCodesHandled});
  return errorHandler({...error, errorKey, errorCodesHandled, errorProcess})
}