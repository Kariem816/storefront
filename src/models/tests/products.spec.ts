import { ProductStore } from '../products';

const store = new ProductStore();

describe('Product Model Tests', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'Test Product',
      price: 10,
      category: 'Test',
      user_id: 1,
    });
    expect(result.name).toEqual('Test Product');
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(1);
    expect(result.name).toEqual('Test Product');
  });

  it('delete method should remove the product', async () => {
    const result = await store.delete(2);
    expect(result).toEqual({
      id: 2,
      name: 'Test Product 2',
      price: 20,
      category: 'Test',
      user_id: 1,
    });
  });
});
