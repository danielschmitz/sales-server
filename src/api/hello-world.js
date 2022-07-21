const Auth = require('../auth')

const router = require('express').Router()

router.get('/hello-world', (req, res) => {
    // #swagger.tags = ['Main']
    // #swagger.summary = 'A simple Hello World'
    res.send("hello world")
})

router.get('/hello-world-auth', Auth.checkLogin, (req, res) => {
    // #swagger.tags = ['Main']
    // #swagger.summary = 'A simple Hello World with auth'
    const { email } = Auth.getData(req)
    res.send("hello world " + email)
})

module.exports = router