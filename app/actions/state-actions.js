export const GET_STATES_ACTION = "GET_STATES_ACTION";
export const GET_STATES_SUCCESS = "GET_STATES_SUCCESS";

export const GET_CITIES_ACTION ="GET_CITIES_ACTION";
export const GET_CITIES_SUCCESS="GET_CITIES_SUCCESS";

export const GET_ORDERED_STATES_ACTION = 'GET_ORDERED_STATES_ACTION';
export const GET_ORDERED_STATES_SUCCESS = 'GET_ORDERED_STATES_SUCCESS';

export const getStatesAction = () => ({
  type: GET_STATES_ACTION,
});

export const setStatesSuccess = (response_states) => ({
  type: GET_STATES_SUCCESS,
  response_states
});

export const getCititesAction = (id, loadingParam="isLoading") => ({
  type: GET_CITIES_ACTION,
  id,
  loadingParam,
});

export const setCitiesSuccess = (response_cities, loadingParam="isLoading") => ({
  type: GET_CITIES_SUCCESS,
  response_cities,
  loadingParam,
});

export const getOrderedStatesAction = (params) => ({
  type: GET_ORDERED_STATES_ACTION,
  params,
});

export const getOrderedStatesSuccess = (responseGetOrderedStates) => ({
  type: GET_ORDERED_STATES_SUCCESS,
  responseGetOrderedStates,
});
