module.exports = (app) => {
  app.use(async (err, req, res, _next) => {
    if (isNaN(err.code)) {
      // any string error
      err.code = 500
    }

    // jwt errors
    if (err.name === "UnauthorizedError") {
      err.code = 401
    }

    const httpCode = err.code || 500
    res
      .status(httpCode)
      .send({ message: err.message, code: httpCode, name: err.name })
  })
}
