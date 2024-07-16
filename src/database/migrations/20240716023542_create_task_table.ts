import { Knex } from 'knex';

const TABLE_NAME = 'tasks';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();
    table.string("name").notNullable();

    table
      .integer("user_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("cascade");
    table
      .integer("status_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("status")
      .onDelete("cascade");
    
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    
    table
      .bigInteger('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable("users")
      .onDelete("cascade");
      
    table.timestamp('updated_at').nullable();
    
    table
      .bigInteger('updated_by')
      .unsigned()
      .references('id')
      .inTable("users")
      .onDelete("cascade")
      .nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}