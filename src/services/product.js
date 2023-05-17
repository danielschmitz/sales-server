const db = require("../db")
const BadInputError = require("../errors/BadInputError")
const NotFoundError = require("../errors/NotFoundError")
const Joi = require("joi")
const table = require("../constants/table")

class product {
  async validate(data) {
    const productSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      quantityPerUnit: Joi.string(),
      unitsInStock: Joi.number().required(),
      unitPrice: Joi.number.required(),
      supplier_id: Joi.number.required(),
      category_id: Joi.number.required(),
      supplier: Joi.object(),
      category: Joi.object(),
      discontinued: Joi.boolean().default(false),
    })
    try {
      await productSchema.validateAsync(data)
    } catch (error) {
      throw new BadInputError(error.message)
    }
  }
  /**
   * Get all Products
   */
  async findAll() {
    return await db(table.products)
      .orderBy("id")
      .join(
        table.categories,
        `${table.products}.category_id`,
        `${table.categories}.id`
      )
      .join(
        table.suppliers,
        `${table.products}.supplier_id`,
        `${table.suppliers}.id`
      )
      .select(
        `${table.products}.*`,
        `${table.categories}.name as category_name`,
        `${table.suppliers}.companyName as supplier_company`,
        `${table.suppliers}.contactName as supplier_name`,
        `${table.suppliers}.contactEmail as supplier_email`
      )
  }
  /**
   * Get a Product by id
   */
  async findById(id) {
    if (!parseInt(id)) throw new BadInputError("Invalid id")
    const result = await db(table.products).where({ id })
    if (result.length == 0) throw new NotFoundError("Product not found")
    return result[0]
  }
  /**
   * Create a new Product
   */
  async create(product) {
    await this.validate(product)

    const { name, description } = product
    const checkName = await db(table.products).where({ name }).first()
    if (checkName !== undefined)
      throw new Error("There is already a product with that name")

    const result = await db(table.products).insert({
      name,
      description,
    })
    const id = result[0]
    return await db(table.products).where({ id }).first()
  }
  /*
   * Update a product
   */
  async update(id, product) {
    await this.validate(product)

    const { name, description } = product
    const checkName = await db(table.products)
      .where({ name })
      .whereNot("id", id)
      .first()

    if (checkName !== undefined)
      throw new Error("There is already a product with that name")

    await db(table.products).where({ id }).update({ name, description })

    return await db(table.products).where({ id }).first()
  }
  /**
   * Delete a product
   */
  async delete(id) {
    await this.findById(id) // check if product exists

    await db(table.products).where({ id }).delete()

    return id + " deleted"
  }
}

module.exports = new product()
