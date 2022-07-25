const db = require("../db")
const BadInputError = require("../errors/BadInputError")
const NotFoundError = require("../errors/NotFoundError")
const Joi = require('joi')
const table = require("../constants/table")

class address {
    async validate(data) {
        const addressSchema = Joi.object({
            street: Joi.string()
                .min(3)
                .max(100)
                .required(),
            region: Joi.string().max(100),
            postalCode: Joi.string().max(100),
            country: Joi.string().max(100),
            phone: Joi.string().max(100),
            city: Joi.string().max(100).required()
        })
        try {
            await addressSchema.validateAsync(data)
        } catch (error) {
            throw new BadInputError(error.message)
        }
    }
    /**
     * Get all Addresses
     */
    async findAll() {
        return await db(table.addresses).orderBy('id')
    }
    /**
     * Get a Address by id
     */
    async findById(id) {
        if (!parseInt(id)) throw new BadInputError('Invalid id')
        const result = await db(table.addresses).where({ id })
        if (result.length == 0) throw new NotFoundError('Address not found')
        return result[0]
    }
    /**
     * Create a new Address
     */
    async create(address) {

        await this.validate(address)

        const { street, city, region,
            postalCode, country, phone } = address

        const result = await db(table.addresses).insert({
            street, city, region,
            postalCode, country, phone
        })
        const id = result
        return await db(table.addresses).where({ id }).first()
    }
    /*
    * Update a address
    */
    async update(id, address) {

        await this.validate(address)

        const { street, city, region,
            postalCode, country, phone } = address

        await db(table.addresses).where({ id })
            .update({
                street, city, region,
                postalCode, country, phone
            })

        return await db(table.addresses).where({ id }).first()
    }
    /**
     * Delete a address
     */
    async delete(id) {

        await this.findById(id) // check if address exists

        await db(table.addresses).where({ id }).delete()

        return id + ' deleted'
    }
}

module.exports = new address

