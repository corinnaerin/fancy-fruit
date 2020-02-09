import { Message } from './message';
import SalesRecord from '../../../common/sales-record';

export type View = 'Search' | 'ReportSale';

/**
 * The redux state for the application
 */
export default interface ApplicationState {
  /**
   * Whether an API request is currently in progress
   */
  isFetching: boolean;

  /**
   * An application-wide message to be displayed at the top of the page
   */
  message?: Message;

  /**
   * The current view
   */
  view: View;

  /**
   * The current search results
   */
  sales: SalesRecord[];
}
