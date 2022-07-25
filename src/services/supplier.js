const db = require("../db")
const BadInputError = require("../errors/BadInputError")
const NotFoundError = require("../errors/NotFoundError")
const Joi = require('joi')
const table = require("../constants/table")




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
                .required()
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
        return await db(table.supplier)
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
        const result = await db(table.categories).where({ id })
        if (result.length == 0) throw new NotFoundError('Supplier not found')
        return result
    }
    /**
     * Create a new Supplier
     */
    async create(supplier) {

        await this.validate(supplier)

        const { name, description } = supplier
        const checkName = await db(table.categories).where({ name }).first()
        if (checkName !== undefined) throw new Error('There is already a supplier with that name')

        const result = await db(table.categories).insert({
            name,
            description
        }).returning('id')
        const id = result[0]
        return await db(table.categories).where({ id }).first()
    }
    /*
    * Update a supplier
    */
    async update(id, supplier) {

        await this.validate(supplier)

        const { name, description } = supplier
        const checkName = await db(table.categories).where({ name }).whereNot('id', id).first()

        if (checkName !== undefined) throw new Error('There is already a supplier with that name')

        await db(table.categories).where({ id }).update({ name, description })

        return await db(table.categories).where({ id }).first()
    }
    /**
     * Delete a supplier
     */
    async delete(id) {

        await this.findById(id) // check if supplier exists

        await db(table.categories).where({ id }).delete()

        return id + ' deleted'
    }
}

module.exports = new supplier

