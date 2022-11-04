import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserStore } from '../models/users'
import { verifyAuthToken } from '../middleware/verifyToken'
import { apiReq, User } from '../data/types'

dotenv.config()

const usersRouter = express.Router()
const userStore = new UserStore()

usersRouter.post("/register", async (req, res) => {
    const user: User = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    }
    try {
        const newUser = await userStore.create(user)
        let token = jwt.sign({ ...newUser }, process.env.TOKEN_SECRET)
        res.json(token)
    } catch (err) {
        res.status(400).json(err + user)
    }
})

usersRouter.get("/all", async (_req, res) => {
    const result = await userStore.index()
    res.json(result)
})

usersRouter.get("/", verifyAuthToken, async (req: apiReq, res) => {
    const result = await userStore.show(req.user.id)
    res.json(result || { msg: "User not found" })
})

usersRouter.put("/", verifyAuthToken, async (req: apiReq, res) => {
    if (req.user == req.params.id) {
        const result = await userStore.update(req.user.id, {
            firstName: req.body.firstname,
            password: req.body.password
        })
        res.json(result)
    } else {
        res.status(401).json({ err: "You do not have access to modify this data" })
    }
})

usersRouter.delete("/:id", verifyAuthToken, async (req: apiReq, res) => {
    if (req.user == req.params.id) {
        const result = await userStore.delete(parseInt(req.params.id))
        res.json(result)
    } else {
        res.status(401).json({ err: "You do not have access to modify this data" })
    }
})

usersRouter.post("/login", async (req, res) => {
    const result = await userStore.authenticate(req.body.username, req.body.password)
    if (result) {
        let token = jwt.sign({ ...result }, process.env.TOKEN_SECRET)
        res.json(token)
        return
    }
    res.status(400).json("bad request")
})

export default usersRouter