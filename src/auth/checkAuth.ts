import { IApiKey } from '@/interfaces';
import { ApiKeyService } from '@/services/apiKey.service';
import { Request, Response, NextFunction } from 'express';

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};

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
  } catch (error) {}
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

export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
