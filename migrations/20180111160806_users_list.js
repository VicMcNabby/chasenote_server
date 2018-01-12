exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_list', (table) => {
    table.increments('id').primary();
    table.integer('users_id').references('users.id').unsigned().onDelete('cascade');
    table.integer('list_id').references('list.id').unsigned().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users_list');
};
