import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
  POSTGRES_TEST_DB,
} = process.env;

const config = {
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT),
};

const configTest = {
  host: POSTGRES_HOST,
  database: POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT),
};

let client;

if (ENV === 'test') {
  client = new Pool(configTest);
}

if (ENV === 'dev') {
  client = new Pool(config);
}

export default client;
