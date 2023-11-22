import { IRestModel, TParams } from '../interfaces/IRest';
import database from '../config/database';

interface ICars {
  cars_id: string;
  name: string;
  photo: string;
  price: number;
  sizes_id: number;
}

class Cars implements IRestModel<ICars> {
  constructor() {}
  async create(payload: ICars) {}
  async list(params?: TParams) {
    const data = await database.select('*').from('cars');
    return data as ICars[];
  }
  async remove(id: string) {}
  async show(id: string) {}
  async update(id: string, payload: ICars) {}
}

export default new Cars();
