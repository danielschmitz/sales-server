require('express-async-errors')
const express = require('express')
const app = express()

const libs = require('./libs')
libs.forEach(lib => {
    console.log(`loading ${lib}`)
    require(`./libs/${lib}`)(app)
}
)