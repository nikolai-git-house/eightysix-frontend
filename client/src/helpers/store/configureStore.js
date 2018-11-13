import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';

export default (history, rootReducer, rootSaga) => {
  const initialState = fromJS({});
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [routerMiddleware(history), sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({
      collapsed: false,
      stateTransformer: state => state.toJS(),
    });
    middleware.push(logger);
  }

  const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

  sagaMiddleware.run(rootSaga);

  return store;
};
