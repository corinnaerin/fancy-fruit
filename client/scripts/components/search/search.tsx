import * as React from 'react';
import SalesResults from '../sales-results/sales-results';

/**
 * The main view component for the Search page
 * @return {ReactElement}
 */
const Search: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <h1>Search Page</h1>
      <SalesResults />
    </React.Fragment>
  );
};

export default Search;
