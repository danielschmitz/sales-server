exports.up = function (knex, Promise) {
    return knex.schema.createTable('orders', table => {
        table.increments('id').primary()

        table.date('orderDate')
        table.date('shippedDate')
        table.decimal('freight')
        
        table.integer('customer_id').unsigned()
        table.foreign('customer_id').references('customers.id')
        
        table.integer('employee_id').unsigned()
        table.foreign('employee_id').references('employees.id')
        
        table.integer('shipper_id').unsigned()
        table.foreign('shipper_id').references('shippers.id')
        
        table.integer('to').unsigned()
        table.foreign('to').references('address.id')

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('orders')
};