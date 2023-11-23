import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        { name: 'Car1', photo: 'car1.jpg', price: 50000, sizes_id: 1, created_by: 'superadmin', updated_by: 'superadmin' },
        { name: 'Car2', photo: 'car2.jpg', price: 60000, sizes_id: 2, created_by: 'superadmin', updated_by: 'superadmin' },
    ]);
};
