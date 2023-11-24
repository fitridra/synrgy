import Cars, { ICars } from '../models/Cars';
import { IUsers } from '../models/Users';

class RepoCars {
  constructor() {}

  async list() {
    const cars = await Cars.query().select('*');
    return cars;
  }

  async show(id: string) {
    const cars = await Cars.query().findById(id);
    return cars;
  }

  async create(user: IUsers, carData: ICars) {
    const car = await Cars.query().insert({
      ...carData,
      createdBy: user.id,
    });

    return car;
  }

  async remove(user: IUsers, id: string) {
    const cars = await Cars.query()
      .update({
        published: false,
        updatedBy: user.id,
        updatedAt: new Date().toISOString(),
      })
      .where('id', id);
    return cars;
  }

  async update(user: IUsers, id: string, carData: ICars) {
    const cars = await Cars.query()
      .update({
        ...carData,
        updatedBy: user.id,
        updatedAt: new Date().toISOString(),
      })
      .where('id', `${id}`);
    return cars;
  }
}

export default RepoCars;
