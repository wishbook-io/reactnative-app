import { execute } from 'app/config/saga'
import consts from 'app/utils/const';

import * as brandActions from 'app/actions/brand-actions';
import * as brandsSaga from 'app/saga/brands-saga';

export const addBrand = async (params) => {
  const response = await execute (brandsSaga.addBrand, brandActions.addBrandAction(params));
  return response;
}