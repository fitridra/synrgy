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
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceCars {
    constructor(repoCar) {
        this._repoCar = repoCar;
    }
    create(carData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getUser;
            const cars = yield this._repoCar.create(user, carData);
            return cars;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getUser;
            const cars = yield this._repoCar.remove(user, id);
            return cars;
        });
    }
    update(id, carData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getUser;
            const cars = yield this._repoCar.update(user, id, carData);
            return cars;
        });
    }
    list(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield this._repoCar.list(params);
            return cars;
        });
    }
    count(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._repoCar.count(params);
            return result;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield this._repoCar.show(id);
            return cars;
        });
    }
    set setUser(userData) {
        this._user = userData;
    }
    get getUser() {
        return this._user;
    }
}
exports.default = ServiceCars;
