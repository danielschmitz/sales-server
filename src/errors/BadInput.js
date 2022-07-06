class BadInputError extends Error {
    constructor(message) {
        super(message)
        this.name = "BadInputError"
        this.code = 400
    }
}
module.exports = BadInputError
