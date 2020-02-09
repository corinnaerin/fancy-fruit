import healthcheckSaga from './healthcheck-saga';
import salesSaga from './sales-saga';
import { all } from 'redux-saga/effects';

export default function * rootSaga(): Generator {
  yield all([
    healthcheckSaga.watch(),
    salesSaga.watch()
  ]);
}

