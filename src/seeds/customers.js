
exports.seed = async function(knex) {  
  await knex('customers').del()
  const addressId = await knex('addresses').insert(
      {
        'street': 'Street Test',
        'city': 'City Test',
        'region': 'Region Test',
        'postalCode': 'Postal Test',
        'country': 'Country Test',
        'phone': '111 222 Test'
      }
    ).returning('id')
    
    console.log(addressId)
   
    return await knex('customers').insert(
      {
        'contactName': 'Contact Test',
        'contactEmail': 'Email Test',
        'address_id': addressId
      }
    )
};
