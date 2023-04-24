export const GET_CREDIT_LINE_ACTION = 'GET_CREDIT_LINE_ACTION';
export const GET_CREDIT_LINE_SUCCESS = 'GET_CREDIT_LINE_SUCCESS';

export const GET_CREDIT_RATING_ACTION = 'GET_CREDIT_RATING_ACTION';
export const GET_CREDIT_RATING_SUCCESS = 'GET_CREDIT_RATING_SUCCESS';

export const getCreditLineAction = (params) => ({
  type: GET_CREDIT_LINE_ACTION,
  params,
});

export const getCreditLineSuccess = (responseGetCreditLine) => ({
  type: GET_CREDIT_LINE_SUCCESS,
  responseGetCreditLine,
});

export const getCreditRatingAction = (params) => ({
  type: GET_CREDIT_RATING_ACTION,
  params,
});

export const getCreditRatingSuccess = (responseGetCreditRating) => ({
  type: GET_CREDIT_RATING_SUCCESS,
  responseGetCreditRating,
});
