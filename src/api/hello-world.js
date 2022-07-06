
const router = require('express').Router()

router.get('/hello-world', (req, res) => {
    res.send("hello world")
})

module.exports = router