
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_sources',function(table){
    table.increments('id')
    table.integer('user_id')
    table.foreign('user_id').reference('id').inTable('user').onDelete('CASECADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_sources')
};
