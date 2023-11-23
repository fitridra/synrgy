import { Router } from 'express';
import ControllerAuth from '../../controllers/api/ControllerAuth';

import MiddlewareAuth from '../../middlewares/Auth';

class ApiAuth {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  routes() {
    this.router.post('/login', ControllerAuth.login);
    this.router.post(
      '/register-admin',
      MiddlewareAuth.authorizeSuperAdmin,
      ControllerAuth.registerAdmin
      // MiddlewareAuth.authorizeSuperAdmin,
      // ControllerAuth.registerAdmin
    );
    return this.router;
  }
}

export default new ApiAuth();
