import { Response } from "express"
import { apiReq } from '../data/types'
import { OrderStore } from '../models/orders'

const store = new OrderStore()

export async function verifyOrderOwner(req: apiReq, res: Response, next: Function) {
    try {
        const orders = await store.index(req.user.id)
        const orderId = parseInt(req.params.id)
        req.allowed = orders.some(order => order.id === orderId)

        next()
    } catch (error) {
        res.status(400).json({ err: error.msg })
    }
}