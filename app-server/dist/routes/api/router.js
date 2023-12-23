"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controllers
const ControllerAuth_1 = __importDefault(require("../../controllers/api/ControllerAuth"));
const ControllerCars_1 = __importDefault(require("../../controllers/api/ControllerCars"));
// middlewares
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
// services
const ServiceCars_1 = __importDefault(require("../../services/ServiceCars"));
const ServiceAuth_1 = __importDefault(require("../../services/ServiceAuth"));
// repositories
const RepoCars_1 = __importDefault(require("../../repositories/RepoCars"));
const RepoUsers_1 = __importDefault(require("../../repositories/RepoUsers"));
const router = (0, express_1.Router)();
const middlewareAuth = new Auth_1.default();
// Auth
const repoUser = new RepoUsers_1.default();
const serviceAuth = new ServiceAuth_1.default(repoUser);
const controllerAuth = new ControllerAuth_1.default(serviceAuth);
// Cars
const repoCars = new RepoCars_1.default();
const serviceCars = new ServiceCars_1.default(repoCars);
const controllerCar = new ControllerCars_1.default(serviceCars);
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
router.post('/auth/register-admin', middlewareAuth.authorizeSuperAdmin, controllerAuth.registerAdmin());
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
exports.default = router;
