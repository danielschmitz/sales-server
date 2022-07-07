
exports.up = function (knex, _Promise) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary()
        table.string('name', 40).notNullable()
        table.string('description', 200)
    })
}

exports.down = function (knex, _Promise) {
    return knex.schema.dropTable('categories')
}