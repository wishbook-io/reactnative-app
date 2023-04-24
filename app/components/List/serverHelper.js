import * as brandActions from 'app/actions/brand-actions';
import * as brandSaga from 'app/saga/brands-saga';
import { execute } from 'app/config/saga'
import consts from 'app/utils/const';

export const fetchData = async (saga, action, params) => {
  const {response, error} = await execute(saga, action);
  const result = {response, error, params}
  return result;
}