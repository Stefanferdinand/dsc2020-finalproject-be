const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'dsc_projek'
    }
})

module.exports = knex;