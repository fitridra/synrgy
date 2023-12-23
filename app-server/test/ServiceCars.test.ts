import ServiceCars from '../services/ServiceCars';
import RepoCars, {IParams} from '../repositories/RepoCars';
import { IUsers } from '../models/Users';
import { ICars } from '../models/Cars';

jest.mock('../repositories/RepoCars');

describe('ServiceCars', () => {
  let serviceCars: ServiceCars;
  let mockRepoCars: RepoCars;
  let mockUser: IUsers;

  beforeEach(() => {
    mockRepoCars = new RepoCars();
    serviceCars = new ServiceCars(mockRepoCars);
    mockUser = {
      id: 'user1',
      username: 'testuser',
      role: 'user',
      password: 'password123',
      email: 'testuser@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  describe('create', () => {
    test('should call RepoCars.create with user and car data', async () => {

      const mockCarData: ICars = {
        plate: "OSL-4224",
        manufacture: "Lincoln",
        model: "MKZ",
        image: "./images/car03.min.jpg",
        rentPerDay: 900000,
        capacity: 6,
        description: " Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
        availableAt: "2022-03-23T15:49:05.563Z",
        transmission: "Automanual",
        available: true,
        type: "Sedan",
        year: "2021",
        options: ["Bucket Seats", "Airbag: Passenger", "Airbag: Driver", "Power Seats", "Airbag: Side", "Antilock Brakes", "CD (Multi Disc)"],
        specs: ["Driver & front passenger map pockets", "Direct-type tire pressure monitor system", "Cargo area lamp", "Glove box lamp", "Silver finish interior door handles", "Driver & front passenger advanced multistage airbags w/occupant sensors", "Silver accent IP trim finisher -inc: silver shifter finisher", "Fasten seat belt warning light/chime"]
      };

      serviceCars.setUser = mockUser;

      await serviceCars.create(mockCarData);

      expect(mockRepoCars.create).toHaveBeenCalledWith(mockUser, mockCarData);
    });

    test('should throw an error if user is not set', async () => {
      const mockCarData: ICars = {
        plate: "OSL-4224",
        manufacture: "Lincoln",
        model: "MKZ",
        image: "./images/car03.min.jpg",
        rentPerDay: 900000,
        capacity: 6,
        description: " Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
        availableAt: "2022-03-23T15:49:05.563Z",
        transmission: "Automanual",
        available: true,
        type: "Sedan",
        year: "2021",
        options: ["Bucket Seats", "Airbag: Passenger", "Airbag: Driver", "Power Seats", "Airbag: Side", "Antilock Brakes", "CD (Multi Disc)"],
        specs: ["Driver & front passenger map pockets", "Direct-type tire pressure monitor system", "Cargo area lamp", "Glove box lamp", "Silver finish interior door handles", "Driver & front passenger advanced multistage airbags w/occupant sensors", "Silver accent IP trim finisher -inc: silver shifter finisher", "Fasten seat belt warning light/chime"]
      };

      serviceCars.setUser = mockUser;

      expect(serviceCars.create(mockCarData));
    });
  });

  describe('remove', () => {
    test('should call RepoCars.remove with user and car id', async () => {
      const mockCarId = 'car123';

      serviceCars.setUser = mockUser;

      await serviceCars.remove(mockCarId);

      expect(mockRepoCars.remove).toHaveBeenCalledWith(mockUser, mockCarId);
    });

    test('should throw an error if user is not set', async () => {
      const mockCarId = 'car123';

      serviceCars.setUser = mockUser;

      expect(serviceCars.remove(mockCarId));
    });
  });

  describe('update', () => {
    test('should call RepoCars.update with user, id, and car data', async () => {
      const mockCarId = 'car123';
      const mockCarData: ICars = {
        plate: "OSL-4224",
        manufacture: "Lincoln",
        model: "MKZ",
        image: "./images/car03.min.jpg",
        rentPerDay: 900000,
        capacity: 6,
        description: " Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
        availableAt: "2022-03-23T15:49:05.563Z",
        transmission: "Automanual",
        available: true,
        type: "Sedan",
        year: "2021",
        options: ["Bucket Seats", "Airbag: Passenger", "Airbag: Driver", "Power Seats", "Airbag: Side", "Antilock Brakes", "CD (Multi Disc)"],
        specs: ["Driver & front passenger map pockets", "Direct-type tire pressure monitor system", "Cargo area lamp", "Glove box lamp", "Silver finish interior door handles", "Driver & front passenger advanced multistage airbags w/occupant sensors", "Silver accent IP trim finisher -inc: silver shifter finisher", "Fasten seat belt warning light/chime"]
      };
      serviceCars.setUser = mockUser;

      await serviceCars.update(mockCarId, mockCarData);

      expect(mockRepoCars.update).toHaveBeenCalledWith(mockUser, mockCarId, mockCarData);
    });

    test('should throw an error if user is not set', async () => {
        const mockCarId = 'car123';
        const mockCarData: ICars = {
          plate: "OSL-4224",
          manufacture: "Lincoln",
          model: "MKZ",
          image: "./images/car03.min.jpg",
          rentPerDay: 900000,
          capacity: 6,
          description: " Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
          availableAt: "2022-03-23T15:49:05.563Z",
          transmission: "Automanual",
          available: true,
          type: "Sedan",
          year: "2021",
          options: ["Bucket Seats", "Airbag: Passenger", "Airbag: Driver", "Power Seats", "Airbag: Side", "Antilock Brakes", "CD (Multi Disc)"],
          specs: ["Driver & front passenger map pockets", "Direct-type tire pressure monitor system", "Cargo area lamp", "Glove box lamp", "Silver finish interior door handles", "Driver & front passenger advanced multistage airbags w/occupant sensors", "Silver accent IP trim finisher -inc: silver shifter finisher", "Fasten seat belt warning light/chime"]
        };
        serviceCars.setUser = mockUser;
  
        expect(serviceCars.update(mockCarId, mockCarData));
      });
  });

  describe('show', () => {
    test('should call RepoCars.show with id', async () => {
      const mockCarId = 'car123';

      await serviceCars.show(mockCarId);

      expect(mockRepoCars.show).toHaveBeenCalledWith(mockCarId);
    });

    test('should throw an error if user is not set', async () => {
        const mockCarId = 'car123';
  
        serviceCars.setUser = mockUser;

      expect(serviceCars.show(mockCarId));
      });
  });

  describe('list', () => {
    test('should call RepoCars.list with params', async () => {
     const mockParams: IParams = {
        page: 1,
        size: 10,
        search: 'keyword',
      };

      await serviceCars.list(mockParams);

      expect(mockRepoCars.list).toHaveBeenCalledWith(mockParams);
    });

    test('should throw an error if user is not set', async () => {
        const mockParams: IParams = {
           page: 1,
           size: 10,
           search: 'keyword',
         };
   
         serviceCars.setUser = mockUser;

      expect(serviceCars.list(mockParams));
       });
  });

  describe('count', () => {
    test('should call RepoCars.count with params', async () => {
     const mockParams: IParams = {
        page: 1,
        size: 10,
        search: 'keyword',
      };

      await serviceCars.count(mockParams);

      expect(mockRepoCars.count).toHaveBeenCalledWith(mockParams);
    });

    test('should throw an error if user is not set', async () => {
        const mockParams: IParams = {
           page: 1,
           size: 10,
           search: 'keyword',
         };
   
         serviceCars.setUser = mockUser;

      expect(serviceCars.count(mockParams));
       });
  });

});
