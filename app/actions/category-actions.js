export const GET_CATEGORIES_ACTION = "GET_CATEGORIES_ACTION";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";

export const SET_EAV_CATEGORIES_SUCCESS ="GET_EAV_CATEGORIES_SUCCESS"
export const GET_EAV_CATEGORIES_ACTION = "GET_EAV_CATEGORIES_ACTION"

export const GET_CATEGORY_TOP_ACTION = 'GET_CATEGORY_TOP_ACTION';
export const GET_CATEGORY_TOP_SUCCESS = 'GET_CATEGORY_TOP_SUCCESS';

export const GET_CATEGORY_CHILD_ACTION = 'GET_CATEGORY_CHILD_ACTION';
export const GET_CATEGORY_CHILD_SUCCESS = 'GET_CATEGORY_CHILD_SUCCESS';

export const GET_CATEGORY_EAV_ACTION = 'GET_CATEGORY_EAV_ACTION';
export const GET_CATEGORY_EAV_SUCCESS = 'GET_CATEGORY_EAV_SUCCESS';

export const CACHE_SIZE_EAV_FOR_CATEGORY = 'CACHE_SIZE_EAV_FOR_CATEGORY';

export const getCategoriesAction = (params = null) => ({
    type: GET_CATEGORIES_ACTION,
    params,
});

export const setCategoriesSuccess = (responseCategory) => ({
    type: GET_CATEGORIES_SUCCESS,
    responseCategory
});

export const getEavCategoriesAction = (filter = null) =>({
      type: GET_EAV_CATEGORIES_ACTION,
      filter:filter


})

export const setEavCategoriesSuccess = (responseEavCategory) => ({
  type: SET_EAV_CATEGORIES_SUCCESS,
    responseEavCategory
})

export const getCategoryTopAction = (params = {}) => ({
    type: GET_CATEGORY_TOP_ACTION,
    params,
  });
  
export const getCategoryTopSuccess = (responseGetCategoryTop) => ({
  type: GET_CATEGORY_TOP_SUCCESS,
  responseGetCategoryTop,
});

export const getCategoryChildAction = (id) => ({
  type: GET_CATEGORY_CHILD_ACTION,
  id,
});

export const getCategoryChildSuccess = (responseGetCategoryChild, id) => ({
  type: GET_CATEGORY_CHILD_SUCCESS,
  responseGetCategoryChild,
  id,
});

export const getCategoryEavAction = (id, slug) => ({
  type: GET_CATEGORY_EAV_ACTION,
  id,
  slug
});

export const getCategoryEavSuccess = (responseGetCategoryEav) => ({
  type: GET_CATEGORY_EAV_SUCCESS,
  responseGetCategoryEav,
});

export const cacheSizeEavForCategory = (category, sizeEav) => ({
  type: CACHE_SIZE_EAV_FOR_CATEGORY,
  category,
  sizeEav,
})
