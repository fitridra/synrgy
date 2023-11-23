import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('username');
        table.string('password');
        table.string('email');
        table.timestamps(true, true);
        table.string('role');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}