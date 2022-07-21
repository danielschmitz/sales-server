
var { expressjwt: jwt } = require("express-jwt")

const auth = {
    checkLogin: jwt({
        secret: "JWT_SECRET", // TODO:  process.env.JWT_SECRET
        credentialsRequired: true,
        algorithms: ['HS256'],
        // by default, use Authorization header 
    }),
    getData: (req) => ({
        id: req.auth.id,
        email: req.auth.email
    })
}

module.exports = auth

