
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id')
    table.string('username').unique()
    table.string('password')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
