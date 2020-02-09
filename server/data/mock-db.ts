import DateRange from '../../common/date-range';
import moment, { Moment } from 'moment';
import SalesRecord from '../../common/sales-record';
import Fruit from '../../common/fruit';
import FruitSales from '../../common/fruit-sales';

const data: Map<string, SalesRecord> = new Map();

function getRandomSalesNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomRecord(date: Moment): SalesRecord {
  const record: SalesRecord = {
    date: date.format(),
    totalSales: 0,
    salesByFruit: [
      {
        fruit: Fruit.APPLES,
        quantity: getRandomSalesNum(50, 100),
        label: 'Apples' // in real application, use a translate function with language from Accept-Language request header
      },
      {
        fruit: Fruit.ORANGES,
        quantity: getRandomSalesNum(75, 150),
        label: 'Oranges'
      },
      {
        fruit: Fruit.BANANAS,
        quantity: getRandomSalesNum(125, 300),
        label: 'Bananas'
      },
      {
        fruit: Fruit.STRAWBERRIES,
        quantity: getRandomSalesNum(250, 500),
        label: 'Strawberries'
      }
    ]
  };

  record.totalSales = record.salesByFruit.reduce((total, sale: FruitSales) => {
    return total + sale.quantity;
  }, 0);

  return record;
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
