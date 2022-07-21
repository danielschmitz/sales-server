require('dotenv').config()
var { expressjwt: jwt } = require("express-jwt")

class Auth {
    static checkLogin = jwt({
        // eslint-disable-next-line no-undef
        secret: process.env.JWT_SECRET,
        credentialsRequired: true,
        algorithms: ['HS256'],
        // by default, use Authorization header 
    })
    static getData = (req) => ({
        id: req.auth.id,
        email: req.auth.email
    })
}

module.exports = Auth

