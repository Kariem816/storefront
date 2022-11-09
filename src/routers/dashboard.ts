import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboardRouter = express.Router();
const dashboard = new DashboardQueries();

dashboardRouter.get('/products_in_orders', async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
});

dashboardRouter.get('/users_with_orders', async (_req: Request, res: Response) => {
  const users = await dashboard.usersWithOrders();
  res.json(users);
});

dashboardRouter.get('/most_expensive_products', async (_req: Request, res: Response) => {
  const products = await dashboard.mostExpensiveProducts();
  res.json(products);
});

dashboardRouter.get('/cheapest_products', async (_req: Request, res: Response) => {
  const products = await dashboard.cheapestProducts();
  res.json(products);
});

dashboardRouter.get('/products/popular', async (_req: Request, res: Response) => {
  const products = await dashboard.popular();
  res.json(products);
});

export default dashboardRouter;
