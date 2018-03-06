
exports.up = function(knex, Promise) {
  return knex.schema.createTable('source',function(table){
    table.increments('id')
    table.string('name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('source')
};
