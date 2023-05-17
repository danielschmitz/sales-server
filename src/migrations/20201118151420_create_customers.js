exports.up = function (knex, _Promise) {
  console.log("migrate customers")
  return knex.schema.createTable("customers", (table) => {
    table.increments("id").primary()
    table.string("contactName", 100).notNullable()
    table.string("contactEmail", 100).notNullable()
    table.integer("address_id").unsigned()
    table.foreign("address_id").references("addresses.id")
  })
}

exports.down = function (knex, _Promise) {
  return knex.schema.dropTable("customers")
}
