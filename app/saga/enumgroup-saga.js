import { takeEvery, call, put } from 'redux-saga/effects';

//Task
//1. get list of category

import {
    GET_ENUM_GROUP_FABRIC_ACTION, setEnumGroupFabricsSuccess,
    GET_ENUM_GROUP_WORKS_ACTION, setEnumGroupWorksSuccess,
    GET_ENUM_GROUP_STYLE_ACTION, setEnumGroupStyleSuccess   
} from '../actions/enumgroup-actions';
import { errorActionSet } from '../actions/error-actions';
import EnumGroupRepo from './repository/enumgroup-repo';
import { CONSTANT_URL } from "../utils/URLConstants";


function* getEnumGroupFabricsCatalog(actions) {
    try {

        console.log("getEnumGroupFabricsCatalog actions: " + actions.filter);

        var enumGroupRepo = new EnumGroupRepo(CONSTANT_URL.ENUM_GROUP, model = '', false);

        const { response, error } = yield call(enumGroupRepo.getEnumGroup.bind(enumGroupRepo), actions.filter);

        console.log("getEnumGroupFabricsCatalog call response: ", response, error);

        if (response) {
            yield put(setEnumGroupFabricsSuccess(response));
        } else {
            yield put(errorActionSet(error));
        }
    } catch (error) {
        yield put(errorActionSet(error));
    }
}

function* getEnumGroupWorksCatalog(actions) {
    try {

        console.log("getEnumGroupWorksCatalog actions: " + actions.filter);

        var enumGroupRepo = new EnumGroupRepo(CONSTANT_URL.ENUM_GROUP, model = '', false);

        const { response, error } = yield call(enumGroupRepo.getEnumGroup.bind(enumGroupRepo), actions.filter);

        console.log("getEnumGroupWorksCatalog call response: ", response, error);

        if (response) {
            yield put(setEnumGroupWorksSuccess(response));
        } else {
            yield put(errorActionSet(error));
        }
    } catch (error) {
        yield put(errorActionSet(error));
    }
}
function*  getEnumGroupStyleCatalog(actions) {
    try {

        console.log("getEnumGroupStyleCatalog actions: " + actions.filter);

        var enumGroupRepo = new EnumGroupRepo(CONSTANT_URL.ENUM_GROUP, model = '', false);

        const { response, error } = yield call(enumGroupRepo.getEnumGroup.bind(enumGroupRepo), actions.filter);

        console.log("getEnumGroupStyleCatalog call response: ", response, error);

        if (response) {
            yield put(setEnumGroupStyleSuccess(response));
        } else {
            yield put(errorActionSet(error));
        }
    } catch (error) {
        yield put(errorActionSet(error));
    }
}
export default enumgroupRootSaga = [
    takeEvery(GET_ENUM_GROUP_FABRIC_ACTION, getEnumGroupFabricsCatalog),
    takeEvery(GET_ENUM_GROUP_WORKS_ACTION, getEnumGroupWorksCatalog),
    takeEvery(GET_ENUM_GROUP_STYLE_ACTION, getEnumGroupStyleCatalog)

]