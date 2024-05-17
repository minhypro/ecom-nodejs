import { Types } from 'mongoose';

export interface IKeyToken {
  user: Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
  refreshTokenUsed: string[];
}

export interface ICreateKeyToken {
  userId: Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
}
