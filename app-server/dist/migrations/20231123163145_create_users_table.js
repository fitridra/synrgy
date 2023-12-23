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
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.createTable('users', (builder) => {
            builder.increments('id').primary().notNullable();
            builder.string('username').unique().notNullable();
            builder.string('email').unique().notNullable();
            builder.text('password').notNullable();
            builder.string('role').defaultTo('member');
            builder.dateTime('createdAt').defaultTo(new Date().toISOString());
            builder.dateTime('updatedAt').defaultTo(new Date().toISOString());
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.dropTable('users');
    });
}
exports.down = down;
