import { execute } from 'app/config/saga'
import consts from 'app/utils/const';

import * as catalogActions from 'app/actions/catalog-actions';
import * as catalogSaga from 'app/saga/catalog-saga';

import * as categoryActions from 'app/actions/category-actions';
import * as categorySaga from 'app/saga/category-saga';

import * as brandActions from 'app/actions/brand-actions';
import * as brandSaga from 'app/saga/brands-saga';

export const uploadCatalog = async (params) => {
  const response = await execute(catalogSaga.uploadCatalog, catalogActions.uploadCatalogAction(params));
  return response;
}

export const initializeCategories = async () => {
  const response = await execute(categorySaga.initializeCategories);
  return response;
}

export const getMyBrands = async () => {
  const response = await execute(brandSaga.getBrands, brandActions.getBrandsAction({type: 'my'}))
  return response;
}

export const getDynamicAttributes = async (categoryId) => {
  const result = await execute(categorySaga.getCategoryEav, categoryActions.getCategoryEavAction(categoryId))
  return result;
}