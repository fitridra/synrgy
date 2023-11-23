import { Router } from 'express';
import ControllerCars from '../../controllers/api/ControllerCars';
import Auth from '../../middlewares/Auth';

class ApiCars {
  private router: Router;

  constructor() {
    this.router = Router();

  }
  routes() {
    this.router.get('/', Auth.authorize, ControllerCars.list);
    this.router.get('/:id', Auth.authorize, ControllerCars.show);
    this.router.post('/', Auth.authorize, ControllerCars.create);
    this.router.put('/:id', Auth.authorize, ControllerCars.update);
    this.router.delete('/:id', Auth.authorize, ControllerCars.remove);

    return this.router;
  }
}

export default new ApiCars();
