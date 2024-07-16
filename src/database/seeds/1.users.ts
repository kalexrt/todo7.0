import { Knex } from "knex";
const TABLE_NAME = "users";
/**
* Delete existing entries and seed values for table users.
*
* @param   {Knex} knex
* @returns {Promise}
*/
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          name: "Kalash",
          email: "kalash1@gmail.com",
          password: "$2b$10$I24gdNea7i6fSXPl1uy96.cle9N5v6Zt8HyZTkTpFhD.kwzHeBHNW",
        }
      ]);
    });
}