import 'dotenv/config';
import request from 'supertest';
import app from '../src/index';

describe('Dashboard', () => {
  it('should return 200 with category property and correct properties', async () => {
    const res = await request(app).get('/dashboard');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('categories');
    expect(res.body).toHaveProperty('featuredPlaylists');

    const category = res.body.categories[0];
    const { featuredPlaylists } = res.body;

    expect(featuredPlaylists).toHaveLength(5);

    expect(category).toEqual({
      __v: 0,
      _id: expect.any(String),
      category: expect.any(String),
      description: expect.any(String),
      imgSource: expect.any(String),
      title: expect.any(String),
    });
  });
});
