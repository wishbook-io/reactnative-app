import {
  GET_SUGGESTION_ACTION,      GET_SUGGESTION_SUCCESS,
  GET_SEARCH_CATALOG_ACTION,  GET_SEARCH_CATALOG_SUCCESS,
  GET_COMPANY_LIST_SUGGESTIONS_ACTIONS,GET_COMPANY_LIST_SUGGESTIONS_SUCCESS
} from "../actions/search-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  responseSuggestion: [],
  responseSearchCatalog: [],
  responseCompanyList:[]
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_SUGGESTION_ACTION:
    return {
      ...state,
    };
    case GET_SUGGESTION_SUCCESS:
    return {
      ...state,
      responseSuggestion: action.responseSuggestion,
    };

    case GET_SEARCH_CATALOG_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_SEARCH_CATALOG_SUCCESS:
    return {
      ...state,
      isLoading: false,
      responseSearchCatalog: action.responseSearchCatalog,
    };

    case GET_COMPANY_LIST_SUGGESTIONS_ACTIONS:
    return {
      ...state,
      isLoading: true,
    };
    case GET_COMPANY_LIST_SUGGESTIONS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      responseCompanyList: action.responseCompanyList,
    };

    default:
    return commonErrorReducer(state, action);
  }
};

export default searchReducer;