const router = require("express").Router()
const db = require("../db")
const BadInputError = require("../errors/BadInputError")
const NotFoundError = require("../errors/NotFoundError")
const Joi = require("joi")
const bcrypt = require("bcrypt")

const auth = require("../services/auth")

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required().email(),
  password: Joi.string(),
})

router.get("/users", async (req, res) => {
  /*   
    #swagger.tags = ['Users']
    #swagger.summary = 'Get All Users'
    #swagger.responses[200] = { 
    schema: [ { $ref: "#/definitions/UserResult" } ],
            description: "A list of users" }  
    */
  res.json(await db("users").select(["id", "name", "email"]).orderBy("id"))
})

router.get("/user/:id", async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get a User'
    */
  const { id } = req.params

  // #swagger.responses[422] = { description: 'Invalid input' }
  if (!parseInt(id)) throw new BadInputError("Invalid id")

  const result = await db("users").select(["id", "name", "email"]).where({ id })
  // #swagger.responses[404] = { description: 'User not found' }
  if (result.length == 0) throw new NotFoundError("User not found")

  /* 
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/UserResult" },
        description: "User" 
    } 
    */
  res.json(result)
})

router.post("/user", async (req, res) => {
  /* 
        #swagger.tags = ['Users']
        #swagger.summary = 'Create a new User'
        #swagger.parameters['user'] = {
                in: 'body',
                description: 'User Data',
                required: true,
                schema: { $ref: "#/definitions/User" }
        }
    */
  const user = req.body

  try {
    await userSchema.validateAsync(user)
  } catch (error) {
    // #swagger.responses[422] = { description: 'Invalid input' }
    throw new BadInputError(error.message)
  }

  const { name, email, password } = user

  const checkName = await db("users").where({ name }).first()
  // #swagger.responses[500] = { description: 'There is already a user with that name' }
  if (checkName !== undefined)
    throw new Error("There is already a user with that name")

  const checkEmail = await db("users").where({ email }).first()
  // #swagger.responses[500] = { description: 'There is already a email with that name' }
  if (checkEmail !== undefined)
    throw new Error("There is already a email with that name")

  const hash = bcrypt.hashSync(password, 10)

  const result = await db("users").insert({
    name,
    email,
    password: hash,
  })

  const id = result[0]

  /* 
    #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/UserResult" },
    description: "User registered successfully." } 
    */
  res.json(
    await db("users").select(["id", "name", "email"]).where({ id }).first()
  )
})

router.put("/user/:id", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Users']
    #swagger.summary = '🔒️ Edit a User'
    #swagger.parameters['user'] = {
            in: 'body',
            description: 'User Data',
            required: true,
            schema: { $ref: "#/definitions/User" }
    } 
    */
  const { id } = req.params

  // #swagger.responses[422] = { description: 'Invalid input' }
  if (!parseInt(id)) throw new BadInputError("Invalid id")

  const userLogged = auth.getTokenData(req)

  // #swagger.responses[422] = { description: 'Invalid input' }
  if (userLogged.id != id) throw new BadInputError("Invalid id!")

  const user = req.body

  try {
    await userSchema.validateAsync(user)
  } catch (error) {
    // #swagger.responses[422] = { description: 'Invalid input' }
    throw new BadInputError(error.message)
  }

  const { name, email } = user
  const checkName = await db("users").where({ name }).whereNot("id", id).first()

  // #swagger.responses[500] = { description: 'There is already a user with that name' }
  if (checkName !== undefined)
    throw new Error("There is already a user with that name")

  const checkEmail = await db("users")
    .where({ email })
    .whereNot("id", id)
    .first()

  // #swagger.responses[500] = { description: 'There is already a user with that email' }
  if (checkEmail !== undefined)
    throw new Error("There is already a user with that email")

  await db("users").where({ id }).update({ name, email })

  /* 
    #swagger.responses[200] = { 
        schema: { "$ref": "#/definitions/UserResult" },
        description: "User updated successfully." 
    } 
    */
  res.json(
    await db("users").select(["id", "name", "email"]).where({ id }).first()
  )
})

router.put("/user/changePassword/:id", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Users']
    #swagger.summary = '🔒️ Change a password'
    #swagger.parameters['user'] = {
            in: 'body',
            description: 'User Data',
            required: true,
            schema: { 
                "password": "123@456"
            }
    } 
    */
  const { id } = req.params

  // #swagger.responses[422] = { description: 'Invalid input' }
  if (!parseInt(id)) throw new BadInputError("Invalid id")

  const userLogged = auth.getTokenData(req)

  // #swagger.responses[422] = { description: 'Invalid input' }
  if (userLogged.id != id) throw new BadInputError("Invalid id!")

  const { password } = req.body

  if (!password) {
    // #swagger.responses[422] = { description: 'Invalid input' }
    throw new BadInputError("Invalid input")
  }

  const hash = bcrypt.hashSync(password, 10)

  await db("users").where({ id }).update({ password: hash })

  /* 
    #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/UserResult" },
    description: "Password updated successfully." } 
    */
  res.json(
    await db("users").select(["id", "name", "email"]).where({ id }).first()
  )
})

router.delete("/user/:id", auth.checkLogin, async (req, res) => {
  /* 
    #swagger.tags = ['Users']
    #swagger.summary = '🔒️ Delete a User' 
    */
  const { id } = req.params

  // #swagger.responses[422] = { description: 'Invalid input' }
  if (!parseInt(id)) throw new BadInputError("Invalid id")

  const result = await db("users").where({ id })
  // #swagger.responses[404] = { description: 'User not found' }
  if (result.length == 0) throw new NotFoundError("User not found")

  await db("users").where({ id }).delete()

  // #swagger.responses[200] = { description: "User deleted" } */
  res.send(true)
})

module.exports = router
