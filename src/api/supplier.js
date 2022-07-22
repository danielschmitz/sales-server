const router = require('express').Router()
const db = require('../db')
const BadInputError = require('../errors/BadInputError')
const NotFoundError = require('../errors/NotFoundError')
const Joi = require('joi')
const auth = require('../auth')


const supplierSchema = Joi.object({
    companyName: Joi.string()
        .min(3)
        .max(100)
        .required(),
    contactName: Joi.string()
        .min(2)
        .max(100)
        .required(),
    contactEmail: Joi.string()
        .min(2)
        .max(100)
        .email()
        .required()
})

router.get('/suppliers', async (req, res) => {
    /*     
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'Get All Suppliers'
    #swagger.responses[200] = { 
        schema: [ { $ref: "#/definitions/SupplierResult" } ],
        description: "A list of suppliers" } 
    */
    res.json(await
        db('suppliers')
            .orderBy('suppliers.id')
            .join('addresses', 'suppliers.address_id', 'addresses.id')
            .select(
                'suppliers.*',
                'addresses.street as street',
                'addresses.city as city',
                'addresses.region as region',
                'addresses.postalCode as postalCode',
                'addresses.country as country',
                'addresses.phone as phone'
            )
    )
})

router.get('/supplier/:id', async (req, res) => {
    /* 
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'Get a Supplier' 
    */
    const { id } = req.params

    // #swagger.responses[422] = { description: 'Invalid input' }
    if (!parseInt(id)) throw new BadInputError('Invalid id')

    const result = await db('suppliers').where({ id })
    // #swagger.responses[404] = { description: 'Supplier not found' }
    if (result.length == 0) throw new NotFoundError('Supplier not found')

    /* 
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/SupplierResult" },
        description: "Supplier" } 
    */
    res.json(result)
})

router.post('/supplier', auth.checkLogin, async (req, res) => {
    /* 
    #swagger.tags = ['Suppliers']
    #swagger.summary = '🔒️ Create a new Supplier'
    #swagger.parameters['supplier'] = {
            in: 'body',
            description: 'Supplier Data',
            required: true,
            schema: { $ref: "#/definitions/Supplier" }
    }
    */
    const supplier = req.body

    try {
        await supplierSchema.validateAsync(supplier)
    } catch (error) {
        // #swagger.responses[422] = { description: 'Invalid input' }
        throw new BadInputError(error.message)
    }


    const { name, description } = supplier
    const checkName = await db('suppliers').where({ name }).first()

    // #swagger.responses[500] = { description: 'There is already a supplier with that name' }
    if (checkName !== undefined) throw new Error('There is already a supplier with that name')

    const result = await db('suppliers').insert({
        name,
        description
    }).returning('id')

    const id = result[0]

    /* 
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/SupplierResult" },
        description: "Supplier registered successfully." 
    } 
    */
    res.json(await db('suppliers').where({ id }).first())
})

router.put('/supplier/:id', auth.checkLogin, async (req, res) => {
    /* 
    #swagger.tags = ['Suppliers']
    #swagger.summary = '🔒️ Edit a Supplier'
    #swagger.parameters['supplier'] = {
            in: 'body',
            description: 'Supplier Data',
            required: true,
            schema: { $ref: "#/definitions/Supplier" }
    } 
    */
    const { id } = req.params
    const supplier = req.body

    try {
        await supplierSchema.validateAsync(supplier)
    } catch (error) {
        // #swagger.responses[422] = { description: 'Invalid input' }
        throw new BadInputError(error.message)
    }

    const { name, description } = supplier
    const checkName = await db('suppliers').where({ name }).whereNot('id', id).first()

    // #swagger.responses[500] = { description: 'There is already a supplier with that name' }
    if (checkName !== undefined) throw new Error('There is already a supplier with that name')

    await db('suppliers').where({ id }).update({ name, description })

    /* 
    #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/SupplierResult" },
    description: "Supplier registered successfully." } 
    */
    res.json(await db('suppliers').where({ id }).first())
})

router.delete('/supplier/:id', auth.checkLogin, async (req, res) => {
    /* 
    #swagger.tags = ['Suppliers']
    #swagger.summary = '🔒️ Delete a Supplier' 
    */
    const { id } = req.params

    // #swagger.responses[422] = { description: 'Invalid input' }
    if (!parseInt(id)) throw new BadInputError('Invalid id')

    const result = await db('suppliers').where({ id })
    // #swagger.responses[404] = { description: 'Supplier not found' }
    if (result.length == 0) throw new NotFoundError('Supplier not found')

    await db('suppliers').where({ id }).delete()

    // #swagger.responses[200] = { description: "Supplier deleted" } 
    res.send(true)
})



module.exports = router