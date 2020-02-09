import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import SalesRecord from '../../../../common/sales-record';
import moment from 'moment';

interface Props {
  sale: SalesRecord;
}

/**
 * A component to display an application-wide message
 * @param {Props} props
 * @return {Element}
 */
const SalesTableRow: FunctionComponent<Props> = ({ sale }): ReactElement => {
  return (
    <tr>
      <td>{moment(sale.date).format('MM/DD/YYYY')}</td>
      <td>{sale.bananas}</td>
      <td>{sale.strawberries}</td>
      <td>{sale.apples}</td>
      <td>{sale.oranges}</td>
    </tr>
  );
};

export default SalesTableRow;
