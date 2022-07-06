exports.up = function (knex, Promise) {
    return knex.schema.createTable('employees', table => {
        table.increments('id').primary()
        table.string('firstName', 100).notNullable()
        table.string('lastName', 100).notNullable()
        table.string('title', 100)
        table.date('birthDate')
        table.date('hireDate')
        table.text('notes')
        table.integer('reports_to').unsigned()
        table.foreign('reports_to').references('employees.id')
        table.integer('address_id').unsigned()
        table.foreign('address_id').references('addresses.id')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('employees')
};