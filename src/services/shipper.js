const db = require("../db")
const BadInputError = require("../errors/BadInputError")
const NotFoundError = require("../errors/NotFoundError")
const Joi = require("joi")
const table = require("../constants/table")
const address = require("./address")

class shipper {
  async validate(data) {
    const shipperSchema = Joi.object({
      companyName: Joi.string().min(3).max(100).required(),
      contactName: Joi.string().min(2).max(100).required(),
      contactEmail: Joi.string().min(2).max(100).email().required(),
      address_id: Joi.number(),
      address: Joi.object(),
    })
    try {
      await shipperSchema.validateAsync(data)
    } catch (error) {
      throw new BadInputError(error.message)
    }
  }
  /**
   * Get all Shippers
   */
  async findAll() {
    return await db(table.shippers)
      .orderBy("shippers.id")
      .join("addresses", "shippers.address_id", "addresses.id")
      .select(
        "shippers.*",
        "addresses.street as street",
        "addresses.city as city",
        "addresses.region as region",
        "addresses.postalCode as postalCode",
        "addresses.country as country",
        "addresses.phone as phone"
      )
  }
  /**
   * Get a Shipper by id
   */
  async findById(id) {
    if (!parseInt(id)) throw new BadInputError("Invalid id")
    const result = await db(table.shippers).where({ id })
    if (result.length == 0) throw new NotFoundError("Shipper not found")
    // get address without join
    const { address_id } = result[0]
    if (address_id) {
      const resultAddress = await db(table.addresses).where({ id: address_id })
      result[0].address = resultAddress
    }
    return result[0]
  }
  /**
   * Create a new Shipper
   */
  async create(shipper) {
    await this.validate(shipper)
    await address.validate(shipper.address)

    const { companyName, contactName, contactEmail } = shipper

    const { street, city, region, postalCode, country, phone } = shipper.address

    const checkEmail = await db(table.shippers).where({ contactEmail }).first()
    if (checkEmail !== undefined)
      throw new Error("There is already a shipper with that email")

    const address_result = await address.create({
      street,
      city,
      region,
      postalCode,
      country,
      phone,
    })

    const result = await db(table.shippers).insert({
      companyName,
      contactName,
      contactEmail,
      address_id: address_result.id,
    })
    const id = result

    return await this.findById(id)
  }
  /*
   * Update a shipper
   */
  async update(id, shipper) {
    await this.validate(shipper)
    await address.validate(shipper.address)

    const { companyName, contactName, contactEmail } = shipper

    const checkEmail = await db(table.shippers)
      .where({ contactEmail })
      .whereNot("id", id)
      .first()
    if (checkEmail !== undefined)
      throw new Error("There is already a shipper with that email")

    const { address_id } = await this.findById(id)

    await address.update(address_id, shipper.address)

    await db(table.shippers).where({ id }).update({
      companyName,
      contactName,
      contactEmail,
    })

    return await this.findById(id)
  }
  /**
   * Delete a shipper
   */
  async delete(id) {
    const shipper = await this.findById(id) // check if shipper exists

    await db(table.addresses).where({ id: shipper.address_id }).delete()

    await db(table.shippers).where({ id }).delete()

    return `deleted shipper ${id} and address ${shipper.address_id}`
  }
}

module.exports = new shipper()
