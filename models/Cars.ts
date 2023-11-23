import { IRestModel, TParams } from '../interfaces/IRest';
import database from '../config/database';

interface ICars {
  cars_id: string;
  name: string;
  photo: string;
  price: number;
  sizes_id: number;
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  updated_by?: string;
}

class Cars implements IRestModel<ICars> {
  constructor() {}

  async create(newCar: ICars): Promise<ICars> {
    const [createdCar] = await database('cars').insert(newCar).returning('*');
    return createdCar as ICars;
  }

  async list(): Promise<ICars[]> {
    const data = await database.select('*').from('cars');
    return data as ICars[];
  }

  async remove(id: string): Promise<void> {
    await database('cars').where('cars_id', id).del();
  }

  async show(id: string): Promise<ICars | undefined> {
    const car = await database.select('*').from('cars').where('cars_id', id).first();
    return car as ICars | undefined;
  }

  async update(id: string, updatedCar: ICars): Promise<ICars | undefined> {
    const [updatedRecord] = await database('cars').where('cars_id', id).update(updatedCar).returning('*');
    return updatedRecord as ICars | undefined;
  }
}

export default new Cars();
