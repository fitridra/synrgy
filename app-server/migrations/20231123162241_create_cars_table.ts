import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('cars', (builder) => {
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
    
    builder.dateTime('createdAt').defaultTo(new Date().toISOString());
    builder.dateTime('updatedAt').defaultTo(new Date().toISOString());
    builder.integer('createdBy').references('id').inTable('users');
    builder.integer('updatedBy').references('id').inTable('users');    
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('cars');
}
