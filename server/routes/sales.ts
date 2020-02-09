import { Request, Response } from 'express';
import { BadRequest } from 'http-errors';
import moment from 'moment';
import DateRange from '../../common/date-range';
import { getRecords } from '../data/mock-db';

interface SalesQuery {
  startDate: string;
  endDate: string;
}

export default class Sales {
  public static get(req: Request, res: Response): void {

    let dateRange: DateRange;
    try {
      dateRange = Sales.getDateRange(req.query);
    } catch (error) {
      throw new BadRequest(error.message);
    }

    const records = getRecords(dateRange);

    res.status(200)
        .json(records);
  }

  private static getDateRange(query: Partial<SalesQuery>): DateRange {
    if (!query.startDate) {
      throw new Error('Missing start date');
    }
    if (!query.endDate) {
      throw new Error('Missing end date');
    }

    const dateRange: DateRange = {
      startDate: moment(query.startDate),
      endDate: moment(query.endDate)
    };

    if (dateRange.startDate.isAfter(dateRange.endDate)) {
      throw new Error(`Start date cannot be after end date`);
    }

    return dateRange;
  }
}
