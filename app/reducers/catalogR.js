import {
  SET_ADDCATALOG_STEPONE_ACTION,        SET_ADDCATALOG_STEPTWO_ACTION,
  UPLOAD_CATALOG_ACTION,                UPLOAD_CATALOG_SUCCESS,
  UPLOAD_CATALOG_PROGRESS,              CLEAR_UPLOAD_CATALOG_RESPONSE,
  UPLOAD_SET_ACTION,                    UPLOAD_SET_SUCCESS,
  UPLOAD_SET_PROGRESS,                  CLEAR_UPLOAD_SET_RESPONSE,
  GET_ADD_CATALOG_ACTION,               GET_ADD_CATALOG_SUCCESS,
  GET_PUBLIC_CATALOG_ACTION,            GET_PUBLIC_CATALOG_SUCCESS,
  GET_CATALOG_DETAILS_ACTION,           GET_CATALOG_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_ACTION,           GET_PRODUCT_DETAILS_SUCCESS,
  GET_CATALOG_DROPDOWN_ACTION,          GET_CATALOG_DROPDOWN_SUCCESS,
  GET_READY_TO_SHIP_CATALOG_ACTION,     GET_READY_TO_SHIP_CATALOG_SUCCESS,
  GET_PRE_ORDER_CATALOG_ACTION,         GET_PRE_ORDER_CATALOG_SUCCESS,
  GET_NON_CATALOG_ACTION,               GET_NON_CATALOG_SUCCESS,
  GET_SINGLE_CATALOG_ACTION,            GET_SINGLE_CATALOG_SUCCESS,
  GET_MOST_SOLD_CATALOG_ACTION,         GET_MOST_SOLD_CATALOG_SUCCESS,
  GET_MOST_VIEWED_CATALOG_ACTION,       GET_MOST_VIEWED_CATALOG_SUCCESS,
  GET_FOLLOWED_BRANDS_CATALOG_ACTION,   GET_FOLLOWED_BRANDS_CATALOG_SUCCESS,
  GET_RECENTLY_VIEWED_CATALOG_ACTION,   GET_RECENTLY_VIEWED_CATALOG_SUCCESS,
  GET_PUBLIC_CATALOG_LOAD_MORE_ACTION,  GET_PUBLIC_CATALOG_LOAD_MORE_SUCCESS,
  SEND_CATALOG_ENQUIRY_ACTION,          SEND_CATALOG_ENQUIRY_SUCCESS,
  SEND_BECOME_SELLER_CATALOG_ACTION,    SEND_BECOME_SELLER_CATALOG_SUCCESS,
  MY_PRODUCTS_GET_CATALOGS_ACTION,      MY_PRODUCTS_GET_CATALOGS_SUCCESS,
  MY_PRODUCTS_GET_SET_MATCHING_ACTION,  MY_PRODUCTS_GET_SET_MATCHING_SUCCESS,
  ENABLE_SELL_CATALOG_ACTION,           ENABLE_SELL_CATALOG_SUCCESS,      
  DISABLE_SELL_CATALOG_ACTION,          DISABLE_SELL_CATALOG_SUCCESS,
  CATALOG_VIEWED_ACTION,                CATALOG_VIEWED_SUCCESS,
  GET_SHARED_PRODUCTS_ACTION,           GET_SHARED_PRODUCTS_SUCCESS,
  SHARE_PRODUCTS_ACTION,                SHARE_PRODUCTS_SUCCESS,
  BULK_UPDATE_START_STOP_ACTION,        BULK_UPDATE_START_STOP_SUCCESS,
  GET_MY_PRODUCT_DETAILS_ACTION,        GET_MY_PRODUCT_DETAILS_SUCCESS,
  START_SHARING_ACTION,                 START_SHARING_SUCCESS,
  GET_GUEST_PRODUCT_DETAILS_ACTION,     GET_GUEST_PRODUCT_DETAILS_SUCCESS,
} from "../actions/catalog-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  isLoadingMore: false,
  isLoadingOverUI:false,
  addCatalogParams: { eav: {} },
  response_catalogAdd: {},
  responseUploadCatalog: [],
  uploadCatalogProgress: 0,
  responseUploadSet: [],
  uploadSetProgress: 0,
  responseLoadMoreCatalog:{},
  responsePublicCatalog: [],
  responseCatalogDetails: {},
  responseGetProductDetails: {},
  responseCatalogDropdown: [],
  responseReadyToShipCatalog: [],
  responsePreOrderCatalog: [],
  responseNonCatalog: [],
  responseSingleCatalog: [],
  responseMostSoldCatalog: [],
  responseMostViewedCatalog: [],
  responseFollowedBrandsCatalog: [],
  responseRecentlyViewedCatalog: [],
  responseSendEnquirySuccess:[],
  responseBecomeSellerCatalog:[],
  responseMyProductsGetCatalogs: [],
  responseMyProductsGetSetMatching: [],
  myProductsGetCatalogsLoading: false,
  myProductsGetSetMatchingLoading: false,
  responseCatalogViewed: {},
  refreshRecentlyViewed: false,
  responseGetSharedProducts: [],
  responseShareProducts: [],
  responseGetMyProductDetails: {},
  responseStartSharing: [],
  responseGetGuestProductDetails: {},
};

const setCatalogParamsStepOne = (state, action) => {
  var obj = Object.assign(state.addCatalogParams, action.addCatalogParams);
  return {
    ...state.addCatalogParams,
    addCatalogParams: obj
  }
}

const setCatalogParamsStepTwo = (state, action) => {
  var obj = Object.assign(state.addCatalogParams.eav, action.addCatalogParams);
  return {
    ...state.addCatalogParams,
    addCatalogParams: obj
  }
}

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDCATALOG_STEPONE_ACTION:
    setCatalogParamsStepOne(state, action);
    return {
      ...state,
    };
    case SET_ADDCATALOG_STEPTWO_ACTION:
    setCatalogParamsStepTwo(state, action);
    return {
      ...state,
    };
    case GET_ADD_CATALOG_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_ADD_CATALOG_SUCCESS:
    return {
      ...state,
      response_catalogAdd: action.response_catalogAdd,
      isLoading: false
    };
    
    case UPLOAD_CATALOG_ACTION:
    return {
      ...state,
    };
    case UPLOAD_CATALOG_SUCCESS:
    return {
      ...state,
      responseUploadCatalog: action.responseUploadCatalog,
    }
    case UPLOAD_CATALOG_PROGRESS:
    return {
      ...state,
      uploadCatalogProgress: action.uploadCatalogProgress,
    }
    case CLEAR_UPLOAD_CATALOG_RESPONSE:
    return {
      ...state,
      responseUploadCatalog: [],
      uploadCatalogProgress: 0
    }
    
    case UPLOAD_SET_ACTION:
    return {
      ...state,
    };
    case UPLOAD_SET_SUCCESS:
    return {
      ...state,
      responseUploadSet: action.responseUploadSet,
    }
    case UPLOAD_SET_PROGRESS:
    return {
      ...state,
      uploadSetProgress: action.uploadSetProgress,
    }
    case CLEAR_UPLOAD_SET_RESPONSE:
    return {
      ...state,
      responseUploadSet: [],
      uploadSetProgress: 0,
    }
    
    case GET_PUBLIC_CATALOG_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_PUBLIC_CATALOG_SUCCESS:
    //console.log('public catalogs',state.responsePublicCatalog,action.responsePublicCatalog)
    return {
      ...state,
      responsePublicCatalog:action.responsePublicCatalog,
      isLoading: false
    };
    case GET_PUBLIC_CATALOG_LOAD_MORE_SUCCESS:
    //console.log('in reducer',action.response_catalogAdd)
    return {
      ...state,
      responsePublicCatalog:state.responsePublicCatalog.concat(action.responseLoadMoreCatalog),
      isLoadingMore: false
      //updating the loaded public catalogues to old public catalogues
    };
    
    case GET_PUBLIC_CATALOG_LOAD_MORE_ACTION:
    return {
      ...state,
      isLoadingMore: true,
    };
    case GET_CATALOG_DROPDOWN_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_CATALOG_DROPDOWN_SUCCESS:
    return {
      ...state,
      responseCatalogDropdown: action.responseCatalogDropdown,
      isLoading: false
    };
    case GET_CATALOG_DETAILS_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_CATALOG_DETAILS_SUCCESS:
    return {
      ...state,
      responseCatalogDetails: action.responseCatalogDetails,
      isLoading: false
    };

    case GET_PRODUCT_DETAILS_ACTION:
    return {
      ...state,
    }
    case GET_PRODUCT_DETAILS_SUCCESS:
    return {
      ...state,
      responseGetProductDetails: action.responseGetProductDetails
    }

    case GET_READY_TO_SHIP_CATALOG_ACTION:
    return {
      ...state,
    };
    case GET_READY_TO_SHIP_CATALOG_SUCCESS:
    return {
      ...state,
      responseReadyToShipCatalog: action.responseReadyToShipCatalog,
    };
    case GET_PRE_ORDER_CATALOG_ACTION:
    return {
      ...state,
    };
    case GET_PRE_ORDER_CATALOG_SUCCESS:
    return {
      ...state,
      responsePreOrderCatalog: action.responsePreOrderCatalog,
    };
    case GET_NON_CATALOG_ACTION:
    return {
      ...state,
    };
    case GET_NON_CATALOG_SUCCESS:
    return {
      ...state,
      responseNonCatalog: action.responseNonCatalog,
    };
    case GET_SINGLE_CATALOG_ACTION:
    return {
      ...state,
    };
    case GET_SINGLE_CATALOG_SUCCESS:
    return {
      ...state,
      responseSingleCatalog: action.responseSingleCatalog,
    };
    case GET_MOST_SOLD_CATALOG_ACTION:
    return {
      ...state,
    };
    case GET_MOST_SOLD_CATALOG_SUCCESS:
    return {
      ...state,
      responseMostSoldCatalog: action.responseMostSoldCatalog,
    };
    case GET_MOST_VIEWED_CATALOG_ACTION:
    return {
      ...state,
    };
    case GET_MOST_VIEWED_CATALOG_SUCCESS:
    return {
      ...state,
      responseMostViewedCatalog: action.responseMostViewedCatalog,
    };
    case GET_FOLLOWED_BRANDS_CATALOG_ACTION:
    return {
      ...state,
    };
    case GET_FOLLOWED_BRANDS_CATALOG_SUCCESS:
    return {
      ...state,
      responseFollowedBrandsCatalog: action.responseFollowedBrandsCatalog,
    };
    case GET_RECENTLY_VIEWED_CATALOG_ACTION:
    return {
      ...state,
    };
    case GET_RECENTLY_VIEWED_CATALOG_SUCCESS:
    return {
      ...state,
      responseRecentlyViewedCatalog: action.responseRecentlyViewedCatalog,
      refreshRecentlyViewed: false,
    };
    case SEND_CATALOG_ENQUIRY_ACTION:
    return {
      ...state,
    };
    case SEND_CATALOG_ENQUIRY_SUCCESS:
    return {
      ...state,
      responseSendEnquirySuccess: action.responseSendEnquirySuccess,
    };    
    case SEND_BECOME_SELLER_CATALOG_ACTION:
    return {
      ...state,
      isLoading:true
    }  
    case SEND_BECOME_SELLER_CATALOG_SUCCESS:
    return {
      ...state,
      isLoading:false,
      responseBecomeSellerCatalog:action.responseBecomeSellerCatalog
    }
    
    case MY_PRODUCTS_GET_CATALOGS_ACTION:
    return {
      ...state,
      myProductsGetCatalogsLoading: true
    }
    case MY_PRODUCTS_GET_CATALOGS_SUCCESS:
    let shouldClear = action.clear;
    let updatedResponse = shouldClear
    ?   action.responseMyProductsGetCatalogs
    :   state.responseMyProductsGetCatalogs.concat(action.responseMyProductsGetCatalogs);
    // console.log("REDUCER, previous, current", state.responseMyProductsGetCatalogs, updatedResponse);
    return {
      ...state,
      responseMyProductsGetCatalogs: updatedResponse,
      myProductsGetCatalogsLoading: false
    }
    
    case MY_PRODUCTS_GET_SET_MATCHING_ACTION:
    return {
      ...state,
      myProductsGetSetMatchingLoading: true
    }
    case MY_PRODUCTS_GET_SET_MATCHING_SUCCESS:
    shouldClear = action.clear;
    updatedResponse = shouldClear
    ?   action.responseMyProductsGetSetMatching
    :   state.responseMyProductsGetSetMatching.concat(action.responseMyProductsGetSetMatching);
    console.log("REDUCER, previous, current", state.responseMyProductsGetSetMatching, updatedResponse);
    return {
      ...state,
      responseMyProductsGetSetMatching: updatedResponse,
      myProductsGetSetMatchingLoading: false
    }
    case DISABLE_SELL_CATALOG_ACTION:
    return{
      ...state,
      isLoadingOverUI:true
    }
    case ENABLE_SELL_CATALOG_ACTION:
    return{
      ...state,
      isLoadingOverUI:true
    }
    case ENABLE_SELL_CATALOG_SUCCESS:
    return{
      ...state,
      isLoadingOverUI:false
    }
    case DISABLE_SELL_CATALOG_SUCCESS:
    return{
      ...state,
      isLoadingOverUI:false
    }

    case CATALOG_VIEWED_ACTION:
    return {
      ...state,
    }
    case CATALOG_VIEWED_SUCCESS:
    return {
      ...state,
      responseCatalogViewed: action.responseCatalogViewed,
      refreshRecentlyViewed: true,
    }

    case GET_SHARED_PRODUCTS_ACTION:
    return {
      ...state,
    }
    case GET_SHARED_PRODUCTS_SUCCESS:
    return {
      ...state,
      responseGetSharedProducts: action.responseGetSharedProducts
    }

    case SHARE_PRODUCTS_ACTION:
    return {
      ...state,
    }
    case SHARE_PRODUCTS_SUCCESS:
    return {
      ...state,
      responseShareProducts: action.responseShareProducts
    }

    case BULK_UPDATE_START_STOP_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case BULK_UPDATE_START_STOP_SUCCESS:
    return {
      ...state,
      responseBulkUpdateStartStop: action.responseBulkUpdateStartStop,
      isLoading: false,
    }

    case GET_MY_PRODUCT_DETAILS_ACTION:
    return {
      ...state,
    }
    case GET_MY_PRODUCT_DETAILS_SUCCESS:
    return {
      ...state,
      responseGetMyProductDetails: action.responseGetMyProductDetails
    }

    case START_SHARING_ACTION:
    return {
      ...state,
      isLoading: action.loading? true : state.isLoading,
    }
    case START_SHARING_SUCCESS:
    return {
      ...state,
      responseStartSharing: action.responseStartSharing,
      isLoading: action.loading? false : state.isLoading,
    }
    case GET_GUEST_PRODUCT_DETAILS_ACTION:
    return {
      ...state,
      isLoading: true,      
    }
    case GET_GUEST_PRODUCT_DETAILS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      responseGetGuestProductDetails: action.responseGetGuestProductDetails,
    }

    default:
    return commonErrorReducer(state, action);
  }
};

export default catalogReducer;
