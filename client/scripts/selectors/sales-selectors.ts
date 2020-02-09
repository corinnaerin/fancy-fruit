import { createSelector } from 'reselect';
import ApplicationState from '../model/application-state';
import moment from 'moment';
import FormattedSalesRecord from '../model/formatted-sales-record';

export const getSales = (state: ApplicationState) => state.sales;

export const hasResults = createSelector(
    getSales,
    (sales) => sales && sales.length > 0
);

export const getFormattedSales = createSelector(
    getSales,
    (sales): FormattedSalesRecord[] => sales && sales.map((sale) => {
      const date = moment(sale.date);
      return {
        ...sale,
        total: sale.bananas + sale.strawberries + sale.apples + sale.oranges,
        longDate: date.format('MM/DD/YYYY'),
        shortDate: date.format('MM/DD')
      };
    })
);
