require('express-async-errors')
const express = require('express')
const app = express()

const libs = require('./libs')

console.log("\x1b[36m%s\x1b[0m", `[loading libs]`, "\x1b[0m", `${libs}`)
libs.forEach(lib => {
    require(`./libs/${lib}`)(app)
})