
const api = require('../api')

module.exports = app => {
    api.forEach(router => {
        console.log(`loading api/${router}`)
        app.use('/api', require(`../api/${router}`))
    })
}

