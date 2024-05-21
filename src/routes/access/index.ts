import { authentication } from '@/auth/authUtils';
import { AccessController } from '@/controllers';
import { asyncHandler } from '@/helpers/asyncHandler';
import express from 'express';
const accessRouter = express.Router();

accessRouter.post('/signup', asyncHandler(AccessController.signUp));
accessRouter.post('/login', asyncHandler(AccessController.login));
accessRouter.post(
  '/handleRefreshToken',
  asyncHandler(AccessController.handleRefreshToken),
);

// Authentication
accessRouter.use(authentication);

accessRouter.post('/logout', asyncHandler(AccessController.logout));

accessRouter.post('/check', asyncHandler(AccessController.checkStatus));

export { accessRouter };
