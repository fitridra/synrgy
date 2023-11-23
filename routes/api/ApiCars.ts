import { Router } from 'express';
import ControllerCars from '../../controllers/api/ControllerCars';
import Auth from '../../middlewares/Auth';

class ApiCars {
  private router: Router;

  constructor() {
    this.router = Router();

  }
  routes() {
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
    this.router.get('/', Auth.authorize, ControllerCars.list);

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
    this.router.get('/:id', Auth.authorize, ControllerCars.show);

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
    this.router.post('/', Auth.authorize, ControllerCars.create);

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
    this.router.put('/:id', Auth.authorize, ControllerCars.update);

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
    this.router.delete('/:id', Auth.authorize, ControllerCars.remove);

    return this.router;
  }
}

export default new ApiCars();
