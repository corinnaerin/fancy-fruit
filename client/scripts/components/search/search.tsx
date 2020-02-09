import React, { FunctionComponent, ReactElement } from 'react';
import SalesResults from '../sales-results/sales-results';
import SearchForm from '../search-form/search-form';
import styles from './search.css';

/**
 * The main view component for the Search page
 * @return {ReactElement}
 */
const Search: FunctionComponent = (): ReactElement => {
  return (
    <React.Fragment>
      <header className={styles.searchHeader}>
        <h1>Fancy Fruits: Sales Results</h1>
        <SearchForm />
      </header>
      <SalesResults />
    </React.Fragment>
  );
};

export default Search;
