import { createTokenPair } from '@/auth/authUtils';
import { RoleEnum } from '@/enums/auth.enum';
import { shopModel } from '@/models/shop.model';
import { pickData } from '@/utils';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { KeyTokenService } from './keyToken.service';
import { AuthorizeFailed, BadRequestError } from '@/core/error.response';
import { ShopService } from './shop.service';
import { ApiKeyService } from './apiKey.service';
import { IKeyToken } from '@/interfaces';

export class AuthService {
  static logout = async (keyStore: IKeyToken) => {
    await KeyTokenService.deleteKeyToken(keyStore._id);
    return {
      logout: true,
    };
  };

  static login = async ({ email, password }) => {
    const foundShop = await ShopService.findByEmail({ email });
    if (!foundShop) throw new AuthorizeFailed('Shop not found');

    const match = bcrypt.compareSync(password, foundShop.password);
    if (!match) throw new AuthorizeFailed('Wrong password');

    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');

    const tokens = createTokenPair(
      { userId: foundShop._id, email },
      publicKey,
      privateKey,
    );

    await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      shop: pickData({ fields: ['_id', 'email', 'name'], object: foundShop }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    const shopHolder = await shopModel.findOne({ email }).lean();
    if (shopHolder) {
      throw new BadRequestError('Shop already exists');
    }

    ApiKeyService.generate();

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: hashedPassword,
      roles: RoleEnum.SHOP,
    });

    if (newShop) {
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
        { userId: newShop._id, email },
        publicKey,
        privateKey,
      );

      const storedKeyToken = await KeyTokenService.createKeyToken({
        userId: newShop._id,
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
        shop: pickData({ fields: ['_id', 'email', 'name'], object: newShop }),
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
