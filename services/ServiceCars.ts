import { TParams } from '../interfaces/IRest';
import Cars from '../models/Cars';

class ServiceCars {
  constructor() {}
  async list() {
    try {
      const response = await Cars.list();
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new ServiceCars();
