"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const objection_1 = require("objection");
objection_1.Model.knex(database_1.default);
class Users extends objection_1.Model {
    static get tableName() {
        return 'users';
    }
    static get idColumn() {
        return 'id';
    }
}
exports.default = Users;
