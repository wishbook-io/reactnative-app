export const GET_CART_BANNER_ACTION = 'GET_CART_BANNER_ACTION';
export const GET_CART_BANNER_SUCCESS = 'GET_CART_BANNER_SUCCESS';

export const GET_CATALOG_WISE_CART_DETAILS_ACTION = 'GET_CATALOG_WISE_CART_DETAILS_ACTION';
export const GET_CATALOG_WISE_CART_DETAILS_SUCCESS = 'GET_CATALOG_WISE_CART_DETAILS_SUCCESS';
export const CLEAR_CATALOG_WISE_CART_DETAILS = 'CLEAR_CATALOG_WISE_CART_DETAILS';
export const UPDATE_CART_AFTER_PATCH = 'UPDATE_CART_AFTER_PATCH';

export const DELETE_CART_ITEM_ACTION = 'DELETE_CART_ITEM_ACTION';
export const DELETE_CART_ITEM_SUCCESS = 'DELETE_CART_ITEM_SUCCESS';

export const PATCH_CART_QUANTITY_ACTION = 'PATCH_CART_QUANTITY_ACTION';
export const PATCH_CART_QUANTITY_SUCCESS = 'PATCH_CART_QUANTITY_SUCCESS';

export const PATCH_CART_WB_MONEY_ACTION = 'PATCH_CART_WB_MONEY_ACTION';
export const PATCH_CART_WB_MONEY_SUCCESS = 'PATCH_CART_WB_MONEY_SUCCESS';

export const ADD_TO_CART_ACTION = 'ADD_TO_CART_ACTION';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';

export const getCartBannerAction = (params) => ({
  type: GET_CART_BANNER_ACTION,
  params,
});

export const getCartBannerSuccess = (responseGetCartBanner) => ({
  type: GET_CART_BANNER_SUCCESS,
  responseGetCartBanner,
});

export const getCatalogWiseCartDetailsAction = (params) => ({
  type: GET_CATALOG_WISE_CART_DETAILS_ACTION,
  params,
});

export const getCatalogWiseCartDetailsSuccess = (responseGetCatalogWiseCartDetails) => ({
  type: GET_CATALOG_WISE_CART_DETAILS_SUCCESS,
  responseGetCatalogWiseCartDetails,
});

export const clearCatalogWiseCartDetails = () => ({
  type: CLEAR_CATALOG_WISE_CART_DETAILS,
})

export const updateCartAfterPatch = (responsePatch) => ({
  type: UPDATE_CART_AFTER_PATCH,
  responsePatch,
});

export const deleteCartItemAction = (params, updateCatalogWiseCartDetails = true) => ({
  type: DELETE_CART_ITEM_ACTION,
  params,
  updateCatalogWiseCartDetails,
});

export const deleteCartItemSuccess = (responseDeleteCartItem) => ({
  type: DELETE_CART_ITEM_SUCCESS,
  responseDeleteCartItem,
});

export const patchCartQuantityAction = (params, updateCatalogWiseCartDetails = true) => ({
  type: PATCH_CART_QUANTITY_ACTION,
  params,
  updateCatalogWiseCartDetails,
});

export const patchCartQuantitySuccess = (responsePatchCartQuantity) => ({
  type: PATCH_CART_QUANTITY_SUCCESS,
  responsePatchCartQuantity,
});

export const patchCartWbMoneyAction = (params, updateCatalogWiseCartDetails = true ) => ({
  type: PATCH_CART_WB_MONEY_ACTION,
  params,
  updateCatalogWiseCartDetails,
});

export const patchCartWbMoneySuccess = (responsePatchCartWbMoney) => ({
  type: PATCH_CART_WB_MONEY_SUCCESS,
  responsePatchCartWbMoney,
});

export const addToCartAction = (params, updateCatalogWiseCartDetails = true) => ({
  type: ADD_TO_CART_ACTION,
  params,
  updateCatalogWiseCartDetails,
});

export const addToCartSuccess = (responseAddToCart) => ({
  type: ADD_TO_CART_SUCCESS,
  responseAddToCart,
});
