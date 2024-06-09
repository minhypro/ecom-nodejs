import { authentication } from '@/auth/authUtils';
import { AccessController } from '@/controllers';
import { asyncHandler } from '@/helpers/asyncHandler';
import express from 'express';

import { StorageController } from '@/controllers/storage.controller';

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

// Upload file
accessRouter.post('/upload', asyncHandler(StorageController.Upload));
accessRouter.get('/get-file/:key', asyncHandler(StorageController.GetFileUrl));
// accessRouter.post(
//   '/upload',
//   upload.single('file'),
//   async (req: Request, res: Response, next: NextFunction) => {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     const params = {
//       Bucket: config.aws.bucket,
//       Key: `${Date.now()}-${req.file.originalname}`,
//       Body: req.file.buffer,
//       ContentType: req.file.mimetype,
//       ACL: 'private', // Set the file to private
//     };

//     try {
//       const data: ManagedUpload.SendData = await s3.upload(params).promise();
//       res.json({ key: data.Key });
//     } catch (error) {
//       next(error);
//     }
//   },
// );

// accessRouter.post('/add-listen-item', (req: Request, res: Response) => {
//   const { key } = req.params;
//   const params = {
//     Bucket: config.aws.bucket!,
//     Key: key,
//     Expires: 60 * 5, // URL expiration time in seconds (e.g., 5 minutes)
//   };

//   try {
//     const url = s3.getSignedUrl('getObject', params);
//     res.json({ url });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

export { accessRouter };
