const item = require('./seeds-data/item')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE item RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('item').insert(item);
    });
};
