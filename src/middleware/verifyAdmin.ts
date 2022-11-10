import { Response, NextFunction } from 'express';
import { apiReq } from '../data/types';
import { UserStore } from '../models/users';

const store = new UserStore();

export async function verifyAdmin(
  req: apiReq,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await store.show(req.user.id);
    req.allowed = user.is_admin;

    next();
  } catch (error) {
    res.status(400).json({ err: error.msg });
  }
}
