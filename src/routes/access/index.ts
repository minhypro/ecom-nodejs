import { authentication } from '@/auth/authUtils';
import { AccessController } from '@/controllers';
import { asyncHandler } from '@/helpers/asyncHandler';
import express from 'express';
const accessRouter = express.Router();

accessRouter.post('/signup', asyncHandler(AccessController.signUp));
accessRouter.post('/login', asyncHandler(AccessController.login));

// Authentication
accessRouter.use(authentication);

// Logout
accessRouter.post('/logout', asyncHandler(AccessController.logout));
accessRouter.post(
  '/handleRefreshToken',
  asyncHandler(AccessController.handleRefreshToken),
);

export { accessRouter };
