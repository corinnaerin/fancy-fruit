import React, { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import ApplicationState from '../../model/application-state';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import Fruit from '../../../../common/fruit';
import { selectChartData, selectFruits } from '../../selectors/sales-selectors';
import SalesChartData from '../../model/sales-chart-data';

interface Props {
  chartData: SalesChartData[];
  fruits: Fruit[];
}

// Accessible color palette from https://davidmathlogic.com/colorblind
const colorPalette = [ '#882255', '#88CCEE', '#CC6677', '#44AA99' ];
const defaultColor = '#117733';

/**
 * A component to display an application-wide message
 * @param {Props} props
 * @return {Element}
 */
const SalesChart: FunctionComponent<Props> = ({ chartData, fruits }): ReactElement => {
  // NOTE: I'm using this charting library recharts because manually integrating d3 & React is far from
  // trivial, and certainly out of scope of this project. Unfortunately it doesn't look like this library
  // handles accessibility (the generated SVG is missing title attributes, for example). For a real enterprise application,
  // I would pick a different library or build something bespoke
  return (
    <BarChart width={730} height={400} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="shortDate" />
      <YAxis />
      <Tooltip />
      <Legend />
      {fruits.map((fruit, index) => {
        return <Bar key={fruit} dataKey={fruit} fill={colorPalette[index] || defaultColor} stackId="a" />;
      })}
    </BarChart>
  );
};

const mapStateToProps = (state: ApplicationState): Props => {
  return {
    chartData: selectChartData(state),
    fruits: selectFruits(state)
  };
};

export default connect(mapStateToProps)(SalesChart);
