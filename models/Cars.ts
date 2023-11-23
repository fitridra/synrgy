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
  async create() {}
  async list() {
    const data = await database.select('*').from('cars');
    return data as ICars[];
  }
  async remove() {}
  async show(id: string) {
    const car = await database.select('*').from('cars').where('cars_id', id).first();
  }
  async update() {}
}

export default new Cars();
