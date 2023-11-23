import { Request, Response } from 'express';
import { IRestController } from '../../interfaces/IRest';
import ServiceCars from '../../services/ServiceCars';

class ControllerCars implements IRestController {
  constructor() {}
  async list(_: Request, res: Response) {
    try {
      const response = await ServiceCars.list();
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        data: error,
      });
    }
  }
  async show() {}
  async create() {}
  async remove() {}
  async update() {}
}

export default new ControllerCars();
