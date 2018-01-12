exports.up = function(knex, Promise) {
  return knex.schema.createTable('item', (table) => {
    table.increments('id').primary();
    table.integer('list_id').references('list.id').unsigned().onDelete('cascade');
    table.string('content').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('item');
};
