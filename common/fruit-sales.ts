import Fruit from './fruit';
import { Moment } from 'moment';

export default interface FruitSales {
  date: string | Moment;
  fruit: Fruit;
  quantity: number;
  label: string;
}
