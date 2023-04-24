export const GET_SEARCH_CATALOG_ACTION = "GET_SEARCH_CATALOG_ACTION";
export const GET_SEARCH_CATALOG_SUCCESS = "GET_SEARCH_CATALOG_SUCCESS";

export const GET_SUGGESTION_ACTION = 'GET_SUGGESTION_ACTION';
export const GET_SUGGESTION_SUCCESS = 'GET_SUGGESTION_SUCCESS';

export const GET_COMPANY_LIST_SUGGESTIONS_ACTIONS="GET_COMPANY_LIST_SUGGESTIONS_ACTIONS"
export const GET_COMPANY_LIST_SUGGESTIONS_SUCCESS="GET_COMPANY_LIST_SUGGESTIONS_SUCCESS"

export const getSearchCatalogAction = (offset = 0, limit = 10, filters = null, listType = null) => ({
    type: GET_SEARCH_CATALOG_ACTION,
    offset: offset,
    limit: limit,
    filters: filters,
    listType: listType
});

export const setSearchCatalogSuccess = (responseSearchCatalog) => ({
    type: GET_SEARCH_CATALOG_SUCCESS,
    responseSearchCatalog,
});

export const getSuggestionAction = (text) => ({
    type: GET_SUGGESTION_ACTION,
    text,
});

export const setSuggestionSuccess = (responseSuggestion) => ({
    type: GET_SUGGESTION_SUCCESS,
    responseSuggestion,
});

export const getCompanyListSuggestionsAction = (name)=>({
    type:GET_COMPANY_LIST_SUGGESTIONS_ACTIONS,
    name
})

export const setCompanyListSuggestionsSuccess = (responseCompanyList)=>({
    type:GET_COMPANY_LIST_SUGGESTIONS_SUCCESS,
    responseCompanyList
}) 