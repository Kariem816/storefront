import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Products Router - Endpoints Tests', () => {
  let token: string;
  let productId: number;

  function setToken(tokenText: string) {
    token = tokenText;
  }

  function setProductId(id: number) {
    productId = id;
  }

  it('should create a user to utilize', async () => {
    const response = await request.post('/users/register').send({
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoee',
      password: 'password',
    });
    expect(response.body).toBeInstanceOf(String);
    setToken(response.body);
  });

  it('should create a new product', async () => {
    const response = await request
      .post('/products/add')
      .set('authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        price: 10,
        category: 'Test',
      });
    expect(response.body.name).toBe('Test Product');
    setProductId(response.body.id);
  });

  it('should create a new product - 2', async () => {
    const response = await request
      .post('/products/add')
      .set('authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product 2',
        price: 10,
        category: 'Testing',
      });
    expect(response.body.name).toBe('Test Product 2');
  });

  it('should get all products', async () => {
    const response = await request.get('/products');
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(4);
  });

  it('should get a product by id', async () => {
    const response = await request.get(`/products/${productId}`);
    expect(response.body.name).toBe('Test Product');
  });

  it('should get products in a category', async () => {
    const response = await request.get('/products/category/testing');
    expect(response.body[0].id).toBe(productId + 1);
  });

  it('should get products in a category - 2', async () => {
    const response = await request.get('/products/category/udacity');
    expect(response.body.msg).toBe('No Products were found in this category');
  });

  it('should delete a product', async () => {
    const response = await request
      .delete(`/products/delete/${productId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.body.msg).toBe('Product deleted');
  });

  it('should delete a product - 2', async () => {
    const response = await request
      .delete(`/products/delete/${productId + 1}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.body.msg).toBe('Product deleted');
  });

  it('should delete the user after finishing', async () => {
    const response = await request
      .delete('/users/me')
      .set('authorization', `Bearer ${token}`);
    expect(response.body.msg).toBe('User deleted');
  });
});
