const knex = require('./knex');

module.exports = {
  createUser(user) {
    return knex('users').insert(user, '*');
  },
  getUserByEmail(email) {
    return knex('users').where('email', email).first();
  },
  getAllUsers() {
    return knex('users');
  },
  getListsByUserId(id) {
    return knex('list').where('users_id', id)
      .join('users_list', 'list_id', '=', 'list.id');
  },
  getItemsByListId(id) {
    return knex('item').where('list_id', id)
    // .join('list', 'list.id', '=', 'list_id');
  },
  createItem(tableName, item) {
    return knex(tableName).insert(item, '*');
  },
  deleteItem(tableName, id) {
    return knex(tableName).where('id', id).del();
  },
  updateItem(tableName, id, item) {
    return knex(tableName).where('id', id).update(item, '*');
  }
}
