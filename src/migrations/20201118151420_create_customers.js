exports.up = function (knex, Promise) {
    return knex.schema.createTable('customers', table => {
        table.increments('id').primary()
        table.string('contactName', 100).notNullable()
        table.string('contactEmail', 100).notNullable()
        table.integer('address_id').unsigned()
        table.foreign('address_id').references('Addresses.id')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('customers')
};