import { Types } from 'mongoose';

export interface IKeyToken {
  _id?: string;
  user: Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
  refreshTokenUsed: string[];
  expiredAt: Date;
}

export interface ICreateKeyToken {
  userId: Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
}

export interface ITokenPayload {
  userId: string;
  email: string;
}
