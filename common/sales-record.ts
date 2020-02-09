import { Moment } from 'moment';
import Fruit from './fruit';

export default interface SalesRecord extends Record<Fruit, number> {
  date: Moment;
}
