

module.exports = (req, _res, next) => {
    console.log(req.headers['x-auth-token'])
    // TODO: check token with jwt....
    next()
}
