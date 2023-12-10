import { Router } from 'express';

// controllers
import ControllerAuth from '../../controllers/api/ControllerAuth';
import ControllerCars from '../../controllers/api/ControllerCars';

// middlewares
import MiddlewareAuth from '../../middlewares/Auth';

// services
import ServiceCars from '../../services/ServiceCars';
import ServiceAuth from '../../services/ServiceAuth';

// repositories
import RepoCars from '../../repositories/RepoCars';
import RepoUsers from '../../repositories/RepoUsers';

const router = Router();

const middlewareAuth = new MiddlewareAuth();

// Auth
const repoUser = new RepoUsers();
const serviceAuth = new ServiceAuth(repoUser);
const controllerAuth = new ControllerAuth(serviceAuth);

// Cars
const repoCars = new RepoCars();
const serviceCars = new ServiceCars(repoCars);
const controllerCar = new ControllerCars(serviceCars);

// auth

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
     *             username: 'superadmin'
     *             password: 'admin'
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             example:
     *               token: 'jwt.token.123'
     */
router.post('/auth/login', controllerAuth.login());

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
router.post(
  '/auth/register-admin',
  middlewareAuth.authorizeSuperAdmin,
  controllerAuth.registerAdmin()
);

// cars

    /**
     * @swagger
     * /api/cars:
     *   get:
     *     summary: Mengambil daftar mobil
     *     description: Mengambil semua data mobil yang tersedia
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             example:
     *               cars: [{ id: 1, name: 'Car 1' }, { id: 2, name: 'Car 2' }]
     */
router.get('/cars', controllerCar.list());

/**
     * @swagger
     * /api/cars/{id}:
     *   get:
     *     summary: Mengambil detail mobil berdasarkan ID
     *     description: Mengambil data mobil berdasarkan ID yang diberikan
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID mobil yang akan diambil
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             example:
     *               car: { id: 1, name: 'Car 1' }
     */
router.get('/cars/:id', controllerCar.show());

/**
     * @swagger
     * /api/cars:
     *   post:
     *     summary: Menambahkan mobil baru
     *     description: Menambahkan data mobil baru
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             name: 'Car 3'
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             example:
     *               car: { id: 3, name: 'Car 3' }
     */
router.post('/cars', middlewareAuth.authorize, controllerCar.create());

/**
     * @swagger
     * /api/cars/{id}:
     *   put:
     *     summary: Mengupdate data mobil berdasarkan ID
     *     description: Mengupdate data mobil berdasarkan ID yang diberikan
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID mobil yang akan diupdate
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             name: 'Car 3'
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             example:
     *               car: { id: 3, name: 'Car 3' }
     */
router.put('/cars/:id', middlewareAuth.authorize, controllerCar.update());

/**
     * @swagger
     * /api/cars/{id}:
     *   delete:
     *     summary: Menghapus mobil berdasarkan ID
     *     description: Menghapus data mobil berdasarkan ID yang diberikan
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID mobil yang akan dihapus
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: No Content
     */
router.delete('/cars/:id', middlewareAuth.authorize, controllerCar.remove());

export default router;
