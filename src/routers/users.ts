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
    res.status(400).json({ err: err });
  }
});

usersRouter.get(
  '/',
  verifyAuthToken,
  verifyAdmin,
  async (req: apiReq, res: Response) => {
    try {
      if (req.allowed) {
        const result = await userStore.index();
        res.json(result);
      } else {
        res.status(401).json({ err: 'Unauthorized' });
      }
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }
);

usersRouter.get('/me', verifyAuthToken, async (req: apiReq, res: Response) => {
  try {
    const result = await userStore.show(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

usersRouter.put('/me', verifyAuthToken, async (req: apiReq, res: Response) => {
  try {
    if (req.user == req.params.id) {
      const result = await userStore.update(req.user.id, {
        first_name: req.body.firstname,
        password: req.body.password,
      });
      res.json(result);
    } else {
      res
        .status(401)
        .json({ err: 'You do not have access to modify this data' });
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

usersRouter.delete(
  '/me',
  verifyAuthToken,
  async (req: apiReq, res: Response) => {
    try {
      await userStore.delete(req.user.id);
      res.json({ msg: 'User deleted' });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }
);

usersRouter.post('/login', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    console.log("\n")
    const result = await userStore.authenticate(
      req.body.username,
      req.body.password
    );
    if (result) {
      const token = jwt.sign({ ...result }, process.env.TOKEN_SECRET);
      res.json(token);
      return;
    } else {
      res.status(401).json({ err: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

export default usersRouter;
