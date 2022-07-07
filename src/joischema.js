
const Joi = require('joi')

const category = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string()
        .max(30)
})

const joischema = {
    category
}

module.exports = joischema