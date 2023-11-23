import { Request, Response, NextFunction } from 'express';
// import ServiceAuth from '../services/ServiceAuth';
import jwt from 'jsonwebtoken';
import { IUsers } from '../models/Users';
class Auth {
  constructor() {}
  authorize(req: Request, res: Response, next: NextFunction) {
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

    const userData = jwt.verify(`${token}`, 'RENTAL_BOOK_JWT_KEY') as IUsers;
    console.log('userData > ', userData);

    if (!(userData.role === 'superadmin')) {
      return res.status(403).json({
        data: 'not authorized, only superadmin role',
      });
    }

    next();

    // const bearerToken = `${headers.authorization}`.split('Bearer');
    // const token = bearerToken[1];
    // const userData = await ServiceAuth.validateToken(token);
    // const isSuperAdmin = ServiceAuth.validateRole(userData, 'superadmin');

    // if (!isSuperAdmin) {
    //   return res.status(403).json({
    //     data: 'not authorized',
    //   });
    // }

    // req.user = userData;
  }
}

export default new Auth();
