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
const Cars_1 = __importDefault(require("../models/Cars"));
class RepoCars {
    constructor() { }
    count(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const allCars = Cars_1.default.query().count('id');
            if (params === null || params === void 0 ? void 0 : params.search) {
                allCars
                    .whereILike('plate', `%${params === null || params === void 0 ? void 0 : params.search}%`);
            }
            return Number((yield allCars)[0].count);
        });
    }
    list(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = (params === null || params === void 0 ? void 0 : params.size) ? Number(params === null || params === void 0 ? void 0 : params.size) : 10;
            const page = (params === null || params === void 0 ? void 0 : params.page) ? Number(params === null || params === void 0 ? void 0 : params.page) - 1 : 0;
            const cars = Cars_1.default.query()
                .select('*')
                .page(page, size);
            // .limit(size)
            // .offset(page * size)
            // .orderBy('createdAt', 'asc');
            if (params === null || params === void 0 ? void 0 : params.search) {
                cars
                    .whereILike('plate', `%${params === null || params === void 0 ? void 0 : params.search}%`);
            }
            cars.orderBy('createdAt', 'desc', 'first');
            return yield cars;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield Cars_1.default.query().findById(id);
            return cars;
        });
    }
    create(user, carData) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield Cars_1.default.query().insert(Object.assign(Object.assign({}, carData), { createdBy: user.id }));
            return car;
        });
    }
    remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield Cars_1.default.query()
                .update({
                published: false,
                updatedBy: user.id,
                updatedAt: new Date().toISOString(),
            })
                .where('id', id);
            return cars;
        });
    }
    update(user, id, carData) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield Cars_1.default.query()
                .update(Object.assign(Object.assign({}, carData), { updatedBy: user.id, updatedAt: new Date().toISOString() }))
                .where('id', `${id}`);
            return cars;
        });
    }
}
exports.default = RepoCars;
