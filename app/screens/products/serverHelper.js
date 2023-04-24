import { execute } from 'app/config/saga'
import consts from 'app/utils/const';

import * as catalogActions from 'app/actions/catalog-actions';
import * as catalogSaga from 'app/saga/catalog-saga';

export const getCatalogDetails = async (id) => {
  const response = await execute (catalogSaga.getCatalogDetails, catalogActions.getCatalogDetailsAction(id, true));
  return response;
}