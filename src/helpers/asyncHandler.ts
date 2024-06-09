import { IRequest } from '@/interfaces/app.interface';
import { Response, NextFunction } from 'express';

export const asyncHandler =
  (fn: (req: IRequest, res: Response, next: NextFunction) => void) =>
  (req: IRequest, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
