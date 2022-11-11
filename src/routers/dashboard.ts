import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboardRouter = express.Router();
const dashboard = new DashboardQueries();

dashboardRouter.get(
  '/products_in_orders',
  async (_req: Request, res: Response) => {
    try {
      const products = await dashboard.productsInOrders();
      res.json(products);
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }
);

dashboardRouter.get(
  '/users_with_orders',
  async (_req: Request, res: Response) => {
    try {
      const users = await dashboard.usersWithOrders();
      res.json(users);
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }
);

dashboardRouter.get(
  '/most_expensive_products',
  async (_req: Request, res: Response) => {
    try {
      const products = await dashboard.mostExpensiveProducts();
      res.json(products);
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }
);

dashboardRouter.get(
  '/cheapest_products',
  async (_req: Request, res: Response) => {
    try {
      const products = await dashboard.cheapestProducts();
      res.json(products);
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }
);

dashboardRouter.get(
  '/products/popular',
  async (_req: Request, res: Response) => {
    try {
      const products = await dashboard.popular();
      res.json(products);
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }
);

export default dashboardRouter;
