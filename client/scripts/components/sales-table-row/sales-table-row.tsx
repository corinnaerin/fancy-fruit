import React, { FunctionComponent, ReactElement } from 'react';
import FormattedSalesRecord from '../../model/formatted-sales-record';

interface Props {
  sale: FormattedSalesRecord;
}

/**
 * A component to display an application-wide message
 * @param {Props} props
 * @return {Element}
 */
const SalesTableRow: FunctionComponent<Props> = ({ sale }): ReactElement => {
  return (
    <tr>
      <td>{sale.longDate}</td>
      {sale.salesByFruit.map(({ fruit, quantity }) => {
        return <td key={fruit}>{quantity}</td>;
      })}
      <td>{sale.totalSales}</td>
    </tr>
  );
};

export default SalesTableRow;
