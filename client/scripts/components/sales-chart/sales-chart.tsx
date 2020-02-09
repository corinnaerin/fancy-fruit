import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import ApplicationState from '../../model/application-state';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import Fruit from '../../../../common/fruit';
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
const SalesChart: FunctionComponent<Props> = ({ sales }): ReactElement => {
  return (
    <BarChart width={730} height={400} data={sales}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="shortDate" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={Fruit.ORANGES} fill="#91BFCC" stackId="a" />
      <Bar dataKey={Fruit.BANANAS} fill="#3F8599" stackId="a" />
      <Bar dataKey={Fruit.STRAWBERRIES} fill="#FF958F" stackId="a" />
      <Bar dataKey={Fruit.APPLES} fill="#CC91A4" stackId="a" />
    </BarChart>
  );
};

const mapStateToProps = (state: ApplicationState): Props => {
  return {
    sales: getFormattedSales(state)
  };
};

export default connect(mapStateToProps)(SalesChart);
