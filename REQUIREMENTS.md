# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: 'products/' [GET]
- Show: 'products/:productid' [GET]
- Create [token required]: 'products/add' [post]
- Top 5 most popular products 
- Products by category (args: product category): 'products/category/:category' [GET]

#### Users
- Index [token required] [admin role required]: 'users/' [GET]
- Show [token required]: 'users/me' [GET]
- Create N[token required]: 'users/register' [POST]
- Login: 'users/login' [POST]
- Update [token required]: 'users/me' [PUT]
- Delete [token required]: 'users/me' [DELETE]

#### Orders
- Current Order by user (args: user id)[token required]: 'orders/' [GET]
- Completed Orders by user (args: user id)[token required]: 'orders/complete' [GET]

#### Dashboard
- Most Expensive Products: '/most_expensive_products' [GET]
- Cheapest Products: '/cheapest_products' [GET]


## Data Shapes
#### Product
- id: number
- name: string
- price: number
- category: string
- user_id: number

#### User
- id: number
- first_name: string
- lastName: string
- username: string
- password: string
- is_admin: boolean

#### Orders
- id: number
- id of each product in the order: number
- quantity of each product in the order: number
- user_id: number
- is_completed (order status): boolean


## Database Schema
#### Products
Table: products(
    id number,
    name string,
    price number,
    category string,
    user_id number [FK to users table]
)

#### Users
Table: users(
    id number,
    first_name string,
    last_name string,
    username string,
    password string,
    is_admin boolean
)

#### Orders
Table: orders(
    id number,
    product_id number [FK to products table],
    quantity number,
    user_id number [FK to users table],
    is_completed boolean
)

#### Order_Products
Table: order_products(
    id number,
    order_id number [FK to orders table],
    product_id number [FK to products table],
    quantity number
)