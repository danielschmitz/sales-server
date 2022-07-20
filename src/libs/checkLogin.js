
var { expressjwt: jwt } = require("express-jwt")

module.exports = jwt({
    secret: "JWT_SECRET", // TODO:  process.env.JWT_SECRET
    credentialsRequired: true,
    algorithms: ['HS256'],
    // by default, use Authorization header 
})


