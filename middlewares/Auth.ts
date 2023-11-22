import { Request, Response, NextFunction } from 'express';
class Auth {
  constructor() {}
  authorize(req: Request, res: Response, next: NextFunction) {
    next();
  }
}

export default new Auth();
