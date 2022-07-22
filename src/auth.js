require('dotenv').config()
const jwt = require("jsonwebtoken")
const UnauthorizedError = require('./errors/UnauthorizedError')

const auth = {
    checkLogin: async (req, res, next) => {
        const token = req.headers["authorization"]
        if (!token) {
            throw new UnauthorizedError("Token not present")
        }
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_SECRET, function (err, auth) {
            if (err) {
                throw new UnauthorizedError("Unauthorized")
            } else {
                req.auth = auth
                next()
            }
        })

    },
    getTokenData: (req) => ({
        id: req.auth.id,
        email: req.auth.email
    })
}

module.exports = auth

