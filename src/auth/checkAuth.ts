import { Request, Response, NextFunction } from 'express';

const HEADER = {
  API_KEY: 'x- api-key',
  AUTHORIZATION: 'authorization',
};

const getApiKey = async (req: Request, res: Response, next: NextFunction) => {};
