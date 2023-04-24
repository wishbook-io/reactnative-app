import { execute } from 'app/config/saga'

import * as shipayActions from 'app/actions/shipay-actions';
import * as shipaySaga from 'app/saga/shipay-saga';

export const patchDisplayAmount = async (params) => {
  const result = await execute(shipaySaga.patchDisplayAmount, shipayActions.patchDisplayAmountAction(params))
  return result;
}