const db = require("../db")
const BadInputError = require("../errors/BadInputError")
const NotFoundError = require("../errors/NotFoundError")
const Joi = require('joi')
const table = require("../constants/table")
const address = require("./address")

class supplier {
    async validate(data) {
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
                .required(),
            address_id: Joi.number(),
            address: Joi.object()
        })
        try {
            await supplierSchema.validateAsync(data)
        } catch (error) {
            throw new BadInputError(error.message)
        }
    }
    /**
     * Get all Suppliers
     */
    async findAll() {
        return await db(table.suppliers)
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
    }
    /**
     * Get a Supplier by id
     */
    async findById(id) {
        if (!parseInt(id)) throw new BadInputError('Invalid id')
        const result = await db(table.suppliers).where({ id })
        if (result.length == 0) throw new NotFoundError('Supplier not found')
        // get address without join
        const { address_id } = result[0]
        if (address_id) {
            const resultAddress = await db(table.addresses).where({ id: address_id })
            result[0].address = resultAddress
        }
        return result[0]
    }
    /**
     * Create a new Supplier
     */
    async create(supplier) {

        await this.validate(supplier)
        await address.validate(supplier.address)

        const { companyName,
            contactName,
            contactEmail
        } = supplier

        const {
            street, city, region,
            postalCode, country, phone
        } = supplier.address

        const checkEmail = await db(table.suppliers).where({ contactEmail }).first()
        if (checkEmail !== undefined) throw new Error('There is already a supplier with that email')

        const address_result = await address.create({
            street, city, region,
            postalCode, country, phone
        })

        const result = await db(table.suppliers).insert({
            companyName,
            contactName,
            contactEmail,
            address_id: address_result.id
        })
        const id = result

        return await this.findById(id)
    }
    /*
    * Update a supplier
    */
    async update(id, supplier) {

        await this.validate(supplier)
        await address.validate(supplier.address)

        const { companyName,
            contactName,
            contactEmail
        } = supplier

        const checkEmail = await db(table.suppliers).where({ contactEmail }).whereNot('id', id).first()
        if (checkEmail !== undefined) throw new Error('There is already a supplier with that email')

        const { address_id } = await this.findById(id)

        await address.update(address_id, supplier.address)

        await db(table.suppliers).where({ id }).update({
            companyName,
            contactName,
            contactEmail
        })

        return await this.findById(id)
    }
    /**
     * Delete a supplier
     */
    async delete(id) {

        await this.findById(id) // check if supplier exists

        await db(table.suppliers).where({ id }).delete()

        return id + ' deleted'
    }
}

module.exports = new supplier

