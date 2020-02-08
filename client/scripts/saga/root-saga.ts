import healthcheckSaga from './healthcheck-saga';

export default function * rootSaga(): Generator {
  yield healthcheckSaga.watch();
}
