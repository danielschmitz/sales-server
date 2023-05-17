class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.name = "UnauthorizedError"
    this.code = 401
  }
}
module.exports = UnauthorizedError
