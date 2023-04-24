export const GET_STORIES_ACTION = "GET_STORIES_ACTION";
export const GET_STORIES_SUCCESS = "GET_STORIES_SUCCESS";

export const GET_GROUPTYPE_ACTION = "GET_GROUPTYPE_ACTION";
export const GET_GROUPTYPE_SUCCESS = "GET_GROUPTYPE_SUCCESS";

export const GET_COMPANYRATING_ACTION = "GET_COMPANYRATING_ACTION";
export const GET_COMPANYRATING_SUCCESS = "GET_COMPANYRATING_SUCCESS";

export const GET_PUBLIC_CATALOG_ACTION = "GET_PUBLIC_CATALOG_ACTION";
export const GET_PUBLIC_CATALOG_SUCCESS = "GET_PUBLIC_CATALOG_SUCCESS";

export const GET_CATALOG_DETAILS_ACTION = 'GET_CATALOG_DETAILS_ACTION';
export const GET_CATALOG_DETAILS_SUCCESS = 'GET_CATALOG_DETAILS_SUCCESS';

export const SETUP_HOME_ACTION = 'SETUP_HOME_ACTION';
export const SETUP_HOME_SUCCESS = 'SETUP_HOME_SUCCESS'; 

export const getAllStoriesListAction = () => ({
    type: GET_STORIES_ACTION,
});

export const setAllStoriesListSuccess = (stories) => ({
    type: GET_STORIES_SUCCESS,
    stories
});

export const getGroupTypeAction = () => ({
    type: GET_GROUPTYPE_ACTION,
});

export const setGroupTypeSuccess = (responseGroupType) => ({
    type: GET_GROUPTYPE_SUCCESS,
    responseGroupType
});

export const getCompanyRatingAction = () => ({
    type: GET_COMPANYRATING_ACTION,
});

export const setCompanyRatingSuccess = (responseCompanyCredit) => ({
    type: GET_COMPANYRATING_SUCCESS,
    responseCompanyCredit
});

export const getPublicCatalogAction = (offset = 0, limit = 10, filters = null, listType = null) => ({
    type: GET_PUBLIC_CATALOG_ACTION,
    offset: offset,
    limit: limit,
    filters: filters,
    listType: listType
});

export const setPublicCatalogSuccess = (responsePublicCatalog) => ({
    type: GET_PUBLIC_CATALOG_SUCCESS,
    responsePublicCatalog
});

export const getCatalogDetailsAction = (catalogid) => ({
    type: GET_CATALOG_DETAILS_ACTION,
    catalogid: catalogid
});

export const getCatalogDetailsSuccess = (responseCatalogDetails) => ({
    type: GET_CATALOG_DETAILS_SUCCESS,
    responseCatalogDetails
});

export const setupHomeAction = (payload) => ({
    type: SETUP_HOME_ACTION,
    payload,
});

export const setupHomeSuccess = (responseSetupHome) => ({
    type: SETUP_HOME_SUCCESS,
    responseSetupHome,
});

