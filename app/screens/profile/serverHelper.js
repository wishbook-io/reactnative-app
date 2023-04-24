import { execute } from 'app/config/saga'
import consts from 'app/utils/const';

import * as userActions from 'app/actions/user-actions';
import * as userSaga from 'app/saga/user-saga';

import * as shipayActions from 'app/actions/shipay-actions';
import * as shipaySaga from 'app/saga/shipay-saga';

export const patchUserProfile = async (params) => {
  const result = await execute(userSaga.patchUserProfile, userActions.patchUserProfileAction(params));
  return result;
}

export const patchCompanyProfile = async (params) => {
  const result = await execute(userSaga.patchCompanyProfile, userActions.patchCompanyProfileAction(params));
  return result
}

export const patchProfile = async (params) => {
  const result = await execute(userSaga.patchProfile, userActions.patchProfileAction(params));
  return result;
}

export const fetchAddresses = async (params) => {
  const result = await execute(shipaySaga.getAddress, shipayActions.getAddressAction(params));
  return result;
}

export const updateAddress = async ({id, params}) => {
  const { response, error } = await execute(shipaySaga.updateAddress, shipayActions.updateAddressAction(id, params));
  return {response, error};
}

export const getKycDetails = async (params) => {
  const result = await execute(userSaga.getKyc, userActions.getKycAction(params));
  return result;
}

export const updateKyc = async ({id, params}) => {
  const result = await execute(userSaga.updateKyc, userActions.updateKycAction(params, id));
  return result;
}

export const getPincodes = async (pincodes) => {
  if(pincodes && pincodes.length > 0) {
    return { response: pincodes }
  }
  const result = await execute(shipaySaga.getPincodes, shipayActions.getPincodesAction());
  return result
}

export const getNotificationPreferences = async (params) => {
  const result = await execute(userSaga.getNotificationPreferences, userActions.getNotificationPreferencesAction())
  return result
}

export const postNotificationPreferences = async (params) => {
  const result = await execute(userSaga.postNotificationPreferences, userActions.postNotificationPreferencesAction(params))
  return result
}