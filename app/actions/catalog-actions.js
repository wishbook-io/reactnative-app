import consts from 'app/utils/const';

export const GET_ADD_CATALOG_ACTION = "GET_ADD_CATALOG_ACTION";
export const GET_ADD_CATALOG_SUCCESS = "GET_ADD_CATALOG_SUCCESS";

export const UPLOAD_CATALOG_ACTION = "UPLOAD_CATALOG_ACTION";
export const UPLOAD_CATALOG_SUCCESS = "UPLOAD_CATALOG_SUCCESS";
export const UPLOAD_CATALOG_PROGRESS = "UPLOAD_CATALOG_PROGRESS";
export const CLEAR_UPLOAD_CATALOG_RESPONSE = "CLEAR_UPLOAD_CATALOG_RESPONSE";

export const UPLOAD_SET_ACTION = "UPLOAD_SET_ACTION";
export const UPLOAD_SET_SUCCESS = "UPLOAD_SET_SUCCESS";
export const UPLOAD_SET_PROGRESS = "UPLOAD_SET_PROGRESS";
export const CLEAR_UPLOAD_SET_RESPONSE = "CLEAR_UPLOAD_SET_RESPONSE";
export const UPLOAD_SINGLE_SET_ACTION = "UPLOAD_SINGLE_SET_ACTION";

export const GET_PUBLIC_CATALOG_ACTION = "GET_PUBLIC_CATALOG_ACTION";
export const GET_PUBLIC_CATALOG_SUCCESS = "GET_PUBLIC_CATALOG_SUCCESS";

export const GET_PUBLIC_CATALOG_LOAD_MORE_ACTION ="GET_PUBLIC_CATALOG_LOAD_MORE_ACTION"
export const GET_PUBLIC_CATALOG_LOAD_MORE_SUCCESS ="GET_PUBLIC_CATALOG_LOAD_MORE_SUCCESS"

export const GET_CATALOG_DETAILS_ACTION = 'GET_CATALOG_DETAILS_ACTION';
export const GET_CATALOG_DETAILS_SUCCESS = 'GET_CATALOG_DETAILS_SUCCESS';

export const GET_PRODUCT_DETAILS_ACTION = 'GET_PRODUCT_DETAILS_ACTION';
export const GET_PRODUCT_DETAILS_SUCCESS = 'GET_PRODUCT_DETAILS_SUCCESS';

export const GET_CATALOG_DROPDOWN_ACTION = 'GET_CATALOG_DROPDOWN_ACTION';
export const GET_CATALOG_DROPDOWN_SUCCESS = 'GET_CATALOG_DROPDOWN_SUCCESS';

export const VALIDATE_SET_NAME_ACTION = 'VALIDATE_SET_NAME_ACTION';

export const SET_ADDCATALOG_STEPONE_ACTION = 'SET_ADDCATALOG_STEPONE_ACTION';
export const SET_ADDCATALOG_STEPONE_SUCCESS = 'SET_ADDCATALOG_STEPONE_SUCCESS';

export const SET_ADDCATALOG_STEPTWO_ACTION = 'SET_ADDCATALOG_STEPTWO_ACTION';
export const SET_ADDCATALOG_STEPTWO_SUCCESS = 'SET_ADDCATALOG_STEPTWO_SUCCESS';

export const GET_READY_TO_SHIP_CATALOG_ACTION = 'GET_READY_TO_SHIP_CATALOG_ACTION';
export const GET_READY_TO_SHIP_CATALOG_SUCCESS = 'GET_READY_TO_SHIP_CATALOG_SUCCESS';

export const GET_PRE_ORDER_CATALOG_ACTION = 'GET_PRE_ORDER_CATALOG_ACTION';
export const GET_PRE_ORDER_CATALOG_SUCCESS = 'GET_PRE_ORDER_CATALOG_SUCCESS';

export const GET_NON_CATALOG_ACTION = 'GET_NON_CATALOG_ACTION';
export const GET_NON_CATALOG_SUCCESS = 'GET_NON_CATALOG_SUCCESS';

export const GET_SINGLE_CATALOG_ACTION = 'GET_SINGLE_CATALOG_ACTION';
export const GET_SINGLE_CATALOG_SUCCESS = 'GET_SINGLE_CATALOG_SUCCESS';

export const GET_MOST_SOLD_CATALOG_ACTION = 'GET_MOST_SOLD_CATALOG_ACTION';
export const GET_MOST_SOLD_CATALOG_SUCCESS = 'GET_MOST_SOLD_CATALOG_SUCCESS';

export const GET_MOST_VIEWED_CATALOG_ACTION = 'GET_MOST_VIEWED_CATALOG_ACTION';
export const GET_MOST_VIEWED_CATALOG_SUCCESS = 'GET_MOST_VIEWED_CATALOG_SUCCESS';

export const GET_FOLLOWED_BRANDS_CATALOG_ACTION = 'GET_FOLLOWED_BRANDS_CATALOG_ACTION';
export const GET_FOLLOWED_BRANDS_CATALOG_SUCCESS = 'GET_FOLLOWED_BRANDS_CATALOG_SUCCESS';

export const GET_RECENTLY_VIEWED_CATALOG_ACTION = 'GET_RECENTLY_VIEWED_CATALOG_ACTION';
export const GET_RECENTLY_VIEWED_CATALOG_SUCCESS = 'GET_RECENTLY_VIEWED_CATALOG_SUCCESS';

export const SEND_CATALOG_ENQUIRY_ACTION = "SEND_CATALOG_ENQUIRY_ACTION";
export const SEND_CATALOG_ENQUIRY_SUCCESS = "SEND_CATALOG_ENQUIRY_SUCCESS";

export const SEND_BECOME_SELLER_CATALOG_ACTION = "SEND_BECOME_SELLER_CATALOG_ACTION"
export const SEND_BECOME_SELLER_CATALOG_SUCCESS = "SEND_BECOME_SELLER_CATALOG_SUCCESS"

export const ENABLE_SELL_CATALOG_ACTION ="ENABLE_SELL_CATALOG_ACTION"
export const ENABLE_SELL_CATALOG_SUCCESS ="ENABLE_SELL_CATALOG_SUCCESS"

export const DISABLE_SELL_CATALOG_ACTION ="DISABLE_SELL_CATALOG_ACTION"
export const DISABLE_SELL_CATALOG_SUCCESS="DISABLE_SELL_CATALOG_SUCCESS"

export const MY_PRODUCTS_GET_CATALOGS_ACTION = "MY_PRODUCTS_GET_CATALOGS_ACTION";
export const MY_PRODUCTS_GET_CATALOGS_SUCCESS = "MY_PRODUCTS_GET_CATALOGS_SUCCESS";

export const MY_PRODUCTS_GET_SET_MATCHING_ACTION = "MY_PRODUCTS_GET_SET_MATCHING_ACTION";
export const MY_PRODUCTS_GET_SET_MATCHING_SUCCESS = "MY_PRODUCTS_GET_SET_MATCHING_SUCCESS";

export const CATALOG_VIEWED_ACTION = 'CATALOG_VIEWED_ACTION';
export const CATALOG_VIEWED_SUCCESS = 'CATALOG_VIEWED_SUCCESS';

export const GET_SHARED_PRODUCTS_ACTION = 'GET_SHARED_PRODUCTS_ACTION';
export const GET_SHARED_PRODUCTS_SUCCESS = 'GET_SHARED_PRODUCTS_SUCCESS';

export const SHARE_PRODUCTS_ACTION = 'SHARE_PRODUCTS_ACTION';
export const SHARE_PRODUCTS_SUCCESS = 'SHARE_PRODUCTS_SUCCESS';

export const BULK_UPDATE_START_STOP_ACTION = 'BULK_UPDATE_START_STOP_ACTION';
export const BULK_UPDATE_START_STOP_SUCCESS = 'BULK_UPDATE_START_STOP_SUCCESS';

export const GET_MY_PRODUCT_DETAILS_ACTION = 'GET_MY_PRODUCT_DETAILS_ACTION';
export const GET_MY_PRODUCT_DETAILS_SUCCESS = 'GET_MY_PRODUCT_DETAILS_SUCCESS';

export const START_SHARING_ACTION = 'START_SHARING_ACTION';
export const START_SHARING_SUCCESS = 'START_SHARING_SUCCESS';

export const GET_GUEST_PRODUCT_DETAILS_ACTION = 'GET_GUEST_PRODUCT_DETAILS_ACTION';
export const GET_GUEST_PRODUCT_DETAILS_SUCCESS = 'GET_GUEST_PRODUCT_DETAILS_SUCCESS';

export const getAddCatalogStepOneAction = (addCatalogParams) => ({
  type: SET_ADDCATALOG_STEPONE_ACTION,
  addCatalogParams: addCatalogParams
});

export const getAddCatalogStepTwoAction = (addCatalogParams) => ({
  type: SET_ADDCATALOG_STEPTWO_ACTION,
  addCatalogParams: addCatalogParams
});

export const uploadCatalogAction = (params) => ({
  type: UPLOAD_CATALOG_ACTION,
  params,
});

export const uploadCatalogSuccess = (responseUploadCatalog) => ({
  type: UPLOAD_CATALOG_SUCCESS,
  responseUploadCatalog,
});

export const setUploadCatalogProgress = (uploadCatalogProgress) => ({
  type: UPLOAD_CATALOG_PROGRESS,
  uploadCatalogProgress
});

export const clearUploadCatalogResponse = () => ({
  type: CLEAR_UPLOAD_CATALOG_RESPONSE,
});


export const uploadSetAction = (params) => ({
  type: UPLOAD_SET_ACTION,
  params,
});

export const uploadSetSuccess = (responseUploadSet) => ({
  type: UPLOAD_SET_SUCCESS,
  responseUploadSet,
});

export const setUploadSetProgress = (uploadSetProgress) => ({
  type: UPLOAD_SET_PROGRESS,
  uploadSetProgress,
});

export const clearUploadSetResponse = () => ({
  type: CLEAR_UPLOAD_SET_RESPONSE,
});

export const uploadSingleSetAction = (payload) => ({
  type: UPLOAD_SINGLE_SET_ACTION,
  ...payload,
})

export const getAddCatalogAction = (params, fileKey, fileName) => ({
  type: GET_ADD_CATALOG_ACTION,
  params: params,
  fileKey: fileKey,
  fileName: fileName
});

export const setAddCatalogSuccess = (response_catalogAdd) => ({
  type: GET_ADD_CATALOG_SUCCESS,
  response_catalogAdd
});

export const getPublicCatalogAction = (offset = 0, limit = 10, filters = null, listType = null) => ({
  type: GET_PUBLIC_CATALOG_ACTION,
  offset: offset,
  limit: limit,
  filters: filters,
  listType: listType
});

export const getPublicCatalogLoadMoreAction= (offset = 0, limit = 10, filters = null, listType = null) => ({
  type: GET_PUBLIC_CATALOG_LOAD_MORE_ACTION,
  offset: offset,
  limit: limit,
  filters: filters,
  listType: listType
});

export const getPublicCatalogLoadMoreSuccess = (responseLoadMoreCatalog) =>({
  type: GET_PUBLIC_CATALOG_LOAD_MORE_SUCCESS,
  responseLoadMoreCatalog
})




export const setPublicCatalogSuccess = (responsePublicCatalog) => ({
  type: GET_PUBLIC_CATALOG_SUCCESS,
  responsePublicCatalog
});

export const getCatalogDropdownAction = (filters = null, brandId = null, categoryId = null) => ({
  type: GET_CATALOG_DROPDOWN_ACTION,
  filters: filters,
  brandId: brandId,
  categoryId: categoryId
});

export const validateSetNameAction = (text) => ({
  type: VALIDATE_SET_NAME_ACTION,
  text,
})

export const setCatalogDropdownSuccess = (responseCatalogDropdown) => ({
  type: GET_CATALOG_DROPDOWN_SUCCESS,
  responseCatalogDropdown
});

export const getCatalogDetailsAction = (catalogid, shouldReturn = false, params = {}) => ({
  type: GET_CATALOG_DETAILS_ACTION,
  catalogid: catalogid,
  return: shouldReturn,
  params,
});

export const getCatalogDetailsSuccess = (responseCatalogDetails) => ({
  type: GET_CATALOG_DETAILS_SUCCESS,
  responseCatalogDetails
});

export const getProductDetailsAction = (id) => ({
  type: GET_PRODUCT_DETAILS_ACTION,
  id,
});

export const getProductDetailsSuccess = (responseGetProductDetails) => ({
  type: GET_PRODUCT_DETAILS_SUCCESS,
  responseGetProductDetails,
});

export const getReadyToShipCatalogAction = () => ({
  type: GET_READY_TO_SHIP_CATALOG_ACTION,
});

export const setReadyToShipCatalogSuccess = (responseReadyToShipCatalog) => ({
  type: GET_READY_TO_SHIP_CATALOG_SUCCESS,
  responseReadyToShipCatalog,
});

export const getPreOrderCatalogAction = (offset = 0, limit = 10, filters = null, listType = null) => ({
  type: GET_PRE_ORDER_CATALOG_ACTION,
  filters: {
    'ready_to_ship':'false',
  }
});

export const setPreOrderCatalogSuccess = (responsePreOrderCatalog) => ({
  type: GET_PRE_ORDER_CATALOG_SUCCESS,
  responsePreOrderCatalog,
});

export const getNonCatalogAction = (offset = 0, limit = 10, filters = null, listType = null) => ({
  type: GET_NON_CATALOG_ACTION,
  filters: {
    'product_type':'noncatalog',
  }
});

export const setNonCatalogSuccess = (responseNonCatalog) => ({
  type: GET_NON_CATALOG_SUCCESS,
  responseNonCatalog,
});

export const getSingleCatalogAction = (offset = 0, limit = 10, filters = null, listType = null) => ({
  type: GET_SINGLE_CATALOG_ACTION,
  filters: {
    'sell_full_catalog':'false',
    'ready_to_ship':'true',
  }
});

export const setSingleCatalogSuccess = (responseSingleCatalog) => ({
  type: GET_SINGLE_CATALOG_SUCCESS,
  responseSingleCatalog,
});

export const getMostSoldCatalogAction = (offset = 0, limit = 10, filters = null, listType = null) => ({
  type: GET_MOST_SOLD_CATALOG_ACTION,
  filters: {
    'most_ordered':'true',
    'ready_to_ship':'true',
  }
});

export const setMostSoldCatalogSuccess = (responseMostSoldCatalog) => ({
  type: GET_MOST_SOLD_CATALOG_SUCCESS,
  responseMostSoldCatalog,
});

export const getMostViewedCatalogAction = (offset = 0, limit = 10, filters = null, listType = null) => ({
  type: GET_MOST_VIEWED_CATALOG_ACTION,
  filters: {
    'most_viewed':'true',
    'ready_to_ship':'true',
  }
});

export const setMostViewedCatalogSuccess = (responseMostViewedCatalog) => ({
  type: GET_MOST_VIEWED_CATALOG_SUCCESS,
  responseMostViewedCatalog,
});

export const getFollowedBrandsCatalogAction = (offset = 0, limit = 10, filters = null) => ({
  type: GET_FOLLOWED_BRANDS_CATALOG_ACTION,
});

export const setFollowedBrandsCatalogSuccess = (responseFollowedBrandsCatalog) => ({
  type: GET_FOLLOWED_BRANDS_CATALOG_SUCCESS,
  responseFollowedBrandsCatalog,
});

export const getRecentlyViewedCatalogAction = (offset = 0, limit = 10, filters = null) => ({
  type: GET_RECENTLY_VIEWED_CATALOG_ACTION,
});

export const setRecentlyViewedCatalogSuccess = (responseRecentlyViewedCatalog) => ({
  type: GET_RECENTLY_VIEWED_CATALOG_SUCCESS,
  responseRecentlyViewedCatalog,
});

export const sendCatalogEnquiryAction = (params,productId) =>({
  type:SEND_CATALOG_ENQUIRY_ACTION,
  params:params,
  productId:productId
})

export const sendCatalogEnquirySuccess = (responseSendEnquirySuccess) => ({
  type: SEND_CATALOG_ENQUIRY_SUCCESS,
  responseSendEnquirySuccess,
});

export const sendBecomeSellerCatalogAction = (params=null, id) =>({
  type:SEND_BECOME_SELLER_CATALOG_ACTION,
  params:params,
  id
})

export const sendBecomeSellerCatalogSuccess = (responseBecomeSellerCatalog) =>({
  type:SEND_BECOME_SELLER_CATALOG_SUCCESS,
  responseBecomeSellerCatalog
})


export const enableSellCatalogAction = (params=null,id=null, shouldReturn = false) =>({
  type:ENABLE_SELL_CATALOG_ACTION,
  params:params,
  id:id,
  return: shouldReturn,
})

export const enableSellCatalogSuccess = (responseCatalogEnabled) =>({
  type:ENABLE_SELL_CATALOG_SUCCESS,
  responseCatalogEnabled
})

export const disableSellCatalogAction = (id, shouldReturn = false) =>({
  type:DISABLE_SELL_CATALOG_ACTION,
  id:id,
  return: shouldReturn,
  
})

export const disableSellCatalogSuccess = (responseCatalogDisabled) =>({
  type:DISABLE_SELL_CATALOG_SUCCESS,
  responseCatalogDisabled
  
})

export const myProductsGetCatalogsAction = (payload) => ({
  type: MY_PRODUCTS_GET_CATALOGS_ACTION,
  clear: false, // whether to append to the previous responses or not
  params: {},
  productType: consts.PRODUCT_TYPES.CATALOG, // to know which URL to call
  ...payload,
});

export const myProductsGetCatalogsSuccess = (responseMyProductsGetCatalogs, clear=false) => ({
  type: MY_PRODUCTS_GET_CATALOGS_SUCCESS,
  responseMyProductsGetCatalogs,
  clear,
});

export const myProductsGetSetMatchingAction = (payload) => ({
  type: MY_PRODUCTS_GET_SET_MATCHING_ACTION,
  clear: false, // whether to append to the previous responses or not
  params: {},
  ...payload,
});

export const myProductsGetSetMatchingSuccess = (responseMyProductsGetSetMatching, clear=false) => ({
  type: MY_PRODUCTS_GET_SET_MATCHING_SUCCESS,
  responseMyProductsGetSetMatching,
  clear,
});

export const catalogViewedAction = (params) => ({
  type: CATALOG_VIEWED_ACTION,
  params,
});

export const catalogViewedSuccess = (responseCatalogViewed) => ({
  type: CATALOG_VIEWED_SUCCESS,
  responseCatalogViewed,
});

export const getSharedProductsAction = (params) => ({
  type: GET_SHARED_PRODUCTS_ACTION,
  params,
});

export const getSharedProductsSuccess = (responseGetSharedProducts) => ({
  type: GET_SHARED_PRODUCTS_SUCCESS,
  responseGetSharedProducts,
});

export const shareProductsAction = (params) => ({
  type: SHARE_PRODUCTS_ACTION,
  params,
});

export const shareProductsSuccess = (responseShareProducts) => ({
  type: SHARE_PRODUCTS_SUCCESS,
  responseShareProducts,
});

export const bulkUpdateStartStopAction = (params, id) => ({
  type: BULK_UPDATE_START_STOP_ACTION,
  params,
  id
});

export const bulkUpdateStartStopSuccess = (responseBulkUpdateStartStop) => ({
  type: BULK_UPDATE_START_STOP_SUCCESS,
  responseBulkUpdateStartStop,
});

export const getMyProductDetailsAction = (id) => ({
  type: GET_MY_PRODUCT_DETAILS_ACTION,
  id,
});

export const getMyProductDetailsSuccess = (responseGetMyProductDetails) => ({
  type: GET_MY_PRODUCT_DETAILS_SUCCESS,
  responseGetMyProductDetails,
});

export const startSharingAction = (params, loading) => ({
  type: START_SHARING_ACTION,
  params,
  loading,
});

export const startSharingSuccess = (responseStartSharing, loading) => ({
  type: START_SHARING_SUCCESS,
  responseStartSharing,
  loading,
});

export const getGuestProductDetailsAction = (urlkey) => ({
  type: GET_GUEST_PRODUCT_DETAILS_ACTION,
  urlkey,
});

export const getGuestProductDetailsSuccess = (responseGetGuestProductDetails) => ({
  type: GET_GUEST_PRODUCT_DETAILS_SUCCESS,
  responseGetGuestProductDetails,
});
