const router = require("express").Router()
const auth = require("../services/auth")
const product = require("../services/product")

router.get("/products", async (req, res) => {
  /* 
    #swagger.tags = ['Products']
    #swagger.summary = 'Get All Products'
    #swagger.responses[200] = { 
        schema: [ { $ref: "#/definitions/ProductSimpleResult" } ],
        description: "A list of products" }
    */
  res.json(await product.findAll())
})

router.get("/product/:id", async (req, res) => {
  /* 
    #swagger.tags = ['Products']
    #swagger.summary = 'Get a Product' 
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[404] = { description: 'Product not found' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/ProductResult" },
        description: "Product" 
    } 
    */
  res.json(await product.findById(req.params.id))
})

router.post("/product", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Products']
    #swagger.summary = '🔒️ Create a new Product'
    #swagger.parameters['product'] = {
        in: 'body',
        description: 'Product Data',
        required: true,
        schema: { $ref: "#/definitions/Product" }
    } 
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[500] = { description: 'There is already a product with that name' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/ProductResult" },
        description: "Product registered successfully." } 
    */
  res.json(await product.create(req.body))
})

router.put("/product/:id", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Products']
    #swagger.summary = '🔒️ Edit a Product'
    #swagger.parameters['product'] = {
            in: 'body',
            description: 'Product Data',
            required: true,
            schema: { $ref: "#/definitions/Product" }
        } 
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[500] = { description: 'There is already a product with that name' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/ProductResult" },
        description: "Product registered successfully." }
    */
  res.json(await product.update(req.params.id, req.body))
})

router.delete("/product/:id", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Products']
    #swagger.summary = '🔒️ Delete a Product' 
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[404] = { description: 'Product not found' }
    #swagger.responses[200] = {description: "Product deleted" } 
    */
  res.send(await product.delete(req.params.id))
})

module.exports = router
