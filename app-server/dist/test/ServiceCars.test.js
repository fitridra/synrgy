"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceCars_1 = __importDefault(require("../services/ServiceCars"));
const RepoCars_1 = __importDefault(require("../repositories/RepoCars"));
jest.mock('../repositories/RepoCars');
describe('ServiceCars', () => {
    let serviceCars;
    let mockRepoCars;
    let mockUser;
    beforeEach(() => {
        mockRepoCars = new RepoCars_1.default();
        serviceCars = new ServiceCars_1.default(mockRepoCars);
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
        test('should call RepoCars.create with user and car data', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCarData = {
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
            yield serviceCars.create(mockCarData);
            expect(mockRepoCars.create).toHaveBeenCalledWith(mockUser, mockCarData);
        }));
        test('should throw an error if user is not set', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCarData = {
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
        }));
    });
    describe('remove', () => {
        test('should call RepoCars.remove with user and car id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCarId = 'car123';
            serviceCars.setUser = mockUser;
            yield serviceCars.remove(mockCarId);
            expect(mockRepoCars.remove).toHaveBeenCalledWith(mockUser, mockCarId);
        }));
        test('should throw an error if user is not set', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCarId = 'car123';
            serviceCars.setUser = mockUser;
            expect(serviceCars.remove(mockCarId));
        }));
    });
    describe('update', () => {
        test('should call RepoCars.update with user, id, and car data', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCarId = 'car123';
            const mockCarData = {
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
            yield serviceCars.update(mockCarId, mockCarData);
            expect(mockRepoCars.update).toHaveBeenCalledWith(mockUser, mockCarId, mockCarData);
        }));
        test('should throw an error if user is not set', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCarId = 'car123';
            const mockCarData = {
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
        }));
    });
    describe('show', () => {
        test('should call RepoCars.show with id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCarId = 'car123';
            yield serviceCars.show(mockCarId);
            expect(mockRepoCars.show).toHaveBeenCalledWith(mockCarId);
        }));
        test('should throw an error if user is not set', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCarId = 'car123';
            serviceCars.setUser = mockUser;
            expect(serviceCars.show(mockCarId));
        }));
    });
    describe('list', () => {
        test('should call RepoCars.list with params', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockParams = {
                page: 1,
                size: 10,
                search: 'keyword',
            };
            yield serviceCars.list(mockParams);
            expect(mockRepoCars.list).toHaveBeenCalledWith(mockParams);
        }));
        test('should throw an error if user is not set', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockParams = {
                page: 1,
                size: 10,
                search: 'keyword',
            };
            serviceCars.setUser = mockUser;
            expect(serviceCars.list(mockParams));
        }));
    });
    describe('count', () => {
        test('should call RepoCars.count with params', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockParams = {
                page: 1,
                size: 10,
                search: 'keyword',
            };
            yield serviceCars.count(mockParams);
            expect(mockRepoCars.count).toHaveBeenCalledWith(mockParams);
        }));
        test('should throw an error if user is not set', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockParams = {
                page: 1,
                size: 10,
                search: 'keyword',
            };
            serviceCars.setUser = mockUser;
            expect(serviceCars.count(mockParams));
        }));
    });
});
