import { ICreateKeyToken, IKeyToken } from '@/interfaces';
import { keyTokenModel } from '@/models';

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
}
