import { apiRes, Order, OrderProduct, User } from '../data/types';
import client from '../database';
import { Product } from '../data/types';

export class OrderStore {
  async index(userId: User['id']): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async indexCompleted(userId: User['id']): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT * FROM orders WHERE user_id=($1) AND is_completed=($2)';
      const result = await conn.query(sql, [userId, true]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get completed orders. Error: ${err}`);
    }
  }

  async show(id: Order['id']): Promise<Order> {
    try {
      const conn = await client.connect();
      let sql = 'SELECT * FROM orders WHERE id=($1)';
      let result = await conn.query(sql, [id]);
      conn.release();
      const order = result.rows[0];

      sql = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
      result = await conn.query(sql, [id])
      order.products = result.rows

      return order;
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [o.user_id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async addProduct(o: Order, p: Product): Promise<OrderProduct | apiRes> {
    const product = await this.show(o.id);

    if (product.is_completed) {
      return { msg: 'Order has already been completed' };
    }

    const order = await this.getQuantity(o, p);
    const oldQuantity = order ? order.quantity : 0;

    try {
      if (oldQuantity) {
        const sql =
          'UPDATE order_products SET quantity = $1 WHERE order_id=($2) AND product_id=($3) RETURNING *';
        const conn = await client.connect();
        const result = await conn.query(sql, [p.quantity, o.id, p.id]);
        const order = result.rows[0];
        conn.release();
        return order;
      } else {
        const sql =
          'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
        const conn = await client.connect();
        const result = await conn.query(sql, [o.id, p.id, p.quantity]);
        const order = result.rows[0];
        conn.release();
        return order;
      }
    } catch (err) {
      throw new Error(
        `Could not add/update product to order ${o.id}. Error: ${err}`
      );
    }
  }

  async getQuantity(o: Order, p: Product): Promise<Product> {
    try {
      const sql =
        'SELECT quantity FROM order_products WHERE order_id=($1) AND product_id=($2)';
      const conn = await client.connect();
      const result = await conn.query(sql, [o.id, p.id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not get quantity for order ${o.id}. Error: ${err}`
      );
    }
  }

  async removeProduct(o: Order, p: Product): Promise<OrderProduct> {
    try {
      const sql =
        'DELETE FROM order_products WHERE order_id=($1) AND product_id=($2) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [o.id, p.id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not remove product from order ${o.id}. Error: ${err}`
      );
    }
  }

  async complete(o: Order): Promise<Order> {
    try {
      const sql =
        'UPDATE orders SET is_completed=($1) WHERE id=($2) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [true, o.id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not complete order ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: Order['id']): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
