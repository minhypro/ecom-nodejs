import JWT, { VerifyErrors } from 'jsonwebtoken';

export const createTokenPair = (
  payload: string | object | Buffer,
  publicKey: string,
  privateKey: string,
) => {
  try {
    const accessToken = JWT.sign(payload, publicKey, {
      // algorithm: 'RS256',
      expiresIn: '2 days',
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
  } catch (error) {}
};
