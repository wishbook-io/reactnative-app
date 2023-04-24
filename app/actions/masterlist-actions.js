export const GET_GROUPTYPE_ACTION = "GET_GROUPTYPE_ACTION";
export const GET_GROUPTYPE_SUCCESS = "GET_GROUPTYPE_SUCCESS";

export const GET_CATEGORY_ACTION = "GET_CATEGORY_ACTION";
export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS";


export const GET_CATEGORY_EVP_ACTION = "GET_CATEGORY_EVP_ACTION";
export const GET_CATEGORY_EVP_SUCCESS = "GET_CATEGORY_EVP_SUCCESS";

export const getGroupTypeAction = () => ({
    type: GET_GROUPTYPE_ACTION,
});

export const setGroupTypeSuccess = (responseGroupType) => ({
    type: GET_GROUPTYPE_SUCCESS,
    responseGroupType
});

export const getCategoryAction = () => ({
    type: GET_CATEGORY_ACTION,
});

export const setCategorySuccess = (responseCategory) => ({
    type: GET_CATEGORY_SUCCESS,
    responseCategory
});

export const getCategoryEVPAction = (categoryId, returnValue=false) => ({
    type: GET_CATEGORY_EVP_ACTION,
    categoryId: categoryId,
    returnValue,
});

export const setCategoryEVPSuccess = (responseCategoryEvp) => ({
    type: GET_CATEGORY_EVP_SUCCESS,
    responseCategoryEvp
});