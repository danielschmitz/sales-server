const db = require("../db")
const BadInputError = require("../errors/BadInputError")
const NotFoundError = require("../errors/NotFoundError")
const Joi = require('joi')
const table = require("../constants/table")

class CategoryService {
    constructor() {
    }
    async validate(data) {
        const categorySchema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
            description: Joi.string()
                .max(30)
        })
        try {
            await categorySchema.validateAsync(data)
        } catch (error) {
            throw new BadInputError(error.message)
        }
    }
    async exists(id) {
        const result = await db(table.categories).where({ id })
        if (result.length == 0) throw new NotFoundError('Category not found')
        return result
    }
    /**
     * Get all Categories
     */
    async findAll() {
        return await db(table.categories).orderBy('id')
    }
    /**
     * Get a Category by id
     */
    async findById(id) {
        if (!parseInt(id)) throw new BadInputError('Invalid id')
        return await this.exists(id)
    }
    /**
     * Create a new Category
     */
    async create(category) {

        await this.validate(category)

        const { name, description } = category
        const checkName = await db(table.categories).where({ name }).first()
        if (checkName !== undefined) throw new Error('There is already a category with that name')

        const result = await db(table.categories).insert({
            name,
            description
        }).returning('id')
        const id = result[0]
        return await db(table.categories).where({ id }).first()
    }
    /*
    * Update a category
    */
    async update(id, category) {

        await this.validate(category)

        const { name, description } = category
        const checkName = await db(table.categories).where({ name }).whereNot('id', id).first()

        if (checkName !== undefined) throw new Error('There is already a category with that name')

        await db(table.categories).where({ id }).update({ name, description })

        return await db(table.categories).where({ id }).first()
    }
    /**
     * Delete a category
     */
    async delete(id) {
        if (!parseInt(id)) throw new BadInputError('Invalid id')

        this.exists(id)

        await db(table.categories).where({ id }).delete()

        return id + ' deleted'
    }
}

module.exports = CategoryService

