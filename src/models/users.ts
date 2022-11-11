import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../data/types';

dotenv.config();

const { HASH_SECRET, SALT_ROUNDS } = process.env;

export class UserStore {
  async index(): Promise<User[]> {
    const conn = await client.connect();
    try {
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      conn.release();
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: User['id']): Promise<User> {
    const conn = await client.connect();
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      conn.release();
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    const hash = bcrypt.hashSync(
      u.password + HASH_SECRET,
      parseInt(SALT_ROUNDS)
    );

    const conn = await client.connect();
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      conn.release();
      throw new Error(
        `Could not add new user ${u.first_name + u.last_name}. Error: ${err}`
      );
    }
  }

  async update(id: User['id'], u: User): Promise<User> {
    const conn = await client.connect();
    const { first_name, password } = await this.show(id);
    try {
      const hash =
        bcrypt.hashSync(u?.password + HASH_SECRET, parseInt(SALT_ROUNDS)) ||
        null;
      const sql = 'UPDATE users Set name = $1 WHERE id = $3 RETURNING *';
      const result = await conn.query(sql, [
        u.first_name || first_name,
        hash || password,
        id,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      conn.release();
      throw new Error(`Could not update user ${first_name}. Error: ${err}`);
    }
  }

  async delete(id: User['id']): Promise<User> {
    const conn = await client.connect();
    try {
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING id, username';
      const result = await client.query(sql, [id]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      conn.release();
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(
    username: User['username'],
    password: User['password']
  ): Promise<User | null> {
    try {
      await client.connect();

      const sql = 'SELECT * FROM users WHERE username=($1)';
      const result = await client.query(sql, [username]);

      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + HASH_SECRET, user.password)) {
          return user;
        }
      }

      return null;
    } catch (err) {
      throw new Error(`Could not authenticate user ${username}. Error: ${err}`);
    }
  }
}
