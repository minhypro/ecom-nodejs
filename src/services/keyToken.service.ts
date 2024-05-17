import { ICreateKeyToken, IKeyToken } from '@/interfaces';
import { keyTokenModel } from '@/models';

export class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
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
      const filter = { user: userId };

      // TODO Implement newKeyToken logic
      const token = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options,
      );
    } catch (error) {
      return error;
    }
  };
}
