# Requirements Document

API documentation for the Storefront Backend Project

## API Endpoints

1. Products

   - Index: 'products/' [GET] (returns all products)
   - Show: 'products/:productid' [GET] (returns a single product)
   - Create [token required]: 'products/add' [post] (creates a new product)
   - Top 5 most popular products [GET]: 'products/popular' (returns the top 5 most popular products)
   - Products by category (args: product category): 'products/category/:category' [GET] (returns all products in a given category)

2. Users

   - Index [token required] [admin role required]: 'users/' [GET] (returns all users info)
   - Show [token required]: 'users/me' [GET] (returns the current user info)
   - Create N[token required]: 'users/register' [POST] (creates a new user and returns a token)
   - Login: 'users/login' [POST] (logs in a user and returns a token)
   - Update [token required]: 'users/me' [PUT] (updates the current user info)
   - Delete [token required]: 'users/me' [DELETE] (deletes the current user)

3. Orders

   - Current Order by user (args: user id) [token required]: 'orders/' [GET] (returns all orders for a given user)
   - Completed Orders by user (args: user id) [token required]: 'orders/complete' [GET] (returns all completed orders for a given user)

4. Dashboard

- Most Expensive Products: '/most_expensive_products' [GET] (returns the 5 most expensive products)
- Cheapest Products: '/cheapest_products' [GET] (returns the 5 cheapest products)

## Data Shapes

1. Product

   - id: number
   - name: string
   - price: number
   - category: string
   - user_id: number

2. User

   - id: number
   - first_name: string
   - lastName: string
   - username: string
   - password: string
   - is_admin: boolean

3. Orders

   - id: number
   - id of each product in the order: number
   - quantity of each product in the order: number
   - user_id: number
   - is_completed (order status): boolean

4. Order_Products

   - id: number
   - order_id: number
   - product_id: number
   - quantity: number

## Database Schema

1. Products

   Table: products(
   id number,
   name string,
   price number,
   category string,
   user_id number [FK to users table]
   )

2. Users

   Table: users(
   id number,
   first_name string,
   last_name string,
   username string,
   password string,
   is_admin boolean
   )

3. Orders

   Table: orders(
   id number,
   product_id number [FK to products table],
   quantity number,
   user_id number [FK to users table],
   is_completed boolean
   )

4. Order_Products

   Table: order_products(
   id number,
   order_id number [FK to orders table],
   product_id number [FK to products table],
   quantity number
   )
