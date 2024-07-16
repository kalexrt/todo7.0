import { Knex } from 'knex';

const TABLE_NAME = 'tasks';

/**
 * Delete existing entries and seed values for table TABLE_NAME.
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
          name: "walk the dog",
          status_id: 1,
          user_id: 1,
          created_by: 1
        },
        {
          name: "walk the cat",
          status_id: 2,
          user_id: 1,
          created_by: 1
        },
      ]); 
    });
}