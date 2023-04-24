import { call, put } from 'redux-saga/effects';

export const fetchSaga = (entity, api) => function* ({ payload }) {
    try {
        const response = yield call(api, payload)
        yield put(entity.response(response))
    } catch (error) {
        yield put(entity.response(error))
    }
}