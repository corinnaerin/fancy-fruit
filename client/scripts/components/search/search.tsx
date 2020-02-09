import React, { FunctionComponent, ReactElement } from 'react';
import SalesResults from '../sales-results/sales-results';
import SearchForm from '../search-form/search-form';

/**
 * The main view component for the Search page
 * @return {ReactElement}
 */
const Search: FunctionComponent = (): ReactElement => {
  return (
    <React.Fragment>
      <h1>Search Page</h1>
      <SearchForm />
      <SalesResults />
    </React.Fragment>
  );
};

export default Search;
