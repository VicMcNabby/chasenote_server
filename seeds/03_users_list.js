const users_list = require('./seeds-data/users_list')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE users_list RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('users_list').insert(users_list);
    });
};
