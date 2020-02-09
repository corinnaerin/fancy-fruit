import React, { FunctionComponent } from 'react';
import DatePicker from 'react-datepicker';
import { Modifiers } from 'popper.js';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ApplicationState from '../../model/application-state';
import { selectEndDateNative, selectStartDateNative } from '../../selectors/search-query-selectors';
import styles from './date-range-picker.css';

interface StateProps {
  startDate?: Date;
  endDate?: Date;
}

interface DispatchProps {
  setStartDate: (date: Date | null, event: React.SyntheticEvent | undefined) => void;
  setEndDate: (date: Date | null, event: React.SyntheticEvent | undefined) => void;
}

interface Props extends StateProps, DispatchProps {
}

const POPPER_MODIFIERS: Modifiers = {
  flip: {
    behavior: [ 'bottom' ] // don't allow it to flip to be above
  }
};

/**
 * The main view component for the Search page
 * @return {ReactElement}
 */
const DateRangePicker: FunctionComponent<Props> = ({ setStartDate, setEndDate, startDate, endDate }) => {
  return (
    <fieldset className={styles.dateRangeContainer} aria-label="Search Date Range">
      <label>
        <div className={styles.inputLabel}>Start Date</div>
        <DatePicker
          selected={startDate}
          selectsStart
          popperPlacement="bottom"
          popperModifiers={POPPER_MODIFIERS}
          maxDate={endDate}
          startDate={startDate}
          endDate={endDate}
          onChange={setStartDate} />
      </label>
      <label>
        <div className={styles.inputLabel}>End Date</div>
        <DatePicker
          selected={endDate}
          selectsEnd
          popperPlacement="bottom"
          popperModifiers={POPPER_MODIFIERS}
          startDate={startDate}
          endDate={endDate}
          onChange={setEndDate}
          minDate={startDate} />
      </label>
    </fieldset>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    setStartDate: (date: Date | null): void => {
      dispatch({
        type: 'SET_START_DATE',
        startDate: date
      });
    },
    setEndDate: (date: Date | null): void => {
      dispatch({
        type: 'SET_END_DATE',
        endDate: date
      });
    }
  };
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    startDate: selectStartDateNative(state),
    endDate: selectEndDateNative(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DateRangePicker);
