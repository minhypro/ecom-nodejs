import { OK } from '@/core/success.response';
import { IRequest } from '@/interfaces/app.interface';
import { AwsServices } from '@/services/aws.service';
import { Response } from 'express';

class StorageController {
  public static Upload = async (req: IRequest, res: Response) => {
    new OK({
      message: 'Upload successfully',
      metadata: await AwsServices.uploadFile(req.file),
    }).send(res);
  };

  public static GetFileUrl = (req: IRequest, res: Response) => {
    console.log('here');
    console.log(req.params);
    new OK({
      message: 'Get file url successfully',
      metadata: AwsServices.getSignedUrl(req.params.key),
    }).send(res);
  };
}

export { StorageController };
