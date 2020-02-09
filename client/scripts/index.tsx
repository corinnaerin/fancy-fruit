import App from './components/app/app';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import store from './store/store';
import salesSaga from './saga/sales-saga';
import moment from 'moment';
import healthcheckSaga from './saga/healthcheck-saga';

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react-container')
);

healthcheckSaga.trigger(store);

salesSaga.trigger(store, {
  startDate: moment(),
  endDate: moment().add(15, 'day')
});
