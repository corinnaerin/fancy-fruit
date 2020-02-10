import Fruit from '../../common/fruit';
import { BadRequest } from 'http-errors';
import DateRange from '../../common/date-range';
import moment, { Moment } from 'moment';
import FruitSales from '../../common/fruit-sales';

export default class RequestParseUtils {
  static validateFruit(fruit: Fruit, body?: FruitSales) {
    if (!Object.values(Fruit).includes(fruit)) {
      throw new BadRequest(`Invalid Fruit: "${fruit}"`);
    }

    if (body && (!body.fruit || body.fruit !== fruit)) {
      throw new BadRequest(`Request body does not match path variable`);
    }
  }

  public static getDateRange(startDate: string, endDate: string): DateRange {
    if (!startDate) {
      throw new BadRequest('Missing start date');
    }
    if (!endDate) {
      throw new BadRequest('Missing end date');
    }

    const dateRange: DateRange = {
      startDate: RequestParseUtils.convertDateStrToMoment(startDate),
      endDate: RequestParseUtils.convertDateStrToMoment((endDate))
    };

    if (dateRange.startDate.isAfter(dateRange.endDate)) {
      throw new BadRequest(`Start date cannot be after end date`);
    }

    return dateRange;
  }

  public static convertDateStrToMoment(dateStr: string): Moment {
    const date = moment(dateStr);

    if (!date.isValid()) {
      throw new BadRequest(`Invalid date provided: ${dateStr}`);
    }

    return date;
  }
}
