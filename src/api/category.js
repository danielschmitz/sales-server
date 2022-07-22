const router = require('express').Router()
const auth = require('../services/auth')
const category = require('../services/category')

router.get('/categories', async (req, res) => {
    /* 
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get All Categories'
    #swagger.responses[200] = { 
        schema: [ { $ref: "#/definitions/CategoryResult" } ],
        description: "A list of categories" }
    */
    res.json(await category.findAll())
})

router.get('/category/:id', async (req, res) => {
    /* 
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get a Category' 
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[404] = { description: 'Category not found' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/CategoryResult" },
        description: "Category" 
    } 
    */
    res.json(await category.findById(req.params.id))
})

router.post('/category', auth.checkLogin, async (req, res) => {
    /* 
    #swagger.tags = ['Categories']
    #swagger.summary = '🔒️ Create a new Category'
    #swagger.parameters['category'] = {
        in: 'body',
        description: 'Category Data',
        required: true,
        schema: { $ref: "#/definitions/Category" }
    } 
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[500] = { description: 'There is already a category with that name' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/CategoryResult" },
        description: "Category registered successfully." } 
    */
    res.json(await category.create(req.body))
})

router.put('/category/:id', auth.checkLogin, async (req, res) => {
    /* 
    #swagger.tags = ['Categories']
    #swagger.summary = '🔒️ Edit a Category'
    #swagger.parameters['category'] = {
            in: 'body',
            description: 'Category Data',
            required: true,
            schema: { $ref: "#/definitions/Category" }
        } 
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[500] = { description: 'There is already a category with that name' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/CategoryResult" },
        description: "Category registered successfully." }
    */
    res.json(await category.update(req.params.id, req.body))
})

router.delete('/category/:id', auth.checkLogin, async (req, res) => {
    /* 
    #swagger.tags = ['Categories']
    #swagger.summary = '🔒️ Delete a Category' 
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[404] = { description: 'Category not found' }
    #swagger.responses[200] = {description: "Category deleted" } 
    */
    res.send(await category.delete(req.params.id))
})



module.exports = router