import { createTokenPair } from '@/auth/authUtils';
import { RoleEnum } from '@/enums/auth.enum';
import { shopModel } from '@/models/shop.model';
import { pickData } from '@/utils';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { KeyTokenService } from './keyToken.service';

export class AuthService {
  static signUp = async ({ name, email, password }) => {
    try {
      const shopHolder = await shopModel.findOne({ email }).lean();
      if (shopHolder) {
        return {
          code: 'xxx',
          message: 'Shop already registered!',
        };
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: hashedPassword,
        roles: RoleEnum.SHOP,
      });

      if (newShop) {
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

        const storedKeyToken = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        if (!storedKeyToken) {
          return {
            code: 'xxxx',
            massage: 'Store key token error',
          };
        }
        // Create token pair
        const tokens = createTokenPair(
          { userId: newShop._id, email },
          storedKeyToken.publicKey,
          storedKeyToken.privateKey,
        );
        console.log('Created Token successfully', tokens);

        return {
          code: 201,
          metadata: {
            shop: pickData({ fields: ['_id', 'email', 'name'], object: newShop }),
            tokens,
          },
        };
        // const token = await
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error',
      };
    }
  };
}
