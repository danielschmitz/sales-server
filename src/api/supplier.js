const router = require("express").Router()

const auth = require("../services/auth")
const supplier = require("../services/supplier")

router.get("/suppliers", async (req, res) => {
  /*     
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'Get All Suppliers'
    #swagger.responses[200] = { 
        schema: [ { $ref: "#/definitions/SupplierSimpleResult" } ],
        description: "A list of suppliers" } 
    */
  res.json(await supplier.findAll())
})

router.get("/supplier/:id", async (req, res) => {
  /* 
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'Get a Supplier'
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[404] = { description: 'Supplier not found' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/SupplierResult" },
        description: "Supplier"
    } 
    */
  res.json(await supplier.findById(req.params.id))
})

router.post("/supplier", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Suppliers']
    #swagger.summary = '🔒️ Create a new Supplier'
    #swagger.parameters['supplier'] = {
            in: 'body',
            description: 'Supplier Data',
            required: true,
            schema: { $ref: "#/definitions/Supplier" }
    }
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[500] = { description: 'There is already a supplier with that name' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/SupplierResult" },
        description: "Supplier registered successfully." 
    } 
    */
  res.json(await supplier.create(req.body))
})

router.put("/supplier/:id", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Suppliers']
    #swagger.summary = '🔒️ Edit a Supplier'
    #swagger.parameters['supplier'] = {
            in: 'body',
            description: 'Supplier Data',
            required: true,
            schema: { $ref: "#/definitions/Supplier" }
    }
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[500] = { description: 'There is already a supplier with that name' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/SupplierResult" },
        description: "Supplier registered successfully." 
    } 
    */
  res.json(await supplier.update(req.params.id, req.body))
})

router.delete("/supplier/:id", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Suppliers']
    #swagger.summary = '🔒️ Delete a Supplier'
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[404] = { description: 'Supplier not found' }
    #swagger.responses[200] = { description: "Supplier deleted" }
    */
  res.send(await supplier.delete(req.params.id))
})

module.exports = router
