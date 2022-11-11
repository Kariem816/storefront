import { OrderStore } from '../orders';

const store = new OrderStore();

describe('Order Model Tests', () => {
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

  it('should have an addProduct method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('should have a removeProduct method', () => {
    expect(store.removeProduct).toBeDefined();
  });

  it('should have a complete method', () => {
    expect(store.complete).toBeDefined();
  });

  it('create method should add a order', async () => {
    const result = await store.create({
      user_id: 1,
    });
    expect(result.user_id).toEqual(1);
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index(1);
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        is_completed: false,
      },
    ]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      is_completed: false,
    });
  });

  it('addProduct method should add a product to the order', async () => {
    const result = await store.addProduct({ id: 1 }, { id: 1, quantity: 1 });
    expect(result).toEqual({
      order_id: 1,
      product_id: 1,
      quantity: 1,
    });
  });

  it('removeProduct method should remove a product from the order', async () => {
    const result = await store.removeProduct({ id: 1 }, { id: 1 });
    expect(result).toEqual({
      order_id: 1,
      product_id: 1,
      quantity: 1,
    });
  });

  it('complete method should mark the order as completed', async () => {
    const result = await store.complete({ id: 1 });
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      is_completed: true,
    });
  });

  it('delete method should remove the order', async () => {
    await store.delete(1);
    const result = await store.index(1);
    expect(result).toEqual([]);
  });
});
