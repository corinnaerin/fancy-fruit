import DateRange from '../../common/date-range';
import moment, { Moment } from 'moment';
import SalesRecord from '../../common/sales-record';
import Fruit from '../../common/fruit';

const data: Map<string, SalesRecord> = new Map();

function getRandomSalesNum() {
  return Math.floor(Math.random() * 1000);
}

function generateRandomRecord(date: Moment): SalesRecord {
  return {
    date: date.format(),
    [Fruit.APPLES]: getRandomSalesNum(),
    [Fruit.BANANAS]: getRandomSalesNum(),
    [Fruit.STRAWBERRIES]: getRandomSalesNum(),
    [Fruit.ORANGES]: getRandomSalesNum()
  };
}

export function getRecord(date: Moment) {
  const dateString = date.format();
  if (data.has(dateString)) {
    return data.get(dateString);
  } else {
    const record = generateRandomRecord(date);
    data.set(dateString, record);
    return record;
  }
}

export function getRecords({ startDate, endDate }: DateRange) {
  const current = moment(startDate);
  const records = [];
  while (!current.isAfter(endDate)) {
    records.push(getRecord(current));
    current.add(1, 'day');
  }
  return records;
}
