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

    /**
     * @swagger
     * /api/auth/register-member:
     *   post:
     *     summary: Registrasi member
     *     description: Melakukan registrasi member
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             username: 'user1'
     *             password: 'password123'
     *             email: 'user1@example.com'
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             example:
     *               message: 'Member berhasil didaftarkan'
     */
    this.router.post(
      '/register-member',
      MiddlewareAuth.authorize,
      ControllerAuth.registerMember
    );


    /**
     * @swagger
     * /api/auth/current-user:
     *   get:
     *     summary: Mendapatkan informasi pengguna saat ini
     *     description: Mengambil informasi pengguna saat ini berdasarkan token yang dimiliki
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             example:
     *               data:
     *                 id: 1
     *                 username: 'user1'
     *                 email: 'user1@example.com'
     *                 role: 'member'
     */
    this.router.get('/current-user', MiddlewareAuth.authorize, ControllerAuth.getCurrentUser);


    return this.router;
  }
}

export default new ApiAuth();
