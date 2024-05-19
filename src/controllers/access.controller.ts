import { CREATED, OK } from '@/core/success.response';
import { IRequest } from '@/interfaces/app.interface';
import { AuthService } from '@/services/access.service';
import { Request, Response, NextFunction } from 'express';

class AccessController {
  public static signUp = async (req: Request, res: Response) => {
    new CREATED({
      message: 'User created successfully',
      metadata: await AuthService.signUp(req.body),
    }).send(res);
  };

  public static login = async (req: Request, res: Response) => {
    new OK({
      message: 'Login successfully',
      metadata: await AuthService.login(req.body),
    }).send(res);
  };

  public static logout = async (req: IRequest, res: Response) => {
    new OK({
      message: 'Logout successfully',
      metadata: await AuthService.logout(req.keyStore),
    }).send(res);
  };
}

export { AccessController };
