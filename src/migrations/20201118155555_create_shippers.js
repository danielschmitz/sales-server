exports.up = function (knex, _Promise) {
    return knex.schema.createTable('shippers', table => {
        table.increments('id').primary()
        table.string('companyName', 100).notNullable()
        table.string('contactName', 100).notNullable()
        table.string('contactEmail', 100).notNullable()
        table.integer('address_id').unsigned()
        table.foreign('address_id').references('Addresses.id')
    })
}

exports.down = function (knex, _Promise) {
    return knex.schema.dropTable('shippers')
}