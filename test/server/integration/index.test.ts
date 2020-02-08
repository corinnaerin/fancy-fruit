import server from '../../../server/server';
import request from 'supertest';

const app = server.app;

/**
 * Tests general processing & error handling of the API
 */
describe('API', function() {
  describe('healthcheck', function() {
    it('should return a 200', function() {
      return request(app)
          .get('/api/healthcheck')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, { success: true });
    });
  });
});
