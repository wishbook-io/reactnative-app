import {
    GET_GROUPTYPE_ACTION, GET_GROUPTYPE_SUCCESS,
    GET_CATEGORY_ACTION, GET_CATEGORY_SUCCESS,
    GET_CATEGORY_EVP_ACTION, GET_CATEGORY_EVP_SUCCESS
} from "../actions/masterlist-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
    error: {},
    isLoading: false,
    responseGroupType: {},
    spinnerDatasCategory: [],
    responseCategory: [],
    responseCategoryEvp: []
};


const spinnerDataCategory = (state, action) => {
    var mData = [];
    // console.log("spinnerDataCategory", action.responseCategory);
    if (action.responseCategory !== null && action.responseCategory !== undefined && action.responseCategory.length > 0) {
        if (action.responseCategory[0].id !== null) {
            action.responseCategory.forEach(element => {
                // console.log("forEach", element);
                var fileBean = null;
                if (element.parent_category == null) {
                    fileBean = {
                        fileId: element.id,
                        filePId: -1,
                        fileName: element.category_name,
                        isChecked: false
                    }
                    mData.push(fileBean);
                } else {
                    fileBean = {
                        fileId: element.id,
                        filePId: -1,
                        fileName: element.category_name,
                        isChecked: false
                    }
                    mData.push(fileBean);
                }
            });
        }
        return mData;
    } else {
        return mData;
    }
}


const masterListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUPTYPE_ACTION:
            return {
                ...state,
                isLoading: true,
            };
        case GET_GROUPTYPE_SUCCESS:
            return {
                ...state,
                responseGroupType: action.responseGroupType,
                isLoading: false
            };
        case GET_CATEGORY_ACTION:
            return {
                ...state,
                isLoading: true,
            };
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                responseCategory: action.responseCategory,
                spinnerDatasCategory: spinnerDataCategory(state, action)
            };
        case GET_CATEGORY_EVP_ACTION:
            return {
                ...state,
                isLoading: true,
            };
        case GET_CATEGORY_EVP_SUCCESS:
            return {
                ...state,
                responseCategoryEvp: action.responseCategoryEvp,
                isLoading: false
            };
        default:
            return commonErrorReducer(state, action);
    }
};

export default masterListReducer;