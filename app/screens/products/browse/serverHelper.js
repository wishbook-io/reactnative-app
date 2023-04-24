import { myProductsGetCatalogsAction, disableSellCatalogAction, enableSellCatalogAction, myProductsGetSetMatchingAction, uploadSingleSetAction } from 'app/actions/catalog-actions';
import { myProductsGetCatalogs, disableSellCatalog, enableSellCatalog, myProductsGetSetMatching, uploadSingleSet } from 'app/saga/catalog-saga';
import { execute } from 'app/config/saga'
import consts from 'app/utils/const';
const PRODUCT_TYPES = consts.PRODUCT_TYPES;

export const uploadSetMatchingProduct = async (params, callback) => {
  const action = uploadSingleSetAction({
    ...params,
    return: true,
  });
  console.log("[uploadSetMatchingProduct] action", action)
  const {response, error} = await execute(uploadSingleSet, action);
  const result = {response, error, params}
  if(callback) {
    return callback(result);
  }
  return result;
}

export const fetchSetMatchingProducts = async (params, callback) => {
  const action = myProductsGetCatalogsAction({
    ...params,
    return: true,
  });
  console.log("[fetchSetMatchingProducts] action", action)
  const {response, error} = await execute(myProductsGetCatalogs, action);
  const result = {response, error, params}
  if(callback) {
    return callback(result);
  }
  return result;
}

export const fetchCatalogsFromServer = async (params, callback) => {
  const actionCreator = params.productType === PRODUCT_TYPES.SET_MATCHING? myProductsGetSetMatchingAction : myProductsGetCatalogsAction;
  const saga = params.productType === PRODUCT_TYPES.SET_MATCHING? myProductsGetSetMatching : myProductsGetCatalogs;
  const action = actionCreator({
    return: true,
    ...params,
  })
  console.log("[fetchCatalogsFromServer] action", action)
  const {response, error} = await execute(saga, action);
  const result = {response, error, params}
  if(callback) {
    return callback(result);
  }
  return result;
}

export const requestStopSellingCatalog = async (params, callback) => {
  const action = disableSellCatalogAction(params, true);
  const {response, error} = await execute(disableSellCatalog, action);
  const result = {response, error, params}
  if(callback) {
    return callback(result);
  }
  return result;
}

export const requestStartSellingCatalog = async (requestParams, callback) => {
  const {expiryDate, id} = requestParams;
  const params = {
    expiry_date: expiryDate
  }
  const action = enableSellCatalogAction(params, id, true);
  const {response, error} = await execute(enableSellCatalog, action);
  const result = {response, error, params}
  if(callback) {
    return callback(result);
  }
  return result;
}