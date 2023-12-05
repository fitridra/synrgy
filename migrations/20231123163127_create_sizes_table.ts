import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('sizes', (builder) => {
        builder.increments('id').primary().notNullable();
        builder.string('name').notNullable();

        builder.dateTime('createdAt').defaultTo(new Date().toISOString());
        builder.dateTime('updatedAt').defaultTo(new Date().toISOString());    
    });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('sizes');
}

