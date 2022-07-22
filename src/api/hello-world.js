const auth = require('../auth')

const router = require('express').Router()

router.get('/hello-world', (req, res) => {
    /* 
    #swagger.tags = ['Hello World']
    #swagger.summary = 'A simple Hello World' 
    */
    res.send("hello world")
})

router.get('/hello-world-auth', auth.checkLogin, (req, res) => {
    /* 
    #swagger.tags = ['Hello World']
    #swagger.summary = '🔒️ A simple Hello World with auth'
    */
    const { email } = auth.getTokenData(req)
    res.send("hello world " + email)
})

module.exports = router