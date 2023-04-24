import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducer from '../reducers';
import sagaMiddleware from './saga';
import rootSaga from '../saga/rootSaga';

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  //middleware.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export { store };