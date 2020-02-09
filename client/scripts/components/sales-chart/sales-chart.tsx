import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import ApplicationState from '../../model/application-state';
import SalesRecord from '../../../../common/sales-record';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import Fruit from '../../../../common/fruit';
import moment from 'moment';

interface Props {
  sales: SalesRecord[];
}

/**
 * A component to display an application-wide message
 * @param {Props} props
 * @return {Element}
 */
const SalesChart: FunctionComponent<Props> = ({ sales }): ReactElement => {
  const formattedSales = sales.map((sale) => {
    return {
      ...sale,
      date: moment(sale.date).format('MM/DD'),
      total: sale.apples + sale.bananas + sale.strawberries + sale.oranges
    };
  });
  return (
    <BarChart width={730} height={400} data={formattedSales}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
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

const mapStateToProps = ({ sales }: ApplicationState): Props => {
  return {
    sales
  };
};

export default connect(mapStateToProps)(SalesChart);
