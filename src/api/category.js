const router = require('express').Router()
const db = require('../db')
const BadInputError = require('../errors/BadInputError')
const NotFoundError = require('../errors/NotFoundError')
const Joi = require('joi')
const checkLogin = require('../libs/checkLogin')


const categorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string()
        .max(30)
})

router.get('/categories', checkLogin, async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Get All Categories'

    /* #swagger.responses[200] = { 
 schema: [ { $ref: "#/definitions/CategoryResult" } ],
 description: "A list of categories" } */
    res.json(await db('categories').orderBy('id'))
})

router.get('/category/:id', async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Get a Category'
    const { id } = req.params

    // #swagger.responses[422] = { description: 'Invalid input' }
    if (!parseInt(id)) throw new BadInputError('Invalid id')

    const result = await db('categories').where({ id })
    // #swagger.responses[404] = { description: 'Category not found' }
    if (result.length == 0) throw new NotFoundError('Category not found')

    /* #swagger.responses[200] = { 
   schema: { "$ref": "#/definitions/CategoryResult" },
   description: "Category" } */
    res.json(result)
})

router.post('/category', async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Create a new Category'
    /*	#swagger.parameters['category'] = {
            in: 'body',
            description: 'Category Data',
            required: true,
            schema: { $ref: "#/definitions/Category" }
    } */
    const category = req.body

    try {
        await categorySchema.validateAsync(category)
    } catch (error) {
        // #swagger.responses[422] = { description: 'Invalid input' }
        throw new BadInputError(error.message)
    }


    const { name, description } = category
    const checkName = await db('categories').where({ name }).first()

    // #swagger.responses[500] = { description: 'There is already a category with that name' }
    if (checkName !== undefined) throw new Error('There is already a category with that name')

    const result = await db('categories').insert({
        name,
        description
    }).returning('id')

    const id = result[0]

    /* #swagger.responses[200] = { 
     schema: { "$ref": "#/definitions/CategoryResult" },
     description: "Category registered successfully." } */
    res.json(await db('categories').where({ id }).first())
})

router.put('/category/:id', async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Edit a Category'
    /*	#swagger.parameters['category'] = {
            in: 'body',
            description: 'Category Data',
            required: true,
            schema: { $ref: "#/definitions/Category" }
    } */
    const { id } = req.params
    const category = req.body

    try {
        await categorySchema.validateAsync(category)
    } catch (error) {
        // #swagger.responses[422] = { description: 'Invalid input' }
        throw new BadInputError(error.message)
    }

    const { name, description } = category
    const checkName = await db('categories').where({ name }).whereNot('id', id).first()

    // #swagger.responses[500] = { description: 'There is already a category with that name' }
    if (checkName !== undefined) throw new Error('There is already a category with that name')

    await db('categories').where({ id }).update({ name, description })

    /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/CategoryResult" },
    description: "Category registered successfully." } */
    res.json(await db('categories').where({ id }).first())
})

router.delete('/category/:id', async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Delete a Category'
    const { id } = req.params

    // #swagger.responses[422] = { description: 'Invalid input' }
    if (!parseInt(id)) throw new BadInputError('Invalid id')

    const result = await db('categories').where({ id })
    // #swagger.responses[404] = { description: 'Category not found' }
    if (result.length == 0) throw new NotFoundError('Category not found')

    await db('categories').where({ id }).delete()

    /* #swagger.responses[200] = { 
  description: "Category deleted" } */
    res.send(true)
})



module.exports = router