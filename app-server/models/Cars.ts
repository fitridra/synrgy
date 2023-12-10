import database from '../config/database';
import { Model } from 'objection';

Model.knex(database);

export interface ICars {
  id: string;
  name: string;
  photo: string;
  price: number;
  sizes_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

class Cars extends Model {
  static get tableName() {
    return 'cars';
  }

  static get idColumn() {
    return 'id';
  }
}

export default Cars;

