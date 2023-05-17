class BadInputError extends Error {
  constructor(message) {
    super(message)
    this.name = "BadInputError"
    this.code = 422
  }
}
module.exports = BadInputError
