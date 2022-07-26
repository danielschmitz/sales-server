exports.up = function (knex, _Promise) {
    console.log('migrate order_product')
    return knex.schema.createTable('order_product', table => {
        table.integer('product_id')
        table.integer('order_id')
        table.primary(['product_id', 'order_id'])

        table.decimal('unitPrice')
        table.integer('quantity')

        table.foreign('product_id').references('products.id')
        table.foreign('order_id').references('orders.id')
    })
}

exports.down = function (knex, _Promise) {
    return knex.schema.dropTable('order_product')
}