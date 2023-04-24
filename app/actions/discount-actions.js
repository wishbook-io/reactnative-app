export const LIST_DISCOUNT_ACTION = 'LIST_DISCOUNT_ACTION';
export const LIST_DISCOUNT_SUCCESS = 'LIST_DISCOUNT_SUCCESS';

export const GET_DISCOUNT_ACTION = 'GET_DISCOUNT_ACTION';
export const GET_DISCOUNT_SUCCESS = 'GET_DISCOUNT_SUCCESS';

export const CHECK_DISCOUNT_ACTION = 'CHECK_DISCOUNT_ACTION';

export const UPDATE_DISCOUNT_ACTION = 'UPDATE_DISCOUNT_ACTION';
export const UPDATE_DISCOUNT_SUCCESS = 'UPDATE_DISCOUNT_SUCCESS';

export const LIST_USED_DISCOUNT_ACTION = 'LIST_USED_DISCOUNT_ACTION';
export const LIST_USED_DISCOUNT_SUCCESS = 'LIST_USED_DISCOUNT_SUCCESS';

export const listDiscountAction = (refresh) => ({
  type: LIST_DISCOUNT_ACTION,
  refresh,
});

export const listDiscountSuccess = (responseListDiscount, refresh) => ({
  type: LIST_DISCOUNT_SUCCESS,
  responseListDiscount,
  refresh,
});

export const getDiscountAction = (id) => ({
  type: GET_DISCOUNT_ACTION,
  id,
});

export const checkDiscountAction = (brandId) => ({
  type: CHECK_DISCOUNT_ACTION,
  brandId,
});

export const getDiscountSuccess = (responseGetDiscount) => ({
  type: GET_DISCOUNT_SUCCESS,
  responseGetDiscount,
});

export const updateDiscountAction = (params, id, listDiscount) => ({
  type: UPDATE_DISCOUNT_ACTION,
  params,
  id,
  listDiscount,
});

export const updateDiscountSuccess = (responseUpdateDiscount) => ({
  type: UPDATE_DISCOUNT_SUCCESS,
  responseUpdateDiscount,
});

export const listUsedDiscountAction = (params) => ({
  type: LIST_USED_DISCOUNT_ACTION,
  params,
});

export const listUsedDiscountSuccess = (responseListUsedDiscount) => ({
  type: LIST_USED_DISCOUNT_SUCCESS,
  responseListUsedDiscount,
});
