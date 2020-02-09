import SalesRecord from '../../../common/sales-record';

export default interface FormattedSalesRecord extends SalesRecord {
  total: number;
  shortDate: string;
  longDate: string;
}
