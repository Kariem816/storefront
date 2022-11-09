import { Request } from 'express';

export type apiReq = Request & {
  user: User;
  allowed?: boolean;
};

export type apiRes = {
  msg?: string;
  err?: string;
  status?: number;
};

export type User = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
  is_admin?: boolean;
};

export type Order = {
  id?: number;
  is_completed?: boolean;
  user_id?: number;
};

export type Product = {
  id?: number;
  name?: string;
  price?: number;
  category?: string;
  user_id?: number;
  quantity?: number;
};
