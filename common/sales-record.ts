import Fruit from './fruit';

export default interface SalesRecord extends Record<Fruit, number> {
  date: string;
}
