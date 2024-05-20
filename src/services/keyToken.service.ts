import { ICreateKeyToken, IKeyToken } from '@/interfaces';
import { keyTokenModel } from '@/models';
import { Document } from 'mongoose';

export class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }: ICreateKeyToken): Promise<IKeyToken> => {
    try {
      // Level 0
      // const token = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // });
      // return token;

      // Level xxx
      const filter = { user: userId },
        update = {
          publicKey,
          privateKey,
          refreshTokenUsed: [],
          refreshToken,
        },
        options = { upsert: true, new: true };

      const token = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options,
      );

      return token;
    } catch (error) {
      return error;
    }
  };

  static findByUserId = async (userId: string): Promise<IKeyToken> => {
    try {
      const token = await keyTokenModel.findOne({ user: userId }).lean();
      return token;
    } catch (error) {
      return error;
    }
  };

  static deleteKeyToken = async (keyId: string): Promise<IKeyToken> => {
    try {
      const token = await keyTokenModel.findByIdAndRemove(keyId).lean();
      return token;
    } catch (error) {
      return error;
    }
  };

  static findByRefreshToken = async (
    refreshToken: string,
  ): Promise<
    Document<unknown, {}, IKeyToken> &
      IKeyToken &
      Required<{
        _id: string;
      }>
  > => {
    try {
      const token = await keyTokenModel.findOne({ refreshToken });
      return token;
    } catch (error) {
      return error;
    }
  };

  static findByRefreshTokenUsed = async (
    refreshToken: string,
  ): Promise<IKeyToken> => {
    try {
      const token = await keyTokenModel
        .findOne({
          refreshTokenUsed: refreshToken,
        })
        .lean();
      return token;
    } catch (error) {
      return error;
    }
  };

  static deleteKeyByUserId = async (userId: string): Promise<IKeyToken> => {
    try {
      const token = await keyTokenModel
        .findOneAndDelete({
          user: userId,
        })
        .lean();
      return token;
    } catch (error) {
      return error;
    }
  };
}
