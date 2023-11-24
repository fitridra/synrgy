import { ICars } from '../models/Cars';
import { IUsers } from '../models/Users';
import RepoCars from '../repositories/RepoCars';

class ServiceCars {
  private _repoCars: RepoCars;
  private _user: IUsers | undefined;

  constructor(repoCars: RepoCars) {
    this._repoCars = repoCars;
  }

  async create(carData: ICars) {
    const user = this.getUser as IUsers;
    const cars = await this._repoCars.create(user, carData);
    return cars;
  }

  async remove(id: string) {
    const user = this.getUser as IUsers;
    const cars = await this._repoCars.remove(user, id);
    return cars;
  }

  async update(id: string, carData: ICars) {
    const user = this.getUser as IUsers;
    const cars = await this._repoCars.update(user, id, carData);
    return cars;
  }

  async list() {
    const cars = await this._repoCars.list();
    return cars;
  }

  async show(id: string) {
    const cars = await this._repoCars.show(id);
    return cars;
  }

  set setUser(userData: IUsers) {
    this._user = userData;
  }

  get getUser() {
    return this._user;
  }
}

export default ServiceCars;
