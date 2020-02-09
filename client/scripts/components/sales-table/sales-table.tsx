import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import ApplicationState from '../../model/application-state';
import SalesTableRow from '../sales-table-row/sales-table-row';
import styles from './sales-table.css';
import { getFormattedSales } from '../../selectors/sales-selectors';
import FormattedSalesRecord from '../../model/formatted-sales-record';

interface Props {
  sales: FormattedSalesRecord[];
}

/**
 * A component to display an application-wide message
 * @param {Props} props
 * @return {Element}
 */
const SalesTable: FunctionComponent<Props> = ({ sales }): ReactElement => {
  return (
    <table className={styles.salesTable}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Strawberries</th>
          <th>Bananas</th>
          <th>Oranges</th>
          <th>Apples</th>
          <th>Total Sales</th>
        </tr>
      </thead>
      <tbody>
        {
          sales.map((sale) => {
            return <SalesTableRow sale={sale} key={sale.date} />;
          })
        }
      </tbody>
    </table>
  );
};

const mapStateToProps = (state: ApplicationState): Props => {
  return {
    sales: getFormattedSales(state)
  };
};

export default connect(mapStateToProps)(SalesTable);
