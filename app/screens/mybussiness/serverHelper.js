import { execute } from 'app/config/saga'
import { patchResellCompanyTypeAction } from 'app/actions/user-actions'
import { patchResellCompanyType } from 'app/saga/user-saga'

const patchResellerCompanyType = async (params) => {
  const result = await execute(patchResellCompanyType, patchResellCompanyTypeAction);
  return result;
}