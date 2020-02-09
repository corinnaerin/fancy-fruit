import ApiUtil from './api-util';
import SalesRecord from '../../../common/sales-record';
import DateRange from '../../../common/date-range';

export default class SalesAPI {
  public static async getSales(input: DateRange): Promise<SalesRecord[]> {
    return await ApiUtil.get<SalesRecord[]>(`/api/sales?startDate=${input.startDate.format()}&endDate=${input.endDate.format()}`);
  }
}
