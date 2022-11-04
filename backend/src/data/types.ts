import { Request, Response } from "express";

export type apiReq = Request & {
    user: User;
    allowed?: boolean;
}

export type apiRes = {
    msg?: string;
    err?: string;
    status?: number;
}

export type User = {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
}

export type Order = {
    id?: number;
    status?: boolean;
    user_id?: number;
    product_id?: string;
}

export type Product = {
    id?: number;
    name?: string;
    price?: number;
    category?: string;
    user_id?: number;
    quantity?: number;
}
