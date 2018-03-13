
exports.up = function(knex, Promise) {
  return knex.schema.createTable('source',function(table){
    table.increments('id')
    table.string('name')
    table.boolean('selected')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('source')
};
