exports.seed = async function (knex) {
  console.log('seed customers')
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
  )



  return await knex('customers').insert(
    {
      'contactName': 'Contact Test',
      'contactEmail': 'Email Test',
      'address_id': addressId[0]
    }
  )
}
