export const GET_LANGUAGE = 'GET_LANGUAGE';
export const GET_LANGUAGE_SUCCESS = 'GET_LANGUAGE_SUCCESS';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_LANGUAGE_SUCCESS = 'SET_LANGUAGE_SUCCESS';

export const getLanguageAction = () => ({
    type: GET_LANGUAGE,
});

export const getLanguageSuccess = (languages) => ({
    type: GET_LANGUAGE_SUCCESS,
    languages
});

export const setLanguageAction = (id) => ({
    type: SET_LANGUAGE,
    id: id
});

export const setLanguageSuccess = (responseLanguage) => ({
    type: SET_LANGUAGE_SUCCESS,
    responseLanguage: responseLanguage
});