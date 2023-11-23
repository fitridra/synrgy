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

  async show(req: Request, res: Response) {
    try {
      const carId = req.params.id;
      const response = await ServiceCars.show(carId);
      
      if (response) {
        res.status(200).json({
          data: response,
        });
      } else {
        res.status(404).json({
          error: 'Car not found',
        });
      }
    } catch (error) {
      res.status(500).json({
      data: error,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newCar = req.body;
      const response = await ServiceCars.create(newCar, req);
      res.status(201).json({
        data: response,
      });
    } catch (error) {
      res.status(500).json({
      data: error,
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const carId = req.params.id;
      await ServiceCars.remove(carId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
      data: error,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const carId = req.params.id;
      const updatedCar = req.body;
      const response = await ServiceCars.update(carId, updatedCar, req);
      
      if (response) {
        res.status(200).json({
          data: response,
        });
      } else {
        res.status(404).json({
          error: 'Car not found',
        });
      }
    } catch (error) {
      res.status(500).json({
      data: error,
      });
    }
  }
}

export default new ControllerCars();
