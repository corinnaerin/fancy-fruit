import { createSelector } from 'reselect';
import ApplicationState from '../model/application-state';
import moment from 'moment';
import FormattedSalesRecord from '../model/formatted-sales-record';
import SalesChartData from '../model/sales-chart-data';
import FruitSales from '../../../common/fruit-sales';

export const selectSales = (state: ApplicationState) => state.sales;

export const selectHasSalesResults = createSelector(
    selectSales,
    (sales) => sales && sales.length > 0
);

export const selectFormattedSales = createSelector(
    selectSales,
    (sales): FormattedSalesRecord[] => sales && sales.map((sale) => {
      const date = moment(sale.date);
      return {
        ...sale,
        longDate: date.format('MM/DD/YYYY'),
        shortDate: date.format('MM/DD')
      };
    })
);

export const selectChartData = createSelector(
    selectFormattedSales,
    (sales): SalesChartData[] => sales && sales.map(({ shortDate, salesByFruit }) => {
      const dataPoint: Partial<SalesChartData> = {
        shortDate
      };
      salesByFruit.forEach((sales: FruitSales) => {
        dataPoint[sales.fruit] = sales.quantity;
      });
      return dataPoint as SalesChartData;
    })
);

export const selectFruits = createSelector(
    selectSales,
    (sales) => sales && sales[0] && sales[0].salesByFruit.map(({ fruit }) => fruit )
);
