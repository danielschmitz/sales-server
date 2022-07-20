
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const db = require('../db')
const BadInputError = require('../errors/BadInputError')
const UnauthorizedError = require('../errors/UnauthorizedError')
const NotFoundError = require('../errors/NotFoundError')
const Joi = require('joi')
const router = require('express').Router()

const userSchema = Joi.object({
    password: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .required()
        .email()
})

router.post('/auth/login', async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Try to login'

    /*	#swagger.parameters['user'] = {
       in: 'body',
       description: 'User Login Data',
       required: true,
       schema: { 
        "email": "user1@email.com",
        "password": "123@456"
        }
    } */
    const { email, password } = req.body

    try {
        await userSchema.validateAsync({ email, password })
    } catch (error) {
        // #swagger.responses[422] = { description: 'Invalid input' }
        throw new BadInputError(error.message)
    }

    const user = await db('users').where({ email }).first()
    if (!user) {
        // #swagger.responses[404] = { description: 'No user found with that email' }
        throw new NotFoundError('No user found with that email')
    }

    console.log('1', password, user.password)


    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        // #swagger.responses[401] = { description: 'Incorrect password' }
        throw new UnauthorizedError('Incorrect password')
    }

    const token = jsonwebtoken.sign(
        {
            id: user.id,
            email: user.email
        },
        "MUST_USE_ENV_TOKEN",
        { expiresIn: '1d' }
    )

    /* #swagger.responses[200] = { 
    schema: { "token": "token-hash" },
    description: "User logged successfully." } */
    res.json({ token })

})

module.exports = router


