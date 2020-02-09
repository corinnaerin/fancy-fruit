import React, { FunctionComponent } from 'react';
import styles from './search-form.css';
import DateRangePicker from '../date-range-picker/date-range-picker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

/**
 * The main view component for the Search page
 * @return {ReactElement}
 */
const SearchForm: FunctionComponent = () => {
  return (
    <form className={styles.searchForm}>
      <DateRangePicker />
    </form>
  );
};

export default SearchForm;
