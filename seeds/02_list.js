const list = require('./seeds-data/list')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE list RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('list').insert(list);
    });
};
