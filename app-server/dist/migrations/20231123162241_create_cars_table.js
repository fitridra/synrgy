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
        return yield knex.schema.createTable('cars', (builder) => {
            builder.increments('id').primary().notNullable();
            builder.string("plate").notNullable();
            builder.string("manufacture").notNullable();
            builder.string("model").notNullable();
            builder.string("image").notNullable();
            builder.integer("rentPerDay").notNullable();
            builder.integer("capacity").notNullable();
            builder.string("description").notNullable();
            builder.string("availableAt").notNullable();
            builder.string("transmission").notNullable();
            builder.boolean("available").notNullable();
            builder.string("type").notNullable();
            builder.string("year").notNullable();
            builder.specificType("options", "text[]").notNullable();
            builder.specificType("specs", "text[]").notNullable();
            builder.dateTime('createdAt').defaultTo(new Date().toISOString()).nullable();
            builder.dateTime('updatedAt').defaultTo(new Date().toISOString()).nullable();
            builder.integer('createdBy').nullable();
            builder.integer('updatedBy').nullable();
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.dropTable('cars');
    });
}
exports.down = down;
