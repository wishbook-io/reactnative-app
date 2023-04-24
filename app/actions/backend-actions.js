export const POST_CONTACTS_ACTION = "POST_CONTACTS_ACTION";
export const POST_CONTACTS_SUCCESS = "POST_CONTACTS_SUCCESS";

export const POST_LOCATION_ACTION = "POST_LOCATION_ACTION";
export const POST_LOCATION_SUCCESS = "POST_LOCATION_SUCCESS"; 

export const GET_APP_VERSION_ACTION = 'GET_APP_VERSION_ACTION';
export const GET_APP_VERSION_SUCCESS = 'GET_APP_VERSION_SUCCESS';

export const POST_USER_PLATFORM_ACTION = 'POST_USER_PLATFORM_ACTION';
export const POST_USER_PLATFORM_SUCCESS = 'POST_USER_PLATFORM_SUCCESS';

export const getPostContactsAction = () => ({
  type: POST_CONTACTS_ACTION,
});

export const setPostContactsSuccess = (responsePostContacts) => ({
  type: POST_CONTACTS_SUCCESS,
  responsePostContacts,
});

export const getPostLocationAction = () => ({
  type: POST_LOCATION_ACTION,
});

export const setPostLocationSuccess = (responsePostLocation) => ({
  type: POST_LOCATION_SUCCESS,
  responsePostLocation,
})

export const getAppVersionAction = (params) => ({
  type: GET_APP_VERSION_ACTION,
  params,
});

export const getAppVersionSuccess = (responseGetAppVersion) => ({
  type: GET_APP_VERSION_SUCCESS,
  responseGetAppVersion,
});

export const postUserPlatformAction = (params) => ({
  type: POST_USER_PLATFORM_ACTION,
  params,
});

export const postUserPlatformSuccess = (responsePostUserPlatform) => ({
  type: POST_USER_PLATFORM_SUCCESS,
  responsePostUserPlatform,
});