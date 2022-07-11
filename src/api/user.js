const router = require('express').Router()
const db = require('../db')
const BadInputError = require('../errors/BadInput')
const NotFoundError = require('../errors/NotFoundError')
const Joi = require('joi')
const bcrypt = require('bcrypt')



const userSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
})

router.get('/users', async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get All Users'

    /* #swagger.responses[200] = { 
 schema: [ { $ref: "#/definitions/UserResult" } ],
 description: "A list of users" } */
    res.json(await db('users').select(['id', 'name', 'email']).orderBy('id'))
})

router.get('/user/:id', async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get a User'
    const { id } = req.params

    // #swagger.responses[422] = { description: 'Invalid input' }
    if (!parseInt(id)) throw new BadInputError('Invalid id')

    const result = await db('users').select(['id', 'name', 'email']).where({ id })
    // #swagger.responses[404] = { description: 'User not found' }
    if (result.length == 0) throw new NotFoundError('User not found')

    /* #swagger.responses[200] = { 
   schema: { "$ref": "#/definitions/UserResult" },
   description: "User" } */
    res.json(result)
})

router.post('/user', async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Create a new User'
    /*	#swagger.parameters['user'] = {
            in: 'body',
            description: 'User Data',
            required: true,
            schema: { $ref: "#/definitions/User" }
    } */
    const user = req.body

    try {
        await userSchema.validateAsync(user)
    } catch (error) {
        // #swagger.responses[422] = { description: 'Invalid input' }
        throw new BadInputError(error.message)
    }


    const { name, email, password } = user

    const checkName = await db('users').where({ name }).first()
    // #swagger.responses[500] = { description: 'There is already a user with that name' }
    if (checkName !== undefined) throw new Error('There is already a user with that name')


    const checkEmail = await db('users').where({ email }).first()
    // #swagger.responses[500] = { description: 'There is already a email with that name' }
    if (checkEmail !== undefined) throw new Error('There is already a email with that name')

    const hash = bcrypt.hashSync(password, 10)

    const result = await db('users').insert({
        name,
        email,
        password: hash
    }).returning('id')

    const id = result[0]

    /* #swagger.responses[200] = { 
     schema: { "$ref": "#/definitions/UserResult" },
     description: "User registered successfully." } */
    res.json(await db('users').where({ id }).first())
})

router.put('/user/:id', async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Edit a User'
    /*	#swagger.parameters['user'] = {
            in: 'body',
            description: 'User Data',
            required: true,
            schema: { $ref: "#/definitions/User" }
    } */
    const { id } = req.params
    const user = req.body

    try {
        await userSchema.validateAsync(user)
    } catch (error) {
        // #swagger.responses[422] = { description: 'Invalid input' }
        throw new BadInputError(error.message)
    }

    const { name, description } = user
    const checkName = await db('users').where({ name }).whereNot('id', id).first()

    // #swagger.responses[500] = { description: 'There is already a user with that name' }
    if (checkName !== undefined) throw new Error('There is already a user with that name')

    await db('users').where({ id }).update({ name, description })

    /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/UserResult" },
    description: "User registered successfully." } */
    res.json(await db('users').where({ id }).first())
})

router.delete('/user/:id', async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete a User'
    const { id } = req.params

    // #swagger.responses[422] = { description: 'Invalid input' }
    if (!parseInt(id)) throw new BadInputError('Invalid id')

    const result = await db('users').where({ id })
    // #swagger.responses[404] = { description: 'User not found' }
    if (result.length == 0) throw new NotFoundError('User not found')

    await db('users').where({ id }).delete()

    /* #swagger.responses[200] = { 
  description: "User deleted" } */
    res.send(true)
})



module.exports = router