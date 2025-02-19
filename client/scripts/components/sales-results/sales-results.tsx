import React, { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import If from '../if/if';
import ApplicationState from '../../model/application-state';
import SalesTable from '../sales-table/sales-table';
import SalesChart from '../sales-chart/sales-chart';
import styles from './sales-results.css';
import { selectHasSalesResults } from '../../selectors/sales-selectors';

interface Props {
  /**
   * Whether there are search results
   */
  hasResults: boolean;
}

/**
 * A component to display an application-wide message
 * @param {Props} props
 * @return {ReactElement}
 */
const SalesResults: FunctionComponent<Props> = ({ hasResults }): ReactElement => {
  return (
    <If condition={hasResults} render={() => {
      return (
        <section className={styles.salesResults}>
          <SalesTable />
          <SalesChart />
        </section>
      );
    }} />
  );
};

const mapStateToProps = (state: ApplicationState): Props => {
  return {
    hasResults: selectHasSalesResults(state)
  };
};

export default connect(mapStateToProps)(SalesResults);
