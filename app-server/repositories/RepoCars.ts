import Cars, { ICars } from '../models/Cars';
import { IUsers } from '../models/Users';

export interface IParams {
  page?: number;
  size?: number;
  search?: string;
}

class RepoCars {
  constructor() {}

  async count(params?: IParams) {
    const allCars = Cars.query().count('id');
    if (params?.search) {
      allCars
        .whereILike('name', `%${params?.search}%`)
        .orWhereILike('author', `%${params?.search}%`);
    }

    return Number(
      ((await allCars) as unknown as { count: number }[])[0].count
    );
  }

  async list(params?: IParams) {
    const size = params?.size ? Number(params?.size) : 10;
    const page = params?.page ? Number(params?.page) - 1 : 0;

    const cars = Cars.query()
      .select('*')
      .page(page, size);
      // .limit(size)
      // .offset(page * size)
    // .orderBy('createdAt', 'asc');

    if (params?.search) {
      cars
        .whereILike('name', `%${params?.search}%`);
    }

    cars.orderBy('createdAt', 'desc', 'first');

    return await cars;
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
