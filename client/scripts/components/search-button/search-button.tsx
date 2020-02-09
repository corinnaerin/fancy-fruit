import React, { FunctionComponent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ApplicationState from '../../model/application-state';
import { selectIsValidSearchQuery, selectSearchQuery } from '../../selectors/search-query-selectors';
import salesSaga from '../../saga/sales-saga';
import DateRange from '../../../../common/date-range';
import Icon from '../icon/icon';

interface StateProps {
  searchQuery: Partial<DateRange>;
  isValidSearchQuery: boolean;
}

interface DispatchProps {
  doSearch: (dateRange: Partial<DateRange>) => void;
}

interface Props extends StateProps, DispatchProps {
}


/**
 * The main view component for the Search page
 * @return {ReactElement}
 */
const SearchButton: FunctionComponent<Props> = ({ searchQuery, isValidSearchQuery, doSearch }) => {
  return (
    <button type="button" onClick={() => doSearch(searchQuery)} disabled={!isValidSearchQuery}>
      <Icon iconName="search" />
      Search
    </button>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    doSearch: (dateRange: Partial<DateRange>): void => {
      salesSaga.trigger(dispatch, dateRange as DateRange);
    }
  };
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    searchQuery: selectSearchQuery(state),
    isValidSearchQuery: selectIsValidSearchQuery(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchButton);
