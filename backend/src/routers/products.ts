import express from 'express'
import { apiReq } from '../data/types'
import { verifyProductOwner } from '../middleware/verifyProductOwner'
import { verifyAuthToken } from '../middleware/verifyToken'
import { ProductStore } from '../models/products'

const productsRouter = express.Router()
const store = new ProductStore()

productsRouter.get('/', async (req, res) => {
    const products = await store.index()
    res.json(products)
})

productsRouter.get('/:id', async (req, res) => {
    const product = {
        id: req.params.id
    }
    const result = await store.show(product.id)
    res.json(result ? result : { msg: 'Product not found' })
})

productsRouter.post('/add', verifyAuthToken, async (req: apiReq, res) => {
    const product = {
        user_id: req.user.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }
    const result = await store.create(product)
    res.json(result)
})

productsRouter.delete('/delete/:id', verifyAuthToken, verifyProductOwner, async (req: apiReq, res) => {
    if (req.allowed) {
        const product = {
            id: req.params.id
        }
        await store.delete(product.id)
        res.json({ msg: 'Product deleted' })
    } else {
        res.status(401).json({ msg: 'You don\'t have access to modify this product or product does not exist' })
    }
})

productsRouter.get("/popular", (req, res) => {
    // Popular Function
})

productsRouter.get("/category/:category", async (req, res) => {
    const category = req.params.category
    let result
    if (category === ":category")
        result = await store.index()
    else
        result = await store.showCategory(req.params.category)
    if (result.length > 0) {
        res.json(result)
    } else {
        res.json({ msg: 'No Products were found in this category' })
    }
})

export default productsRouter