import { UserStore } from '../users';

const store = new UserStore();

describe('User Model Tests', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      first_name: 'Test',
      last_name: 'User',
      username: 'testuser',
      password: 'password',
    });
    expect(result.first_name).toEqual('Test');
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(2);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(2);
    expect(result.first_name).toEqual('Test');
  });

  it('delete method should remove the user', async () => {
    const result = await store.delete(2);
    expect(result).toEqual({
      id: 2,
      username: 'testuser',
    });
  });
});
