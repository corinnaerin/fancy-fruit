import Fruit from '../../../common/fruit';

export default interface SalesChartData extends Record<Fruit, number> {
  shortDate: string;
}
