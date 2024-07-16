import { Knex } from "knex";
const TABLE_NAME = "users";
/**
* Create table users.
*
* @param   {Knex} knex
* @returns {Promise}
*/
export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string("email", 100).notNullable().alter();
    table.string("password", 100).notNullable();
  });
}
/**
* Drop table users.
*
* @param   {Knex} knex
* @returns {Promise}
*/
export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string("email", 50).notNullable().alter();
    table.dropColumn("password");
  });
}