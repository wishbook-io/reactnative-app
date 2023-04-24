import {
  FILTER_APPLIED_SUCCESS,         FILTER_CLEARED_SUCCESS,
  SET_FILTER_SCREEN_STATE,        GET_FILTER_SCREEN_STATE,
  RESET_PRODUCT_TAB,
  GET_PRE_DEFINED_FILTER_LIST_SUCCESS ,GET_PRE_DEFINED_FILTER_LIST_ACTION,
  GET_PRE_DEFINED_SUB_FILTER_LIST_ACTION ,GET_PRE_DEFINED_SUB_FILTER_LIST_SUCCESS,
  SAVE_FILTER_SERVER_ACTION,      SAVE_FILTER_SERVER_SUCCESS,
  GET_SAVED_FILTER_FROM_SERVER_ACTION,GET_SAVED_FILTER_FROM_SERVER_SUCCESS     
  
} from "../actions/productTab-filter-actions";
import { commonErrorReducer } from './errorR';




const initialState = {
  error: {},
  isLoading: false,
  filterApplied:false,
  responseFilteredPublicCatalog: [],
  filterScreenState:{},
  filterState:{},
  preDefinedFilterList:[],
  predDefinedSubFilter:{},
  responseSavedFilterServerList:[],
  responseSavedFilterServerListReversed:[],
  responsesaveFilterServerSuccess:{},
  defaultFilterState:{
    limit: 10, 
    offset: 0,
    ready_to_ship: true,
    product_type: "catalog"
  }
};


const catalogueFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case FILTER_APPLIED_SUCCESS:
    return{
      ...state,
      filterApplied:true
    }
    case SET_FILTER_SCREEN_STATE:
    return{
      ...state,
    } 
    case GET_FILTER_SCREEN_STATE:
    return{
      ...state,
      filterApplied:true,         
      filterScreenState:action.filterScreenState,
      filterState:action.filterState
    }        
    case FILTER_CLEARED_SUCCESS:
    return{
      ...state,
      filterApplied:false
    }        
    case GET_PRE_DEFINED_FILTER_LIST_SUCCESS:
    return{
      ...state,
      preDefinedFilterList:action.responsePreDefinedFilterList
    }
    case GET_PRE_DEFINED_SUB_FILTER_LIST_SUCCESS:
    return{
      ...state,
      predDefinedSubFilter: {
        ...state.predDefinedSubFilter,
        [action.id]:action.responsePredDefinedSubFilter
      }
    } 
    case SAVE_FILTER_SERVER_ACTION:
    return{
      ...state,
    }
    case SAVE_FILTER_SERVER_SUCCESS:
    return{
      ...state,
      responsesaveFilterServerSuccess:action.responsesaveFilterServerSuccess
    }
    case GET_SAVED_FILTER_FROM_SERVER_ACTION:
    return{
      ...state,
      [action.refreshing? 'isRefreshing' : 'isLoading']: true,
    }
    case GET_SAVED_FILTER_FROM_SERVER_SUCCESS:
    return{
      ...state,
      responseSavedFilterServerList: action.responseSavedFilterServerList,
      responseSavedFilterServerListReversed: action.responseSavedFilterServerList.slice().reverse(),
      [action.refreshing? 'isRefreshing' : 'isLoading']: false,
    }
    
    case RESET_PRODUCT_TAB:
    // console.log("RESET_PRODUCT_TAB",state.defaultFilterState,state.filterState)
    
    return{
      ...state,
      defaultFilterState:state.defaultFilterState
    }                
    default:
    return commonErrorReducer(state, action);
  }
};

export default catalogueFilterReducer;


