import FruitSales from './fruit-sales';

export default interface SalesRecord {
  date: string;
  totalSales: number;
  salesByFruit: FruitSales[];
}
