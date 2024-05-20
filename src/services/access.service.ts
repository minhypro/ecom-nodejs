import { createTokenPair, verifyJWT } from '@/auth/authUtils';
import { RoleEnum } from '@/enums/auth.enum';
import { accountModel } from '@/models/account.model';
import { pickData } from '@/utils';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { KeyTokenService } from './keyToken.service';
import { AuthorizeFailed, BadRequestError } from '@/core/error.response';
import { AccountService } from './account.service';
import { ApiKeyService } from './apiKey.service';
import { IKeyToken } from '@/interfaces';
import dayjs from 'dayjs';

export class AuthService {
  static checkStatus = async (keyStore: IKeyToken) => {
    const isExpired = keyStore.expiredAt < new Date();
    return {
      status: isExpired ? 'expired' : 'good',
    };
  };

  static handleRefreshToken = async (refreshToken: string) => {
    const foundToken =
      await KeyTokenService.findByRefreshTokenUsed(refreshToken);

    if (foundToken) {
      const { userId, email } = verifyJWT(refreshToken, foundToken.privateKey);
      console.log({ userId, email });

      await KeyTokenService.deleteKeyByUserId(userId);
      throw new AuthorizeFailed('Token has been used');
    }

    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!holderToken) throw new AuthorizeFailed('Token not found');

    const { userId, email } = verifyJWT(refreshToken, holderToken.privateKey);
    console.log('[2]---', { userId, email });

    const foundAccount = await AccountService.findByEmail({ email });
    if (!foundAccount) throw new AuthorizeFailed('Account not found');

    const tokens = createTokenPair(
      { userId, email },
      holderToken.publicKey,
      holderToken.privateKey,
    );

    await holderToken.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
        expiredAt: dayjs().add(1, 'minute').toDate(),
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });

    return {
      user: { userId, email },
      tokens,
    };
  };

  static logout = async (keyStore: IKeyToken) => {
    await KeyTokenService.deleteKeyToken(keyStore._id);
    return {
      logout: true,
    };
  };

  static login = async ({ email, password }) => {
    const foundAccount = await AccountService.findByEmail({ email });
    if (!foundAccount) throw new AuthorizeFailed('Account not found');

    const match = bcrypt.compareSync(password, foundAccount.password);
    if (!match) throw new AuthorizeFailed('Wrong password');

    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');

    const tokens = createTokenPair(
      { userId: foundAccount._id, email },
      publicKey,
      privateKey,
    );

    await KeyTokenService.createKeyToken({
      userId: foundAccount._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      account: pickData({
        fields: ['_id', 'email', 'name'],
        object: foundAccount,
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    const accountHolder = await accountModel.findOne({ email }).lean();
    if (accountHolder) {
      throw new BadRequestError('Account already exists');
    }

    ApiKeyService.generate();

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAccount = await accountModel.create({
      name,
      email,
      password: hashedPassword,
      roles: RoleEnum.SHOP,
    });

    if (newAccount) {
      // Not use this version because it's cost too much time to generate key pair
      // Create privateKey (use to sign token), publicKey (use to verify token)

      // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      //   modulusLength: 2048,
      //   publicKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem',
      //   },
      //   privateKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem',
      //   },
      // });

      const privateKey = crypto.randomBytes(64).toString('hex');
      const publicKey = crypto.randomBytes(64).toString('hex');

      const tokens = createTokenPair(
        { userId: newAccount._id, email },
        publicKey,
        privateKey,
      );

      const storedKeyToken = await KeyTokenService.createKeyToken({
        userId: newAccount._id,
        publicKey,
        privateKey,
        refreshToken: tokens.refreshToken,
      });

      if (!storedKeyToken) {
        return {
          code: 'xxxx',
          massage: 'Store key token error',
        };
      }

      return {
        account: pickData({
          fields: ['_id', 'email', 'name'],
          object: newAccount,
        }),
        tokens,
      };
      // const token = await
    }
    return {
      code: 200,
      metadata: null,
    };
  };
}
