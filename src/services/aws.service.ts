import config from '@/config';
import { MINUTE } from '@/constants';
import multer from 'multer';
import AWS from 'aws-sdk';
import S3, { ManagedUpload } from 'aws-sdk/clients/s3';
import { BadRequestError } from '@/core/error.response';

const _upload = multer({
  storage: multer.memoryStorage(),
});

AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

const s3 = new S3();

export class AwsServices {
  static getSignedUrl = (key: string, expiration: number = 5 * MINUTE) => {
    const params = {
      Bucket: config.aws.bucket!,
      Key: key,
      Expires: expiration, // URL expiration time in seconds (e.g., 5 minutes)
    };

    try {
      const url = s3.getSignedUrl('getObject', params);
      return { url };
    } catch (error) {
      throw new BadRequestError();
    }
  };

  static uploadFile = async (file: Express.Multer.File) => {
    if (!file) {
      throw new BadRequestError('No file uploaded.');
    }

    const params = {
      Bucket: config.aws.bucket,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'private', // Set the file to private
    };

    try {
      const data: ManagedUpload.SendData = await s3.upload(params).promise();
      return { key: data.Key };
    } catch (error) {
      throw new BadRequestError(error);
    }
  };
}
