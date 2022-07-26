
exports.seed = function (knex) {
  console.log('seed orders')
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(async function () {
      // Inserts seed entries

      const addressShipId = await knex('addresses').insert(
        {
          'street': 'Ship Street',
          'city': 'Ship City',
          'region': 'Ship Region',
          'postalCode': 'Ship Postal Code',
          'country': 'Ship Country',
          'phone': 'Ship Phone'
        }
      )

      return knex('orders').insert([
        {
          "orderDate": new Date().toISOString(),
          "shippedDate": null,
          "freight": 10.2,
          "customer_id": 1,
          "employee_id": 1,
          "shipper_id": 1,
          "to": addressShipId[0]
        }
      ])
    })
}
