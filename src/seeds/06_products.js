

exports.seed = function (knex, _Promise) {
  console.log('seed product')
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          "name": "Chef Anton's Cajun Seasoning",
          "quantityPerUnit": "48 - 6 oz jars",
          "unitsInStock": 53,
          "unitPrice": 22.10,
          "supplier_id": 1,
          "category_id": 3,
          "discontinued": false,
        },
        {
          "name": "Chef Anton's Gumbo Mix",
          "quantityPerUnit": "36 boxes",
          "unitsInStock": 23,
          "unitPrice": 12.10,
          "supplier_id": 1,
          "category_id": 1,
          "discontinued": false,
        },
      ])
    })
}