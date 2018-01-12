exports.up = function(knex, Promise) {
  return knex.schema.createTable('list', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('list');
};
