import { AuthService } from '@/services/access.service';
import { Request, Response, NextFunction } from 'express';

class AccessController {
  public static signUp = async (req: Request, res: Response) => {
    return res.status(201).json(await AuthService.signUp(req.body));
  };
}

export { AccessController };
