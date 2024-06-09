import { HEADER } from '@/constants/header.keys.const';
import { IApiKey } from '@/interfaces';
import { ApiKeyService } from '@/services/apiKey.service';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  apiKey: IApiKey;
}

export const checkApiKey = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();

    const apiKey = await ApiKeyService.findById(key);

    if (!apiKey) {
      return res.status(403).json({
        message: 'Forbidden Error',
      });
    }

    req.apiKey = apiKey;
    return next();
  } catch (error) {
    /* TODO: Log error */
  }
};

export const checkPermission = (permission: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const { apiKey } = req;

    if (!apiKey.permissions.includes(permission)) {
      return res.status(403).json({
        message: 'Forbidden Error',
      });
    }

    return next();
  };
};
