import {
  GET_CART_BANNER_ACTION,               GET_CART_BANNER_SUCCESS,
  GET_CATALOG_WISE_CART_DETAILS_ACTION, GET_CATALOG_WISE_CART_DETAILS_SUCCESS, 
  CLEAR_CATALOG_WISE_CART_DETAILS,      UPDATE_CART_AFTER_PATCH,
  DELETE_CART_ITEM_ACTION,              DELETE_CART_ITEM_SUCCESS,
  PATCH_CART_QUANTITY_ACTION,           PATCH_CART_QUANTITY_SUCCESS,
  PATCH_CART_WB_MONEY_ACTION,           PATCH_CART_WB_MONEY_SUCCESS,
  ADD_TO_CART_ACTION,                   ADD_TO_CART_SUCCESS,
} from "../actions/cart-actions";

import * as cartServerHelper from 'app/screens/cart/serverHelper';
import UserHelper from 'app/config/userHelper';
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  responseGetCartBanner: [],
  responseGetCatalogWiseCartDetails: {},
  cartCount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_CART_BANNER_ACTION:
    return {
      ...state,
    }
    case GET_CART_BANNER_SUCCESS:
    return {
      ...state,
      responseGetCartBanner: action.responseGetCartBanner
    }
    
    case GET_CATALOG_WISE_CART_DETAILS_ACTION:
    return {
      ...state,
      isLoading: true,
    }    
    case GET_CATALOG_WISE_CART_DETAILS_SUCCESS:
    const cartCount = cartServerHelper.getCartCount(action.responseGetCatalogWiseCartDetails);
    return {
      ...state,
      responseGetCatalogWiseCartDetails: action.responseGetCatalogWiseCartDetails,
      isLoading: false,
      cartCount,
    }
    case CLEAR_CATALOG_WISE_CART_DETAILS:
    UserHelper.setLatestCartId(null);
    return {
      ...state,
      responseGetCatalogWiseCartDetails: {},
      isLoading: false,
      cartCount: 0,
    }
    case UPDATE_CART_AFTER_PATCH:
    return {
      ...state,
      responseGetCatalogWiseCartDetails: {
        ...action.responsePatch,
        catalogs: state.responseGetCatalogWiseCartDetails.catalogs,

      }
    }

    case DELETE_CART_ITEM_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case DELETE_CART_ITEM_SUCCESS:
    return {
      ...state,
      responseDeleteCartItem: action.responseDeleteCartItem,
      isLoading: false,
    }
    
    case PATCH_CART_QUANTITY_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case PATCH_CART_QUANTITY_SUCCESS:
    return {
      ...state,
      responsePatchCartQuantity: action.responsePatchCartQuantity,
      isLoading: false,
    }

    case PATCH_CART_WB_MONEY_ACTION:
    return {
      ...state,
    }
    case PATCH_CART_WB_MONEY_SUCCESS:
    return {
      ...state,
      responsePatchCartWbMoney: action.responsePatchCartWbMoney
    }

    case ADD_TO_CART_ACTION:
    return {
      ...state,
    }
    case ADD_TO_CART_SUCCESS:
    return {
      ...state,
      responseAddToCart: action.responseAddToCart
    }

    default:
    return commonErrorReducer(state, action);
  }
};

export default cartReducer;