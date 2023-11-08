import { ICreateKeyToken, IKeyToken } from '@/interfaces';
import { keyTokenModel } from '@/models';

export class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
  }: ICreateKeyToken): Promise<IKeyToken> => {
    try {
      const token = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });
      return token;
    } catch (error) {
      return error;
    }
  };
}
