import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('cars', (builder) => {
    builder.increments('id').primary().notNullable();
    builder.string('name').notNullable();
    builder.string('photo').notNullable();
    builder.integer('price').defaultTo(0);
    builder.integer('sizes_id').references('id').inTable('sizes');
    
    builder.dateTime('createdAt').defaultTo(new Date().toISOString());
    builder.dateTime('updatedAt').defaultTo(new Date().toISOString());
    builder.integer('createdBy').references('id').inTable('users');
    builder.integer('updatedBy').references('id').inTable('users');    
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('cars');
}
