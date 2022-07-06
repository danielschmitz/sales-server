exports.up = function (knex, Promise) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary()
        table.string('name', 100).notNullable()
        table.string('quantityPerUnit', 100).notNullable()
        table.decimal('unitPrice').notNullable()
        table.integer('unitsInStock').notNullable()
        table.boolean('discontinued')
        table.integer('supplier_id').unsigned()
        table.foreign('supplier_id').references('suppliers.id')
        table.integer('category_id').unsigned()
        table.foreign('category_id').references('categories.id')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('products')
};