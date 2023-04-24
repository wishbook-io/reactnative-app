import { takeEvery, call, put, fork, take, actionChannel } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import { takeFirst } from 'app/config/saga';
import consts from 'app/utils/const';

//Task
//1. get list of category

import {
  GET_PUBLIC_CATALOG_ACTION,            setPublicCatalogSuccess,
  UPLOAD_CATALOG_ACTION,                uploadCatalogSuccess,           setUploadCatalogProgress,
  UPLOAD_SET_ACTION,                    uploadSetSuccess,               setUploadSetProgress,
  GET_ADD_CATALOG_ACTION,               setAddCatalogSuccess,
  GET_CATALOG_DETAILS_ACTION,           getCatalogDetailsSuccess,       getCatalogDetailsAction,
  GET_PRODUCT_DETAILS_ACTION,           getProductDetailsSuccess,
  GET_CATALOG_DROPDOWN_ACTION,          setCatalogDropdownSuccess,
  GET_READY_TO_SHIP_CATALOG_ACTION,     setReadyToShipCatalogSuccess,
  GET_PRE_ORDER_CATALOG_ACTION,         setPreOrderCatalogSuccess,
  GET_NON_CATALOG_ACTION,               setNonCatalogSuccess,
  GET_SINGLE_CATALOG_ACTION,            setSingleCatalogSuccess,
  GET_MOST_SOLD_CATALOG_ACTION,         setMostSoldCatalogSuccess,
  GET_MOST_VIEWED_CATALOG_ACTION,       setMostViewedCatalogSuccess,
  GET_FOLLOWED_BRANDS_CATALOG_ACTION,   setFollowedBrandsCatalogSuccess,
  GET_RECENTLY_VIEWED_CATALOG_ACTION,   setRecentlyViewedCatalogSuccess,
  SEND_CATALOG_ENQUIRY_ACTION,          sendCatalogEnquirySuccess,
  GET_PUBLIC_CATALOG_LOAD_MORE_ACTION,  getPublicCatalogLoadMoreSuccess,
  SEND_BECOME_SELLER_CATALOG_ACTION,    sendBecomeSellerCatalogSuccess,
  ENABLE_SELL_CATALOG_ACTION,           enableSellCatalogSuccess,
  DISABLE_SELL_CATALOG_ACTION,          disableSellCatalogSuccess,
  MY_PRODUCTS_GET_CATALOGS_ACTION,      myProductsGetCatalogsSuccess, 
  MY_PRODUCTS_GET_SET_MATCHING_ACTION,  myProductsGetSetMatchingSuccess,
  CATALOG_VIEWED_ACTION,                catalogViewedSuccess,
  GET_SHARED_PRODUCTS_ACTION,           getSharedProductsSuccess,
  SHARE_PRODUCTS_ACTION,                shareProductsSuccess,
  BULK_UPDATE_START_STOP_ACTION,        bulkUpdateStartStopSuccess,
  GET_MY_PRODUCT_DETAILS_ACTION,        getMyProductDetailsSuccess,
  START_SHARING_ACTION,                 startSharingSuccess,
  GET_GUEST_PRODUCT_DETAILS_ACTION,     getGuestProductDetailsSuccess,
} from '../actions/catalog-actions';
import { errorActionSet } from '../actions/error-actions';
import CatalogRepo from './repository/catalog-repo';
import { URLConstants } from "../utils/URLConstants";

import { debugLog } from '../utils/debugVars';



function* getPublicCatalog(actions) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs', '');
    
    debugLog? console.log("[getPublicCatalog] url, action", url, actions):null;
    
    var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);
    
    const { response, error } = yield call(catalogRepo.getPublicCatalogList.bind(catalogRepo),
    actions.offset, actions.limit, actions.filters, actions.listType);
    
    debugLog? console.log("getPublicCatalog call response: ", response, error):null;
    
    if (response) {
      yield put(setPublicCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

// flow for this saga:
// 1. call the first API for uploading catalogs
// 2. wait for it to complete since we need the product id
// 3. fork off the 2nd call (we don't care about the results for this)
// 4. wait for the result of 3rd call saga - catalogUploadProgressReporter
// 5. return its result 
export function* uploadCatalog(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('upload_catalogs', '');
    
    debugLog? console.log("url obj", url, action) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    let { response, error } = yield call(catalogRepo.createCatalog.bind(catalogRepo), action.params[0]);
    
    debugLog? console.log("[uploadCatalog] call response: ", response, error) : null;
    
    const catalogId = response.id;
    let responseCatalog = yield fork(postCatalogOptions, {params: action.params[1], catalogId})
    
    let callThreeParams = action.params[2]
    debugLog? console.log("[uploadCatalog] original callThreeParams", callThreeParams) : null;
    callThreeParams.forEach((formData, index) => { formData.append('catalog', catalogId)})
    debugLog? console.log("[uploadCatalog] final callThreeParams", callThreeParams) : null;
    let responseReporter = yield call(catalogUploadProgressReporter, {data: callThreeParams})
    
    if (response) {
      yield put(uploadCatalogSuccess([response, responseReporter]));
      return {response: [response, responseReporter]};
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

// flow for 3rd call saga - catalogUploadProgressReporter (say reporter saga)
// 1. simultaneously launch call three on all products
// 2. as and when the calls complete, increment the count and report it to the store
// 3. when all calls complete return the complete result back to parent saga
function* catalogUploadProgressReporter(payload) {
  try {
    const actionType = "UPLOADER_WORKER";
    const chan = yield call(channel);
    const data = payload.data;
    let i=0;
    for(i=0; i<data.length; ++i) {
      debugLog? console.log("[catalogUploadProgressReporter] now forking id:", i):null;
      yield fork(uploaderWorker, {params: data[i], workerId: i, actionType, urlKey: 'productsonly'}, chan)
    }
    
    let maxProgress = 0;
    let responses = []
    for(i =0; i<data.length; ++i) {
      const {response, error, workerId} = yield take(chan);
      // const takeObj = yield take(chan);
      // console.log("[catalogUploadProgressReporter] takeObj", takeObj);
      debugLog? console.log("[catalogUploadProgressReporter] worker returned id:", workerId):null;
      debugLog? console.log("maxProgress before", maxProgress):null;
      maxProgress++;
      responses.push(response);
      debugLog? console.log("maxProgress: ", maxProgress):null;
      yield put(setUploadCatalogProgress(maxProgress));
    }
    return responses;
    
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* uploaderWorker(payload, chan) {
  try {
    const workerId = payload.workerId;
    debugLog? console.log('[uploaderWorker] id: ', workerId):null;
    let urlObj = new URLConstants();
    const urlKey = payload.urlKey
    let url = yield urlObj.companyUrl(urlKey, '');
    
    debugLog? console.log("url obj", url, payload):null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    let { response, error } = yield call(catalogRepo.createCatalog.bind(catalogRepo), payload.params);
    
    debugLog? console.log("[uploaderWorker] call response: ", response, error):null;
    yield put(chan, {type: payload.actionType, response, error, workerId})
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* uploadSingleSet(action) {
  try {
    
    // callTwoParams will be a form data object simply
    // in order to fit it into existing sagas, we convert it to array
    let callTwoParams = [action.params[0]]
    
    // callThreeParams will be an array of formDatas for the images
    // this too needs to be wrapped in an array for the flow to work
    let callThreeParams = [action.params[1]]
    let responseReporter = yield call(setUploadProgressReporter, {callTwoParams, callThreeParams, reportCallTwoProgress: false, reportCallThreeProgress: true})
    
    if (action.return) {
      return responseReporter;
    } else {
      yield put(uploadSetSuccess(responseReporter));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}
/*
this saga is used when we are uploading a fresh set
using AddProducts
it works as follows
1. posting a new catalog on server sending info like photoshoot type, fabric, work, etc., we get an id (id1)
2. using the id1, we fork off all the sets to be uploaded
3. for each set uploaded, we get another id (id2)
4. using the id2, we fork off all the product photos to be uploaded within those sets
*/
function* uploadSet(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('upload_catalogs', '');
    
    debugLog? console.log("url obj", url, action):null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    let { response, error } = yield call(catalogRepo.postSet.bind(catalogRepo), action.params[0]);
    
    debugLog? console.log("[uploadSet] call response: ", response, error):null;
    
    const catalogId = response.id;
    
    let callTwoParams = action.params[1]
    debugLog? console.log("[uploadSet] original callTwoParams", callTwoParams) : null;
    callTwoParams.forEach((formData, index) => { formData.append('catalog', catalogId)})
    debugLog? console.log("[uploadSet] final callTwoParams", callTwoParams) : null;
    let callThreeParams = action.params[2]
    let responseReporter = yield call(setUploadProgressReporter, {callTwoParams, callThreeParams})
    
    if (response) {
      yield put(uploadSetSuccess([response, responseReporter]));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* setUploadProgressReporter(payload) {
  try {
    const actionType = "UPLOADER_SET";
    const chan = yield call(channel);
    const callTwoParams = payload.callTwoParams
    const callThreeParams = payload.callThreeParams
    const reportCallTwoProgress = payload.reportCallTwoProgress
    const reportCallThreeProgress = payload.reportCallThreeProgress
    const length = callTwoParams.length;
    let i=0;
    for(i=0; i<length; ++i) {
      debugLog? console.log("[setUploadProgressReporter] now forking uploaderSet id:", i) : null;
      yield fork(uploaderSet, {callTwoParams: callTwoParams[i], callThreeParams: callThreeParams[i], workerId: i, actionType, reportCallThreeProgress}, chan)
    }
    
    let maxProgress = 0;
    let responses = []
    for(i =0; i<length; ++i) {
      const {responses, workerId} = yield take(chan);
      // const takeObj = yield take(chan);
      // console.log("[catalogUploadProgressReporter] takeObj", takeObj);
      debugLog? console.log("[setUploadProgressReporter] worker returned id:", workerId) : null;
      debugLog? console.log("[setUploadProgressReporter] maxProgress before", maxProgress) : null;
      maxProgress++;
      responses.push(responses);
      debugLog? console.log("[setUploadProgressReporter] maxProgress: ", maxProgress) : null;
      if(reportCallTwoProgress) {
        yield put(setUploadSetProgress(maxProgress));
      }
    }
    return responses;
    
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* uploaderSet(payload, putChannel) {
  try {
    const myWorkerId = payload.workerId;
    const callTwoParams = payload.callTwoParams;
    const reportCallThreeProgress = payload.reportCallThreeProgress;
    debugLog? console.log('[uploaderSet] id: ', myWorkerId) : null;
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('productsonly', '');
    
    debugLog? console.log("[uploaderSet] id, url, params", myWorkerId, url, callTwoParams) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    let { response, error } = yield call(catalogRepo.createCatalog.bind(catalogRepo), callTwoParams);
    
    debugLog? console.log("[uploaderSet] id, response, error: ", myWorkerId, response, error) : null;
    
    const productId = response.id;
    
    let callThreeParams = payload.callThreeParams
    debugLog? console.log("[uploaderSet] id, original callThreeParams", myWorkerId, callThreeParams) : null;
    callThreeParams.forEach((formData, index) => { formData.append('product', productId)})
    debugLog? console.log("[uploaderSet] id, final callThreeParams", myWorkerId, callThreeParams) : null;
    
    // yield put(chan, {type: payload.actionType, response, error, workerId})
    const actionType = "UPLOADER_WORKER";
    const chan = yield call(channel);
    const length = callThreeParams.length;
    let i=0;
    for(i=0; i<length; ++i) {
      debugLog? console.log("[uploaderSet] id, now forking uploaderWorker id:", myWorkerId, i) : null;
      yield fork(uploaderWorker, {params: callThreeParams[i], workerId: i, actionType, urlKey: 'products_photos'}, chan)
    }
    
    let maxProgress = 0;
    let responses = []
    for(i=0; i<length; ++i) {
      const {response, error, workerId} = yield take(chan);
      // const takeObj = yield take(chan);
      // console.log("[catalogUploadProgressReporter] takeObj", takeObj);
      debugLog? console.log("[uploaderSet] id, worker returned id:", myWorkerId, workerId) : null;
      debugLog? console.log("[uploaderSet] id, maxProgress before", myWorkerId, maxProgress) : null;
      maxProgress++;
      responses.push({response, error, workerId});
      debugLog? console.log("[uploaderSet] id, maxProgress: ", myWorkerId, maxProgress) : null;
      if(reportCallThreeProgress) {
        yield put(setUploadSetProgress(maxProgress));
      }
    }
    yield put(putChannel, {type: payload.actionType, responses, workerId: myWorkerId})
    
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* postCatalogOptions(payload) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs_upload_option', '');
    
    debugLog? console.log("url obj", url, payload) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const params = payload.params;
    const catalogId = payload.catalogId;
    
    let { response, error } = yield call(catalogRepo.postCatalogOptions.bind(catalogRepo), params, catalogId);
    
    debugLog? console.log("[postCatalogOptions] call response: ", response, error) : null;
    return {response, error}
    
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* getAddCatalog(actions) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs', '');
    
    debugLog? console.log("url obj", url, actions.params) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { response, error } = yield call(catalogRepo.createCatalog.bind(catalogRepo),
    actions.params, actions.fileKey, actions.fileName);
    
    debugLog? console.log("getAddCatalog call response: " + response, error) : null;
    
    if (response) {
      yield put(setAddCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getCatalogDropDownList(actions) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalog_dropdown', '');
    
    debugLog? console.log("url obj", url):null;
    
    var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);
    
    const { response, error } = yield call(catalogRepo.getCatalogDropDownList.bind(catalogRepo), actions.filters, actions.brandId, actions.categoryId);
    
    debugLog? console.log("getCatalogDropDownFilterList call response: ", response, error):null;
    /*
    sample params:
    {"view_type":"public","brand":624,"category":12,"title":"ty"}
    
    sample output if ty exists
    [{view_permission: "public", id: 5771, title: "Ty"}]
    
    sample output if ty doesn't exist
    []
    */
    if (response) {
      yield put(setCatalogDropdownSuccess(response));
      return response;
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* validateSetName(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('dropdownvalidate', '');
    debugLog? console.log("url obj", url):null;
    var catalogRepo = new CatalogRepo(url, model = '', false);
    const { response, error } = yield call(catalogRepo.validateSetName.bind(catalogRepo), action.text);
    debugLog? console.log('[validateSetName] response, error', response, error):null
    if (response) {
      return response;
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getCatalogDetails(action) {
  try {
    let urlObj = new URLConstants();
    let catalogId = action.catalogid + ''
    // console.log("getCatalogDetails: catalogid", catalogId);
    let spaceSplit = catalogId.split(',');
    // console.log("getCatalogDetails: spacesplit", spaceSplit);
    if(spaceSplit.length > 1) {
      catalogId = spaceSplit[0]
    }
    // check if catalogId is a number
    const numericCatalogId = Number.parseInt(catalogId);
    if(!numericCatalogId) {
      console.log("getCatalogDetails: invalid catalog id", action);
      yield put(errorActionSet({status: 404}))
      return;
    }
    let url = yield urlObj.companyUrl('catalogs_id', numericCatalogId);
    debugLog? console.log("url obj", url):null
    var catalogRepo = new CatalogRepo(url, model = 'Response_Catalog', false);
    const { response, error } = yield call(catalogRepo.getCatalogDetails.bind(catalogRepo), action.params,);
    debugLog?console.log('getCatalogDetails', response):null
    if (response) {
      if(action.return) {
        return response;
      }
      yield put(getCatalogDetailsSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
  
}

export function* getProductDetails(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs_id', action.id);
    debugLog? console.log("url obj", url):null
    var catalogRepo = new CatalogRepo(url, model = 'Response_Catalog', false);
    const { response, error } = yield call(catalogRepo.getCatalogDetails.bind(catalogRepo));
    debugLog?console.log('getProductDetails', response):null
    if (response) {
      yield put(getProductDetailsSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}


export function* getReadyToShipCatalog(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs', '');
    
    debugLog?console.log("[getReadyToShipCatalog] url obj", url):null;
    
    var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);
    
    const { response, error } = yield call(catalogRepo.getReadyToShipCatalog.bind(catalogRepo)/*,
    actions.offset, actions.limit, actions.filters, actions.listType*/);
    
    debugLog?console.log("[getReadyToShipCatalog] call response: ", response, error):null;
    
    if (response) {
      yield put(setReadyToShipCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getPreOrderCatalog(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs', '');
    
    debugLog?console.log("[getPreOrderCatalog] url obj", url):null;
    
    var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);
    
    const { response, error } = yield call(catalogRepo.getPublicCatalogList.bind(catalogRepo),
    action.offset, action.limit, action.filters, action.listType);
    
    debugLog?console.log("[getPreOrderCatalog] call response: ", response, error):null;
    
    if (response) {
      yield put(setPreOrderCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getNonCatalog(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs', '');
    
    debugLog?console.log("[getNonCatalog] url obj", url):null;
    
    var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);
    
    const { response, error } = yield call(catalogRepo.getPublicCatalogList.bind(catalogRepo),
    action.offset, action.limit, action.filters, action.listType);
    
    debugLog?console.log("[getNonCatalog] call response: ", response, error):null;
    
    if (response) {
      yield put(setNonCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getSingleCatalog(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs', '');
    
    debugLog?console.log("[getSingleCatalog] url obj", url):null;
    
    var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);
    
    const { response, error } = yield call(catalogRepo.getPublicCatalogList.bind(catalogRepo),
    action.offset, action.limit, action.filters, action.listType);
    
    debugLog?console.log("[getSingleCatalog] call response: ", response, error):null;
    
    if (response) {
      yield put(setSingleCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getMostSoldCatalog(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs', '');
    
    debugLog?console.log("[getMostSoldCatalog] url obj", url):null;
    
    var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);
    
    const { response, error } = yield call(catalogRepo.getPublicCatalogList.bind(catalogRepo),
    action.offset, action.limit, action.filters, action.listType);
    
    debugLog?console.log("[getMostSoldCatalog] call response: ", response, error):null;
    
    if (response) {
      yield put(setMostSoldCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getMostViewedCatalog(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs', '');
    
    debugLog?console.log("[getMostViewedCatalog] url obj", url):null;
    
    var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);
    
    const { response, error } = yield call(catalogRepo.getPublicCatalogList.bind(catalogRepo),
    action.offset, action.limit, action.filters, action.listType);
    
    debugLog?console.log("[getMostViewedCatalog] call response: ", response, error):null;
    
    if (response) {
      yield put(setMostViewedCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getFollowedBrandsCatalogList(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs', '');
    
    debugLog?console.log("[getFollowedBrandsCatalogList] url obj", url):null;
    
    var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);
    
    const { response, error } = yield call(catalogRepo.getFollowedBrandsCatalogList.bind(catalogRepo),
    action.offset, action.limit, action.filters);
    
    debugLog?console.log("[getFollowedBrandsCatalogList] call response: ", response, error):null;
    
    if (response) {
      yield put(setFollowedBrandsCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getRecentlyViewedCatalog(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.userUrl('recent-catalog', '');
    
    debugLog?console.log("[getRecentlyViewedCatalog] url obj", url):null;
    
    var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);
    
    const { response, error } = yield call(catalogRepo.getRecentlyViewedCatalog.bind(catalogRepo),
    action.offset, action.limit, action.filters);
    
    debugLog?console.log("[getRecentlyViewedCatalog] call response: ", response, error):null;
    
    if (response) {
      yield put(setRecentlyViewedCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}


function* sendCatalogEnquiry(action){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalog-enquiries', '');
    
    debugLog? console.log(" url  obj", url) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { response, error } = yield call(catalogRepo.sendEnquiry.bind(catalogRepo),
    action.params);
    
    debugLog? console.log("getRecentlyViewedCatalog call response: ", response, error) : null;
    
    if (response) {
      yield put(sendCatalogEnquirySuccess(response));
      yield put (getCatalogDetailsAction(action.productId));
      
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* getPublicCatalogLoadMore(actions){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs', '');
    
    debugLog? console.log("[getPublicCatalog] url obj", url) : null;
    
    var catalogRepo = new CatalogRepo(url, model = 'Response_CatalogMini', false);
    
    const { response, error } = yield call(catalogRepo.getPublicCatalogList.bind(catalogRepo),
    actions.offset, actions.limit, actions.filters, actions.listType);
    
    debugLog? console.log("getPublicCatalog call response: " + response, error) : null;
    
    if (response) {
      yield put(getPublicCatalogLoadMoreSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  } 
}

function* becomeCatalogSeller(action){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalog-seller', '');
    
    debugLog? console.log("[catalog-seller] url obj", url) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { response, error } = yield call(catalogRepo.sellCatalog.bind(catalogRepo),
    action.params);
    
    debugLog? console.log("[catalog-seller] call response: " + response, error) : null;
    yield(call(getCatalogDetails,getCatalogDetailsAction(action.id)));
    
    if (response) {
      yield put(sendBecomeSellerCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  } 
}

export function* enableSellCatalog(action){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs_enable', action.id);
    
    debugLog? console.log("[enableSellCatalog] url obj", url) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { response, error } = yield call(catalogRepo.sellCatalog.bind(catalogRepo),
    action.params);
    
    debugLog? console.log("[enableSellCatalog] call response: ", response, error) : null;
    
    if(action.return) {
      return {response, error};
    }
    
    yield(call(getCatalogDetails,getCatalogDetailsAction(action.id)));
    
    
    
    if (response) {
      yield put(enableSellCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  } 
}

export function* disableSellCatalog(action){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalogs_disable', action.id);
    
    debugLog? console.log("[disableSellCatalog] url obj", url) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { response, error } = yield call(catalogRepo.sellCatalog.bind(catalogRepo));
    
    debugLog? console.log("[disableSellCatalog] call response: ", response, error) : null;
    
    if(action.return) {
      return {response, error};
    }
    
    yield(call(getCatalogDetails,getCatalogDetailsAction(action.id)));
    
    
    if (response) {
      yield put(disableSellCatalogSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  } 
}

// general purpose saga to fetch my catalogs
// with limit of 10 by default
export function* myProductsGetCatalogs(action) {
  try {
    let urlObj = new URLConstants();
    
    let url = yield urlObj.companyUrl('catalogs', '');
    
    debugLog? console.log("[myProductsGetCatalogs] url obj", url) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { params, clear } = action;
    debugLog? console.log("[myProductsGetCatalogs] calling with params, clear", params, clear) : null;
    const { response, error } = yield call(catalogRepo.myProductsGetCatalogs.bind(catalogRepo), params);
    
    debugLog? console.log("[myProductsGetCatalogs] call response: ", response, error) : null;
    
    if(action.return) {
      return {response, error};
    }
    if (response) {
      yield put(myProductsGetCatalogsSuccess(response, clear));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  } 
}

export function* myProductsGetSetMatching(action) {
  try {
    let urlObj = new URLConstants();
    
    let url = yield urlObj.companyUrl('screen-catalog-grouping', '');
    // const {productType} = action
    // console.log("[myProductsGetSetMatching] productType", productType);
    
    debugLog? console.log("[myProductsGetSetMatching] url obj", url) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { params, clear } = action;
    debugLog? console.log("[myProductsGetSetMatching] calling with params, clear", params, clear) : null;
    const { response, error } = yield call(catalogRepo.myProductsGetSetMatching.bind(catalogRepo), params);
    
    debugLog? console.log("[myProductsGetSetMatching] call response: ", response, error) : null;
    
    if(action.return) {
      return {response, error};
    }
    
    if (response) {
      yield put(myProductsGetSetMatchingSuccess(response, clear));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  } 
}

export function* catalogViewed(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalog_view_count', '');
    
    debugLog? console.log("[catalogViewed] url, action", url, action) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { response, error } = yield call(catalogRepo.catalogViewed, action.params);
    
    debugLog? console.log("[catalogViewed] call response: ", response, error) : null;
    
    // { id: 17221,
    //   company: 'Murtaza Wholesaler Company',
    //   catalog: 8852,
    //   product: 34121,
    //   catalog_type: 'public',
    //   created_at: '2019-02-18T12:38:47.704020Z',
    //   clicks: 1 
    // }


    if (response) {
      yield put(catalogViewedSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getSharedProducts(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('product-share', '');
    
    debugLog? console.log("[getSharedProducts] url, action", url, action) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { response, error } = yield call(catalogRepo.getSharedProducts, action.params);
    
    debugLog? console.log("[getSharedProducts] call response: ", response, error) : null;
    if (response) {
      yield put(getSharedProductsSuccess(response));
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

export function* shareProducts(action) {
  try {
    
    if (response) {
      yield put(shareProductsSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* bulkUpdateStartStop(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('bulk-update-product-seller', '');
    
    debugLog? console.log("[bulkUpdateStartStop] url, action", url, action) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { response, error } = yield call(catalogRepo.bulkUpdateStartStop, action.params);
    
    debugLog? console.log("[bulkUpdateStartStop] call response: ", response, error) : null;
    if (response) {
      if(action.id) {
        yield call(getCatalogDetails, getCatalogDetailsAction(action.id))
      }
      yield put(bulkUpdateStartStopSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getMyProductDetails(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('mydetails', action.id);
    
    debugLog? console.log("[getMyProductDetails] url, action", url, action) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { response, error } = yield call(catalogRepo.getMyProductDetails, action.params);
    
    debugLog? console.log("[getMyProductDetails] call response: ", response, error) : null;
    if (response) {
      yield put(getMyProductDetailsSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getGuestProductDetails(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalog_urlkey', action.urlkey);
    
    debugLog? console.log("url obj", url):null
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { response, error } = yield call(catalogRepo.getGuestProductDetails);
    
    debugLog? console.log("[getGuestProductDetails] call response: ", response, error) : null;
    if (response) {
      yield put(getGuestProductDetailsSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* startSharing(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('product-share/start-sharing', '');
    
    debugLog? console.log("[startSharing] url, action", url, action) : null;
    
    var catalogRepo = new CatalogRepo(url, model = '', false);
    
    const { response, error } = yield call(catalogRepo.startSharing, action.params);
    
    debugLog? console.log("[startSharing] call response: ", response, error) : null;
    if (response) {
      yield put(startSharingSuccess(response, action.loading));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export default catalogRootSaga = [
  takeEvery(GET_PUBLIC_CATALOG_ACTION,            getPublicCatalog),
  takeEvery(GET_CATALOG_DROPDOWN_ACTION,          getCatalogDropDownList),
  takeEvery(GET_CATALOG_DETAILS_ACTION,           getCatalogDetails),
  takeEvery(GET_PRODUCT_DETAILS_ACTION,           getProductDetails),
  takeEvery(UPLOAD_CATALOG_ACTION,                uploadCatalog),
  takeEvery(UPLOAD_SET_ACTION,                    uploadSet),
  takeEvery(GET_ADD_CATALOG_ACTION,               getAddCatalog),
  takeEvery(GET_READY_TO_SHIP_CATALOG_ACTION,     getReadyToShipCatalog),
  takeEvery(GET_PRE_ORDER_CATALOG_ACTION,         getPreOrderCatalog),
  takeEvery(GET_NON_CATALOG_ACTION,               getNonCatalog),
  takeEvery(GET_SINGLE_CATALOG_ACTION,            getSingleCatalog),
  takeEvery(GET_MOST_SOLD_CATALOG_ACTION,         getMostSoldCatalog),
  takeEvery(GET_MOST_VIEWED_CATALOG_ACTION,       getMostViewedCatalog),
  takeEvery(GET_FOLLOWED_BRANDS_CATALOG_ACTION,   getFollowedBrandsCatalogList),
  takeEvery(GET_RECENTLY_VIEWED_CATALOG_ACTION,   getRecentlyViewedCatalog),
  takeEvery(SEND_CATALOG_ENQUIRY_ACTION,          sendCatalogEnquiry),
  takeEvery(GET_PUBLIC_CATALOG_LOAD_MORE_ACTION,  getPublicCatalogLoadMore),
  takeEvery(SEND_BECOME_SELLER_CATALOG_ACTION,    becomeCatalogSeller),
  takeEvery(ENABLE_SELL_CATALOG_ACTION,           enableSellCatalog),
  takeEvery(DISABLE_SELL_CATALOG_ACTION,          disableSellCatalog),
  takeFirst(MY_PRODUCTS_GET_CATALOGS_ACTION,      myProductsGetCatalogs),
  takeFirst(MY_PRODUCTS_GET_SET_MATCHING_ACTION,  myProductsGetSetMatching),
  takeEvery(CATALOG_VIEWED_ACTION,                catalogViewed),
  takeEvery(GET_SHARED_PRODUCTS_ACTION,           getSharedProducts),
  takeEvery(SHARE_PRODUCTS_ACTION,                shareProducts),
  takeEvery(BULK_UPDATE_START_STOP_ACTION,        bulkUpdateStartStop),
  takeEvery(GET_MY_PRODUCT_DETAILS_ACTION,        getMyProductDetails),
  takeEvery(START_SHARING_ACTION,                 startSharing),
  takeEvery(GET_GUEST_PRODUCT_DETAILS_ACTION,     getGuestProductDetails),
]
