import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Users Router - Endpoints Tests', () => {
  let token: string;

  function setToken(tokenText: string) {
    token = tokenText;
  }

  it('should create a new user', async () => {
    const response = await request.post('/users/register').send({
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoee',
      password: 'password',
    });
    expect(response.body).toBeInstanceOf(String);
    setToken(response.body);
  });

  it('should sign in a user', async () => {
    const response = await request.post('/users/login').send({
      username: 'johndoee',
      password: 'password',
    });
    expect(response.body).toBeInstanceOf(String);
    setToken(response.body);
  });

  it('should get user info', async () => {
    const response = await request
      .get('/users/me')
      .set('authorization', `Bearer ${token}`);
    expect(response.body.username).toBe('johndoee');
  });

  it('should delete a user', async () => {
    const response = await request
      .delete('/users/me')
      .set('authorization', `Bearer ${token}`);
    expect(response.body.msg).toBe('User deleted');
  });
});
