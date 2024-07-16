import { Knex } from 'knex';

const TABLE_NAME = 'user_permissions';

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
          permission_id: 1,
          user_id: 1,
        },
        {
          permission_id: 2,
          user_id: 1,
        },
        {
          permission_id: 3,
          user_id: 1,
        },
        {
          permission_id: 4,
          user_id: 1,
        },
        {
          permission_id: 5,
          user_id: 1,
        },
      ]);
    });
}