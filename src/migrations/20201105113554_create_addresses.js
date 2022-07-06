exports.up = function (knex, Promise) {
    return knex.schema.createTable('addresses', table => {
        table.increments('id').primary()
        table.string('street', 100).notNullable()
        table.string('city', 100).notNullable()
        table.string('region', 100)
        table.string('postalCode', 20).notNullable()
        table.string('country', 100).notNullable()
        table.string('phone', 100).notNullable()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('addresses')
};