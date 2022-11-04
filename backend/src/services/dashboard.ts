import { Product, User } from '../data/types'
import client from '../database'

export class DashboardQueries {
    // Get all products that have been included in orders
    async productsInOrders(): Promise<Product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`unable get products and orders: ${err}`)
        }
    }

    async usersWithOrders(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT username, first_name, last_name, orders.id, status FROM users INNER JOIN orders ON users.id = orders.user_id'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`unable get users with orders: ${err}`)
        }
    }

    async mostExpensiveProducts(): Promise<Product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`unable get products and orders: ${err}`)
        }
    }
}