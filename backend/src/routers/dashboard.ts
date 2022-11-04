import express from 'express'
import { DashboardQueries } from "../services/dashboard";

const dashboardRouter = express.Router()
const dashboard = new DashboardQueries()

dashboardRouter.get('/products_in_orders', async (_req, res) => {
    const products = await dashboard.productsInOrders()
    res.json(products)
})

dashboardRouter.get('/users_with_orders', async (_req, res) => {
    const users = await dashboard.usersWithOrders()
    res.json(users)
})

dashboardRouter.get('/most_expensive_products', async (_req, res) => {
    const products = await dashboard.mostExpensiveProducts()
    res.json(products)
})

export default dashboardRouter