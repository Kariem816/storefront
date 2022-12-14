import { Response, NextFunction } from 'express';
import { apiReq } from '../data/types';
import { ProductStore } from '../models/products';

const store = new ProductStore();

export async function verifyProductOwner(
  req: apiReq,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const products = await store.userIndex(req.user.id);
    req.allowed = products.some(
      (product) => product.id === parseInt(req.params.id)
    );

    next();
  } catch (error) {
    res.status(400).json({ err: error.msg });
  }
}
