export const GET_WISHLIST_ACTION = "GET_WISHLIST_ACTION";
export const GET_WISHLIST_SUCCESS = "GET_WISHLIST_SUCCESS";

export const ADD_T0_WISHLIST_ACTION = "ADD_T0_WISHLIST_ACTION";
export const ADD_T0_WISHLIST_SUCCESS = "ADD_T0_WISHLIST_SUCCESS";

export const REMOVE_FROM_WISHLIST_ACTION = 'REMOVE_FROM_WISHLIST_ACTION';
export const REMOVE_FROM_WISHLIST_SUCCESS = 'REMOVE_FROM_WISHLIST_SUCCESS';

export const DELETE_FROM_WISHLIST_ACTION = 'DELETE_FROM_WISHLIST_ACTION';
export const DELETE_FROM_WISHLIST_SUCCESS = 'DELETE_FROM_WISHLIST_SUCCESS';

export const addToWishlistAction = (params, updateWishlist = true, updateCatalogDetails = true) =>({
  type: ADD_T0_WISHLIST_ACTION,
  params: params,
  updateWishlist,
  updateCatalogDetails,
})

export const addToWishlistSuccess = (responseAddToWishlist, id) => ({
  type: ADD_T0_WISHLIST_SUCCESS,
  responseAddToWishlist,
  id,
});


export const getWishlistAction = () => ({
  type: GET_WISHLIST_ACTION,
});

export const setWishlistSuccess = (responseWishlist) => ({
  type: GET_WISHLIST_SUCCESS,
  responseWishlist,
});

export const deleteFromWishlistAction = (params) => ({
  type: DELETE_FROM_WISHLIST_ACTION,
  params,
});

export const deleteFromWishlistSuccess = (responseDeleteFromWishlist, id) => ({
  type: DELETE_FROM_WISHLIST_SUCCESS,
  responseDeleteFromWishlist,
  id,
});
