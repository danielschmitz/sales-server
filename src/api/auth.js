const router = require("express").Router()
const auth = require("../services/auth")

router.get("/auth/info", auth.checkLogin, (req, res) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Get info about token' 
    */
  res.json(req.auth)
})

router.post("/auth/login", async (req, res) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Try to login'
    #swagger.parameters['user'] = {
        in: 'body',
        description: 'User Login Data',
        required: true,
        schema: { 
            "email": "user1@email.com",
            "password": "123@456"
        }
    } 
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[404] = { description: 'No user found with that email' }
    #swagger.responses[401] = { description: 'Incorrect password' }
    #swagger.responses[200] = { description: "Token" }
    */
  res.send(await auth.tryLogin(req.body))
})

module.exports = router
