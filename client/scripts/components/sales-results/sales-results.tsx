import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import If from '../if/if';
import ApplicationState from '../../model/application-state';
import SalesTable from '../sales-table/sales-table';

interface Props {
  /**
   * Whether there are search results
   */
  hasResults: boolean;
}

/**
 * A component to display an application-wide message
 * @param {Props} props
 * @return {Element}
 */
const SalesResults: FunctionComponent<Props> = ({ hasResults }): ReactElement => {
  return (
    <If condition={hasResults} render={() => <SalesTable />}/>
  );
};

const mapStateToProps = ({ sales }: ApplicationState): Props => {
  return {
    hasResults: sales && sales.length > 0
  };
};

export default connect(mapStateToProps)(SalesResults);
