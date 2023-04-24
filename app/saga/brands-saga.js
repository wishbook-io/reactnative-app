import { takeEvery, call, put } from 'redux-saga/effects';
import {Alert} from 'react-native'
import {
  GET_BRANDS_ACTION,              setBrandsSuccess, 
  GET_ALL_BRANDS_ACTION,          setAllBrandsSuccess,
  GET_BRANDS_I_OWN_ACTION,        setBrandsIOwnSuccess, getBrandsIOwnAction,
  GET_BRANDS_I_SELL_ACTION,       setBrandsISellSuccess,
  UPDATE_BRANDS_I_SELL_ACTION,    updateBrandsISellSuccess, getBrandsISellAction,
  FOLLOW_BRAND_ACTION,            followBrandSuccess,
  UNFOLLOW_BRAND_ACTION,          unfollowBrandSuccess,
  GET_BRAND_HAS_PERMISSION_ACTION,getBrandhasPermissionSuccess,
  ADD_BRAND_ACTION,               addBrandSuccess,
  GET_BRANDS_CARD_ACTION,         getBrandsCardSuccess,
} from '../actions/brand-actions';
import { errorActionSet, errorActionHandled } from '../actions/error-actions';
import BrandRepo from './repository/brands-repo'
import { URLConstants } from "../utils/URLConstants";
import {getCatalogDetailsAction} from '../actions/catalog-actions';

import { debugLog } from '../utils/debugVars';

export function* getBrands(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('brands', '');
    
    debugLog? console.log("url obj", url) : null;
    
    var brandRepo = new BrandRepo(url, model = 'Response_Brands', true);
    
    const { response, error } = yield call(brandRepo.getBrands.bind(brandRepo), action.params);
    
    debugLog? console.log("getBrands call response: ", response, error) : null;
    
    if (response) {
      yield put(setBrandsSuccess(response));
      return response;
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* getAllBrands(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('brands_dropdown', '');
    
    // url = url + '/dropdown/'
    
    debugLog? console.log("url obj", url) : null;
    
    var brandRepo = new BrandRepo(url, model = 'Response_Brands', true);
    
    const { response, error } = yield call(brandRepo.getBrands.bind(brandRepo),action.params );
    
    // debugLog? console.log("getAllBrands call response: ", response, error) : null;
    
    if (response) {
      yield put(setAllBrandsSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* getBrandsIOwn(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('brands', '');
    
    debugLog? console.log("url obj", url) : null;
    
    var brandRepo = new BrandRepo(url, model = '', false);
    
    const { response, error } = yield call(brandRepo.getBrands.bind(brandRepo), {mycompany:true});
    
    // debugLog? console.log("[getBrandsIOwn] call response: ", response, error) : null;
    
    if (response) {
      yield put(setBrandsIOwnSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* getBrandsISell(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('brands_distributor', '');
    
    debugLog? console.log("url obj", url) : null;
    
    var brandRepo = new BrandRepo(url, model = '', false);
    
    const { response, error } = yield call(brandRepo.getBrands.bind(brandRepo), {expand:true});
    
    // debugLog? console.log("[getBrandsISell] call response: ", response, error) : null;
    
    if (response) {
      yield put(setBrandsISellSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* updateBrandsISell(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('brands_distributor', '');
    
    if(action.patch) {
      url = url + action.id + '/';
    }
    debugLog? console.log("[updateBrandsISell] url obj", url) : null;
    
    var brandRepo = new BrandRepo(url, model = '', false);
    
    const { response, error } = yield call(brandRepo.updateBrandsISell.bind(brandRepo), action.id, action.brandsISellIds, action.patch);
    
    // debugLog? console.log("[updateBrandsISell] call response: ", response, error) : null;
    
    if (response) {
      yield(put(updateBrandsISellSuccess(response)))
      // if we have a response, we again fetch the brandsISell from server
      // if we don't want this functionality, then we can add it as an action
      // param like doRefreshBrandsISell = true, and check it here
      yield put(getBrandsISellAction());
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* addfollowBrand(action){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('brands-follow', '');
    
    debugLog? console.log("url obj", url) : null;
    
    var brandRepo = new BrandRepo(url, model = '', false);
    
    const { response, error } = yield call(brandRepo.followBrand.bind(brandRepo),action.params);
    
    debugLog? console.log("[getfollowBrand] call response: ", response, error) : null;
    
    if (response) {
      yield put(followBrandSuccess(response));
      if(action.productId) {
        yield put (getCatalogDetailsAction(action.productId));
      }
      return { response }
      
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* unfollowBrand(action){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('brands-follow', action.followId);
    debugLog? console.log("url obj", url) : null;
    
    var brandRepo = new BrandRepo(url, model = '', false);
    
    const { response, error } = yield call(brandRepo.unfollowBrand.bind(brandRepo));
    
    debugLog? console.log("[getfollowBrand] call response: ", response, error) : null;
    
    if (response) {
      yield put(unfollowBrandSuccess(response));
      if(action.productId) {
        yield put (getCatalogDetailsAction(action.productId));
      }
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  } 
}

function* getBrandhasPermission(action){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('brands_permission', '');
    debugLog? console.log("[getBrandhasPermission] obj", url) : null;
    
    var brandRepo = new BrandRepo(url, model = '', false);
    
    const { response, error } = yield call(brandRepo.followBrand.bind(brandRepo),action.params);
    
    debugLog? console.log("[getBrandhasPermission] call response: ", response, error) : null;
    
    if (response) {
      yield put(getBrandhasPermissionSuccess(response));
    } else {
      debugLog? console.log('1') : null;
      yield put(errorActionHandled(error, action.errorKey, [400]));
    }
  } catch (error) {
    debugLog? console.log('2') : null;
    
    yield put(errorActionSet(error));
  } 
}

export function* addBrand(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('brands', '');
    
    debugLog? console.log("url, action", url, action) : null;
    
    var brandRepo = new BrandRepo(url, model = 'Response_Brands', true);
    
    const { response, error } = yield call(brandRepo.addBrand.bind(brandRepo), action.formData);
    
    debugLog? console.log("[addBrand] call response: ", response, error) : null;
    
    if (response) {
      /*
      {   id: 608,
        name: 'Test Brand Name 01',
        company: 'Laxmi Emporium',
        company_id: 3857,
        image: { 
          full_size: 'http://b2b.trivenilabs.com/media/brand_image/image-aa476eb4-ff62-494b-abd8-794430650f5d.jpg',
          thumbnail_small: 'http://b2b.trivenilabs.com/media/__sized__/brand_image/image-aa476eb4-ff62-494b-abd8-794430650f5d-thumbnail-150x150-90.jpg' 
        },
        total_catalogs: 0,
        user: 'bhavik101' 
      }
      */
      
      yield put(addBrandSuccess(response));
      // again, if required, set a flag in actions whether or not
      // to refresh the BrandsIOwn after successful completion of addBrand
      yield put(getBrandsIOwnAction())
      return {response};
    } else {
      debugLog? console.log("[addBrand] Error before ") : null;
      if(action.errorCodesHandled && action.errorCodesHandled.includes(error.status)) {
        return {error}
      }
      yield put(errorActionSet(error));
    }
  } catch (error) {
    debugLog? console.log("[addBrand] Error after ") : null;
    yield put(errorActionSet(error));
  }
}

export function* getBrandsCard(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('brands', '');
    
    debugLog? console.log("[getBrandsCard] url, action", url, action) : null;
    
    var brandRepo = new BrandRepo(url, model = '', false);
    
    const { response, error } = yield call(brandRepo.getBrandsCard, action.params);
    debugLog? console.log("[getBrandsCard] response size, error", response.length, error) : null;
    
    if (response) {
      yield put(getBrandsCardSuccess(response, action.clear));
      return {response}
    } else {
      yield put(errorActionSet(error));
      return {error}
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return {error}
  }
}

export default brandsRootSaga = [
  takeEvery(GET_BRANDS_ACTION, getBrands),
  takeEvery(GET_ALL_BRANDS_ACTION, getAllBrands),
  takeEvery(GET_BRANDS_I_OWN_ACTION, getBrandsIOwn),
  takeEvery(GET_BRANDS_I_SELL_ACTION, getBrandsISell),
  takeEvery(UPDATE_BRANDS_I_SELL_ACTION, updateBrandsISell),
  takeEvery(FOLLOW_BRAND_ACTION,addfollowBrand),
  takeEvery(UNFOLLOW_BRAND_ACTION,unfollowBrand),
  takeEvery(GET_BRAND_HAS_PERMISSION_ACTION,getBrandhasPermission),
  takeEvery(ADD_BRAND_ACTION, addBrand),
  takeEvery(GET_BRANDS_CARD_ACTION, getBrandsCard),
]