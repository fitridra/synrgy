import database from '../config/database';
import { Model } from 'objection';

Model.knex(database);

export interface ISizes {
  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

class Sizes extends Model {
  static get tableName() {
    return 'sizes';
  }

  static get idColumn() {
    return 'id';
  }
}

export default Sizes;
