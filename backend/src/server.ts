import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app: express.Application = express()
const port: number = 3000
const address: string = `localhost:${port}`

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.json({ msg: "Welcome" })
})

app.listen(3000, function () {
    console.log(`starting app on: http://${address}`)
})
