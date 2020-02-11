import React, { FunctionComponent } from 'react';
import styles from './search-form.css';
import DateRangePicker from '../date-range-picker/date-range-picker';
import SearchButton from '../search-button/search-button';

/**
 * The main view component for the Search page
 * @return {ReactElement}
 */
const SearchForm: FunctionComponent = () => {
  return (
    <form className={styles.searchForm}>
      <DateRangePicker />
      <SearchButton />
    </form>
  );
};

export default SearchForm;
