
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').insert([
  {id: 1,
  username: 'Matt',
  password:'$2a$04$4tGsgCNtn7GjY29aVgxXDOBU6orSddr2fi0CsghhktcUYO.hFNrzy'},
  {id: 2,
  username: 'bob',
  password:'marley'}
  ])
  .then(function(){
    return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
  })

};
