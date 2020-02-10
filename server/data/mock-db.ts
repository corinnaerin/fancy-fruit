import DateRange from '../../common/date-range';
import moment, { Moment } from 'moment';
import Fruit from '../../common/fruit';
import FruitSales from '../../common/fruit-sales';
import SalesRecord from '../../common/sales-record';

const data: Map<string, SalesRecord> = new Map();

function getRandomSalesNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomRecord(recordDate: Moment): SalesRecord {
  const date = recordDate.format();
  const record: SalesRecord = {
    date,
    totalSales: 0,
    salesByFruit: [
      {
        date,
        fruit: Fruit.APPLES,
        quantity: getRandomSalesNum(50, 100),
        label: 'Apples' // in real application, use a translate function with language from Accept-Language request header
      },
      {
        date,
        fruit: Fruit.ORANGES,
        quantity: getRandomSalesNum(75, 150),
        label: 'Oranges'
      },
      {
        date,
        fruit: Fruit.BANANAS,
        quantity: getRandomSalesNum(125, 300),
        label: 'Bananas'
      },
      {
        date,
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

export function getRecord(date: Moment): SalesRecord {
  const dateString = date.format();
  if (data.has(dateString)) {
    return data.get(dateString) as SalesRecord;
  } else {
    const record = generateRandomRecord(date);
    data.set(dateString, record);
    return record;
  }
}

export function getRecords({ startDate, endDate }: DateRange): SalesRecord[] {
  const current = moment(startDate); // clone startDate
  const records = [];
  while (!current.isAfter(endDate)) {
    records.push(getRecord(current));
    current.add(1, 'day');
  }
  return records;
}
