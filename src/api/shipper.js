const router = require("express").Router()

const auth = require("../services/auth")
const shipper = require("../services/shipper")

router.get("/shippers", async (req, res) => {
  /*     
    #swagger.tags = ['Shippers']
    #swagger.summary = 'Get All Shippers'
    #swagger.responses[200] = { 
        schema: [ { $ref: "#/definitions/ShipperSimpleResult" } ],
        description: "A list of shippers" } 
    */
  res.json(await shipper.findAll())
})

router.get("/shipper/:id", async (req, res) => {
  /* 
    #swagger.tags = ['Shippers']
    #swagger.summary = 'Get a Shipper'
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[404] = { description: 'Shipper not found' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/ShipperResult" },
        description: "Shipper"
    } 
    */
  res.json(await shipper.findById(req.params.id))
})

router.post("/shipper", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Shippers']
    #swagger.summary = '🔒️ Create a new Shipper'
    #swagger.parameters['shipper'] = {
            in: 'body',
            description: 'Shipper Data',
            required: true,
            schema: { $ref: "#/definitions/Shipper" }
    }
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[500] = { description: 'There is already a shipper with that name' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/ShipperResult" },
        description: "Shipper registered successfully." 
    } 
    */
  res.json(await shipper.create(req.body))
})

router.put("/shipper/:id", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Shippers']
    #swagger.summary = '🔒️ Edit a Shipper'
    #swagger.parameters['shipper'] = {
            in: 'body',
            description: 'Shipper Data',
            required: true,
            schema: { $ref: "#/definitions/Shipper" }
    }
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[500] = { description: 'There is already a shipper with that name' }
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/ShipperResult" },
        description: "Shipper registered successfully." 
    } 
    */
  res.json(await shipper.update(req.params.id, req.body))
})

router.delete("/shipper/:id", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Shippers']
    #swagger.summary = '🔒️ Delete a Shipper'
    #swagger.responses[422] = { description: 'Invalid input' }
    #swagger.responses[404] = { description: 'Shipper not found' }
    #swagger.responses[200] = { description: "Shipper deleted" }
    */
  res.send(await shipper.delete(req.params.id))
})

module.exports = router
