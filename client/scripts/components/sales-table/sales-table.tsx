import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import ApplicationState from '../../model/application-state';
import SalesRecord from '../../../../common/sales-record';
import SalesTableRow from '../sales-table-row/sales-table-row';
import styles from './sales-table.css';

interface Props {
  sales: SalesRecord[];
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
          <th>Bananas</th>
          <th>Strawberries</th>
          <th>Apples</th>
          <th>Oranges</th>
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

const mapStateToProps = ({ sales }: ApplicationState): Props => {
  return {
    sales
  };
};

export default connect(mapStateToProps)(SalesTable);
