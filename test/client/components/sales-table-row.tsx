import 'mocha';
import React from 'react';
import { configure, shallow } from 'enzyme';
import { SalesTableRow } from '../../../client/scripts/components/sales-table-row/sales-table-row';
import FormattedSalesRecord from '../../../client/scripts/model/formatted-sales-record';
import Fruit from '../../../common/fruit';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let mockFruitSalesRecord: FormattedSalesRecord;

describe('<SalesTableRow />', function() {
  beforeEach(function() {
    mockFruitSalesRecord =
      {
        date: 'date1',
        shortDate: 'shortDate1',
        longDate: 'longDate1',
        totalSales: 3,
        salesByFruit: [
          {
            date: 'date1',
            label: 'Bananas',
            fruit: Fruit.BANANAS,
            quantity: 1
          },
          {
            date: 'date1',
            label: 'Apples',
            fruit: Fruit.APPLES,
            quantity: 2
          }
        ]
      };
  });

  function render() {
    return shallow(<SalesTableRow sale={mockFruitSalesRecord} />);
  }

  it('should render a cell for each fruit, the date, and total sales', function() {
    const wrapper = render();
    const cells = wrapper.find('td');
    expect(cells).to.have.lengthOf(4);
    const cellsText = cells.map((cell) => cell.text());
    expect(cellsText).to.deep.equal([ 'longDate1', '1', '2', '3' ]);
  });
});
