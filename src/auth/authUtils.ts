import { asyncHandler } from '@/helpers/asyncHandler';
import JWT, { VerifyErrors } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { HEADER } from '@/constants/header.keys.const';
import { AuthorizeFailed, BadRequestError } from '@/core/error.response';
import { KeyTokenService } from '@/services/keyToken.service';
import { ITokenPayload } from '@/interfaces';
import { IRequest } from '@/interfaces/app.interface';

export const createTokenPair = (
  payload: string | object | Buffer,
  publicKey: string,
  privateKey: string,
) => {
  try {
    const accessToken = JWT.sign(payload, publicKey, {
      // algorithm: 'RS256',
      expiresIn: '1h',
    });
    const refreshToken = JWT.sign(payload, privateKey, {
      // algorithm: 'RS256',
      expiresIn: '7 days',
    });

    JWT.verify(accessToken, publicKey, (err: VerifyErrors, decode: string) => {
      if (err) {
        console.error('error verify::', err);
      } else {
        console.log('decode verify::', decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    /* TODO: Log error */
  }
};

export const authentication = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.headers[HEADER.CLIENT_ID]?.toString();
    if (!userId) throw new BadRequestError('Invalid request');

    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore) throw new AuthorizeFailed('Key token not found');

    const accessToken = req.headers[HEADER.AUTHORIZATION]?.toString();
    if (!accessToken) throw new AuthorizeFailed('Token is required');

    try {
      const decodedUser = verifyJWT(
        accessToken,
        keyStore.publicKey,
      ) as ITokenPayload;

      if (userId !== decodedUser.userId)
        throw new AuthorizeFailed('Invalid token');

      req.keyStore = keyStore;
      next();
    } catch (error) {
      next(error);
    }
  },
);

export const verifyJWT = (token: string, scretKey: string) => {
  try {
    const decoded = JWT.verify(token, scretKey) as ITokenPayload;
    return decoded;
  } catch (error) {
    throw new AuthorizeFailed('Invalid token');
  }
};
