module.exports = app => {
  app.use(async (err, req, res, _next) => {
    const errorCode = err.name === 'NotFoundError' ? 404 : 500
    res.status(errorCode).send({ message: err.message, code: errorCode, name: err.name })
  })
}
