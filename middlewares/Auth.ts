import { Request, Response, NextFunction } from 'express';
// import ServiceAuth from '../services/ServiceAuth';
import jwt from 'jsonwebtoken';
import { IUsers } from '../models/Users';
class Auth {
  constructor() {}
  authorize(_: Request, __: Response, next: NextFunction) {
    next();
  }
  async authorizeSuperAdmin(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(403).json({
        data: 'not authorized',
      });
    }

    const token = req.headers.authorization;
    console.log('token > ', token);

    const userData = jwt.verify(`${token}`, 'RENTAL_CAR_JWT_KEY') as IUsers;
    console.log('userData > ', userData);

    if (!(userData.role === 'superadmin')) {
      return res.status(403).json({
        data: 'not authorized, only superadmin role',
      });
    }

    next();
  }
}

export default new Auth();
