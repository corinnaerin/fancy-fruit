import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';
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
      <td>{sale.bananas}</td>
      <td>{sale.strawberries}</td>
      <td>{sale.apples}</td>
      <td>{sale.oranges}</td>
      <td>{sale.bananas + sale.strawberries + sale.apples + sale.oranges}</td>
    </tr>
  );
};

export default SalesTableRow;
