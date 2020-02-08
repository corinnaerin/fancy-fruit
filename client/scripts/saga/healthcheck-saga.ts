import AsyncSaga from './async-saga';
import HealthcheckAPI from '../api/healthcheck-api';

const healthcheckSaga: AsyncSaga<void, void> = new AsyncSaga(
    'HEALTHCHECK_REQUEST',
    'HEALTHCHECK_SUCCESS',
    'HEALTHCHECK_FAILURE',
    HealthcheckAPI.ping
);

export default healthcheckSaga;
