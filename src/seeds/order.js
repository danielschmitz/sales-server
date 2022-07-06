
exports.seed = function(knex) {
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
      ).returning('id')

      return knex('orders').insert([
       {
         "orderDate": Date.now(),
         "shippedDate": null,
         "freight": 10.2,
         "customer_id": 1,
         "employee_id": 1,
         "shipper_id": 1,
         "to": addressShipId
       }
      ]);
    });
};
