
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_sources',function(table){
    table.increments('id')
    table.integer('users_id')
    table.foreign('users_id').references('id').inTable('users')
    table.integer('source_id')
    table.foreign('source_id').references('id').inTable('source')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_sources')
};
