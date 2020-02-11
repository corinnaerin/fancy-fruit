import server from '../../../server/server';
import request from 'supertest';
import { expect } from 'chai';
import moment = require('moment');

const app = server.app;

/**
 * Tests general processing & error handling of the API
 */
describe('API', function() {
  describe('sales', function() {
    const today = moment();
    const aWeekAgo = moment().subtract(7, 'day');

    it('should return sales for the given date range', function() {
      return request(app)
          .get(`/api/sales?startDate=${aWeekAgo.format()}&endDate=${today.format()}`)
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.lengthOf(8);
          });
    });

    it('should return 400 for invalid date range', function() {
      return request(app)
          .get(`/api/sales?startDate=${today.format()}&endDate=${aWeekAgo.format()}`)
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /text/)
          .expect(400, /BadRequestError: Start date cannot be after end date/);
    });

    it('should return 400 for a missing start date', function() {
      return request(app)
          .get(`/api/sales?endDate=${aWeekAgo.format()}`)
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /text/)
          .expect(400, /BadRequestError: Missing start date/);
    });

    it('should return 400 for a missing end date', function() {
      return request(app)
          .get(`/api/sales?startDate=${aWeekAgo.format()}`)
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /text/)
          .expect(400, /BadRequestError: Missing end date/);
    });

    it('should return 400 for invalid date', function() {
      return request(app)
          .get(`/api/sales?startDate=01-50-2020&endDate=${aWeekAgo.format()}`)
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /text/)
          .expect(400, /BadRequestError: Invalid date provided: 01-50-2020/);
    });
  });
});
