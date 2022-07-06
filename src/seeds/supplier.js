
exports.seed = async function(knex) {  
  
  await knex('suppliers').del()
  const categoryId = await knex('addresses').insert(
      {
        'street': 'Street Test',
        'city': 'City Test',
        'region': 'Region Test',
        'postalCode': 'Postal Test',
        'country': 'Country Test',
        'phone': '111 222 Test'
      }
    ).returning('id')

    return knex('suppliers').insert(
      {
        'companyName': 'Company Test',
        'contactName': 'Contact Test',
        'contactEmail': 'Email Test',
        'address_id': categoryId
      }
    )
};
