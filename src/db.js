/*global process*/
require('dotenv').config()
const knexfile = require('../knexfile')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = require('knex')(
    isProduction ?
        knexfile.production : knexfile.development
)