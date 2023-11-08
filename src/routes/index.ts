import express from 'express';
import { accessRouter } from './auth';
const router = express.Router();

// Check apiKey

// Check permission


router.use('/v1/api', accessRouter);

export { router };
