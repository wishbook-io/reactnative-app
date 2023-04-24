export const GET_ENUM_GROUP_FABRIC_ACTION = "GET_ENUM_GROUP_FABRIC_ACTION";
export const GET_ENUM_GROUP_FABRIC_SUCCESS = "GET_ENUM_GROUP_FABRIC_SUCCESS";
export const GET_ENUM_GROUP_WORKS_ACTION = "GET_ENUM_GROUP_WORKS_ACTION";
export const GET_ENUM_GROUP_WORKS_SUCCESS = "GET_ENUM_GROUP_WORKS_SUCCESS";
export const GET_ENUM_GROUP_STYLE_ACTION = "GET_ENUM_GROUP_STYLE_ACTION";
export const GET_ENUM_GROUP_STYLE_SUCCESS = "GET_ENUM_GROUP_STYLE_SUCCESS";   

export const getEnumGroupFabricAction = (filter = 'fabric') => ({
    type: GET_ENUM_GROUP_FABRIC_ACTION,
    filter: filter
});

export const setEnumGroupFabricsSuccess = (responseFabrics) => ({
    type: GET_ENUM_GROUP_FABRIC_SUCCESS,
    responseFabrics
});

export const getEnumGroupWorksAction = (filter = 'work') => ({
    type: GET_ENUM_GROUP_WORKS_ACTION,
    filter: filter
});

export const setEnumGroupWorksSuccess = (responseWorks) => ({
    type: GET_ENUM_GROUP_WORKS_SUCCESS,
    responseWorks
});

export const getEnumGroupStyleAction = (filter = 'work') => ({
    type: GET_ENUM_GROUP_STYLE_ACTION,
    filter: filter
});

export const setEnumGroupStyleSuccess = (responseStyles) => ({
   type: GET_ENUM_GROUP_STYLE_SUCCESS,
   responseStyles
});
