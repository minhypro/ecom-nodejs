import { AuthService } from '@/services/access.service';
import { Request, Response, NextFunction } from 'express';

class AuthController {
  public static signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(`SignUp::`, req.body);

      return res.status(201).json(await AuthService.signUp(req.body));
    } catch (err) {
      next(err);
    }
  };
}

export { AuthController };
