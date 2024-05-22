import { authentication } from '@/auth/authUtils';
import { AccessController } from '@/controllers';
import { asyncHandler } from '@/helpers/asyncHandler';
import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import config from '@config';

const accessRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

const s3 = new S3();

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

accessRouter.post(
  '/upload',
  upload.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const params = {
      Bucket: config.aws.bucket,
      Key: `${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'private', // Set the file to private
    };

    try {
      const data: ManagedUpload.SendData = await s3.upload(params).promise();
      res.json({ key: data.Key });
    } catch (error) {
      next(error);
    }
  },
);

export { accessRouter };
