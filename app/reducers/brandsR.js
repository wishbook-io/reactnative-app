import {
  GET_BRANDS_ACTION,                GET_BRANDS_SUCCESS,
  GET_ALL_BRANDS_ACTION,            GET_ALL_BRANDS_SUCCESS,
  GET_BRANDS_I_OWN_ACTION,          GET_BRANDS_I_OWN_SUCCESS,
  GET_BRANDS_I_SELL_ACTION,         GET_BRANDS_I_SELL_SUCCESS,
  UPDATE_BRANDS_I_SELL_ACTION,      UPDATE_BRANDS_I_SELL_SUCCESS,
  FOLLOW_BRAND_ACTION,              FOLLOW_BRAND_SUCCESS,
  UNFOLLOW_BRAND_ACTION,            UNFOLLOW_BRAND_SUCCESS,
  UPDATE_BRANDS_I_FOLLOW_COUNT,
  ADD_BRAND_ACTION,                 ADD_BRAND_SUCCESS,              ADD_BRAND_CLEAR,
  GET_BRANDS_CARD_ACTION,           GET_BRANDS_CARD_SUCCESS,
  GET_BRAND_HAS_PERMISSION_ACTION,  GET_BRAND_HAS_PERMISSION_SUCCESS,
} from "../actions/brand-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  brandsIFollowCount: 0,
  responseBrands: [],
  responseBrandsIOwn: [],
  responseAllBrands:[],
  responseBrandsISell: [],
  responseUpdateBrandsISell: [],
  responseFollowBrandSuccess: {},
  responseUnfollowBrandSuccess:{},
  responseAddBrand: {},
  responseGetBrandsCard: [],
};


const brandsReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_BRANDS_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_BRANDS_SUCCESS:
    return {
      ...state,
      responseBrands: action.responseBrands,
      isLoading: false
    };
    
    case GET_ALL_BRANDS_ACTION:
    return {
      ...state,
    };
    case GET_ALL_BRANDS_SUCCESS:
    return {
      ...state,
      responseAllBrands: action.responseAllBrands,
    };
    
    case GET_BRANDS_I_OWN_ACTION:
    return {
      ...state,
    };
    case GET_BRANDS_I_OWN_SUCCESS:
    return {
      ...state,
      responseBrandsIOwn: action.responseBrandsIOwn,
    }
    
    case GET_BRANDS_I_SELL_ACTION:
    return {
      ...state,
    };
    case GET_BRANDS_I_SELL_SUCCESS:
    return {
      ...state,
      responseBrandsISell: action.responseBrandsISell,
    }
    
    case UPDATE_BRANDS_I_SELL_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case UPDATE_BRANDS_I_SELL_SUCCESS:
    return {
      ...state,
      responseUpdateBrandsISell: action.responseUpdateBrandsISell,
      isLoading: false,
    }
    
    case FOLLOW_BRAND_ACTION:
    return {
      ...state,
      isLoading: true
      
    }
    case FOLLOW_BRAND_SUCCESS:
    return {
      ...state,
      isLoading: false,
      responseFollowBrandSuccess: action.responseFollowBrandSuccess,
      brandsIFollowCount: state.brandsIFollowCount + 1,
    }
    case UNFOLLOW_BRAND_ACTION:
    return {
      ...state,
      isLoading: true
      
    }
    case UNFOLLOW_BRAND_SUCCESS:
    return {
      ...state,
      isLoading: false,
      responseUnfollowBrandSuccess: action.responseUnfollowBrandSuccess,
      brandsIFollowCount: (state.brandsIFollowCount > 0 ? state.brandsIFollowCount - 1 : 0),
    }

    case UPDATE_BRANDS_I_FOLLOW_COUNT:
    const currentCount = state.brandsIFollowCount;
    let diff = 0;
    if(action.increment) {
      diff = 1;
    } 
    if(action.decrement && currentCount > 0) {
      diff = -1
    }
    if(action.set) {
      diff = action.set - currentCount;
    }
    return {
      ...state,
      brandsIFollowCount: currentCount + diff,
    }

    case ADD_BRAND_ACTION:
    return {
      ...state,
    }
    case ADD_BRAND_SUCCESS:
    return {
      ...state,
      responseAddBrand: action.responseAddBrand,
    }
    case ADD_BRAND_CLEAR:
    return {
      ...state,
      responseAddBrand: {},
    }
    
    case GET_BRANDS_CARD_ACTION:
    return {
      ...state,
    }
    case GET_BRANDS_CARD_SUCCESS:
    const shouldClear = action.clear;
    const updatedResponse = shouldClear
    ? action.responseGetBrandsCard
    : state.responseGetBrandsCard.concat(action.responseGetBrandsCard)
    return {
      ...state,
      responseGetBrandsCard: updatedResponse,
    }

    case GET_BRAND_HAS_PERMISSION_ACTION:
    return {
      ...state,
    }
    case GET_BRAND_HAS_PERMISSION_SUCCESS:
    return { 
      ...state,
      responseBrandHasPermission: action.responseBrandHasPermission
    }
    
    default:
    return commonErrorReducer(state, action);
  }
};

export default brandsReducer;