import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserStore } from '../models/users';
import { verifyAuthToken } from '../middleware/verifyToken';
import { verifyAdmin } from '../middleware/verifyAdmin';
import { apiReq, User } from '../data/types';

dotenv.config();

const usersRouter = express.Router();
const userStore = new UserStore();

usersRouter.post('/register', async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await userStore.create(user);
    const token = jwt.sign({ ...newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400).json(err + user);
  }
});

usersRouter.get(
  '/',
  verifyAuthToken,
  verifyAdmin,
  async (req: apiReq, res: Response) => {
    if (req.allowed) {
      const result = await userStore.index();
      res.json(result);
    } else {
      res.status(401).json({ err: 'Unauthorized' });
    }
  }
);

usersRouter.get('/me', verifyAuthToken, async (req: apiReq, res: Response) => {
  const result = await userStore.show(req.user.id);
  res.json(result);
});

usersRouter.put('/me', verifyAuthToken, async (req: apiReq, res: Response) => {
  if (req.user == req.params.id) {
    const result = await userStore.update(req.user.id, {
      first_name: req.body.firstname,
      password: req.body.password,
    });
    res.json(result);
  } else {
    res.status(401).json({ err: 'You do not have access to modify this data' });
  }
});

usersRouter.delete(
  '/me',
  verifyAuthToken,
  async (req: apiReq, res: Response) => {
    await userStore.delete(req.user.id);
    res.json({ msg: 'User deleted' });
  }
);

usersRouter.post('/login', async (req: Request, res: Response) => {
  const result = await userStore.authenticate(
    req.body.username,
    req.body.password
  );
  if (result) {
    const token = jwt.sign({ ...result }, process.env.TOKEN_SECRET);
    res.json(token);
    return;
  }
  res.status(400).json('bad request');
});

export default usersRouter;
