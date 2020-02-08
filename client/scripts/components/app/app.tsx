import * as React from 'react';
import ApplicationMessage from '../application-message/application-message';
import Search from '../search/search';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styles from './app.css';
import RecordSale from '../record-sale/record-sale';

/**
 * The root React component
 * @return {ReactElement}
 */
const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <ApplicationMessage />
      <section className={styles.bodyContent}>
        <Router>
          <Route exact={true} path='/' component={Search} />
          <Route path='/search' component={Search} />
          <Route path='/record-sale' component={RecordSale} />
        </Router>
      </section>
    </React.Fragment>
  );
};

export default App;
