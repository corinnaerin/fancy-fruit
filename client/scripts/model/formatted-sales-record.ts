import SalesRecord from '../../../common/sales-record';

export default interface FormattedSalesRecord extends SalesRecord {
  shortDate: string;
  longDate: string;
}
