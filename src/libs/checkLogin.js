const UnauthorizedError = require("../errors/UnauthorizedErrorError")



module.exports = (req, _res, next) => {

    const token = req.headers['x-auth-token']

    if (!token) throw new UnauthorizedError()


    next()
}
