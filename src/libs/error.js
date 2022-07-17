module.exports = app => {
  app.use(async (err, req, res, _next) => {
    
    //try to handle string errors TODO: verify is string 
    if (err.code == 'SQLITE_ERROR') {
      err.code = 500
    }
    
    const httpCode = err.code || 500
    res.status(httpCode).send({ message: err.message, code: httpCode, name: err.name })
  })
}
