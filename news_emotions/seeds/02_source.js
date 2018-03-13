
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('source').insert([
  {id:1, name: 'ABC News', selected: false },
  {id:2, name: 'Fox News', selected: false }
  ])
  .then(function(){
    return knex.raw("SELECT setval('source_id_seq', (SELECT MAX(id) FROM source))")
  })

};
