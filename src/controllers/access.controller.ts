import { CREATED } from '@/core/success.response';
import { AuthService } from '@/services/access.service';
import { Request, Response, NextFunction } from 'express';

class AccessController {
  public static signUp = async (req: Request, res: Response) => {
    new CREATED({
      message: 'User created successfully',
      metadata: await AuthService.signUp(req.body),
    }).send(res);
  };
}

export { AccessController };
