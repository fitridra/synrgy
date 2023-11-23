import { Router } from 'express';
import ControllerAuth from '../../controllers/api/ControllerAuth';

import MiddlewareAuth from '../../middlewares/Auth';

class ApiAuth {
  private router: Router;
  constructor() {
    this.router = Router();
  }

  routes() {
    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Melakukan login
     *     description: Melakukan login dan menghasilkan token akses
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             username: 'user1'
     *             password: 'password123'
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             example:
     *               token: 'jwt.token.123'
     */
    this.router.post('/login', ControllerAuth.login);

    /**
     * @swagger
     * /api/auth/register-admin:
     *   post:
     *     summary: Registrasi admin oleh superadmin
     *     description: Melakukan registrasi admin oleh superadmin
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             username: 'admin1'
     *             password: 'password123'
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             example:
     *               message: 'Admin berhasil didaftarkan'
     */
    this.router.post(
      '/register-admin',
      MiddlewareAuth.authorizeSuperAdmin,
      ControllerAuth.registerAdmin
    );

    return this.router;
  }
}

export default new ApiAuth();
