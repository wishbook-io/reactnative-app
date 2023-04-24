import { all, takeEvery, call, put } from 'redux-saga/effects';

//Task
//1. get list of stories

import {
    GET_GROUPTYPE_ACTION, setGroupTypeSuccess,
    GET_CATEGORY_ACTION, setCategorySuccess
} from '../actions/masterlist-actions';
import { errorActionSet } from '../actions/error-actions';
import MasterListRepo from './repository/masterlist-repo';
import { URLConstants } from "../utils/URLConstants";


function* getBuyerGroupType() {
    try {
        let urlObj = new URLConstants();
        let url = urlObj.companyUrl('grouptype', '');

        console.log("url obj", url);

        var masterListRepo = new MasterListRepo(url, model = 'Response_BuyerGroupType', true);

        const { response, error } = yield call(masterListRepo.getGroupTypes.bind(masterListRepo));

        console.log("getBuyerGroupType call response: " + response, error);

        if (response) {
            yield put(setGroupTypeSuccess(response));
        } else {
            yield put(errorActionSet(error));
        }
    } catch (error) {
        yield put(errorActionSet(error));
    }
}

export function* getCategory() {
    try {
        let urlObj = new URLConstants();
        let url = urlObj.companyUrl('category', '');

        console.log("url obj", url);

        var masterListRepo = new MasterListRepo(url, model = '', true);

        const { response, error } = yield call(masterListRepo.getCategory.bind(masterListRepo));

        console.log("getCategory call response: " + response, error);

        if (response) {
            yield put(setCategorySuccess(response));
        } else {
            yield put(errorActionSet(error));
        }
    } catch (error) {
        yield put(errorActionSet(error));
    }
}

export default masterListRootSaga = [
    takeEvery(GET_GROUPTYPE_ACTION, getBuyerGroupType),
    takeEvery(GET_CATEGORY_ACTION, getCategory),
]