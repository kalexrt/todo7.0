import { Knex } from 'knex';
import { STATUS } from '../../interfaces/status.interface';

const TABLE_NAME = 'status';

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
          status: STATUS.COMPLETE,
        },
        {
          status: STATUS.ONGOING,
        },
        {
          status: STATUS.TODO,
        },
      ]);
    });
}