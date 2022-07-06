module.exports = app => {
  app.use(async (err, req, res, _next) => {
    const httpCode = err.code || 500
    res.status(httpCode).send({ message: err.message, code: httpCode, name: err.name })
  })
}
