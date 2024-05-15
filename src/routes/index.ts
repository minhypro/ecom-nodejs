import express from 'express';
import { accessRouter } from './access';
import { checkApiKey, checkPermission } from '@/auth/checkAuth';
import { PermissionEnum } from '@/enums/permission.enum';
const router = express.Router();

// Check apiKey
router.use(checkApiKey);
// Check permission
router.use(checkPermission(PermissionEnum.READ));

router.use('/v1/api', accessRouter);

export { router };
