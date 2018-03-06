// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    // connection: 'postgresql://localhost:5432/NewsEmo_db'
  },

  production: {
    client: 'pg',
    // connection: process.ENV.database_URL
}

}
