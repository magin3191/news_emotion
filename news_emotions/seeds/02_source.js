
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('source').insert([
    { name: 'ABC News', ids: 'abc-news'},
    { name: 'BBC News', ids: 'bbc-news'},
    { name: 'The New York Times', ids: 'the-new-york-times'},
    { name: 'Bloomberg', ids: 'bloomberg'},
    { name: 'CNN', ids: 'cnn'},
    { name: 'Fox News', ids: 'fox-news'},
    { name: 'MSNBC', ids: 'msnbc'},
    { name: 'Breitbart News', ids: 'breitbart-news'},
    { name: 'Al Jazeera English',ids: 'al-jazeera-english'},
    { name: 'Associated Press', ids: 'associated-press'},
    { name: 'CNBC', ids: 'cnbc'},
    { name: 'Politico', ids: 'politico'}
  ])
  .then(function(){
    return knex.raw("SELECT setval('source_id_seq', (SELECT MAX(id) FROM source))")
  })

};
