import { takeEvery, call, put } from 'redux-saga/effects';

//Task
//1. get list of category

import {
    GET_CATEGORY_ACTION, setCategorySuccess,
    GET_CATEGORY_EVP_ACTION, setCategoryEVPSuccess
} from '../actions/masterlist-actions';
import { errorActionSet } from '../actions/error-actions';
import MasterListRepo from './repository/masterlist-repo';
import { URLConstants, CONSTANT_URL } from "../utils/URLConstants";
import { debugLog } from '../utils/debugVars';

export function* getCategory() {
    try {
        let urlObj = new URLConstants();
        let url = yield urlObj.companyUrl('category', '');

        debugLog? console.log("url obj", url) : null;

        var masterListRepo = new MasterListRepo(url, model = 'CategoryTree', false);

        const { response, error } = yield call(masterListRepo.getCategory.bind(masterListRepo));

        debugLog? console.log("getCategory call response: " + response, error) : null;

        if (response) {
            yield put(setCategorySuccess(response));
        } else {
            yield put(errorActionSet(error));
        }
    } catch (error) {
        yield put(errorActionSet(error));
    }
}

export function* getCategoryEavAttribute(actions) {
    try {
        var masterListRepo = new MasterListRepo(CONSTANT_URL.CATEGORY_EVP, model = '', false);

        const { response, error } = yield call(masterListRepo.getCategoryEavAttribute.bind(masterListRepo), actions.categoryId);

        debugLog? console.log("getCategoryEavAttribute call response: ", response, error) : null;

        if (response) {
            if(actions.returnValue) {
                // console.log("getCategoryEavAttribute returning value: ", response, error);
                return response;
            }
            // console.log("getCategoryEavAttribute putting to store: ", response, error);

            yield put(setCategoryEVPSuccess(response));
        } else {
            yield put(errorActionSet(error));
        }
    } catch (error) {
        yield put(errorActionSet(error));
    }
}

export default masterListRootSaga = [
    takeEvery(GET_CATEGORY_ACTION, getCategory),
    takeEvery(GET_CATEGORY_EVP_ACTION, getCategoryEavAttribute)
]