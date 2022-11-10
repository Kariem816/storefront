import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Dashboard Router - Endpoints Tests', () => {
  describe('GET /products_in_orders', () => {
    it('should return 200 status code', async () => {
      const response = await request.get('/products_in_orders');
      expect(response.status).toBe(200);
    });
    it('should return an array of products', async () => {
      const response = await request.get('/products_in_orders');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /users_with_orders', () => {
    it('should return 200 status code', async () => {
      const response = await request.get('/users_with_orders');
      expect(response.status).toBe(200);
    });
    it('should return an array of users', async () => {
      const response = await request.get('/users_with_orders');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /most_expensive_products', () => {
    it('should return 200 status code', async () => {
      const response = await request.get('/most_expensive_products');
      expect(response.status).toBe(200);
    });
    it('should return an array of products', async () => {
      const response = await request.get('/most_expensive_products');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /cheapest_products', () => {
    it('should return 200 status code', async () => {
      const response = await request.get('/cheapest_products');
      expect(response.status).toBe(200);
    });
    it('should return an array of products', async () => {
      const response = await request.get('/cheapest_products');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /products/popular', () => {
    it('should return 200 status code', async () => {
      const response = await request.get('/products/popular');
      expect(response.status).toBe(200);
    });
    it('should return an array of products', async () => {
      const response = await request.get('/products/popular');
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
