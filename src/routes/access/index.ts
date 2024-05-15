import { asyncHandler } from '@/auth/checkAuth';
import { AccessController } from '@/controllers';
import express from 'express';
const accessRouter = express.Router();

accessRouter.post('/signup', asyncHandler(AccessController.signUp));

export { accessRouter };
