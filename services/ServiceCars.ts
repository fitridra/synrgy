import { TParams } from '../interfaces/IRest';
import Cars from '../models/Cars';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

class ServiceCars {
  constructor() {}

  async list() {
    try {
      const response = await Cars.list();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async show(id: string) {
    try {
      const response = await Cars.show(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(newCar: TParams, req: Request) {
    try {
      const token = Array.isArray(req.headers?.authorization)
      ? req.headers.authorization[0]
      : req.headers?.authorization as string | undefined;

      if (!token) {
        throw new Error('Authorization header is missing');
      }

      const decodedToken = jwt.verify(token, 'RENTAL_CAR_JWT_KEY') as JwtPayload;
      const createdByRole = decodedToken.role;

      const currentDate = new Date();
      const response = await Cars.create({
        ...newCar,
        cars_id: '', 
        name: newCar.name || '', 
        photo: newCar.photo || '', 
        price: newCar.price || 0,
        sizes_id: newCar.sizes_id || 0,
        created_at: currentDate,
        updated_at: currentDate,
        created_by: createdByRole,
        updated_by: createdByRole,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updatedCar: TParams, req: Request) {
    try {
      const existingCar = await Cars.show(id);
      if (!existingCar) {
        throw new Error('Car not found');
      }

      const token = Array.isArray(req.headers?.authorization)
      ? req.headers.authorization[0]
      : req.headers?.authorization as string | undefined;
      
      if (!token) {
        throw new Error('Authorization header is missing');
      }

      const decodedToken = jwt.verify(token, 'RENTAL_CAR_JWT_KEY') as JwtPayload;
      const updatedByRole = decodedToken.role;

      const currentDate = new Date();
      const response = await Cars.update(id, {
        cars_id: existingCar.cars_id,
        name: updatedCar.name || existingCar.name,
        photo: updatedCar.photo || existingCar.photo,
        price: updatedCar.price || existingCar.price,
        sizes_id: updatedCar.sizes_id || existingCar.sizes_id,
        updated_at: currentDate,
        updated_by: updatedByRole,
      });
  
      return response;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await Cars.remove(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new ServiceCars();
