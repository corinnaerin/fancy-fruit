import { Request, Response } from 'express';
import DateRange from '../../common/date-range';
import { getRecords } from '../data/mock-db';
import RequestParseUtils from '../utils/request-parse-utils';

export default class Sales {
  public static getAllSalesForDateRange(req: Request, res: Response): void {
    const dateRange: DateRange = RequestParseUtils.getDateRange(req.query.startDate, req.query.endDate);
    const records = getRecords(dateRange);

    res.status(200)
        .json(records);
  }
}
