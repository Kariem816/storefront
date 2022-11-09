import client from '../database';
import { Product } from '../data/types';

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async userIndex(userId: string): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE user_id=($1)';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async showCategory(category: string): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE lower(category) LIKE $1';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        '%' + category.toLowerCase() + '%',
      ]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find category ${category}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category, user_id) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        p.name,
        p.price,
        p.category || '',
        p.user_id,
      ]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
