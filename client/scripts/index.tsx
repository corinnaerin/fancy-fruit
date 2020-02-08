import App from './components/app/app';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './store/store';
import healthcheckSaga from './saga/healthcheck-saga';

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react-container')
);

healthcheckSaga.trigger(store);
