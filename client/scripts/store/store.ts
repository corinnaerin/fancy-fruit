import rootSaga from '../saga/root-saga';
import { INITIAL_STATE, universalReducer } from './reducers';
import { createStore, applyMiddleware, Store, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ApplicationState from '../model/application-state';

const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<ApplicationState> =
    createStore(
        universalReducer,
        INITIAL_STATE,
        composeEnhancers(
            applyMiddleware(
                sagaMiddleware
            )
        )
    );

sagaMiddleware.run(rootSaga);

export default store;
