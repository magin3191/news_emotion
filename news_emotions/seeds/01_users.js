
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').insert([
  {id: 1,
  username: 'Matt',
  password:'beans'}
  ])
  .then(function(){
    return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
  })

};
