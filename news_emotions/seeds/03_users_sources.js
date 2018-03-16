exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_sources')
    .insert([
      {
        id: 1,
        users_id: 1,
        source_id: 1
      },
      {
        id: 2,
        users_id: 1,
        source_id: 2
      },
      {
        id: 3,
        users_id: 2,
        source_id: 1
      }
    ])
    .then(function() {
      return knex.raw(
        "SELECT setval('users_sources_id_seq', (SELECT MAX(id) FROM users_sources))"
      )
    })
}
