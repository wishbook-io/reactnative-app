export const REQUEST_SHOW_LOADER_ACTION = 'REQUEST_SHOW_LOADER_ACTION';
export const REQUEST_HIDE_LOADER_ACTION = 'REQUEST_HIDE_LOADER_ACTION';

export const requestShowLoaderAction = (id) => ({
  type: REQUEST_SHOW_LOADER_ACTION,
  id,
})

export const requestHideLoaderAction = (id) => ({
  type: REQUEST_HIDE_LOADER_ACTION,
  id,
})