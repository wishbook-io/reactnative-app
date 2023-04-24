import createSagaMiddleware from 'redux-saga';
import { fork, call, take } from 'redux-saga/effects'
const sagaMiddleware = createSagaMiddleware();

export function execute(saga, ...args) {
  return sagaMiddleware.run(saga, ...args).done;
}

export function takeFirst(pattern, saga, ...args) {
  return fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield call(saga, ...args.concat(action));
    }
  });
}

export default sagaMiddleware;