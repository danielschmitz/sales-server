exports.up = function (knex, _Promise) {
  console.log("migrate addresses")
  return knex.schema.createTable("addresses", (table) => {
    table.increments("id").primary()
    table.string("street", 100).notNullable()
    table.string("city", 100).notNullable()
    table.string("region", 100)
    table.string("postalCode", 20).notNullable()
    table.string("country", 100).notNullable()
    table.string("phone", 100).notNullable()
  })
}

exports.down = function (knex, _Promise) {
  return knex.schema.dropTable("addresses")
}
