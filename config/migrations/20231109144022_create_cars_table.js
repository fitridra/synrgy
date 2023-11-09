/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cars', function (table) {
        table.increments('cars_id').primary();
        table.string('name');
        table.string('photo');
        table.integer('prize');
        table.integer('sizes_id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
