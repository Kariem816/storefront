import express, { Response } from 'express';
import { apiReq } from '../data/types';
import { verifyOrderOwner } from '../middleware/verifyOrderOwner';
import { verifyAuthToken } from '../middleware/verifyToken';
import { OrderStore } from '../models/orders';

const ordersRouter = express.Router();
const store = new OrderStore();

ordersRouter.get('/', verifyAuthToken, async (req: apiReq, res: Response) => {
  const orders = await store.index(req.user.id);
  res.json(orders);
});

ordersRouter.get(
  '/complete',
  verifyAuthToken,
  async (req: apiReq, res: Response) => {
    const orders = await store.indexCompleted(req.user.id);
    res.json(orders);
  }
);

ordersRouter.post('/', verifyAuthToken, async (req: apiReq, res: Response) => {
  const order = {
    user_id: req.user.id,
  };
  const result = await store.create(order);
  res.json({
    msg: 'Order created',
    data: result,
  });
});

ordersRouter.get(
  '/:id',
  verifyAuthToken,
  verifyOrderOwner,
  async (req: apiReq, res: Response) => {
    if (req.allowed) {
      const order = {
        id: parseInt(req.params.id),
      };
      const result = await store.show(order.id);
      return res.json(result);
    }
    res.status(401).json({ err: 'You do not have access to this data' });
  }
);

ordersRouter.post(
  '/:id/products',
  verifyAuthToken,
  verifyOrderOwner,
  async (req: apiReq, res: Response) => {
    if (req.allowed) {
      const order = {
        id: parseInt(req.params.id),
      };
      const product = {
        id: parseInt(req.body.product_id),
        quantity: req.body.quantity,
      };
      const result = await store.addProduct(order, product);
      res.json({
        msg: 'Product added to order',
        data: result,
      });
    } else {
      res
        .status(401)
        .json({ msg: 'You do not have access to modify this order' });
    }
  }
);

ordersRouter.delete(
  '/:id',
  verifyAuthToken,
  verifyOrderOwner,
  async (req: apiReq, res: Response) => {
    if (req.allowed) {
      const order = {
        id: parseInt(req.params.id),
      };
      await store.delete(order.id);
      return res.json({ msg: 'Order deleted' });
    }
    res.status(401).json({
      err: 'You do not have access to this data or this order does not exist',
    });
  }
);

ordersRouter.delete(
  '/:id/products',
  verifyAuthToken,
  verifyOrderOwner,
  async (req: apiReq, res: Response) => {
    const order = {
      id: parseInt(req.params.id),
    };
    const product = {
      id: parseInt(req.body.product_id),
    };
    if (req.allowed) {
      const result = await store.removeProduct(order, product);
      return res.json({
        msg: 'Product removed from order',
        data: result,
      });
    }
    res.status(401).json({ err: 'You do not have access to this data' });
  }
);

export default ordersRouter;
