import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Orders Router - Endpoints Tests', () => {
  let token: string, orderId: number, productId: number;

  function setToken(tokenText: string) {
    token = tokenText;
  }

  function setOrderId(id: number) {
    orderId = id;
  }

  function setProductId(id: number) {
    productId = id;
  }

  it('should create a user to utilize', async () => {
    const response = await request.post('/users/register').send({
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      password: 'password',
    });
    expect(response.body).toBeInstanceOf(String);
    setToken(response.body);
  });

  it('should create a product to utilize', async () => {
    const response = await request
      .post('/products/add')
      .set('authorization', `Bearer ${token}`)
      .send({
        name: 'Product',
        price: 10,
        category: 'Category',
      });
    expect(response.body.name).toBe('Product');
    setProductId(response.body.id);
  });

  it('should make a new order', async () => {
    const response = await request
      .post('/orders')
      .set('authorization', `Bearer ${token}`);
    expect(response.body.msg).toBe('Order created');
    setOrderId(response.body.data.id);
  });

  it('should get all orders of a user', async () => {
    const response = await request
      .get('/orders')
      .set('authorization', `Bearer ${token}`);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].id).toEqual(orderId);
  });

  it('should get a specific order of a user', async () => {
    const response = await request
      .get(`/orders/${orderId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('should get all completed orders of a user', async () => {
    const response = await request
      .get('/orders/complete')
      .set('authorization', `Bearer ${token}`);
    expect(response.body.length).toBe(0);
  });

  it('should add a product to an order', async () => {
    const response = await request
      .post(`/orders/${orderId}/products`)
      .send({
        product_id: productId,
        quantity: 1,
      })
      .set('authorization', `Bearer ${token}`);
    expect(response.body.msg).toBe('Product added to order');
  });

  it('should delete a product from an order', async () => {
    const response = await request
      .delete(`/orders/${orderId}/products`)
      .send({
        product_id: productId,
      })
      .set('authorization', `Bearer ${token}`);
    expect(response.body.msg).toBe('Product removed from order');
  });

  it('should delete an Order', async () => {
    const response = await request
      .delete(`/orders/${orderId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.body.msg).toBe('Order deleted');
  });

  it('should delete the product after finishing', async () => {
    const response = await request
      .delete(`/products/delete/${productId}`)
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
