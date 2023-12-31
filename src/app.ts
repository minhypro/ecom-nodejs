import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { instanceMongodb } from './dbs/init.mongodb';
import { router } from './routes';
// import dotenv from 'dotenv'

// dotenv.config()

const app = express();

// Init middlewares
app.use(morgan('dev')); //Logging requests
app.use(helmet()); //Modify headers, hiding server info
app.use(compression()); //Compress data
app.use(express.json()); //Parse body to JSON
app.use(express.urlencoded({ extended: true }));

// Init DB
instanceMongodb;

// Init routers
app.use(router);

// Handling errors

export default app;
