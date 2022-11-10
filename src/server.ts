import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import usersRouter from './routers/users';
import ordersRouter from './routers/orders';
import productsRouter from './routers/products';
import dashboardRouter from './routers/dashboard';

const app: express.Application = express();
const port = 3000;
const address = `localhost:${port}`;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.json({ msg: "You shouldn't be here!" });
});

app.use('/', dashboardRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);

app.get('/*', (_req: Request, res: Response) => {
  res.status(404).json({ err: 'Not Found' });
});

app.listen(3000, () => {
  console.log(`starting app on: http://${address}`);
});

export default app;
