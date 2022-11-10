import { Product, User } from '../data/types';
import client from '../database';

export class DashboardQueries {
  async productsInOrders(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  async usersWithOrders(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT username, first_name, last_name, orders.id FROM users INNER JOIN orders ON users.id = orders.user_id WHERE is_completed = false';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }

  async mostExpensiveProducts(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT id, name, price, category FROM products ORDER BY price DESC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  async cheapestProducts(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT id, name, price, category FROM products ORDER BY price ASC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  async popular(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT products.id, name, price, category FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY products.id ORDER BY SUM(quantity) DESC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get popular products: ${err}`);
    }
  }
}
