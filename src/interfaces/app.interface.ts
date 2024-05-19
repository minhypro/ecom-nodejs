import { Request } from 'express';
import { IKeyToken } from './keyToken.interface';

export interface IRequest extends Request {
  keyStore: IKeyToken;
}
