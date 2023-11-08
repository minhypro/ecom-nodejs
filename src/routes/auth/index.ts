import { AuthController } from '@/controllers';
import express from 'express';
const accessRouter = express.Router();

accessRouter.post('/signup', AuthController.signUp);

export { accessRouter };
