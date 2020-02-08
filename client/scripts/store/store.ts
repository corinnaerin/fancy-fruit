import rootSaga from '../saga/root-saga';
import { INITIAL_STATE, universalReducer } from './reducers';
import * as Redux from 'redux';
import createSagaMiddleware from 'redux-saga';
import ApplicationState from '../model/application-state';

const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof Redux.compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

const store: Redux.Store<ApplicationState> =
    Redux.createStore(
        universalReducer,
        INITIAL_STATE,
        composeEnhancers(
            Redux.applyMiddleware(
                sagaMiddleware
            )
        )
    );

sagaMiddleware.run(rootSaga);

export default store;
