const users = require('./seeds-data/users')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE users RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('users').insert(users);
    });
};
