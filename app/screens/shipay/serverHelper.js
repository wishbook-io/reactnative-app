import { execute } from 'app/config/saga'
import consts from 'app/utils/const';

import { getCititesAction } from 'app/actions/state-actions';
import { getListOfCities } from 'app/saga/state-saga';

import { patchCartWbMoneyAction } from 'app/actions/cart-actions';
import { patchCartWbMoney } from 'app/saga/cart-saga';

import * as creditActions from 'app/actions/credit-actions';
import * as creditSaga from 'app/saga/credit-saga';

import * as shipayActions from 'app/actions/shipay-actions';
import * as shipaySaga from 'app/saga/shipay-saga';

export const initialize = async (params) => {
  const result = await execute(shipaySaga.initializeShippingDetails, shipayActions.initializeShippingDetailsAction(params))
  return result;
}

export const fetchCities = async (stateId, callback) => {
  const response = await execute(getListOfCities, getCititesAction(stateId, true));
  if(callback) {
    callback(response);
  } else {
    return response;
  }
}

export const fetchAddresses = async (params) => {
  const result = await execute(shipaySaga.getAddress, shipayActions.getAddressAction(params));
  return result;
}

export const updateAddress = async ({id, params, index}) => {
  const { response, error } = await execute(shipaySaga.updateAddress, shipayActions.updateAddressAction(id, params));
  return {response, error, index};
}

export const deleteAddress = async ({id, params, index}) => {
  const {response, error} = await execute(shipaySaga.deleteAddress, shipayActions.deleteAddressAction(id, params));
  return {response, error, index};
}

export const patchWbMoney = async (params) => {
  const response = await execute(patchCartWbMoney, patchCartWbMoneyAction(params));
  return response;
}

export const selectShippingAddress = async(params) => {
  const result = await execute (shipaySaga.selectShippingAddress, shipayActions.selectShippingAddressAction(params));
  return result;
}

export const patchShippingCharges = async (params) => {
  const result = await execute (shipaySaga.patchShippingCharges, shipayActions.patchShippingChargesAction(params));
  return result;
}

export const getPaymentModes = async (params) => {
  const result = await execute (shipaySaga.getPaymentModes, shipayActions.getPaymentModesAction(params));
  return result;
}

export const getCreditLine = async (params) => {
  const response = await execute (creditSaga.getCreditLine, creditActions.getCreditLineAction(params));
  return response;
}

export const getCreditRating = async (params) => {
  const response = await execute (creditSaga.getCreditRating, creditActions.getCreditRatingAction(params));
  return response;
}

export const offlinePayment = async (params) => {
  const result = await execute (shipaySaga.offlinePayment, shipayActions.offlinePaymentAction(params));
  return result;
}