import {
  GET_WISHLIST_ACTION,          GET_WISHLIST_SUCCESS,
  ADD_T0_WISHLIST_ACTION,       ADD_T0_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_ACTION,  REMOVE_FROM_WISHLIST_SUCCESS,
  DELETE_FROM_WISHLIST_ACTION,  DELETE_FROM_WISHLIST_SUCCESS,
} from "../actions/wishlist-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  responseWishlist: [],
  wishlistCount: 0,
  responseAddToWishlist:{},
  responseDeleteFromWishlist: {},
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_WISHLIST_SUCCESS:
    return {
      ...state,
      isLoading: false,
      responseWishlist: action.responseWishlist,
      wishlistCount: action.responseWishlist.filter((item) => !item.removedFromWishlist).length,
    };
    case ADD_T0_WISHLIST_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case ADD_T0_WISHLIST_SUCCESS:
    let updatedResponseWishlist = state.responseWishlist.map((item) => {
      if(item.id !== action.id) {
        return item
      }
      const updatedItem = {
        ...item,
        removedFromWishlist: false
      }
      return updatedItem
    })
    let updatedWishlistCount = updatedResponseWishlist.filter((item) => !item.removedFromWishlist).length;
    return {
      ...state,
      isLoading: false,
      responseAddToWishlist: action.responseAddToWishlist,
      responseWishlist: updatedResponseWishlist,
      wishlistCount: updatedWishlistCount,
    }; 
    
    case DELETE_FROM_WISHLIST_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case DELETE_FROM_WISHLIST_SUCCESS:
    updatedResponseWishlist = state.responseWishlist.map((item) => {
      if(item.id !== action.id) {
        return item
      }
      const updatedItem = {
        ...item,
        removedFromWishlist: true
      }
      return updatedItem
    })
    updatedWishlistCount = updatedResponseWishlist.filter((item) => !item.removedFromWishlist).length;
    return {
      ...state,
      isLoading: false,
      responseDeleteFromWishlist: action.responseDeleteFromWishlist,
      responseWishlist: updatedResponseWishlist,
      wishlistCount: updatedWishlistCount,
    }
    
    default:
    return commonErrorReducer(state, action);
  }
};

export default wishlistReducer;