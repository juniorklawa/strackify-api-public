import 'dotenv/config';
import request from 'supertest';
import app from '../src/index';

describe('Playlists routes', () => {
  describe('Get all playlists', () => {
    it('should return 200 with category property and correct properties', async () => {
      const res = await request(app).get('/playlists');
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(expect.any(Array));
    });
  });
});
