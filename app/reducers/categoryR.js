import {
  GET_CATEGORIES_ACTION,            GET_CATEGORIES_SUCCESS,
  GET_EAV_CATEGORIES_ACTION,        SET_EAV_CATEGORIES_SUCCESS,
  GET_CATEGORY_TOP_ACTION,          GET_CATEGORY_TOP_SUCCESS,
  GET_CATEGORY_CHILD_ACTION,        GET_CATEGORY_CHILD_SUCCESS,
  GET_CATEGORY_EAV_ACTION,          GET_CATEGORY_EAV_SUCCESS,
  CACHE_SIZE_EAV_FOR_CATEGORY,
} from "../actions/category-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  responseEavCategory:[],
  responseCategory: [],
  responseGetCategoryTop: [],
  responseGetCategoryChild: [],
  responseGetCategoryEav: [],
  cacheSizeEavForCategory: {},
};


const categoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_CATEGORIES_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_CATEGORIES_SUCCESS:
    return {
      ...state,
      responseCategory: action.responseCategory,
      isLoading: false
    };

    case GET_EAV_CATEGORIES_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case SET_EAV_CATEGORIES_SUCCESS:
    return {
      ...state,
      responseEavCategory: action.responseEavCategory,
      isLoading: false
    };

    case GET_CATEGORY_TOP_ACTION:
    return {
      ...state,
    }
    case GET_CATEGORY_TOP_SUCCESS:
    return {
      ...state,
      responseGetCategoryTop: action.responseGetCategoryTop
    }

    case GET_CATEGORY_CHILD_ACTION:
    return {
      ...state,
    }
    case GET_CATEGORY_CHILD_SUCCESS:
    return {
      ...state,
      responseGetCategoryChild: action.responseGetCategoryChild
    }

    case GET_CATEGORY_EAV_ACTION:
    return {
      ...state,
      isLoading: true,
    }
    case GET_CATEGORY_EAV_SUCCESS:
    return {
      ...state,
      responseGetCategoryEav: action.responseGetCategoryEav,
      isLoading: false,
    }

    case CACHE_SIZE_EAV_FOR_CATEGORY:
    return {
      ...state,
      cacheSizeEavForCategory: {
        ...state.cacheSizeEavForCategory,
        [action.category]: action.sizeEav,
      }
    }

    default:
    return commonErrorReducer(state, action);
  }
};

export default categoryReducer;