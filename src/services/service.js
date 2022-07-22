const Joi = require('joi')
const BadInputError = require('../errors/BadInputError')

class service {
    constructor() {

    }
    async validate(schema, data) {
        throw new BadInputError("sss")
        const joiSchema = Joi.object(schema)
        try {
            await joiSchema.validateAsync(data)
        } catch (error) {
            throw new BadInputError(error.message)
        }
    }
}

module.exports = service