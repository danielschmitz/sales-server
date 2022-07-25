require('dotenv').config()

const jwt = require("jsonwebtoken")
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const db = require("../db")
const UnauthorizedError = require('../errors/UnauthorizedError')
const BadInputError = require('../errors/BadInputError')
const NotFoundError = require('../errors/NotFoundError')
const table = require('../constants/table')

const userSchema = Joi.object({
    password: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .required()
        .email()
})

class auth {
    tryLogin = async (user) => {
        const { email, password } = user
        await this.validateInputData(email, password)
        await this.validateUser(email, password)
        const token = this.generateToken(user)
        return token
    }

    checkLogin = async (req, res, next) => {
        const token = req.headers["authorization"]
        if (!token) {
            throw new UnauthorizedError("Token not present")
        }
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_SECRET, function (err, auth) {
            if (err) {
                throw new UnauthorizedError("Unauthorized")
            } else {
                req.auth = auth
                next()
            }
        })

    }

    getTokenData = (req) => ({
        id: req.auth.id,
        email: req.auth.email
    })

    generateToken(user) {
        return jsonwebtoken.sign(
            {
                id: user.id,
                email: user.email
            },
            // eslint-disable-next-line no-undef
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
    }

    async validateUser(email, password) {
        const userDb = await db(table.users).where({ email }).first()
        if (!userDb) {
            throw new NotFoundError('No user found with that email')
        }
        const valid = await bcrypt.compare(password, userDb.password)
        if (!valid) {
            throw new UnauthorizedError('Incorrect password')
        }
    }

    async validateInputData(email, password) {
        try {
            await userSchema.validateAsync({ email, password })
        } catch (error) {
            throw new BadInputError(error.message)
        }
    }
}

module.exports = new auth