const router = require('express').Router()
const db = require('../db')
const BadInputError = require('../errors/BadInput')
const NotFoundError = require('../errors/NotFoundError')

router.get('/categories', async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Get All Categories'
    res.json(await db('categories').orderBy('id'))
})

router.get('/category/:id', async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Get a Category by ID'
    const { id } = req.params
    if (!parseInt(id)) throw new BadInputError('Invalid id')
    const result = await db('categories').where({ id })
    if (result.length == 0) throw new NotFoundError('Category not found')
    res.json(result)
})

router.post('/category', async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Create a new Category'
    /*	#swagger.parameters['category'] = {
            in: 'body',
            description: 'Category Data',
            required: true,
            schema: { $ref: "#/definitions/AddCategory" }
    } */
    const category = req.body
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
     schema: { "$ref": "#/definitions/Category" },
     description: "Category registered successfully." } */
    res.json(await db('categories').where({ id }).first())
})


module.exports = router