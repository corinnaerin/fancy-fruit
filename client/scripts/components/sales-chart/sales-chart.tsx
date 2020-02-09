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
  // NOTE: I'm using this charting library recharts because manually integrating d3 & React is far from
  // trivial, and certainly out of scope of this project. Unfortunately it doesn't look like this library
  // handles accessibility (the generated SVG is missing title attributes, for example). For a real enterprise application,
  // I would pick a different library or build something bespoke
  return (
    <BarChart width={730} height={400} data={sales}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="shortDate" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* Accessible color palette from https://davidmathlogic.com/colorblind */}
      <Bar dataKey={Fruit.STRAWBERRIES} fill="#882255" stackId="a" />
      <Bar dataKey={Fruit.BANANAS} fill="#88CCEE" stackId="a" />
      <Bar dataKey={Fruit.ORANGES} fill="#CC6677" stackId="a" />
      <Bar dataKey={Fruit.APPLES} fill="#44AA99" stackId="a" />
    </BarChart>
  );
};

const mapStateToProps = (state: ApplicationState): Props => {
  return {
    sales: getFormattedSales(state)
  };
};

export default connect(mapStateToProps)(SalesChart);
