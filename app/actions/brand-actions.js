export const GET_BRANDS_ACTION = "GET_BRANDS_ACTION";
export const GET_BRANDS_SUCCESS = "GET_BRANDS_SUCCESS";

export const GET_ALL_BRANDS_ACTION = "GET_ALL_BRANDS_ACTION";
export const GET_ALL_BRANDS_SUCCESS = "GET_ALL_BRANDS_SUCCESS";

export const GET_BRANDS_I_OWN_ACTION = "GET_BRANDS_I_OWN_ACTION";
export const GET_BRANDS_I_OWN_SUCCESS = "GET_BRANDS_I_OWN_SUCCESS";

export const GET_BRANDS_I_SELL_ACTION = "GET_BRANDS_I_SELL_ACTION";
export const GET_BRANDS_I_SELL_SUCCESS = "GET_BRANDS_I_SELL_SUCCESS";

export const UPDATE_BRANDS_I_SELL_ACTION = "UPDATE_BRANDS_I_SELL_ACTION";
export const UPDATE_BRANDS_I_SELL_SUCCESS = "UPDATE_BRANDS_I_SELL_SUCCESS";

export const FOLLOW_BRAND_ACTION ="FOLLOW_BRAND_ACTION";
export const FOLLOW_BRAND_SUCCESS = "FOLLOW_BRAND_SUCCESS";

export const UNFOLLOW_BRAND_ACTION ="UNFOLLOW_BRAND_ACTION";
export const UNFOLLOW_BRAND_SUCCESS = "UNFOLLOW_BRAND_SUCCESS";

export const UPDATE_BRANDS_I_FOLLOW_COUNT = "UPDATE_BRANDS_I_FOLLOW_COUNT";

export const ADD_BRAND_ACTION = "ADD_BRAND_ACTION";
export const ADD_BRAND_SUCCESS = "ADD_BRAND_SUCCESS";
export const ADD_BRAND_CLEAR = 'ADD_BRAND_CLEAR';

export const GET_BRAND_HAS_PERMISSION_ACTION = "GET_BRAND_HAS_PERMISSION_ACTION"
export const GET_BRAND_HAS_PERMISSION_SUCCESS = "GET_BRAND_HAS_PERMISSION_SUCCESS"

export const GET_BRANDS_CARD_ACTION = 'GET_BRANDS_CARD_ACTION';
export const GET_BRANDS_CARD_SUCCESS = 'GET_BRANDS_CARD_SUCCESS';

export const getBrandsAction = (params) => ({
  type: GET_BRANDS_ACTION,
  params,
});

export const setBrandsSuccess = (responseBrands) => ({
  type: GET_BRANDS_SUCCESS,
  responseBrands
});

export const getAllBrandsAction = (params) => ({
  type: GET_ALL_BRANDS_ACTION,
  params
});

export const setAllBrandsSuccess = (responseAllBrands) => ({
  type: GET_ALL_BRANDS_SUCCESS,
  responseAllBrands,
});

export const getBrandsIOwnAction = () => ({
  type: GET_BRANDS_I_OWN_ACTION,
})

export const setBrandsIOwnSuccess = (responseBrandsIOwn) => ({
  type: GET_BRANDS_I_OWN_SUCCESS,
  responseBrandsIOwn,
})

export const getBrandsISellAction = () => ({
  type: GET_BRANDS_I_SELL_ACTION,
})

export const setBrandsISellSuccess = (responseBrandsISell) => ({
  type: GET_BRANDS_I_SELL_SUCCESS,
  responseBrandsISell,
})

export const updateBrandsISellAction = (id, brandsISellIds, patch=true) => ({
  type: UPDATE_BRANDS_I_SELL_ACTION,
  id,
  brandsISellIds,
  patch, // if true, id is the id returned by responseBrandsISell. if false, id is the company id of the user
})

export const updateBrandsISellSuccess = (responseUpdateBrandsISell) => ({
  type: UPDATE_BRANDS_I_SELL_SUCCESS,
  responseUpdateBrandsISell,
})

export const followBrandAction = (params,productId)=> ({
  type:FOLLOW_BRAND_ACTION,
  params:params,
  productId:productId
})

export const followBrandSuccess = (responseFollowBrandSuccess) =>({
  type:FOLLOW_BRAND_SUCCESS,
  responseFollowBrandSuccess
})

export const unfollowBrandAction = (followId,productId)=> ({
  type:UNFOLLOW_BRAND_ACTION,
  followId:followId,
  productId:productId
  
})

export const unfollowBrandSuccess = (responseUnfollowBrandSuccess) =>({
  type:UNFOLLOW_BRAND_SUCCESS,
  responseUnfollowBrandSuccess
})

export const updateBrandsIFollowCount = ({increment, decrement, set}) => ({
  type: UPDATE_BRANDS_I_FOLLOW_COUNT,
  increment,  // increments count by this value
  decrement,  // decrements by this decrement value
  set,        // sets the value, overriding previous value
})

export const addBrandAction = (formData) => ({
  type: ADD_BRAND_ACTION,
  formData,
  errorCodesHandled: [400]
})

export const addBrandSuccess = (responseAddBrand) => ({
  type: ADD_BRAND_SUCCESS,
  responseAddBrand,
})

export const addBrandClear = () => ({
  type: ADD_BRAND_CLEAR,
})
export const getBrandhasPermissionAction = (params, errorKey) =>({
  type: GET_BRAND_HAS_PERMISSION_ACTION,
  params: params,
  errorKey,
})

export const getBrandhasPermissionSuccess = (responseBrandHasPermission) =>({
  type:GET_BRAND_HAS_PERMISSION_SUCCESS,
  responseBrandHasPermission
})

export const getBrandsCardAction = (payload) => ({
  type: GET_BRANDS_CARD_ACTION,
  clear: false, // by default, we would like to append the response to the existing response
  params: {},
  ...payload,
});

export const getBrandsCardSuccess = (responseGetBrandsCard) => ({
  type: GET_BRANDS_CARD_SUCCESS,
  responseGetBrandsCard,
});