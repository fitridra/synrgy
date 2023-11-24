import { Request, Response,NextFunction } from 'express';
import ServiceAuth from '../../services/ServiceAuth';

class ControllerAuth {
  private _serviceAuth: ServiceAuth;

  constructor(serviceAuth: ServiceAuth) {
    this._serviceAuth = serviceAuth;
  }

  login() {
    const auth = this._serviceAuth;
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await auth.login({
          username: req.body.username,
          password: req.body.password,
        });
        res.status(200).json({
          data: response,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  registerAdmin() {
    const auth = this._serviceAuth;
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await auth.register({
          email: req.body.email,
          password: req.body.password,
          role: 'admin',
          username: req.body.username,
        });
        return res.status(201).json({
          data: response,
        });
      } catch (error) {
        next(error);
      }
    };
  }
}

export default ControllerAuth;
