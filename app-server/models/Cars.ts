import database from '../config/database';
import { Model } from 'objection';

Model.knex(database);

export interface ICars {
  id?: string;
  plate?: string;
  manufacture?: string;
  model?: string;
  image?: string;
  rentPerDay?: number;
  capacity?: number;
  description?: string;
  availableAt?: string;
  transmission?: string;
  available?: boolean;
  type?: string;
  year?: string;
  options?: string[];
  specs?: string[];
  
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

