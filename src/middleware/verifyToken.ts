import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, NextFunction } from 'express';
import { apiReq } from '../data/types';
import { UserStore } from '../models/users';

dotenv.config();

const store = new UserStore();

export async function verifyAuthToken(
  req: apiReq,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      if (token) {
        const decodedToken = jwt.verify(
          token,
          process.env.TOKEN_SECRET as string
        );
        if (decodedToken) {
          const user = await store.show(decodedToken.id);
          if (user) {
            req.user = decodedToken;
            next();
          } else {
            res.status(401).json({ err: 'Invalid Token' });
          }
        } else {
          res.status(401).json({ err: 'Invalid Token' });
        }
      } else {
        res.status(401).json({ err: 'Invalid Token' });
      }
    } else {
      res.status(401).json({ err: 'missing Authorization' });
    }
  } catch (error) {
    res.status(400).json({ err: error.msg });
  }
}
