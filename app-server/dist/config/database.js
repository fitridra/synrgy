"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
class Database {
    constructor() {
        this._db = (0, knex_1.default)({
            client: 'pg',
            connection: 'postgres://app_server_ch8:YLP7GE6qjWXpNHy@app-server-ch8-db.flycast:5432/app_server_ch8',
            searchPath: ['public'],
        });
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    get db() {
        return this._db;
    }
}
exports.default = Database.getInstance().db;
