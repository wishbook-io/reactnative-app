import {
    GET_ENUM_GROUP_FABRIC_ACTION, GET_ENUM_GROUP_FABRIC_SUCCESS,
    GET_ENUM_GROUP_WORKS_ACTION, GET_ENUM_GROUP_WORKS_SUCCESS,
    GET_ENUM_GROUP_STYLE_ACTION,GET_ENUM_GROUP_STYLE_SUCCESS
} from "../actions/enumgroup-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
    error: {},
    isLoading: false,
    responseFabrics: [],
    responseWorks: [],
    responseStyles:[],
};


const enumGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ENUM_GROUP_FABRIC_ACTION:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ENUM_GROUP_FABRIC_SUCCESS:
            return {
                ...state,
                responseFabrics: action.responseFabrics,
                isLoading: false
            };
        case GET_ENUM_GROUP_WORKS_ACTION:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ENUM_GROUP_WORKS_SUCCESS:
            return {
                ...state,
                responseWorks: action.responseWorks,
                isLoading: false
            };
        case GET_ENUM_GROUP_STYLE_ACTION:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ENUM_GROUP_STYLE_SUCCESS:
            return {
                ...state,
                responseStyles: action.responseStyles,
                isLoading: false
            };    
        default:
            return commonErrorReducer(state, action);
    }
};

export default enumGroupReducer;