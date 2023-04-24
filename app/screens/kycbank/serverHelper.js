import { execute } from 'app/config/saga'
import consts from 'app/utils/const';

import * as userActions from 'app/actions/user-actions';
import * as userSaga from 'app/saga/user-saga';

export const getKycDetails = async (params) => {
  const result = await execute(userSaga.getKyc, userActions.getKycAction(params));
  return result;
}

export const getBankDetails = async (params) => {
  const result = await execute(userSaga.getBankDetails, userActions.getBankDetailsAction(params));
  return result;
}

export const updateBankDetails = async (params, id) => {
  const result = await execute(userSaga.updateBankDetails, userActions.updateBankDetailsAction(params, id))
  return result;
}

export const updateKyc = async (params, id) => {
  const result = await execute(userSaga.updateKyc, userActions.updateKycAction(params, id));
  return result;
}

export const patchCompany = async(params) => {
  const result = await execute(userSaga.patchCompanyProfile, userActions.patchCompanyProfileAction(params))
  return result;
}

export const getCompanyDetails = async () => {
  const result = await execute(userSaga.getUserDetails, userActions.getUserDetailsAction())
  return result;
}