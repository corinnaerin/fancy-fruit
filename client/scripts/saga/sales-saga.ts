import AsyncSaga from './async-saga';
import SalesAPI from '../api/sales-api';
import DateRange from '../../../common/date-range';
import SalesRecord from '../../../common/sales-record';

const salesSaga: AsyncSaga<DateRange, SalesRecord[]> = new AsyncSaga(
    'SALES_REQUEST',
    'SALES_SUCCESS',
    'SALES_FAILURE',
    SalesAPI.getSales
);

export default salesSaga;
