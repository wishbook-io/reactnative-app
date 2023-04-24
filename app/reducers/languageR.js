import {
    GET_LANGUAGE,
    GET_LANGUAGE_SUCCESS,
    SET_LANGUAGE,
    SET_LANGUAGE_SUCCESS
} from "../actions/language-actions";

import { commonErrorReducer } from './errorR';

const initialState = {
    languages: [],
    error: {},
    isLoading: false,
    responseLanguage: {}
};

const languageR = (state = initialState, action) => {

    switch (action.type) {
        case GET_LANGUAGE:
            return {
                ...state,
                isLoading: true,
            };
        case GET_LANGUAGE_SUCCESS:
            return {
                ...state,
                languages: action.languages,
                isLoading: false
            };
        case SET_LANGUAGE:
            return {
                ...state,
                isLoading: true,
            };
        case SET_LANGUAGE_SUCCESS:
            return {
                ...state,
                responseLanguage: action.responseLanguage,
                isLoading: false,
            }
        default:
            return commonErrorReducer(state, action);
    }
}

export default languageR;