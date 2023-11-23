import { Router } from 'express';
import ControllerCars from '../../controllers/api/ControllerCars';
import Auth from '../../middlewares/Auth';

class ApiCars {
  private router: Router;
  private auth: Auth;

  constructor() {
    this.router = Router();
    this.auth = new Auth();

  }
  routes() {
    this.router.get('/', this.auth.verifyToken, ControllerCars.list);
    this.router.get('/:id', this.auth.verifyToken, ControllerCars.show);
    this.router.post('/', this.auth.verifyToken, ControllerCars.create);
    this.router.put('/:id', this.auth.verifyToken, ControllerCars.update);
    this.router.delete('/:id', this.auth.verifyToken, ControllerCars.remove);

    return this.router;
  }
}

export default new ApiCars();
