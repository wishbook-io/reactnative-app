import * as brandActions from 'app/actions/brand-actions';
import * as brandSaga from 'app/saga/brands-saga';
import { execute } from 'app/config/saga'
import consts from 'app/utils/const';

export const fetchBrandsFromServer = async (params) => {
  const {response, error} = await execute(brandSaga.getBrandsCard, brandActions.getBrandsCardAction(params));
  const result = {response, error, params}
  return result;
}

export const requestFollowBrand = async (brandId, index) => {
  const {response, error} = await execute(brandSaga.addfollowBrand, brandActions.followBrandAction({brand: brandId}));
  const result = {response, error, brandId, index}
  return result;
}

export const requestUnfollowBrand = async (followId, index) => {
  const {response, error} = await execute(brandSaga.unfollowBrand, brandActions.unfollowBrandAction(followId));
  const result = {response, error, followId, index}
  return result;
}