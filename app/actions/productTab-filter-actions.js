
export const FILTER_APPLIED_SUCCESS = 'FILTER_APPLIED_SUCCESS';
export const FILTER_CLEARED_SUCCESS = 'FILTER_CLEARED_SUCCESS';

export const SET_FILTER_SCREEN_STATE = 'SET_FILTER_SCREEN_STATE'
export const GET_FILTER_SCREEN_STATE = 'GET_FILTER_SCREEN_STATE'

export const GET_PRE_DEFINED_FILTER_LIST_ACTION ='GET_PRE_DEFINED_FILTER_LIST_ACTION'
export const GET_PRE_DEFINED_FILTER_LIST_SUCCESS ='GET_PRE_DEFINED_FILTER_LIST_SUCCESS'

export const GET_PRE_DEFINED_SUB_FILTER_LIST_ACTION ='GET_PRE_DEFINED_SUB_FILTER_LIST_ACTION'
export const GET_PRE_DEFINED_SUB_FILTER_LIST_SUCCESS ='GET_PRE_DEFINED_SUB_FILTER_LIST_SUCCESS'

export const SAVE_FILTER_SERVER_ACTION = 'SAVE_FILTER_SERVER_ACTION'
export const SAVE_FILTER_SERVER_SUCCESS = 'SAVE_FILTER_SERVER_SUCCESS'

export const GET_SAVED_FILTER_FROM_SERVER_ACTION = 'GET_SAVED_FILTER_SERVER_ACTION'
export const GET_SAVED_FILTER_FROM_SERVER_SUCCESS = 'GET_SAVED_FILTER_SERVER_SUCCESS'

export const REMOVE_SAVED_FILTER_FROM_SERVER_ACTION = 'REMOVE_SAVED_FILTER_FROM_SERVER_ACTION'
export const REMOVE_SAVED_FILTER_FROM_SERVER_SUCCESS = 'REMOVE_SAVED_FILTER_FROM_SERVER_SUCCESS'

export const RESET_PRODUCT_TAB ='RESET_PRODUCT_TAB'



export const setFilterScreenStateAction = (filterScreenState,filterState) => ({
    type: SET_FILTER_SCREEN_STATE,
    filterScreenState,
    filterState 
})

export const setFilterScreenStateSuccess = (response) => ({
    type: GET_FILTER_SCREEN_STATE,
    filterScreenState:response[0],
    filterState:response[1]
})

export const getPreDefinedFilterListAction = () =>({
    type:GET_PRE_DEFINED_FILTER_LIST_ACTION
})

export const setPreDefinedFIlterListSuccess = (responsePreDefinedFilterList) =>({
    type:GET_PRE_DEFINED_FILTER_LIST_SUCCESS,
    responsePreDefinedFilterList
})

export const getPreDefinedSubFilterAction = (id = 0)=>({
    type:GET_PRE_DEFINED_SUB_FILTER_LIST_ACTION,
    id:id
})

export const setPreDefinedSubFilterSuccess = (responsePredDefinedSubFilter, id)=>({
    type:GET_PRE_DEFINED_SUB_FILTER_LIST_SUCCESS,
    responsePredDefinedSubFilter,
    id,
})

export const saveFilterServerAction  = (title,sub_text,params)=>({
    type:SAVE_FILTER_SERVER_ACTION,
    title:title,
    sub_text:sub_text,
    params:params
})

export const saveFilterServerSuccess = (responsesaveFilterServerSuccess)=>({
    type:SAVE_FILTER_SERVER_SUCCESS,
    responsesaveFilterServerSuccess
})

export const getSavedFilterFromServerAction  = (refreshing)=>({
    type:GET_SAVED_FILTER_FROM_SERVER_ACTION,
    refreshing,
})

export const getSavedFilterFromServerSuccess = (responseSavedFilterServerList, refreshing)=>({
    type:GET_SAVED_FILTER_FROM_SERVER_SUCCESS,
    responseSavedFilterServerList,
    refreshing,
})

export const removeSavedFilterFromServerAction  = (id)=>({
    type:REMOVE_SAVED_FILTER_FROM_SERVER_ACTION,
    id:id
    
})

export const removeSavedFilterFromServerSuccess = (responseRemoveSavedFilterServerList)=>({
    type:REMOVE_SAVED_FILTER_FROM_SERVER_SUCCESS,
    responseRemoveSavedFilterServerList
})


export const resetProductTab =()=>({
    type:RESET_PRODUCT_TAB
})