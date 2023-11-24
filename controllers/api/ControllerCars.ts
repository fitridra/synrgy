import { NextFunction, Request, Response } from 'express';
import { IRestController } from '../../interfaces/IRest';
import ServiceCars from '../../services/ServiceCars';
import { IUsers } from '../../models/Users';
import { ICars } from '../../models/Cars';
import { IRequestWithAuth } from '../../middlewares/Auth';

class ControllerCars {
  private _serviceCars: ServiceCars;

  constructor(serviceCars: ServiceCars) {
    this._serviceCars = serviceCars;
  }

  create() {
    const serviceCars = this._serviceCars;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        serviceCars.setUser = req.user as IUsers;

        const result = await serviceCars.create(req.body as ICars);
        res.status(201).json({
          message: 'success create a new car',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  update() {
    const serviceCars = this._serviceCars;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        const id = req.params?.id;
        serviceCars.setUser = req.user as IUsers;

        const result = await serviceCars.update(id, req.body as ICars);
        res.status(200).json({
          message: 'success update a car',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  list() {
    return async (_: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this._serviceCars.list();
        res.status(200).json({
          message: 'success fetch cars',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  remove() {
    const serviceCars = this._serviceCars;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        serviceCars.setUser = req.user as IUsers;
        const id = req.params?.id;
        const result = await this._serviceCars.remove(id);
        res.status(200).json({
          message: 'success remove car',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  show() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params?.id;
        const result = await this._serviceCars.show(id);
        res.status(200).json({
          message: 'success get one car',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    };
  }
}

export default ControllerCars;
