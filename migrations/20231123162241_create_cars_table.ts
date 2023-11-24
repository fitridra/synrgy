import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('photo');
    table.integer('price');
    table.integer('sizes_id');
    
    table.timestamps(true, true);
    table.string('created_by');   
    table.string('updated_by');    
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('cars');
}
