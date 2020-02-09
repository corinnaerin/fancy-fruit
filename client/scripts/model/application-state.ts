import { Message } from './message';
import SalesRecord from '../../../common/sales-record';
import DateRange from '../../../common/date-range';

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

  /**
   * Search query for sales records
   */
  searchQuery: Partial<DateRange>;
}
